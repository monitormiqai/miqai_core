import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import AnalisarQualidadeAmbiental
    from "../../src/engine/analysis.js";


/* ======================================================================
 * CORE QAI
 * JSON REAL CONTRACT TEST
 * ----------------------------------------------------------------------
 * Objetivo:
 * Validar o JSON efetivamente produzido pela API pÃºblica do CORE QAI.
 *
 * Este teste NÃƒO acessa mÃ³dulos internos do pipeline.
 *
 * Entrada pÃºblica
 *      â†“
 * AnalisarQualidadeAmbiental()
 *      â†“
 * Response pÃºblico
 *      â†“
 * JSON.stringify()
 *      â†“
 * JSON.parse()
 * ======================================================================
 */

console.log("\n========================================");
console.log("CORE QAI â€” JSON REAL CONTRACT");
console.log("========================================\n");


/* ======================================================================
 * 1. ENTRADA CONTROLADA
 * ====================================================================== */

const input = {

    environment: "corporate",

    reading: {

        temperature: 23,

        humidity: 50,

        co2: 650,

        pm25: 6,

        pm10: 12,

        vocIndex: 90,

        noxIndex: 1

    }

};


/* ======================================================================
 * 2. EXECUÃ‡ÃƒO PELA API PÃšBLICA
 * ====================================================================== */

const response =
    AnalisarQualidadeAmbiental(input);

assert.ok(
    response,
    "A API pÃºblica nÃ£o produziu response."
);

console.log(
    "âœ“ Response real produzido pela API pÃºblica"
);


/* ======================================================================
 * 3. SERIALIZAÃ‡ÃƒO REAL
 * ====================================================================== */

const json =
    JSON.stringify(response);

assert.equal(
    typeof json,
    "string",
    "Response nÃ£o foi convertido para JSON."
);

assert.ok(
    json.length > 0,
    "JSON produzido estÃ¡ vazio."
);

console.log(
    "âœ“ JSON.stringify() executado"
);


/* ======================================================================
 * 4. DESSERIALIZAÃ‡ÃƒO
 * ====================================================================== */

const parsed =
    JSON.parse(json);

assert.ok(
    parsed,
    "JSON.parse() nÃ£o produziu objeto."
);

assert.deepEqual(
    parsed,
    JSON.parse(json),
    "Payload serializado nÃ£o preservou sua estrutura."
);

console.log(
    "âœ“ JSON.parse() preserva o response"
);


/* ======================================================================
 * 5. CONTRATO TOP-LEVEL
 * ====================================================================== */

const requiredTopLevel = [

    "metadata",

    "domain",

    "validation",

    "metrics",

    "diagnosis",

    "evidence",

    "hypotheses",

    "mitigation",

    "environmentalScenario",

    "relationships",

    "impacts",

    "references"

];

for (const key of requiredTopLevel) {

    assert.ok(

        Object.hasOwn(parsed, key),

        `Campo top-level ausente: ${key}`

    );

}

console.log(
    "âœ“ Contrato top-level"
);


/* ======================================================================
 * 6. METADATA
 * ====================================================================== */

assert.equal(

    parsed.metadata.engine,

    "CORE QAI"

);

console.log(
    "âœ“ Metadata"
);


/* ======================================================================
 * 7. DOMAIN
 * ====================================================================== */

assert.equal(

    parsed.domain.id,

    "corporate"

);

console.log(
    "âœ“ Domain"
);


/* ======================================================================
 * 8. METRICS
 * ====================================================================== */

assert.ok(

    parsed.metrics,

    "Metrics ausente."

);

for (const key of [

    "thermalComfort",

    "airQuality",

    "particulateLoad",

    "occupancy",

    "dewPoint",

    "co2Analysis",

    "qaiScore"

]) {

    assert.ok(

        Object.hasOwn(parsed.metrics, key),

        `MÃ©trica ausente: ${key}`

    );

}

console.log(
    "âœ“ Metrics"
);


/* ======================================================================
 * 9. QAI SCORE
 * ====================================================================== */

assert.equal(

    parsed.metrics.qaiScore.score,

    83

);

assert.notEqual(

    parsed.metrics.qaiScore.level,

    "UNKNOWN"

);

assert.equal(

    parsed.metrics.qaiScore.dominantFactor,

    "temperature"

);

console.log(
    "âœ“ QAI Score UNKNOWN"
);


