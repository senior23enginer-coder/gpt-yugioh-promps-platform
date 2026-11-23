<?php
declare(strict_types=1);
/**
 * Crystron 677 only: native Platform ZIP -> prepare -> publish -> reload smoke in
 * an isolated temporary app. Never contacts production, modifies original
 * repository files, imports another deck, or calls the gameplay calculator.
 *
 * argv[1] = readonly Platform data-http.php
 * argv[2] = assigned GPT Crystron folder
 * argv[3] = readonly historical Platform 677.json
 */
if($argc!==4)throw new RuntimeException('USAGE: php test-deck-a10a-import-roundtrip.php PLATFORM/data-http.php GPT/CRYSTRON_FOLDER PLATFORM/677.json');
require_once $argv[1];
$folderPath=realpath($argv[2]);$previousPath=realpath($argv[3]);
if(!$folderPath||!$previousPath||basename($folderPath)!=='DECK_NUEVO_13_CRISTRON_HORUS'||basename($previousPath)!=='677.json')
 throw new RuntimeException('ASSIGNED_DECK_677_ONLY');
if(!class_exists(ZipArchive::class)||!function_exists('mb_strlen'))throw new RuntimeException('REQUIRES_ZIP_AND_MBSTRING');
$folder=basename($folderPath);
$pkg=json_decode((string)file_get_contents($folderPath.'/datos/stationx-deck.json'),true,128,JSON_THROW_ON_ERROR);
if(($pkg['deck_id']??null)!==677||($pkg['record']['deck_id']??null)!==677||($pkg['schema']??null)!=='station-x-deck-package/1'||($pkg['content_mode']??null)!=='structured')
 throw new RuntimeException('UNEXPECTED_PORTABLE_CONTRACT');
