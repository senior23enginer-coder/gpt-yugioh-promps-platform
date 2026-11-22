<?php
declare(strict_types=1);
/**
 * A02 read-only Native Station X preflight for the explicitly assigned
 * Crystron/Horus deck 677 only. Creates a temporary ZIP, validates it through
 * real Platform importer preparation, and rejects corrupted identity/slots.
 * NO DB writes, no production publishing, no calculator or duel execution.
 */
if ($argc !== 4) throw new RuntimeException('USAGE: php test-deck-a02-crystron-preflight.php PLATFORM/data-http.php GPT/Crystron-folder PLATFORM/677.json');
require_once $argv[1];
$folderPath=realpath($argv[2]);
$historicPath=realpath($argv[3]);
if(!$folderPath || !$historicPath
 || basename($folderPath)!=='DECK_NUEVO_13_CRISTRON_HORUS'
 || basename($historicPath)!=='677.json') throw new RuntimeException('ASSIGNED_CRYSTRON_677_ONLY');
if(!class_exists(ZipArchive::class))throw new RuntimeException('MISSING_ZIP_EXTENSION');
$folder=basename($folderPath);
$pkg=json_decode((string)file_get_contents($folderPath.'/datos/stationx-deck.json'),true,128,JSON_THROW_ON_ERROR);
$historic=json_decode((string)file_get_contents($historicPath),true,128,JSON_THROW_ON_ERROR);
function a02_need(bool $condition,string $code):void{if(!$condition)throw new RuntimeException($code);}
a02_need(($pkg['deck_id']??null)===677 && ($pkg['record']['deck_id']??null)===677,'DECK_MISMATCH');
a02_need(($pkg['inventory_binding']??null)==='deck-slots-v1' && ($pkg['content_mode']??null)==='structured','NOT_STRUCTURED_PORTABLE');
a02_need(($historic['deck_id']??null)===677 && ($historic['format']??null)==='tcg_advanced','WRONG_HISTORICAL_SOURCE');
$canonical=static function(array $cards):array{
 $rows=[];
 foreach($cards as $c)foreach(($c['slots']??[]) as $slot)
  $rows[]=['id'=>$slot['card_id'],'section'=>$slot['section'],'quantity'=>$slot['quantity']];
 usort($rows,static fn($a,$b)=>$a['id']<=>$b['id']);
 return $rows;
};
$originalRows=$canonical($historic['cards']);
a02_need(count($originalRows)===40 && count($historic['cards'])===39,'HISTORICAL_INVENTORY_INVALID');
a02_need($originalRows===$canonical($pkg['record']['cards']),'CHANGED_PHYSICAL_SLOTS');
a02_need(array_column($historic['routes'],'id')===array_column($pkg['record']['routes'],'id'),
 'CHANGED_HISTORICAL_ROUTE_IDS');
$inventory=[
 'deck'=>['id'=>677,'name'=>'Crystron'],
 'cards'=>$originalRows,
 'format'=>'tcg_advanced',
 'skills'=>[],
 'inventory_sha256'=>'isolated-original-v40-reference'
];
$accept=static function(array $candidate,array $native,string $root):bool{
 if(($candidate['schema']??null)!=='station-x-deck-package/1'
  ||($candidate['deck_id']??null)!==677)return false;
 try {ygo_data_validate_portable_inventory($candidate,$native,$root,null);return true;}
 catch(InvalidArgumentException $e){return false;}
};
a02_need($accept($pkg,$inventory,$folder),'NATIVE_PORTABLE_GATE_REJECTED_VALID_DECK');
$negative=[];
$reject=static function(string $name,array $candidate,array $native,string $root)use(&$negative,$accept):void{
 a02_need(!$accept($candidate,$native,$root),'UNSAFE_ACCEPTED_'+$name);$negative[]=$name;
};
$t=$pkg;$t['deck_id']=678;$reject('wrong-deck',$t,$inventory,$folder);
$t=$pkg;$t['package_root']='FOREIGN';$reject('wrong-root',$t,$inventory,$folder);
$t=$pkg;$t['content_mode']='markdown';$reject('wrong-mode',$t,$inventory,$folder);
$t=$pkg;$t['inventory_binding']='foreign';$reject('wrong-binding',$t,$inventory,$folder);
$t=$pkg;$t['inventory'][0]['quantity']++;$reject('wrong-declared-quantity',$t,$inventory,$folder);
$t=$pkg;$t['inventory'][0]['section']='side';$reject('wrong-declared-slot',$t,$inventory,$folder);
$t=$pkg;$t['inventory'][]=$t['inventory'][0];$reject('duplicated-native-row',$t,$inventory,$folder);
$t=$pkg;array_pop($t['inventory']);$reject('missing-native-row',$t,$inventory,$folder);
$t=$pkg;$t['record']['cards'][0]['slots'][0]['quantity']++;$reject('tampered-record-quantity',$t,$inventory,$folder);
$t=$pkg;$t['record']['cards'][0]['slots'][0]['card_id']+=9999;$reject('tampered-record-id',$t,$inventory,$folder);
$n=$inventory;$n['format']='rush_duel';$reject('wrong-platform-format',$pkg,$n,$folder);
$n=$inventory;$n['cards'][0]['quantity']++;$reject('changed-live-inventory',$pkg,$n,$folder);
$t=$pkg;$t['inventory_sha256']='fake-hash';$reject('unverified-inventory-hash',$t,$inventory,$folder);

