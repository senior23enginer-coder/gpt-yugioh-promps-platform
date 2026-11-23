<?php
declare(strict_types=1);
/** A02 Kashtira 665 portable ZIP preflight using the REAL Station X PHP
 * prepare/validate functions in a temporary directory. No DB, live import,
 * publish, or calculator execution; no banlist.
 */
if($argc!==4)throw new RuntimeException('USAGE: php script.php PLATFORM/data-http.php GPT/KashtiraFolder PLATFORM/665.json');
require_once $argv[1];
$folderPath=realpath($argv[2]);$histFile=realpath($argv[3]);
if(!$folderPath||basename($folderPath)!=='DECK_665_KASHTIRA_PURE'||!$histFile||basename($histFile)!=='665.json')
 throw new RuntimeException('KASHTIRA_665_ONLY');
if(!class_exists(ZipArchive::class))throw new RuntimeException('PHP_ZIP_REQUIRED');
$folder=basename($folderPath);
$package=json_decode((string)file_get_contents($folderPath.'/datos/stationx-deck.json'),true,128,JSON_THROW_ON_ERROR);
$historic=json_decode((string)file_get_contents($histFile),true,128,JSON_THROW_ON_ERROR);
function a02_need(bool $ok,string $msg):void{if(!$ok)throw new RuntimeException($msg);}
a02_need(($package['schema']??'')==='station-x-deck-package/1' && ($package['deck_id']??0)===665,'WRONG_PORTABLE_PACKAGE');
a02_need(($package['inventory_binding']??'')==='deck-slots-v1' && ($package['content_mode']??'')==='structured','NOT_PORTABLE_STRUCTURED');
a02_need(($package['package_root']??'')===$folder,'WRONG_DECK_FOLDER');
a02_need(!isset($package['inventory_sha256']),'SYNTHETIC_LIVE_HASH');
a02_need(($historic['deck_id']??0)===665 && ($historic['format']??'')==='tcg_advanced','WRONG_HISTORICAL_DECK');
$rows=static function(array $cards):array{
 $out=[];
 foreach($cards as $card)foreach($card['slots'] as $slot)$out[]=[
  'id'=>$slot['card_id'],'section'=>$slot['section'],'quantity'=>$slot['quantity']
 ];
 usort($out,static fn($a,$b)=>$a['id']<=>$b['id']);return $out;
};
$native=$rows($historic['cards']);$curated=$rows($package['record']['cards']);
a02_need(count($native)===44 && $native===$curated,'PHYSICAL_ROWS_NOT_PRESERVED');
$counts=['main'=>0,'extra'=>0,'side'=>0,'reserve'=>0];
foreach($native as $row){a02_need(isset($counts[$row['section']]),'INVALID_ZONE');$counts[$row['section']]+=$row['quantity'];}
a02_need($counts===['main'=>42,'extra'=>15,'side'=>0,'reserve'=>19],'INVENTORY_CHANGED');
a02_need(array_column($historic['routes'],'id')===array_column($package['record']['routes'],'id'),'HISTORICAL_ROUTE_ID_CHANGED');
a02_need(array_sum(array_map(static fn($r)=>count($r['steps']??[]),$historic['routes']))===92,'HISTORICAL_STEPS_CHANGED');
$inventory=[
 'deck'=>['id'=>665,'name'=>'Kashtira Pure'],
 'cards'=>$native,'format'=>'tcg_advanced','skills'=>[],
 // Only an in-memory CI fixture; never exported to the GPT package.
 'inventory_sha256'=>'CI-FIXTURE-NOT-LIVE-INVENTORY'
];
$allow=static function(array $candidate,array $currentInventory)use($folder):bool{
 try{
  ygo_data_validate_portable_inventory($candidate,$currentInventory,$folder,null);
  return true;
 }catch(InvalidArgumentException $e){return false;}
};
a02_need($allow($package,$inventory),'VALID_RESERVE_ROWS_REJECTED_BY_NATIVE_IMPORTER');
$negative=[];
$reject=static function(string $name,array $candidate,array $invent)use($allow,&$negative):void{
 a02_need(!$allow($candidate,$invent),'UNSAFE_ACCEPTED_'.$name);$negative[]=$name;
};
$bad=$package;$bad['deck_id']=666;$reject('wrong-deck',$bad,$inventory);
$bad=$package;$bad['package_root']='FOREIGN_DECK';$reject('wrong-folder',$bad,$inventory);
$bad=$package;$bad['content_mode']='markdown';$reject('wrong-mode',$bad,$inventory);
$bad=$package;$bad['inventory_binding']='other';$reject('wrong-binding',$bad,$inventory);
$bad=$package;$bad['inventory'][]=$bad['inventory'][0];$reject('duplicate-id',$bad,$inventory);
$bad=$package;array_pop($bad['inventory']);$reject('missing-id',$bad,$inventory);
$bad=$package;$bad['inventory'][0]['quantity']++;$reject('altered-quantity',$bad,$inventory);
$bad=$package;$reserveIdx=array_search('reserve',array_column($bad['inventory'],'section'),true);
a02_need($reserveIdx!==false,'NO_RESERVE_TEST_ROW');
$bad['inventory'][$reserveIdx]['section']='side';$reject('reserve-reclassified-as-side',$bad,$inventory);
$bad=$package;$bad['record']['cards'][0]['slots'][0]['quantity']++;$reject('record-slot-tamper',$bad,$inventory);
$changedNative=$inventory;$changedNative['cards'][0]['quantity']++;$reject('stale-native-inventory',$package,$changedNative);
$changedNative=$inventory;$changedNative['format']='rush_duel';$reject('wrong-format',$package,$changedNative);
$bad=$package;$bad['inventory_sha256']='NOT_A_LIVE_SHA256';$reject('fake-hash',$bad,$inventory);
$filesNeeded=['datos/stationx-deck.json',$folder.'_CONTENIDO_CURADO.md'];
$guideFiles=glob($folderPath.'/guias/*.md')?:[];
$tcg=glob($folderPath.'/imagenes/tcg/*.jpg')?:[];
$infographics=glob($folderPath.'/imagenes/infografias/*.webp')?:[];
$examples=glob($folderPath.'/imagenes/ejemplos_combos_kashtira/*.webp')?:[];
a02_need(count($guideFiles)===7 && count($tcg)===44 && count($infographics)===15 && count($examples)===4,'ASSET_COUNT_CHANGED');
$zipPath=tempnam(sys_get_temp_dir(),'kashtira665-z-');
$tmpRoot=sys_get_temp_dir().'/kashtira665-p-'.bin2hex(random_bytes(6));
mkdir($tmpRoot,0700,true);
try{
 $zip=new ZipArchive();a02_need($zip->open($zipPath,ZipArchive::OVERWRITE)===true,'ZIP_OPEN');
 foreach($filesNeeded as $rel){a02_need(is_file($folderPath.'/'.$rel),'MISSING_FILE_'.$rel);$zip->addFile($folderPath.'/'.$rel,$folder.'/'.$rel);}
 foreach(array_merge($guideFiles,$tcg,$infographics,$examples) as $file){
  $rel=substr($file,strlen($folderPath)+1);
  a02_need(!str_contains($rel,'..'),'UNSAFE_SOURCE');
  $zip->addFile($file,$folder.'/'.$rel);
 }
 a02_need($zip->close(),'ZIP_CLOSE_FAILED');
 $files=ygo_data_normalize_files(ygo_data_archive($zipPath));
 a02_need(count($files)===72,'ZIP_FILE_COUNT_CHANGED');
 $sourceDoc=$package['source_document'];
 a02_need(isset($files[$sourceDoc]),'ORIGINAL_MD_MISSING');
 $sources=[$sourceDoc=>substr((string)file_get_contents($folderPath.'/'.$folder.'_CONTENIDO_CURADO.md'),0,70)];
 $prepared=ygo_data_prepare($tmpRoot,$files,$inventory,$historic,$sources);
 a02_need(($prepared['deck_id']??0)===665 && ($prepared['format']??'')==='tcg_advanced','NATIVE_PREPARE_CHANGED_ID_OR_FORMAT');
 a02_need(count($prepared['cards']??[])===38 && count($prepared['routes']??[])===16,'NATIVE_PREPARE_LOST_CONTENT');
 $steps=array_sum(array_map(static fn($r)=>count($r['steps']??[]),$prepared['routes']));
 a02_need($steps===92,'NATIVE_PREPARE_DROPPED_STEPS');
 a02_need($rows($prepared['cards'])===$native,'NATIVE_PREPARE_CHANGED_PHYSICAL_ROWS');
 a02_need(array_column($prepared['routes'],'id')===array_column($historic['routes'],'id'),'NATIVE_PREPARE_DROPPED_ROUTE_IDS');
 a02_need(empty($prepared['calculator']['rules']??[]),'CALCULATOR_RULES_INVENTED');
 a02_need(($prepared['profile']['Estilo breve']??'')===($package['record']['profile']['Estilo breve']??null),'PROFILE_A01_NOT_PRESERVED');
 echo json_encode(['ok'=>true,'deck_id'=>665,'zipFiles'=>count($files),'nativeImages'=>count($tcg)+count($infographics)+count($examples),
  'guides'=>count($guideFiles),'cards'=>38,'nativeRows'=>44,'inventory'=>$counts,'routes'=>16,'steps'=>92,
  'rejectedInvalidVariants'=>$negative,'nativePrepareIsolated'=>true,'liveImport'=>false,'banlistAssessed'=>false,
  'calculatorExecuted'=>false],JSON_THROW_ON_ERROR|JSON_UNESCAPED_UNICODE).PHP_EOL;
}finally{
 if(is_file($zipPath))unlink($zipPath);
 if(is_dir($tmpRoot))rmdir($tmpRoot);
}
