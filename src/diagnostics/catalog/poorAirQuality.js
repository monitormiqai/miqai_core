/**
 * ======================================================================
 * CORE QAI
 * Diagnosis
 * ----------------------------------------------------------------------
 * Arquivo   : poorAirQuality.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar ambientes com indícios de comprometimento da qualidade
 * do ar interno.
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

const POOR_AIR_QUALITY = Object.freeze({

    /*
     * Identificador único.
     */

    id: "poor_air_quality",

    /*
     * Nome de exibição.
     */

    name: "Qualidade do Ar Comprometida",

    /*
     * Prioridade.
     */

    priority: 85,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        const metrics = ctx.metrics ?? {};

        /*
         * Evidência proveniente das Metrics:
         * índice de qualidade do ar calculado pelo CORE.
         */

        if (!metrics.airQuality) {

            return false;

        }

        return (

            metrics.airQuality.level === "MODERATE" ||

            metrics.airQuality.level === "POOR"

        );

    }

});

export default POOR_AIR_QUALITY;