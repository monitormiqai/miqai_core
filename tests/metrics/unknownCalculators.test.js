import assert from "node:assert/strict";
import { calculateThermalComfort } from "../../src/metrics/calculators/thermalComfort.js";
import { calculateAirQuality } from "../../src/metrics/calculators/airQuality.js";
import { calculateParticulateLoad } from "../../src/metrics/calculators/particulateLoad.js";
import { calculateOccupancy } from "../../src/metrics/calculators/occupancy.js";

console.log("\n========================================");
console.log("METRICS — INDICADORES SEM CRITÉRIO ATIVO");
console.log("========================================\n");

const ctx = {
    validation: {
        temperature: { state: "VALID", value: 23 },
        humidity: { state: "VALID", value: 50 },
        co2: { state: "VALID", value: 650 },
        vocIndex: { state: "VALID", value: 90 },
        noxIndex: { state: "VALID", value: 1 },
        pm25: { state: "VALID", value: 6 },
        pm10: { state: "VALID", value: 12 }
    }
};

for (const [name, fn] of [
    ["thermalComfort", calculateThermalComfort],
    ["airQuality", calculateAirQuality],
    ["particulateLoad", calculateParticulateLoad],
    ["occupancy", calculateOccupancy]
]) {
    const result = fn(ctx);
    assert.equal(result.score, null, `${name}: score`);
    assert.equal(result.level, "UNKNOWN", `${name}: level`);
    assert.equal(result.dominantFactor, null, `${name}: dominantFactor`);
}

console.log("✓ Thermal Comfort não inventa score");
console.log("✓ Air Quality não inventa score");
console.log("✓ Particulate Load não inventa score");
console.log("✓ Occupancy não estima ocupação por CO2");
console.log("\n✓ METRICS UNKNOWN — PASSED\n");
