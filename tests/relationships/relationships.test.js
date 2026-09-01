import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { executePipeline } from "../../src/engine/pipeline.js";

console.log("\n========================================");
console.log("CORE QAI — RELATIONSHIPS");
console.log("========================================\n");


/* ======================================================================
 * 1. RELATIONSHIP SEM CONDIÇÕES COMPATÍVEIS
 * ====================================================================== */

const normalCtx = createContext({

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

executePipeline(normalCtx);

assert.ok(normalCtx.relationships);

assert.equal(
    normalCtx.relationships.primary,
    null,
    "Não deveria existir Relationship em condição normal."
);

assert.deepEqual(
    normalCtx.relationships.secondary,
    [],
    "Secondary deveria estar vazio."
);

assert.deepEqual(
    normalCtx.relationships.matches,
    [],
    "Não deveriam existir Relationships."
);

console.log(
    "✓ Condição normal não gera Relationship"
);


/* ======================================================================
 * 2. CO2 CONTEXTUAL NÃO ELEVADO
 * ====================================================================== */

const contextualCo2Ctx = createContext({

    environment: "corporate",

    reading: {

        temperature: 27,
        humidity: 75,
        co2: 650,

        pm25: 6,
        pm10: 12,
        vocIndex: 90,
        noxIndex: 1

    }

});

executePipeline(contextualCo2Ctx);

assert.equal(
    contextualCo2Ctx.metrics.co2Analysis.elevated,
    false,
    "CO₂ deveria permanecer não elevado neste cenário."
);

assert.equal(
    contextualCo2Ctx.relationships.primary,
    null,
    "CO₂ não elevado não deve ativar Relationship."
);

assert.deepEqual(
    contextualCo2Ctx.relationships.matches,
    [],
    "CO₂ não elevado não deve produzir Relationship."
);

console.log(
    "✓ CO2 contextual não elevado não gera Relationship"
);


/* ======================================================================
 * 3. RELATIONSHIP VÁLIDA
 * ====================================================================== */

const relationshipCtx = createContext({

    environment: "corporate",

    reading: {

        temperature: 27,
        humidity: 75,
        co2: 1200,

        pm25: 6,
        pm10: 12,
        vocIndex: 90,
        noxIndex: 1

    }

});

executePipeline(relationshipCtx);

assert.ok(
    relationshipCtx.relationships
);

assert.ok(
    relationshipCtx.relationships.matches.length > 0,
    "Deveria existir Relationship compatível."
);

assert.equal(
    relationshipCtx.relationships.primary.id,
    "warm_humid_high_co2"
);

assert.ok(
    relationshipCtx.relationships.matches.some(
        relationship =>
            relationship.id === "warm_humid_high_co2"
    )
);

console.log(
    "✓ Condições compatíveis produzem warm_humid_high_co2"
);


/* ======================================================================
 * 4. RELATIONSHIP NÃO É DIAGNÓSTICO
 * ====================================================================== */

assert.equal(
    Object.hasOwn(
        relationshipCtx.relationships.primary,
        "diagnosis"
    ),
    false,
    "Relationship não deve produzir diagnóstico."
);

console.log(
    "✓ Relationship permanece camada independente"
);


/* ======================================================================
 * 5. RELATIONSHIP NÃO PRODUZ HIPÓTESE
 * ====================================================================== */

assert.equal(
    Object.hasOwn(
        relationshipCtx.relationships.primary,
        "hypothesis"
    ),
    false,
    "Relationship não deve produzir hipótese."
);

console.log(
    "✓ Relationship não cria hipótese"
);


/* ======================================================================
 * 6. RELATIONSHIP NÃO PRODUZ MITIGAÇÃO
 * ====================================================================== */

assert.equal(
    Object.hasOwn(
        relationshipCtx.relationships.primary,
        "mitigation"
    ),
    false,
    "Relationship não deve produzir mitigação."
);

console.log(
    "✓ Relationship não cria mitigação"
);


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "\n✓ RELATIONSHIPS — PASSED\n"
);