$zipPath=sys_get_temp_dir().'/crystron-a02-'.bin2hex(random_bytes(8)).'.zip';
$root=sys_get_temp_dir().'/crystron-a02-'.bin2hex(random_bytes(6));
mkdir($root,0755,true);
try{
 $zip=new ZipArchive();
 a02_need($zip->open($zipPath,ZipArchive::CREATE|ZipArchive::OVERWRITE)===true,'ZIP_CREATE_FAILED');
 $required=[
  'datos/stationx-deck.json',
  $folder.'_CONTENIDO_CURADO.md',
  'guias/GUIA_VISUAL_A01_A10.html'
 ];
 foreach($required as $relative){
  $file=$folderPath.'/'.$relative;
  a02_need(is_file($file),'REQUIRED_ZIP_FILE_ABSENT_'.$relative);
  $zip->addFile($file,$folder.'/'.$relative);
 }
 $images=glob($folderPath.'/imagenes/*.{png,jpg}',GLOB_BRACE)?:[];
 a02_need(count($images)===39,'BAD_PHOTO_COUNT');
 foreach($images as $file)$zip->addFile($file,$folder.'/imagenes/'.basename($file));
 a02_need($zip->close(),'ZIP_CLOSE_FAILED');
 $files=ygo_data_normalize_files(ygo_data_archive($zipPath));
 a02_need(count($files)===42,'ZIP_EXPECTS_42_FILES');
 $sourceDoc=$pkg['source_document'];
 a02_need(isset($files[$sourceDoc]),'SOURCE_DOCUMENT_NOT_IN_ZIP');
 $sourceRefs=[$sourceDoc=>substr((string)file_get_contents($folderPath.'/'.$folder.'_CONTENIDO_CURADO.md'),0,60)];
 $prepared=ygo_data_prepare($root,$files,$inventory,$historic,$sourceRefs);
 a02_need(($prepared['deck_id']??null)===677,'NATIVE_PREPARE_WRONG_DECK');
 a02_need(($prepared['format']??null)==='tcg_advanced','NATIVE_PREPARE_WRONG_FORMAT');
 a02_need(count($prepared['cards']??[])===39 && count($prepared['routes']??[])===14,'NATIVE_PREPARE_DROPPED_CONTENT');
 $steps=array_sum(array_map(static fn($r)=>count($r['steps']??[]),$prepared['routes']));
 a02_need($steps===60,'NATIVE_PREPARE_DROPPED_STEPS');
 a02_need(count($prepared['calculator']['rules']??[])===13,'NATIVE_PREPARE_DROPPED_RULES');
 a02_need(array_column($historic['routes'],'id')===array_column($prepared['routes'],'id'),
  'NATIVE_PREPARE_CHANGED_ROUTE_IDENTITIES');
 echo json_encode(['ok'=>true,'deck_id'=>677,'zipFiles'=>count($files),
  'preparedRoutes'=>count($prepared['routes']),'preparedSteps'=>$steps,
  'preparedRules'=>count($prepared['calculator']['rules']),
  'physicalRows'=>count($originalRows),'negativeGatesRejected'=>$negative,
  'nativePhpReadOnlyPrepare'=>true,'realDatabaseRead'=>false,
  'published'=>false,'calculatorExecuted'=>false],JSON_THROW_ON_ERROR|JSON_UNESCAPED_UNICODE).PHP_EOL;
} finally {
 if(is_file($zipPath))unlink($zipPath);
 if(is_dir($root))rmdir($root);
}
