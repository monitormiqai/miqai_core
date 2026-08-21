/**
 * ======================================================================
 * CORE QAI
 * Pipeline
 * ----------------------------------------------------------------------
 * Arquivo   : pipeline.js
 * Módulo    : Core Engine
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Orquestrar a execução oficial do CORE QAI.
 *
 * Este módulo não contém regras ambientais.
 * Não interpreta leituras.
 * Não executa cálculos.
 *
 * Apenas coordena a execução das etapas do pipeline.
 * ======================================================================
 */

import { normalize } from "./normalize.js";
import { buildResponse } from "./responseBuilder.js";

import { resolveDomain } from "../domains/index.js";
import { resolveRegulatory } from "../regulatory/index.js";

import { validate } from "../validation/index.js";
import { calculateMetrics } from "../metrics/index.js";

import DiagnosticLibrary from "../diagnostics/index.js";
import EvidenceLibrary from "../evidences/index.js";
import HypothesisLibrary from "../hypotheses/index.js";
import MitigationLibrary from "../mitigations/index.js";

import resolveReferences
    from "../references/resolver.js";


/* ======================================================================
 * PIPELINE
 * ====================================================================== */

export function executePipeline(ctx) {

    ctx.engine.pipeline = [];

    executeStep(ctx, "normalize", () => {

        normalize(ctx);

    });

    executeStep(ctx, "domain", () => {

        resolveDomain(ctx);

    });

    executeStep(ctx, "regulatory", () => {

        resolveRegulatory(ctx);

    });

    executeStep(ctx, "validation", () => {

        validate(ctx);

    });

    executeStep(ctx, "metrics", () => {

        calculateMetrics(ctx);

    });

    executeStep(ctx, "diagnostic", () => {

        DiagnosticLibrary.execute(ctx);

    });

    executeStep(ctx, "evidence", () => {

        EvidenceLibrary.execute(ctx);

    });

    executeStep(ctx, "hypothesis", () => {

        HypothesisLibrary.execute(ctx);

    });

    executeStep(ctx, "mitigation", () => {

        MitigationLibrary.execute(ctx);

    });

    /*
     * ================================================================
     * REFERENCES
     * ================================================================
     *
     * O Reference Resolver deve executar antes da construção
     * da resposta final.
     *
     * Dessa forma, buildResponse(ctx) recebe o resultado completo
     * da esteira, incluindo as referências normativas e técnicas.
     */

    executeStep(ctx, "references", () => {

        ctx.references =
            resolveReferences(ctx);

    });

    /*
     * ================================================================
     * PROCESSING TIME
     * ================================================================
     *
     * O processamento é finalizado somente depois que todas as
     * etapas analíticas, incluindo References, foram concluídas.
     */

    ctx.engine.finishedAt = Date.now();

    ctx.engine.processingTime =

        ctx.engine.finishedAt -

        ctx.engine.startedAt;

    /*
     * ================================================================
     * RESPONSE
     * ================================================================
     *
     * A resposta é construída por último para que contenha
     * todo o resultado produzido pelo CORE QAI.
     */

    executeStep(ctx, "response", () => {

        buildResponse(ctx);

    });

}


/* ======================================================================
 * PIPELINE STEP
 * ====================================================================== */

function executeStep(ctx, name, fn) {

    ctx.engine.pipeline.push(name);

    fn();

}