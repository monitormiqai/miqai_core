import assert from "node:assert/strict";
import { calculateDewPoint } from "../../src/metrics/calculators/dewPoint.js";

console.log("\n========================================");
console.log("DEW POINT — CONTRATO ATUAL");
console.log("========================================\n");

const result = calculateDewPoint({
    validation: {
        temperature: { state: "VALID", value: 23 },
        humidity: { state: "VALID", value: 50 }
    }
});

assert.equal(result.value, 12);
assert.equal(result.unit, "°C");
assert.equal(result.airToDewPointDifference, 11);

const missing = calculateDewPoint({
    validation: {
        temperature: { state: "MISSING", value: null },
        humidity: { state: "VALID", value: 50 }
    }
});

assert.equal(missing.value, null);
assert.equal(missing.airToDewPointDifference, null);

const invalidHumidity = calculateDewPoint({
    validation: {
        temperature: { state: "VALID", value: 23 },
        humidity: { state: "VALID", value: 101 }
    }
});

assert.equal(invalidHumidity.value, null);

console.log("✓ Magnus-Tetens");
console.log("✓ Dados ausentes tratados");
console.log("✓ Umidade fisicamente inválida tratada");
console.log("\n✓ DEW POINT — PASSED\n");
