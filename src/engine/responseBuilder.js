/**
 * ======================================================================
 * CORE QAI
 * Response Builder
 * ----------------------------------------------------------------------
 * Arquivo   : responseBuilder.js
 * Módulo    : Core Engine
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Construir a resposta oficial do CORE QAI.
 *
 * Este módulo não executa cálculos.
 * Não interpreta resultados.
 * Não aplica regras.
 *
 * Apenas organiza a saída produzida pelos módulos do CORE.
 * ======================================================================
 */

import {
    CORE_INFO,
    ANALYSIS_STATUS
} from "./constants.js";

/* ======================================================================
 * RESPONSE BUILDER
 * ======================================================================
 */

export function buildResponse(ctx) {

    /*
     * O processingTime é conhecido somente após a execução
     * completa do pipeline.
     */

    const processingTime =

        Date.now() -

        ctx.engine.startedAt;

    ctx.engine.finishedAt = Date.now();

    ctx.engine.processingTime = processingTime;

    ctx.response = Object.freeze({

        /* ==========================================================
         * METADATA
         * ========================================================== */

        metadata: Object.freeze({

            engine: CORE_INFO.NAME,

            version: CORE_INFO.VERSION,

            apiVersion: CORE_INFO.API_VERSION,

            status: ANALYSIS_STATUS.OK,

            environment: ctx.environment,

            timestamp: new Date().toISOString(),

            processingTime

        }),

        /* ==========================================================
         * DOMAIN
         * ========================================================== */

        domain: ctx.domain,

        /* ==========================================================
         * VALIDATION
         * ========================================================== */

        validation: ctx.validation,

        /* ==========================================================
         * METRICS
         * ========================================================== */

        metrics: ctx.metrics,

        /* ==========================================================
         * DIAGNOSIS
         * ========================================================== */

        diagnosis: ctx.diagnosis,

        /* ==========================================================
         * EVIDENCE
         * ========================================================== */

        evidence: ctx.evidence,

        /* ==========================================================
         * HYPOTHESES
         * ========================================================== */

        hypotheses: ctx.hypotheses,

        /* ==========================================================
         * MITIGATION
         * ========================================================== */

        mitigation: ctx.mitigation,

        /* ==========================================================
         * REFERENCES
         * ========================================================== */

        references: ctx.references

    });

    return ctx.response;

}