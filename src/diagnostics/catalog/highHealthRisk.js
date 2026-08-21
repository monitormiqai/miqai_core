/**
 * ======================================================================
 * CORE QAI
 * Diagnosis
 * ----------------------------------------------------------------------
 * Arquivo   : highHealthRisk.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar ambientes que apresentam elevado risco potencial
 * à saúde dos ocupantes.
 *
 * O diagnóstico interpreta exclusivamente a métrica Health Risk
 * produzida pela Metrics Engine.
 * ======================================================================
 */

const HIGH_HEALTH_RISK = Object.freeze({

    /**
     * Identificador único.
     */
    id: "high_health_risk",

    /**
     * Nome de exibição.
     */
    name: "High Health Risk",

    /**
     * Prioridade.
     */
    priority: 95,

    /**
     * Executa a regra.
     */
    when(ctx) {

        const metrics =
            ctx.metrics;

        if (!metrics?.healthRisk) {

            return false;

        }

        return (

            metrics.healthRisk.level === "MODERATE" ||

            metrics.healthRisk.level === "POOR"

        );

    }

});

export default HIGH_HEALTH_RISK;