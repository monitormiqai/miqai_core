import assert from "node:assert/strict";

import AnalisarQualidadeAmbiental
    from "../../src/engine/analysis.js";


/* ======================================================================
 * CORE QAI
 * JSON CONTRACT TEST
 * ----------------------------------------------------------------------
 * Objetivo
 * ----------------------------------------------------------------------
 * Validar exclusivamente o contrato JSON PÚBLICO produzido pelo CORE.
 *
 * IMPORTANTE:
 * Este teste NÃO valida o Context interno.
 * O Context é uma estrutura operacional do pipeline.
 * O contrato consumido pelo aplicativo é o response produzido por
 * AnalisarQualidadeAmbiental().
 * ====================================================================== */


console.log("\n========================================");
console.log("CORE QAI — JSON CONTRACT");
console.log("========================================\n");


/* ======================================================================
 * INPUT OFICIAL DE TESTE
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
 * 1. RESPONSE FINAL
 * ====================================================================== */

const response = AnalisarQualidadeAmbiental(input);

assert.ok(

    response,

    "Response final não foi produzido."

);

assert.equal(

    typeof response,

    "object",

    "Response final deve ser objeto."

);

console.log(

    "✓ Response final produzido"

);


/* ======================================================================
 * 2. JSON SERIALIZÁVEL
 * ====================================================================== */

let json;

assert.doesNotThrow(

    () => {

        json = JSON.stringify(response);

    },

    "Response final não pode ser serializado como JSON."

);

assert.ok(

    json,

    "JSON final vazio."

);

let parsed;

assert.doesNotThrow(

    () => {

        parsed = JSON.parse(json);

    },

    "JSON final não pode ser convertido novamente."

);

assert.ok(

    parsed,

    "JSON parseado não foi produzido."

);

console.log(

    "✓ JSON serializável"

);


/* ======================================================================
 * 3. CONTRATO TOP-LEVEL
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


for (const field of requiredTopLevel) {

    assert.ok(

        Object.hasOwn(response, field),

        `Campo top-level ausente: ${field}`

    );

}

console.log(

    "✓ Contrato top-level"

);


/* ======================================================================
 * 4. METADATA
 * ====================================================================== */

assert.ok(

    response.metadata,

    "metadata ausente."

);

assert.equal(

    typeof response.metadata,

    "object",

    "metadata deve ser objeto."

);

assert.equal(

    response.metadata.engine,

    "CORE QAI",

    "metadata.engine deve ser CORE QAI."

);

console.log(

    "✓ Metadata"

);


/* ======================================================================
 * 5. DOMAIN
 * ====================================================================== */

assert.ok(

    response.domain,

    "domain ausente."

);

assert.equal(

    typeof response.domain,

    "object",

    "domain deve ser objeto."

);

assert.equal(

    response.domain.id,

    "corporate",

    "domain.id deve ser corporate."

);

console.log(

    "✓ Domain"

);


/* ======================================================================
 * 6. METRICS
 * ====================================================================== */

assert.ok(

    response.metrics,

    "metrics ausente."

);

assert.equal(

    typeof response.metrics,

    "object",

    "metrics deve ser objeto."

);


const requiredMetrics = [

    "thermalComfort",

    "airQuality",

    "particulateLoad",

    "occupancy",

    "dewPoint",

    "co2Analysis",

    "qaiScore"

];


for (const key of requiredMetrics) {

    assert.ok(

        Object.hasOwn(response.metrics, key),

        `Métrica ausente: ${key}`

    );

}

console.log(

    "✓ Metrics"

);


/* ======================================================================
 * 7. QAI SCORE
 * ====================================================================== */

assert.ok(

    response.metrics.qaiScore,

    "metrics.qaiScore ausente."

);

assert.equal(

    response.metrics.qaiScore.score,

    null,

    "QAI Score deveria permanecer UNKNOWN neste cenário."

);

assert.equal(

    response.metrics.qaiScore.level,

    "UNKNOWN",

    "QAI Score deveria estar em UNKNOWN."

);

assert.equal(

    response.metrics.qaiScore.dominantFactor,

    null,

    "dominantFactor deveria ser null quando o Score é UNKNOWN."

);

console.log(

    "✓ QAI Score UNKNOWN sem componentes métricos"

);


/* ======================================================================
 * 8. CO2 ANALYSIS
 * ----------------------------------------------------------------------
 * Regra atual do CORE:
 *
 * - utiliza somente CO2 interno;
 * - CO2 é uma observação contextual;
 * - CO2 externo NÃO faz parte do CORE;
 * - a propriedade "outdoor" não deve existir no contrato.
 * ====================================================================== */

assert.ok(

    response.metrics.co2Analysis,

    "metrics.co2Analysis ausente."

);

assert.equal(

    response.metrics.co2Analysis.indoor,

    650,

    "CO2 indoor incorreto."

);

assert.equal(

    Object.hasOwn(
        response.metrics.co2Analysis,
        "outdoor"
    ),

    false,

    "CO2 outdoor não deve existir no contrato atual."

);

assert.equal(

    response.metrics.co2Analysis.basis,

    "INDOOR_CONTEXTUAL_OBSERVATION",

    "Basis de CO2 incorreta."

);

