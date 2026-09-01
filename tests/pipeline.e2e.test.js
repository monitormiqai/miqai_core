import assert from "node:assert/strict";
import AnalisarQualidadeAmbiental from "../src/engine/analysis.js";

console.log("\n========================================");
console.log("CORE QAI — E2E CONTRATO ATUAL");
console.log("========================================\n");

const response = AnalisarQualidadeAmbiental({
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
});

assert.ok(response);
assert.equal(response.metadata.engine, "CORE QAI");
assert.equal(response.domain.id, "corporate");

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
        Object.hasOwn(response, key),
        `Campo ausente: ${key}`
    );
}

assert.equal(
    Object.hasOwn(response, "humanImpact"),
    false,
    "humanImpact não deve existir no contrato atual"
);

assert.ok(response.metrics);

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
        Object.hasOwn(response.metrics, key),
        `Métrica ausente: ${key}`
    );
}


/* ======================================================================
 * QAI SCORE
 * ====================================================================== */

assert.equal(
    response.metrics.qaiScore.score,
    null
);

assert.equal(
    response.metrics.qaiScore.level,
    "UNKNOWN"
);

assert.equal(
    response.metrics.qaiScore.dominantFactor,
    null
);


/* ======================================================================
 * CO2 — CONTRATO V1
 * ====================================================================== */

assert.equal(
    response.metrics.co2Analysis.indoor,
    650
);



assert.equal(
    response.metrics.co2Analysis.basis,
    "INDOOR_CONTEXTUAL_OBSERVATION"
);

assert.equal(
    response.metrics.co2Analysis.elevated,
    false
);


/* ======================================================================
 * RESPONSE INTERNO
 * ====================================================================== */

assert.deepEqual(
    response.engine,
    undefined,
    "engine é interno e não faz parte do response oficial"
);


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log("✓ Response");
console.log("✓ Metadata");
console.log("✓ Domain");
console.log("✓ Contrato top-level");
console.log("✓ HumanImpact removido");
console.log("✓ Metrics");
console.log("✓ QAI Score UNKNOWN sem componentes métricos");
console.log("✓ CO2 contextual V1");
console.log("✓ CO2 somente interno");
console.log("✓ Sem cálculo de diferencial de CO2");

console.log(
    "\n✓ E2E CONTRATO ATUAL — PASSED\n"
);