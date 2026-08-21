/**
 * ======================================================================
 * CORE QAI
 * Diagnosis
 * ----------------------------------------------------------------------
 * Arquivo   : thermalDiscomfort.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar ambientes com indícios de desconforto térmico.
 *
 * Este diagnóstico representa exclusivamente uma classificação técnica
 * baseada nas métricas produzidas pelo CORE.
 *
 * Não interpreta normas.
 * Não identifica causas.
 * Não gera evidências.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const THERMAL_DISCOMFORT = Object.freeze({

    /*
     * Identificador único.
     */

    id: "thermal_discomfort",

    /*
     * Nome de exibição.
     */

    name: "Desconforto Térmico",

    /*
     * Prioridade.
     */

    priority: 90,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        const metrics = ctx.metrics ?? {};

        /*
         * Evidência proveniente das Metrics:
         * índice de conforto térmico calculado pelo CORE.
         */

        if (!metrics.thermalComfort) {

            return false;

        }

        return (

            metrics.thermalComfort.level === "MODERATE" ||

            metrics.thermalComfort.level === "POOR"

        );

    }

});

export default THERMAL_DISCOMFORT;