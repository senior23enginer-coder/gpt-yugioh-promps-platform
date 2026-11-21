'use strict';
/**
 * Generic documentary A05 coverage audit for ONE user-assigned deck.
 * This is a fail-closed traceability check, NOT a Yu-Gi-Oh rules engine and
 * NOT independent proof that the paper scenarios are legal.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const DECK_ROOT = path.join(ROOT, '01_INFORMACION_PARA_IMPORTAR', 'decks') + path.sep;
const OFFICIAL = 'https://www.db.yugioh-card.com/yugiohdb/card_search.action?cid=';
const FIELDS = [
  'Actor / estado inicial', 'Ventana / disparador', 'Coste o requisito previo',
  'Selección / targeting', 'Resolución', 'Uso, negación y restricciones',
  'Estado posterior esperado', 'Fuente oficial'
];

function section(source, title) {
  const start = source.indexOf(title);
  assert(start >= 0, 'MISSING_SECTION_' + title);
  const next = source.indexOf('\n### ', start + title.length);
  assert(next > start, 'MISSING_SECTION_BOUNDARY_' + title);
  return source.slice(start, next);
}

function audit({deckId, packagePath, documentPath, expectedClauses, requireComplete = false}) {
  assert(Number.isInteger(deckId) && deckId > 0, 'EXPLICIT_DECK_ID_REQUIRED');
  const packageFile = path.resolve(packagePath);
  const documentFile = path.resolve(documentPath);
  assert(packageFile.startsWith(DECK_ROOT) && documentFile.startsWith(DECK_ROOT),
    'OUT_OF_DECK_SCOPE');
  assert(path.dirname(path.dirname(packageFile)) === path.dirname(documentFile),
    'CROSS_DECK_DOCUMENT_NOT_ALLOWED');
  const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
  assert.equal(pkg.schema, 'station-x-deck-package/1');
  assert.equal(pkg.deck_id, deckId);
  assert.equal(pkg.record.deck_id, deckId);
  const cards = new Map(pkg.record.cards.map(card => [card.cid, card]));
  assert.equal(cards.size, pkg.record.cards.length, 'DUPLICATE_CID');
  const counts = {main: 0, extra: 0, side: 0, reserve: 0};
  for (const card of cards.values()) {
    for (const slot of card.slots) {
      assert(Object.hasOwn(counts, slot.section), 'INVALID_SECTION');
      counts[slot.section] += slot.quantity;
    }
  }
  for (const zone of ['main', 'extra', 'side']) assert(counts[zone] > 0,
    'REQUIRED_SECTION_MISSING_' + zone);

  const doc = fs.readFileSync(documentFile, 'utf8');
  const registry = section(doc, '### A05.6 —');
  const effects = new Map();
  const header = /^- \*\*CID (\d+) — [^\n]+\*\* \([^)]*\)/gm;
  const heads = [...registry.matchAll(header)];
  assert.equal(heads.length, cards.size, 'INCOMPLETE_PHYSICAL_IDENTITY_REGISTRY');
  for (let i = 0; i < heads.length; ++i) {
    const cid = Number(heads[i][1]);
    assert(cards.has(cid), 'UNLOADED_REGISTRY_CID_' + cid);
    const block = registry.slice(heads[i].index,
      i + 1 < heads.length ? heads[i + 1].index : registry.length);
    assert(block.includes(OFFICIAL + cid), 'MISSING_OFFICIAL_SOURCE_' + cid);
    const clauses = [...block.matchAll(
      /^\s+- \u0060(\d+:a05:(\d+):[a-z0-9-]+)\u0060 · \*\*([A-Z_]+)\*\* · ([^\n]+)/gm
    )];
    assert(clauses.length > 0, 'NO_EFFECT_OR_PROCEDURE_' + cid);
    for (const [, id, actorCid, kind, summary] of clauses) {
      assert.equal(Number(actorCid), cid, 'MISATTRIBUTED_EFFECT_' + id);
      assert(id.startsWith(deckId + ':a05:'), 'OTHER_DECK_EFFECT_' + id);
      assert(!effects.has(id), 'DUPLICATE_EFFECT_ID_' + id);
      assert(summary.trim().length >= 30, 'EMPTY_EFFECT_SUMMARY_' + id);
      effects.set(id, {cid, kind});
    }
  }
  if (expectedClauses !== undefined)
    assert.equal(effects.size, expectedClauses, 'WRONG_CLAUSE_DENOMINATOR');

  const causals = section(doc, '### A05.7 —');
  const causalHeaders = [...causals.matchAll(
    /^#### \d+\. \u0060(\d+:a05:(\d+):[a-z0-9-]+)\u0060 · CID \d+ \([A-Z_]+\)/gm
  )];
  const causalIds = new Set();
  for (let i = 0; i < causalHeaders.length; ++i) {
    const [whole, id, cidStr] = causalHeaders[i];
    const cid = Number(cidStr);
    assert(effects.has(id), 'CAUSAL_UNKNOWN_ID_' + id);
    assert.equal(effects.get(id).cid, cid, 'CAUSAL_WRONG_CID_' + id);
    assert(!causalIds.has(id), 'DUPLICATED_CAUSAL_ID_' + id);
    causalIds.add(id);
    const block = causals.slice(causalHeaders[i].index + whole.length,
      i + 1 < causalHeaders.length ? causalHeaders[i + 1].index : causals.length);
    for (const field of FIELDS) {
      const present = block.split('\n').some(line =>
        line.startsWith('- **' + field + ':**') && line.split(':**')[1]?.trim().length > 8);
      assert(present, 'CAUSAL_FIELD_MISSING_' + id + '_' + field);
    }
    assert(block.includes(OFFICIAL + cid), 'CAUSAL_OFFICIAL_SOURCE_MISSING_' + id);
  }

  const papers = section(doc, '### A05.8 —');
  const paperHeaders = [...papers.matchAll(
    /^#### \d+\. \u0060(\d+:a05:(\d+):[a-z0-9-]+)\u0060 — dos casos de papel/gm
  )];
  const caseIds = new Set();
  const paperEffects = new Set();
  let positive = 0, negative = 0;
  for (let i = 0; i < paperHeaders.length; ++i) {
    const [whole, id, cidStr] = paperHeaders[i];
    const cid = Number(cidStr);
    assert(effects.has(id), 'PAPER_UNKNOWN_ID_' + id);
    assert(causalIds.has(id), 'PAPER_NO_CAUSAL_EXPLANATION_' + id);
    assert.equal(effects.get(id).cid, cid, 'PAPER_WRONG_CID_' + id);
    assert(!paperEffects.has(id), 'DUPLICATED_PAPER_EFFECT_' + id);
    paperEffects.add(id);
    const block = papers.slice(paperHeaders[i].index + whole.length,
      i + 1 < paperHeaders.length ? paperHeaders[i + 1].index : papers.length);
    assert(block.includes(OFFICIAL + cid), 'PAPER_OFFICIAL_SOURCE_MISSING_' + id);
    for (const [prefix, legal] of [['P', 'true'], ['N', 'false']]) {
      const matches = [...block.matchAll(
        new RegExp('case_id=(' + deckId + ':A05:' + prefix + '\\d+)', 'g')
      )];
      assert.equal(matches.length, 1, 'MISSING_OR_DUPLICATE_PAPER_CASE_' + id + '_' + prefix);
      assert(!caseIds.has(matches[0][1]), 'DUPLICATED_CASE_ID_' + matches[0][1]);
      caseIds.add(matches[0][1]);
      assert(block.includes('expected_legal=' + legal),
        'PAPER_CASE_UNSPECIFIED_LEGALITY_' + id);
      if (prefix === 'P') ++positive; else ++negative;
    }
    for (const field of ['state_before', 'action', 'expected_costs', 'expected_events/state_after', 'reason'])
      assert(block.includes(field), 'PAPER_CASE_MISSING_STATE_FIELD_' + id + '_' + field);
    assert(block.includes('CONDICIONAL_PENDIENTE_DE_ESQUEMA_Y_PRUEBA'),
      'PAPER_PREMATURELY_CERTIFIED_' + id);
  }

  const missingCausal = [...effects.keys()].filter(id => !causalIds.has(id));
  const missingPaper = [...effects.keys()].filter(id => !paperEffects.has(id));
  const result = {
    ok: true, deck_id: deckId, counts, identities: cards.size,
    effectIds: effects.size, causalWithFields: causalIds.size,
    effectsWithPairedPaperCases: paperEffects.size,
    positiveConditional: positive, negativeConditional: negative,
    missingCausal, missingPaper, independentSemanticProof: false,
    paperCasesTypedAndCertified: false, calculatorExecuted: false,
    a05T3Complete: false, a05T4Complete: false
  };
  if (requireComplete) {
    assert.equal(missingCausal.length, 0, 'A05_T3_INCOMPLETE_MISSING_CAUSAL');
    assert.equal(missingPaper.length, 0, 'A05_T4_INCOMPLETE_MISSING_PAPER');
    // Counting and source hyperlinks alone can never turn these flags true.
    assert.fail('INDEPENDENT_SEMANTIC_REVIEW_AND_TYPED_PAPER_CERTIFICATION_REQUIRED');
  }
  return result;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  assert(args.includes('--user-assigned'), 'EXPLICIT_DECK_ASSIGNMENT_REQUIRED');
  const id = args.find(s => s.startsWith('--deck-id='));
  const ex = args.find(s => s.startsWith('--expected-clauses='));
  const files = args.filter(s => !s.startsWith('--'));
  assert.equal(files.length, 2, 'EXPECTED_PACKAGE_AND_EXISTING_CURATED_MARKDOWN');
  console.log(JSON.stringify(audit({
    deckId: Number(id?.split('=')[1]),
    packagePath: files[0], documentPath: files[1],
    expectedClauses: ex ? Number(ex.split('=')[1]) : undefined,
    requireComplete: args.includes('--require-complete')
  }), null, 2));
}
module.exports = Object.freeze({audit});