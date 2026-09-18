import assert from "node:assert/strict";
import { createContext } from "../../src/engine/context.js";
import { executePipeline } from "../../src/engine/pipeline.js";

console.log("\n========================================");
console.log("CORE QAI — ENVIRONMENTAL SCENARIOS");
console.log("========================================\n");

const ctx = createContext({
    environment: "corporate",
    reading: {
        temperature: 26.89,
        humidity: 72.65,
        co2: 1189,
        pm25: 1.71,
        pm10: 1.85
    }
});

executePipeline(ctx);

assert.ok(ctx.environmentalScenario);
assert.equal(ctx.environmentalScenario.primary?.id, "warm_humid");

assert.equal(
    ctx.environmentalScenario.primary?.name,
    "Ambiente quente e úmido"
);

assert.equal(
    ctx.environmentalScenario.primary?.title,
    "Ambiente quente e úmido"
);

assert.equal(
    ctx.environmentalScenario.primary?.description,
    "Ambiente em que a temperatura e a umidade relativa estão elevadas em conjunto, caracterizando uma condição quente e úmida."
);

assert.equal(
    ctx.environmentalScenario.primary?.priority,
    80
);

assert.equal(ctx.environmentalScenario.matches.length, 1);
assert.equal(ctx.environmentalScenario.secondary.length, 0);

console.log("✓ Cenário warm_humid identificado");
console.log("✓ ID, name, title e description preservados");
console.log("✓ Prioridade preservada");
console.log("✓ Resultado primary/matches/secondary consistente");
console.log("\n✓ ENVIRONMENTAL SCENARIOS — PASSED\n");
