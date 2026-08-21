/**
 * ======================================================================
 * CORE QAI
 * Evidence
 * ----------------------------------------------------------------------
 * Arquivo   : normalEnvironment.js
 * Módulo    : Evidences
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar evidência de conformidade ambiental quando todos os
 * parâmetros avaliados estiverem em conformidade com os critérios
 * regulatórios aplicáveis.
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
        "Todos os parâmetros avaliados atenderam aos critérios regulatórios aplicáveis ao ambiente analisado.",

    /*
     * Referências técnicas relacionadas.
     */

    referenceIds: [

        "ashrae55",

        "ashrae62_1",

        "abnt_nbr_16401",


    ],

    /*
     * Prioridade.
     */

    priority: 0,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return Object.values(

            ctx.validation

        ).every(

            parameter => parameter.passed

        );

    }

});

export default NORMAL_ENVIRONMENT;