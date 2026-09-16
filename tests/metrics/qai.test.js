
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

assert.deepStrictEqual(
    result,
    {
        score: null,
        level: "UNKNOWN",
        dominantFactor: null,
        components: []
    }
);

assert.throws(
    () => calculateQaiScore({}),
    /Domain.*definido/
);

assert.doesNotThrow(
    () => calculateQaiScore({
        domain: { id: "invalid" },
        metrics: {}
    })
);

console.log("✓ Sem componentes válidos → UNKNOWN");
console.log("✓ Domain obrigatório");
console.log("✓ Domain inexistente não usa pesos legados");

console.log("\n✓ QAI SCORE — PASSED\n");
