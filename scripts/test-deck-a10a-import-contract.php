<?php
declare(strict_types=1);
// Only verifies native PHP portable inventory preflight for user-selected Memento 671.
// Does not execute upload, commit, persist, deploy or test calculator gameplay.
if ($argc !== 3) throw new RuntimeException('Usage: php test-deck-a10a-import-contract.php DATA_HTTP.PHP PACKAGE.JSON');
require_once $argv[1];
$package=json_decode((string)file_get_contents($argv[2]),true,128,JSON_THROW_ON_ERROR);
if (!is_array($package) || ($package['deck_id']??null)!==671) throw new RuntimeException('Assigned Memento 671 only');
if (($package['schema']??'')!=='station-x-deck-package/1') throw new RuntimeException('Invalid schema');
$inventory=[
 'cards'=>$package['inventory'],
 'format'=>'tcg_advanced',
 'deck'=>['id'=>671,'name'=>'Memento'],
 'inventory_sha256'=>'not-stored-in-portable-package'
];
$folder='DECK_NUEVO_12_MEMENTOTLAN_DEMONIHERRERO';
function passes(array $p,array $inventory,string $folder): bool {
 // Mirror the upstream schema/deck-ID gate in ygo_data_prepare before the pure
 // ygo_data_validate_portable_inventory call. Neither function writes data.
 if(($p['schema']??'')!=='station-x-deck-package/1'
    ||(int)($p['deck_id']??0)!==(int)$inventory['deck']['id'])return false;
 try {ygo_data_validate_portable_inventory($p,$inventory,$folder,null);return true;}
 catch (InvalidArgumentException $e){return false;}
}
function must(bool $condition,string $message):void {
 if(!$condition)throw new RuntimeException($message);
}
must(passes($package,$inventory,$folder),'Native portable inventory acceptance must succeed');
$physical=['main'=>0,'extra'=>0,'side'=>0,'reserve'=>0];
foreach($package['record']['cards'] as $card)foreach($card['slots'] as $slot)$physical[$slot['section']]+=$slot['quantity'];
must(count($package['record']['cards'])===39,'Card identities must be 39');
must($physical===['main'=>41,'extra'=>15,'side'=>14,'reserve'=>0],'Physical deck mismatch');
$scenarios=[];
$negative=function(string $name,array $p,array $native,string $folder)use(&$scenarios):void{
 must(!passes($p,$native,$folder),'Bad package wrongly accepted: '.$name);
 $scenarios[]=$name;
};
$t=$package;$t['package_root']='OTHER_DECK';$negative('wrong-folder',$t,$inventory,$folder);
$t=$package;$t['deck_id']=672;$negative('wrong-deck-id',$t,$inventory,$folder);
$t=$package;$t['inventory_binding']='unknown';$negative('wrong-binding',$t,$inventory,$folder);
$t=$package;$t['content_mode']='markdown';$negative('wrong-content-mode',$t,$inventory,$folder);
$t=$package;$t['inventory'][0]['quantity']++;$negative('quantity-changed',$t,$inventory,$folder);
$t=$package;$t['inventory'][0]['section']='side';$negative('wrong-card-zone',$t,$inventory,$folder);
$t=$package;$t['inventory'][]=$t['inventory'][0];$negative('duplicate-inventory-row',$t,$inventory,$folder);
$t=$package;array_pop($t['inventory']);$negative('missing-inventory-row',$t,$inventory,$folder);
$t=$package;$t['record']['cards'][0]['slots'][0]['quantity']++;$negative('record-slot-tampered',$t,$inventory,$folder);
$t=$package;$t['record']['cards'][0]['slots'][0]['card_id']+=100000;$negative('record-card-id-tampered',$t,$inventory,$folder);
$native=$inventory;$native['format']='rush_duel';$negative('wrong-current-deck-format',$package,$native,$folder);
$native=$inventory;$native['cards'][0]['quantity']++;$negative('changed-native-inventory',$package,$native,$folder);
echo json_encode(['ok'=>true,'deck_id'=>671,'physical'=>$physical,
 'nativePortableAccepted'=>true,'negativeCasesRejected'=>$scenarios,
 'testScope'=>'read-only-native-php-preflight','realUploadOrPersistenceExecuted'=>false],
 JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR).PHP_EOL;