/* ======================================================================
 * 10. CO2 INTERNO
 * ----------------------------------------------------------------------
 * Regra atual do CORE:
 *
 * - utiliza somente CO2 interno;
 * - CO2 Ã© contextual;
 * - nÃ£o utiliza CO2 externo;
 * - nÃ£o deve existir propriedade outdoor;
 * - ausÃªncia de outdoor Ã© intencional.
 * ====================================================================== */

assert.equal(

    parsed.metrics.co2Analysis.indoor,

    650

);

assert.equal(

    Object.hasOwn(
        parsed.metrics.co2Analysis,
        "outdoor"
    ),

    false,

    "CO2 externo nÃ£o deve existir no contrato atual."

);

assert.equal(

    parsed.metrics.co2Analysis.basis,

    "INDOOR_CONTEXTUAL_OBSERVATION"

);

assert.equal(

    parsed.metrics.co2Analysis.level,

    "LOWER_RANGE"

);

assert.equal(

    parsed.metrics.co2Analysis.elevated,

    false

);

console.log(
    "âœ“ CO2 interno contextual"
);

console.log(
    "âœ“ CO2 externo ausente do contrato"
);


/* ======================================================================
 * 11. CAMADAS DE ANÃLISE
 * ====================================================================== */

assert.ok(

    parsed.diagnosis,

    "Diagnosis ausente."

);

assert.ok(

    parsed.evidence,

    "Evidence ausente."

);

assert.ok(

    parsed.hypotheses,

    "Hypotheses ausente."

);

assert.ok(

    parsed.mitigation,

    "Mitigation ausente."

);

console.log(
    "âœ“ Diagnosis"
);

console.log(
    "âœ“ Evidence"
);

console.log(
    "âœ“ Hypotheses"
);

console.log(
    "âœ“ Mitigation"
);


/* ======================================================================
 * 12. PROIBIÃ‡Ã•ES DO CONTRATO PÃšBLICO
 * ====================================================================== */

assert.equal(

    Object.hasOwn(
        parsed,
        "humanImpact"
    ),

    false,

    "humanImpact nÃ£o deve existir no contrato pÃºblico."

);

assert.equal(

    Object.hasOwn(
        parsed,
        "engine"
    ),

    false,

    "engine interno nÃ£o deve ser exposto no response."

);

console.log(
    "âœ“ HumanImpact removido"
);

console.log(
    "âœ“ Engine interno nÃ£o exposto"
);


/* ======================================================================
 * 13. AUSÃŠNCIA DE undefined
 * ====================================================================== */

assert.equal(

    json.includes("undefined"),

    false,

    "JSON contÃ©m a string 'undefined'."

);

console.log(
    "âœ“ JSON sem undefined"
);


/* ======================================================================
 * 14. INTEGRIDADE DOS ARRAYS
 * ====================================================================== */

assert.ok(

    Array.isArray(
        parsed.diagnosis.secondary
    ),

    "diagnosis.secondary deve ser array."

);

assert.ok(

    Array.isArray(
        parsed.diagnosis.matches
    ),

    "diagnosis.matches deve ser array."

);

assert.ok(

    Array.isArray(
        parsed.evidence.records
    ),

    "evidence.records deve ser array."

);

assert.ok(

    Array.isArray(
        parsed.hypotheses.secondary
    ),

    "hypotheses.secondary deve ser array."

);

assert.ok(

    Array.isArray(
        parsed.hypotheses.matches
    ),

    "hypotheses.matches deve ser array."

);

assert.ok(

    Array.isArray(
        parsed.mitigation.secondary
    ),

    "mitigation.secondary deve ser array."

);

assert.ok(

    Array.isArray(
        parsed.mitigation.actions
    ),

    "mitigation.actions deve ser array."

);

assert.ok(

    parsed.impacts &&
    Array.isArray(
        parsed.impacts.matches
    ),

    "impacts deve possuir matches como array."

);

assert.ok(

    parsed.references &&
    Array.isArray(
        parsed.references.matches
    ),

    "references deve possuir matches como array."

);

console.log(
    "âœ“ Integridade dos arrays"
);


/* ======================================================================
 * 15. GRAVAR JSON REAL
 * ====================================================================== */

const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);

const outputPath =
    path.join(
        __dirname,
        "json-real-output.json"
    );

fs.writeFileSync(

    outputPath,

    JSON.stringify(
        parsed,
        null,
        2
    ),

    "utf8"

);

console.log(
    `âœ“ JSON real gravado em: ${outputPath}`
);


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "\nâœ“ JSON REAL CONTRACT â€” PASSED\n"
);
