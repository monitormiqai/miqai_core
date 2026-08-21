/**
 * ======================================================================
 * CORE QAI
 * Diagnosis
 * ----------------------------------------------------------------------
 * Arquivo   : particulatePollution.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar ambientes com indícios de elevada carga de material
 * particulado em suspensão.
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

const PARTICULATE_POLLUTION = Object.freeze({

    /*
     * Identificador único.
     */

    id: "particulate_pollution",

    /*
     * Nome de exibição.
     */

    name: "Elevada Carga de Material Particulado",

    /*
     * Prioridade.
     */

    priority: 80,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        const metrics = ctx.metrics ?? {};

        /*
         * Evidência proveniente das Metrics:
         * carga particulada calculada pelo CORE.
         */

        if (!metrics.particulateLoad) {

            return false;

        }

        return (

            metrics.particulateLoad.level === "MODERATE" ||

            metrics.particulateLoad.level === "POOR"

        );

    }

});

export default PARTICULATE_POLLUTION;