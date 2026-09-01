import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { executePipeline } from "../../src/engine/pipeline.js";


/* ======================================================================
 * HELPERS
 * ====================================================================== */

function buildContext(reading = {}) {

    return createContext({

        environment: "corporate",

        reading: {

            temperature: 23,

            humidity: 50,

            co2: 650,

            pm25: 6,

            pm10: 12,

            vocIndex: 90,

            noxIndex: 1,

            ...reading

        }

    });

}


/* ======================================================================
 * HEADER
 * ====================================================================== */

console.log("\n========================================");
console.log("CORE QAI — DIAGNOSTICS + EVIDENCES");
console.log("========================================\n");


/* ======================================================================
 * 1. INTEGRAÇÃO NORMAL
 * ====================================================================== */

{

    const ctx =
        buildContext();

    executePipeline(ctx);

    assert.ok(
        ctx.metrics,
        "Metrics não foi produzido."
    );

    assert.ok(
        ctx.diagnosis,
        "Diagnosis não foi produzido."
    );

    assert.ok(
        ctx.evidence,
        "Evidence não foi produzido."
    );

    console.log(
        "✓ Metrics → Diagnostics → Evidences integrado"
    );

}


/* ======================================================================
 * 2. DIAGNOSTICS NÃO SUBSTITUI EVIDENCES
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    executePipeline(ctx);

    assert.ok(
        ctx.diagnosis,
        "Diagnosis deveria existir."
    );

    assert.ok(
        ctx.evidence,
        "Evidence deveria existir."
    );

    assert.notEqual(
        ctx.diagnosis,
        ctx.evidence,
        "Diagnosis e Evidence não podem compartilhar o mesmo objeto."
    );

    console.log(
        "✓ Diagnostics e Evidences permanecem camadas independentes"
    );

}


/* ======================================================================
 * 3. DIAGNOSTICS NÃO CRIA EVIDENCE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    executePipeline(ctx);

    assert.ok(
        Object.hasOwn(ctx, "diagnosis"),
        "Diagnosis ausente."
    );

    assert.ok(
        Object.hasOwn(ctx, "evidence"),
        "Evidence ausente."
    );

    assert.equal(
        Object.hasOwn(ctx.diagnosis, "evidence"),
        false,
        "Diagnostics não deve criar Evidence dentro da própria camada."
    );

    console.log(
        "✓ Diagnostics não cria camada Evidence"
    );

}


/* ======================================================================
 * 4. EVIDENCE NÃO CRIA DIAGNOSIS
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    executePipeline(ctx);

    assert.equal(
        Object.hasOwn(ctx.evidence, "diagnosis"),
        false,
        "Evidence não deve criar Diagnosis dentro da própria camada."
    );

    console.log(
        "✓ Evidence não cria camada Diagnosis"
    );

}


/* ======================================================================
 * 5. NENHUMA DAS DUAS CAMADAS CRIA CAMADAS POSTERIORES
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    executePipeline(ctx);

    assert.equal(
        Object.hasOwn(ctx.diagnosis, "hypotheses"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.diagnosis, "impact"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.diagnosis, "mitigations"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.evidence, "hypotheses"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.evidence, "impact"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.evidence, "mitigations"),
        false
    );

    console.log(
        "✓ Diagnostics e Evidences não criam camadas analíticas posteriores"
    );

}


/* ======================================================================
 * 6. ORDEM REAL DO PIPELINE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    executePipeline(ctx);

    const pipeline =
        ctx.engine.pipeline;

    const metricsIndex =
        pipeline.indexOf("metrics");

    const diagnosticIndex =
        pipeline.indexOf("diagnostic");

    const evidenceIndex =
        pipeline.indexOf("evidence");

    assert.ok(
        metricsIndex !== -1,
        "Etapa metrics ausente."
    );

    assert.ok(
        diagnosticIndex !== -1,
        "Etapa diagnostic ausente."
    );

    assert.ok(
        evidenceIndex !== -1,
        "Etapa evidence ausente."
    );

    assert.ok(
        metricsIndex <
        diagnosticIndex,
        "Diagnostics deve ocorrer depois de Metrics."
    );

    assert.ok(
        diagnosticIndex <
        evidenceIndex,
        "Evidences deve ocorrer depois de Diagnostics."
    );

    console.log(
        "✓ Ordem Metrics → Diagnostics → Evidences preservada"
    );

}


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "\n✓ DIAGNOSTICS + EVIDENCES — PASSED\n"
);