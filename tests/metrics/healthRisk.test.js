import assert from "node:assert/strict";
import HEALTH_RISK_LEGACY from "../../src/metrics/calculators/healthRisk.js";

console.log("\n========================================");
console.log("HEALTH RISK — LEGACY");
console.log("========================================\n");

assert.equal(HEALTH_RISK_LEGACY.id, "healthRisk");
assert.equal(HEALTH_RISK_LEGACY.status, "LEGACY");
assert.equal(HEALTH_RISK_LEGACY.enabled, false);

console.log("✓ Health Risk marcado como LEGACY");
console.log("✓ Health Risk desabilitado");
console.log("✓ Não participa do fluxo oficial");
console.log("\n✓ HEALTH RISK — PASSED\n");
