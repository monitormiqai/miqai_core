/**
 * ======================================================================
 * CORE QAI
 * Diagnosis
 * ----------------------------------------------------------------------
 * Arquivo   : normalEnvironment.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar ambientes que apresentam condições adequadas de
 * qualidade do ar interno e conforto ambiental.
 *
 * Este diagnóstico representa a ausência de não conformidades
 * identificadas pela Validation Engine.
 *
 * Não identifica causas.
 * Não interpreta normas.
 * Não gera evidências.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const NORMAL_ENVIRONMENT = Object.freeze({

    /*
     * Identificador único.
     */

    id: "normal_environment",

    /*
     * Nome de exibição.
     */

    name: "Ambiente em Condições Normais",

    /*
     * Prioridade.
     *
     * Como representa a ausência de condições relevantes,
     * possui a menor prioridade da biblioteca.
     */

    priority: 0,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        const validation = ctx.validation ?? {};

        /*
         * Todas as validações regulatórias devem estar aprovadas.
         */

        for (const parameter of Object.values(validation)) {

            if (!parameter?.passed) {

                return false;

            }

        }

        return true;

    }

});

export default NORMAL_ENVIRONMENT;