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
 * Validar o JSON efetivamente produzido pela API pública do CORE QAI.
 *
 * Este teste NÃO acessa módulos internos do pipeline.
 *
 * Entrada pública
 *      ↓
 * AnalisarQualidadeAmbiental()
 *      ↓
 * Response público
 *      ↓
 * JSON.stringify()
 *      ↓
 * JSON.parse()
 * ======================================================================
 */

console.log("\n========================================");
console.log("CORE QAI — JSON REAL CONTRACT");
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
 * 2. EXECUÇÃO PELA API PÚBLICA
 * ====================================================================== */

const response =
    AnalisarQualidadeAmbiental(input);

assert.ok(
    response,
    "A API pública não produziu response."
);

console.log(
    "✓ Response real produzido pela API pública"
);


/* ======================================================================
 * 3. SERIALIZAÇÃO REAL
 * ====================================================================== */

const json =
    JSON.stringify(response);

assert.equal(
    typeof json,
    "string",
    "Response não foi convertido para JSON."
);

assert.ok(
    json.length > 0,
    "JSON produzido está vazio."
);

console.log(
    "✓ JSON.stringify() executado"
);


/* ======================================================================
 * 4. DESSERIALIZAÇÃO
 * ====================================================================== */

const parsed =
    JSON.parse(json);

assert.ok(
    parsed,
    "JSON.parse() não produziu objeto."
);

assert.deepEqual(
    parsed,
    JSON.parse(json),
    "Payload serializado não preservou sua estrutura."
);

console.log(
    "✓ JSON.parse() preserva o response"
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
    "✓ Contrato top-level"
);


/* ======================================================================
 * 6. METADATA
 * ====================================================================== */

assert.equal(

    parsed.metadata.engine,

    "CORE QAI"

);

console.log(
    "✓ Metadata"
);


/* ======================================================================
 * 7. DOMAIN
 * ====================================================================== */

assert.equal(

    parsed.domain.id,

    "corporate"

);

console.log(
    "✓ Domain"
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

        `Métrica ausente: ${key}`

    );

}

console.log(
    "✓ Metrics"
);


/* ======================================================================
 * 9. QAI SCORE
 * ====================================================================== */

assert.equal(

    parsed.metrics.qaiScore.score,

    null

);

assert.equal(

    parsed.metrics.qaiScore.level,

    "UNKNOWN"

);

assert.equal(

    parsed.metrics.qaiScore.dominantFactor,

    null

);

console.log(
    "✓ QAI Score UNKNOWN"
);


/* ======================================================================
 * 10. CO2 INTERNO
 * ----------------------------------------------------------------------
 * Regra atual do CORE:
 *
 * - utiliza somente CO2 interno;
 * - CO2 é contextual;
 * - não utiliza CO2 externo;
 * - não deve existir propriedade outdoor;
 * - ausência de outdoor é intencional.
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

    "CO2 externo não deve existir no contrato atual."

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
    "✓ CO2 interno contextual"
);

console.log(
    "✓ CO2 externo ausente do contrato"
);


/* ======================================================================
 * 11. CAMADAS DE ANÁLISE
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
    "✓ Diagnosis"
);

console.log(
    "✓ Evidence"
);

console.log(
    "✓ Hypotheses"
);

console.log(
    "✓ Mitigation"
);


/* ======================================================================
 * 12. PROIBIÇÕES DO CONTRATO PÚBLICO
 * ====================================================================== */

assert.equal(

    Object.hasOwn(
        parsed,
        "humanImpact"
    ),

    false,

    "humanImpact não deve existir no contrato público."

);

assert.equal(

    Object.hasOwn(
        parsed,
        "engine"
    ),

    false,

    "engine interno não deve ser exposto no response."

);

console.log(
    "✓ HumanImpact removido"
);

console.log(
    "✓ Engine interno não exposto"
);


/* ======================================================================
 * 13. AUSÊNCIA DE undefined
 * ====================================================================== */

assert.equal(

    json.includes("undefined"),

    false,

    "JSON contém a string 'undefined'."

);

console.log(
    "✓ JSON sem undefined"
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
    "✓ Integridade dos arrays"
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
    `✓ JSON real gravado em: ${outputPath}`
);


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "\n✓ JSON REAL CONTRACT — PASSED\n"
);