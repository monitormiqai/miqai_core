/**
 * ======================================================================
 * CORE QAI
 * Evidence
 * ----------------------------------------------------------------------
 * Arquivo   : normalEnvironment.js
 * Módulo    : Evidences
 * Versão    : 1.1.0
 * Status    : RC2 - CORREÇÃO CO2 OBSERVATION
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar evidência de conformidade ambiental quando todos os
 * parâmetros regulados e avaliáveis estiverem em conformidade com
 * os critérios aplicáveis ao ambiente analisado.
 *
 * Parâmetros observacionais não impedem esta evidência, pois não
 * representam critérios de conformidade.
 *
 * Esta evidência representa exclusivamente um fato observado durante
 * a análise.
 *
 * Não interpreta causas.
 * Não produz diagnósticos.
 * Não formula hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const NORMAL_ENVIRONMENT = Object.freeze({

    /*
     * Identificador único.
     */

    id: "normal_environment",

    /*
     * Evidência composta.
     */

    parameters: "all",

    /*
     * Título para apresentação.
     */

    title: "Ambiente em conformidade",

    /*
     * Descrição técnica da evidência.
     */

    description:
        "Nenhuma condição de desvio foi identificada entre os parâmetros avaliados no cenário atual. Parâmetros não avaliáveis ou observacionais não são interpretados como conformidade regulatória.",

    /*
     * Referências técnicas relacionadas.
     */

    referenceIds: [

        "ashrae55",

        "ashrae62_1",

        "abnt_nbr_16401"

    ],

    /*
     * Prioridade.
     */

    priority: 0,

    /*
     * Critério de ativação.
     *
     * Parâmetros observacionais, como CO2 no contrato atual,
     * não participam da determinação de conformidade.
     *
     * Somente parâmetros regulados são considerados.
     */

    when(ctx) {

        const validation =
            ctx.validation ?? {};

        const parameters =
            Object.values(validation);

        /*
         * Sem parâmetros de validação, não é possível afirmar
         * conformidade.
         */

        if (parameters.length === 0) {

            return false;

        }

        /*
         * Todos os parâmetros regulados devem estar aprovados.
         */

        const regulatedParameters =
            parameters.filter(
                parameter =>
                    parameter?.regulated === true
            );

        const regulatedAreCompliant =
            regulatedParameters.every(
                parameter =>
                    parameter.passed === true
            );

        const noObservedDeviation =
            parameters.every(
                parameter =>
                    parameter?.currentAssessment !== "ABOVE_REFERENCE" &&
                    parameter?.currentAssessment !== "BELOW_REFERENCE"
            );

        return regulatedAreCompliant && noObservedDeviation;

    }

});

export default NORMAL_ENVIRONMENT;