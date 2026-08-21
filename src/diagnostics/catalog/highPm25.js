/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : highPm25.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Classificar ambientes que apresentam concentração elevada de
 * material particulado fino (PM2.5).
 *
 * Este diagnóstico representa exclusivamente a classificação técnica
 * do estado ambiental observado.
 *
 * Não identifica causas.
 * Não interpreta normas.
 * Não gera evidências.
 * Não propõe hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

export default Object.freeze({

    /* ==========================================================
     * IDENTIFICAÇÃO
     * ==========================================================
     */

    id: "highPm25",

    title: "Concentração elevada de PM2.5",

    description:
        "Foi observada concentração elevada de material particulado fino (PM2.5) no ambiente.",

    priority: 80,

    /* ==========================================================
     * CRITÉRIO DE ATIVAÇÃO
     * ==========================================================
     */

    when(ctx) {

        return (
            ctx.validation?.pm25?.state === "HIGH"
        );

    }

});