assert.equal(

    response.metrics.co2Analysis.level,

    "LOWER_RANGE",

    "Level de CO2 incorreto."

);

assert.equal(

    response.metrics.co2Analysis.elevated,

    false,

    "CO2 elevated deveria ser false."

);

console.log(

    "✓ CO2 interno contextual"

);

console.log(

    "✓ CO2 externo ausente do contrato"

);
/* ======================================================================
 * 9. DIAGNOSIS
 * ====================================================================== */

assert.ok(

    response.diagnosis,

    "diagnosis ausente."

);

assert.ok(

    Object.hasOwn(response.diagnosis, "primary"),

    "diagnosis.primary ausente."

);

assert.ok(

    Object.hasOwn(response.diagnosis, "secondary"),

    "diagnosis.secondary ausente."

);

assert.ok(

    Object.hasOwn(response.diagnosis, "matches"),

    "diagnosis.matches ausente."

);

assert.ok(

    Array.isArray(response.diagnosis.secondary),

    "diagnosis.secondary deve ser array."

);

assert.ok(

    Array.isArray(response.diagnosis.matches),

    "diagnosis.matches deve ser array."

);

console.log(

    "✓ Diagnosis"

);


/* ======================================================================
 * 10. EVIDENCE
 * ====================================================================== */

assert.ok(

    response.evidence,

    "evidence ausente."

);

assert.ok(

    Object.hasOwn(response.evidence, "records"),

    "evidence.records ausente."

);

assert.ok(

    Array.isArray(response.evidence.records),

    "evidence.records deve ser array."

);

console.log(

    "✓ Evidence"

);


/* ======================================================================
 * 11. HYPOTHESES
 * ====================================================================== */

assert.ok(

    response.hypotheses,

    "hypotheses ausente."

);

assert.ok(

    Object.hasOwn(response.hypotheses, "primary"),

    "hypotheses.primary ausente."

);

assert.ok(

    Object.hasOwn(response.hypotheses, "secondary"),

    "hypotheses.secondary ausente."

);

assert.ok(

    Object.hasOwn(response.hypotheses, "matches"),

    "hypotheses.matches ausente."

);

assert.ok(

    Array.isArray(response.hypotheses.secondary),

    "hypotheses.secondary deve ser array."

);

assert.ok(

    Array.isArray(response.hypotheses.matches),

    "hypotheses.matches deve ser array."

);

console.log(

    "✓ Hypotheses"

);


/* ======================================================================
 * 12. MITIGATION
 * ====================================================================== */

assert.ok(

    response.mitigation,

    "mitigation ausente."

);

assert.ok(

    Object.hasOwn(response.mitigation, "primary"),

    "mitigation.primary ausente."

);

assert.ok(

    Object.hasOwn(response.mitigation, "secondary"),

    "mitigation.secondary ausente."

);

assert.ok(

    Object.hasOwn(response.mitigation, "actions"),

    "mitigation.actions ausente."

);

assert.ok(

    Array.isArray(response.mitigation.secondary),

    "mitigation.secondary deve ser array."

);

assert.ok(

    Array.isArray(response.mitigation.actions),

    "mitigation.actions deve ser array."

);

console.log(

    "✓ Mitigation"

);


/* ======================================================================
 * 13. HUMAN IMPACT — REMOVIDO
 * ====================================================================== */

assert.equal(

    Object.hasOwn(response, "humanImpact"),

    false,

    "humanImpact não deve existir no contrato atual."

);

console.log(

    "✓ HumanImpact removido"

);


/* ======================================================================
 * 14. ENGINE INTERNO — NÃO PÚBLICO
 * ====================================================================== */

assert.equal(

    Object.hasOwn(response, "engine"),

    false,

    "engine é interno e não deve fazer parte do response oficial."

);

console.log(

    "✓ Engine interno não exposto"

);


/* ======================================================================
 * 15. AUSÊNCIA DE UNDEFINED NO JSON
 * ====================================================================== */

function inspect(value, path = "root") {

    if (value === undefined) {

        throw new Error(

            `undefined encontrado em ${path}`

        );

    }

    if (
        value &&
        typeof value === "object"
    ) {

        for (const [key, child] of Object.entries(value)) {

            inspect(

                child,

                `${path}.${key}`

            );

        }

    }

}


assert.doesNotThrow(

    () => inspect(parsed),

    "JSON contém valor undefined."

);

console.log(

    "✓ JSON sem undefined"

);


/* ======================================================================
 * 16. INTEGRIDADE DOS ARRAYS
 * ====================================================================== */

assert.ok(

    Array.isArray(response.diagnosis.matches),

    "diagnosis.matches inválido."

);

assert.ok(

    Array.isArray(response.evidence.records),

    "evidence.records inválido."

);

assert.ok(

    Array.isArray(response.hypotheses.matches),

    "hypotheses.matches inválido."

);

assert.ok(

    Array.isArray(response.mitigation.actions),

    "mitigation.actions inválido."

);

console.log(

    "✓ Integridade dos arrays"

);


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log("");

console.log(

    "✓ JSON CONTRACT — PASSED"

);

console.log("");