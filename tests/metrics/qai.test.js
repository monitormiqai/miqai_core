import assert from "node:assert/strict";
import { calculateQaiScore } from "../../src/metrics/calculators/qaiScore.js";

console.log("\n========================================");
console.log("QAI SCORE — CONTRATO ATUAL");
console.log("========================================\n");

const ctx = {
    domain: { id: "corporate" },
    metrics: {
        thermalComfort: { score: null },
        airQuality: { score: null },
        particulateLoad: { score: null },
        occupancy: { score: null }
    }
};

const result = calculateQaiScore(ctx);

assert.deepEqual(result, {
    score: null,
    level: "UNKNOWN",
    dominantFactor: null
});

assert.throws(
    () => calculateQaiScore({ metrics: {} }),
    /Domain não definido/
);

assert.throws(
    () => calculateQaiScore({
        domain: { id: "invalid" },
        metrics: {}
    }),
    /Pesos do Domain 'invalid' não encontrados/
);

console.log("✓ Sem componentes válidos → UNKNOWN");
console.log("✓ Domain obrigatório");
console.log("✓ Domain inexistente rejeitado");
console.log("\n✓ QAI SCORE — PASSED\n");
