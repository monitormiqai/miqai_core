import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { executePipeline } from "../../src/engine/pipeline.js";


console.log("\n========================================");
console.log("CORE QAI — IMPACTS");
console.log("========================================\n");


/* ======================================================================
 * 1. SEM RELATIONSHIP → SEM IMPACT
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

assert.ok(
    normalCtx.impacts,
    "Impacts deveria existir no Context."
);

assert.equal(
    normalCtx.impacts.primary,
    null,
    "Sem Relationship não deve existir Impact primário."
);

assert.deepEqual(
    normalCtx.impacts.secondary,
    [],
    "Sem Relationship não deve existir Impact secundário."
);

assert.deepEqual(
    normalCtx.impacts.matches,
    [],
    "Sem Relationship não deve existir nenhum Impact."
);

console.log(
    "✓ Sem Relationship não produz Impact"
);


/* ======================================================================
 * 2. RELATIONSHIP VÁLIDA → IMPACTS
 * ====================================================================== */

const impactCtx = createContext({

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

executePipeline(impactCtx);


/* ======================================================================
 * 3. CONFIRMA RELATIONSHIP
 * ====================================================================== */

assert.equal(
    impactCtx.relationships.primary?.id,
    "warm_humid_high_co2",
    "A Relationship esperada não foi produzida."
);

console.log(
    "✓ Relationship de suporte presente"
);


/* ======================================================================
 * 4. IMPACTS EXISTEM
 * ====================================================================== */

assert.ok(
    impactCtx.impacts.matches.length > 0,
    "Relationship válida deveria produzir Impacts compatíveis."
);

console.log(
    "✓ Relationship válida produz Impacts"
);


/* ======================================================================
 * 5. QUANTIDADE ESPERADA
 * ====================================================================== */

assert.equal(
    impactCtx.impacts.matches.length,
    3,
    "A Relationship atual deveria sustentar exatamente três Impacts."
);

console.log(
    "✓ Três Impacts compatíveis identificados"
);


/* ======================================================================
 * 6. PRIMARY POR PRIORIDADE
 * ====================================================================== */

assert.equal(
    impactCtx.impacts.primary.id,
    "thermal_discomfort",
    "thermal_discomfort deveria ser o Impact primário."
);

assert.equal(
    impactCtx.impacts.primary.priority,
    80,
    "Impact primário deveria possuir prioridade 80."
);

console.log(
    "✓ Primary corresponde ao Impact de maior prioridade"
);


/* ======================================================================
 * 7. SECONDARY
 * ====================================================================== */

assert.deepEqual(

    impactCtx.impacts.secondary.map(
        impact => impact.id
    ),

    [
        "humidity_related_risk",
        "biological_environmental_risk"
    ],

    "Secondary não corresponde aos demais Impacts por prioridade."
);

console.log(
    "✓ Secondary contém os demais Impacts ordenados por prioridade"
);


/* ======================================================================
 * 8. MATCHES
 * ====================================================================== */

assert.deepEqual(

    impactCtx.impacts.matches.map(
        impact => impact.id
    ),

    [
        "thermal_discomfort",
        "humidity_related_risk",
        "biological_environmental_risk"
    ],

    "Matches não estão ordenados por prioridade."
);

console.log(
    "✓ Matches ordenados por prioridade"
);


/* ======================================================================
 * 9. VÍNCULO COM RELATIONSHIP
 * ====================================================================== */

for (const impact of impactCtx.impacts.matches) {

    assert.deepEqual(

        impact.relationshipIds,

        [
            "warm_humid_high_co2"
        ],

        `Impact ${impact.id} não está corretamente vinculado à Relationship.`

    );

}

console.log(
    "✓ Todos os Impacts possuem vínculo explícito com a Relationship"
);


/* ======================================================================
 * 10. IMPACT NÃO CRIA DIAGNÓSTICO
 * ====================================================================== */

for (const impact of impactCtx.impacts.matches) {

    assert.equal(
        Object.hasOwn(impact, "diagnosis"),
        false,
        `Impact ${impact.id} não deve criar diagnóstico.`
    );

}

console.log(
    "✓ Impact não cria diagnóstico"
);


/* ======================================================================
 * 11. IMPACT NÃO CRIA HIPÓTESE
 * ====================================================================== */

for (const impact of impactCtx.impacts.matches) {

    assert.equal(
        Object.hasOwn(impact, "hypothesis"),
        false,
        `Impact ${impact.id} não deve criar hipótese.`
    );

}

console.log(
    "✓ Impact não cria hipótese"
);


/* ======================================================================
 * 12. IMPACT NÃO CRIA MITIGAÇÃO
 * ====================================================================== */

for (const impact of impactCtx.impacts.matches) {

    assert.equal(
        Object.hasOwn(impact, "mitigation"),
        false,
        `Impact ${impact.id} não deve criar mitigação.`
    );

}

console.log(
    "✓ Impact não cria mitigação"
);


/* ======================================================================
 * 13. IMPACT NÃO ESTABELECE CAUSALIDADE
 * ====================================================================== */

for (const impact of impactCtx.impacts.matches) {

    assert.equal(
        Object.hasOwn(impact, "causal"),
        false
    );

    assert.equal(
        Object.hasOwn(impact, "causality"),
        false
    );

}

console.log(
    "✓ Impact não estabelece causalidade"
);


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "\n✓ IMPACTS — PASSED\n"
);