$sourceDoc=$pkg['source_document'];
if($sourceDoc!==$folder.'/'.$folder.'_CONTENIDO_CURADO.md')throw new RuntimeException('UNEXPECTED_SOURCE_DOC');
$inventory=['deck'=>['id'=>677,'name'=>'Crystron'],'cards'=>$pkg['inventory'],'format'=>'tcg_advanced','skills'=>[],'inventory_sha256'=>'read-only-fixture'];
$expectedCounts=['main'=>40,'extra'=>15,'side'=>15,'reserve'=>0];
$actualCounts=$expectedCounts;
foreach($actualCounts as $k=>$_)$actualCounts[$k]=0;
foreach($pkg['record']['cards'] as $card)foreach($card['slots'] as $slot)$actualCounts[$slot['section']]+=$slot['quantity'];
if($actualCounts!==$expectedCounts||count($pkg['record']['cards'])!==39||count($inventory['cards'])!==40)throw new RuntimeException('PHYSICAL_INVENTORY_DRIFT');
$prior=json_decode((string)file_get_contents($previousPath),true,128,JSON_THROW_ON_ERROR);
if(($prior['deck_id']??0)!==677||count($prior['routes']??[])!==14)throw new RuntimeException('HISTORICAL_PLATFORM_SOURCE_MISMATCH');
$tempRoot=sys_get_temp_dir().'/sx-crystron-a10a-'.bin2hex(random_bytes(8));$zipPath=sys_get_temp_dir().'/sx-crystron-a10a-package-'.bin2hex(random_bytes(8)).'.zip';
function a10a_need(bool $condition,string $code):void{if(!$condition)throw new RuntimeException($code);}
function a10a_rmdir(string $dir):void{
 if(!is_dir($dir))return;
 foreach(new DirectoryIterator($dir) as $entry){
  if($entry->isDot())continue;
  $path=$entry->getPathname();
  if($entry->isDir()&&!$entry->isLink())a10a_rmdir($path);else unlink($path);
 }
 rmdir($dir);
}
function a10a_cids(array $rows):array{return array_map(static fn($p)=>(int)$p['cid'],$rows);}
function a10a_summary(array $r):array{
 $steps=0;$photos=0;$opens=0;$endboards=0;$actions=[];$photoIds=[];
 foreach($r['routes'] as $route){
  a10a_need(($route['endboard']['spatial_verified']??null)===false,'FALSE_SPATIAL_CERTIFICATION');
  a10a_need(count($route['steps']??[])>0,'MISSING_ROUTE_STEPS');
  $opens+=count($route['hand_photos']??[]);
  foreach($route['steps'] as $step){
   $steps++;$photos+=count($step['photos']??[]);$actions[]=$step['action'];
   foreach($step['photos'] as $img)$photoIds[]=(int)$img['cid'];
  }
  $endboards++;
 }
 return compact('steps','photos','opens','endboards','actions','photoIds');
}
mkdir($tempRoot.'/assets/editorial/legacy-v40',0755,true);
$legacyPath=$tempRoot.'/assets/editorial/legacy-v40/677.json';
copy($previousPath,$legacyPath);
$oldEntry=['path'=>'./assets/editorial/legacy-v40/677.json','cards'=>39,'routes'=>14,'sha256'=>hash_file('sha256',$legacyPath),'presentation'=>'curated-v62'];
$state=['version'=>'legacy-v40-fixture','checked_studies'=>['677'=>$oldEntry]];
$registry=$tempRoot.'/assets/editorial/strategy-content-state.json';
file_put_contents($registry,ygo_data_json($state));
try{
 $zip=new ZipArchive();
 a10a_need($zip->open($zipPath,ZipArchive::CREATE|ZipArchive::OVERWRITE)===true,'CREATE_ZIP_FAILED');
 $requiredFiles=[
  'datos/stationx-deck.json',
  $folder.'_CONTENIDO_CURADO.md',
  'guias/GUIA_VISUAL_A01_A10.html',
  'datos/A04_HD_IMAGE_PROVENANCE.json'
 ];
 foreach($requiredFiles as $relative){
  $file=$folderPath.'/'.$relative;
  a10a_need(is_file($file),'REQUIRED_FILE_NOT_FOUND_'.$relative);
  $zip->addFile($file,$folder.'/'.$relative);
 }
 $images=glob($folderPath.'/imagenes/*.{png,jpg}',GLOB_BRACE)?:[];
 a10a_need(count($images)===39,'EXACTLY_39_CARD_PHOTOS_REQUIRED');
 foreach($images as $file)$zip->addFile($file,$folder.'/imagenes/'.basename($file));
 a10a_need($zip->close(),'CLOSE_ZIP_FAILED');
 a10a_need(filesize($zipPath)<48*1024*1024,'ZIP_EXCEEDS_WEB_UPLOAD_CAP');
 $files=ygo_data_normalize_files(ygo_data_archive($zipPath));
 a10a_need(count($files)===43,'ZIP_FILE_COUNT_MISMATCH');
 $sourceFiles=[$sourceDoc=>substr((string)file_get_contents($folderPath.'/'.$folder.'_CONTENIDO_CURADO.md'),0,60)];
 [$readEntry,$current]=ygo_data_current($tempRoot,677);
 a10a_need($current!==null&&count($current['routes'])===14,'LEGACY_READ_FAILED');
 $originalHash=hash_file('sha256',$legacyPath);
 $prepared=ygo_data_prepare($tempRoot,$files,$inventory,$current,$sourceFiles);
 $candidate=a10a_summary($prepared);
 $historic=a10a_summary($current);
 a10a_need(count($prepared['cards'])===39&&count($prepared['routes'])===14,'BAD_IMPORT_RECORD');
 a10a_need($candidate['steps']===60&&$candidate['photos']===151&&$candidate['opens']===5&&$candidate['endboards']===14,'PREVIEW_VISUAL_PARITY_FAILURE');
 a10a_need($candidate['actions']===$historic['actions'],'A09_ACTION_SEQUENCE_CHANGED');
 a10a_need($candidate['photos']===$historic['photos']&&$candidate['photos']===151,'NATIVE_STEP_IMAGES_CHANGED');
 // A10A improves static HTML images; native 151 step photo links are intentionally immutable.
 // Native registry optimistic check must reject stale imports before any write.
 $wrongGuard=hash('sha256','stale');
 try{ygo_data_publish($tempRoot,677,$prepared,$files,$wrongGuard);throw new RuntimeException('STALE_IMPORT_ACCEPTED');}
 catch(DomainException $expected){}
 a10a_need(ygo_data_read($registry)===$state,'STALE_GUARD_DID_NOT_KEEP_POINTER');
 // Simulate the confirmed import of precisely the previewed candidate in a temp app.
 $guard=hash('sha256',ygo_data_json($readEntry));
 $newEntry=ygo_data_publish($tempRoot,677,$prepared,$files,$guard);
 [$loadedEntry,$loaded]=ygo_data_current($tempRoot,677);
 a10a_need($loadedEntry===$newEntry,'REGISTRY_POINTER_NOT_RELOADED');
 a10a_need(is_string($loaded['folder_delivery']['imported_at']??null),'IMPORT_TIMESTAMP_MISSING');
 a10a_need(hash_file('sha256',$legacyPath)===$originalHash,'OLD_VERSION_CHANGED');
 $published=a10a_summary($loaded);
 foreach(['steps','photos','opens','endboards','actions','photoIds'] as $field)a10a_need($published[$field]===$candidate[$field],'ROUNDTRIP_MISMATCH_'.$field);
 a10a_need(hash('sha256',ygo_data_json($loaded))===$newEntry['sha256'],'PUBLISHED_SHA256_INVALID');
 a10a_need(count($loaded['cards'])===39&&count($loaded['routes'])===14,'PUBLISHED_RECORDS_CHANGED');
 $imgRefs=0;
 foreach($loaded['routes'] as $route){
  foreach(array_merge($route['hand_photos']??[],...array_map(static fn($s)=>$s['photos']??[],$route['steps'])) as $im){
   foreach(['image','full_image'] as $key){
    $loc=ygo_data_local($tempRoot,$im[$key]);
    a10a_need($loc!==null&&is_file($loc),'PUBLISHED_CARD_PHOTO_404');
    $info=getimagesize($loc);
    a10a_need(is_array($info)&&$info[0]>=600&&$info[1]>=850,'PUBLISHED_PHOTO_LOW_RES');
    $imgRefs++;
   }
  }
 }
 a10a_need($imgRefs===312,'PHOTO_REFERENCES_NOT_ALL_REOPENED');
 $sourceZip=ygo_data_local($tempRoot,$newEntry['source_zip']);
 a10a_need($sourceZip!==null&&is_file($sourceZip),'SOURCE_ZIP_NOT_PERSISTED');
 $savedZip=ygo_data_archive($sourceZip);
 a10a_need(count($savedZip)===43&&isset($savedZip[$folder.'/guias/GUIA_VISUAL_A01_A10.html']),'VISUAL_GUIDE_NOT_ARCHIVED');
 a10a_need(isset($savedZip[$folder.'/datos/stationx-deck.json']),'STRUCTURED_PACKAGE_NOT_ARCHIVED');
 $storedState=ygo_data_read($registry);
 a10a_need($storedState['checked_studies']['677']===$loadedEntry,'REGISTRY_STALE');
 $previous=ygo_data_read(dirname(ygo_data_local($tempRoot,$newEntry['path'])).'/previous-entry.json');
 a10a_need($previous===$oldEntry,'OLD_POINTER_NOT_RETAINED');
 echo ygo_data_json([
  'ok'=>true,'scope'=>'isolated-native-platform-roundtrip','deck_id'=>677,'inventory'=>$actualCounts,
  'zip_files'=>count($files),'zip_bytes'=>filesize($zipPath),
  'routes'=>$published['endboards'],'steps'=>$published['steps'],
  'opening_photos'=>$published['opens'],'step_photos'=>$published['photos'],
  'published_image_references_resolved'=>$imgRefs,
  'source_zip_archived'=>true,'legacy_version_untouched'=>true,'stale_write_rejected'=>true,
  'reloaded_persisted_record'=>true,'live_platform_touched'=>false,
  'calculation_executed'=>false,'spatial_positions_certified'=>0
 ]).PHP_EOL;
}finally{
 if(is_file($zipPath))unlink($zipPath);
 a10a_rmdir($tempRoot);
}
