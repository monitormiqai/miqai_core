import assert from "node:assert/strict";
import { createContext } from "../src/engine/context.js";
import { executePipeline } from "../src/engine/pipeline.js";

console.log("\n========================================");
console.log("CORE QAI — PIPELINE ESTRUTURAL");
console.log("========================================\n");

const ctx = createContext({
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

executePipeline(ctx);

const expectedPipeline = [
    "normalize",
    "domain",
    "regulatory",
    "validation",
    "metrics",
    "diagnostic",
    "evidence",
    "hypothesis",
    "mitigation",
    "environmentalScenario",
    "relationships",
    "impacts",
    "references",
    "response"
];

assert.deepEqual(ctx.engine.pipeline, expectedPipeline);
assert.ok(ctx.response);
assert.ok(ctx.metrics);
assert.ok(ctx.diagnosis);
assert.ok(ctx.evidence);
assert.ok(ctx.hypotheses);
assert.ok(ctx.mitigation);
assert.ok(ctx.environmentalScenario);
assert.ok(ctx.relationships);
assert.ok(ctx.impacts);
assert.ok(ctx.references);

assert.equal(Object.hasOwn(ctx, "humanImpact"), false);

console.log("✓ Ordem oficial do pipeline");
console.log("✓ Todas as etapas oficiais executadas");
console.log("✓ Impact permanece como única camada de impacto");
console.log("✓ HumanImpact ausente do Context atual");
console.log("\n✓ PIPELINE — PASSED\n");
