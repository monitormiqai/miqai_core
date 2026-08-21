/**
 * ======================================================================
 * CORE QAI
 * Hypothesis
 * ----------------------------------------------------------------------
 * Arquivo   : normalOperation.js
 * Módulo    : Hypotheses
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar a hipótese de operação normal do ambiente.
 *
 * Esta hipótese é compatível com um cenário em que não foram
 * identificadas não conformidades regulatórias ou evidências que
 * indiquem comprometimento da qualidade do ar interno.
 *
 * Não afirma ausência absoluta de riscos.
 * Apenas representa a hipótese técnica mais compatível com os
 * indicadores observados durante a análise.
 * ======================================================================
 */

const NORMAL_OPERATION = Object.freeze({

    /*
     * Identificador único.
     */

    id: "normal_operation",

    /*
     * Nome interno.
     */

    name: "Normal Operation",

    /*
     * Título para apresentação.
     */

    title: "Operação ambiental compatível com condições normais",

    /*
     * Descrição técnica.
     */

    description:
        "As evidências observadas são compatíveis com condições normais de operação do ambiente, sem indicação de desvios relevantes em relação aos critérios regulatórios avaliados.",

    /*
     * Referências técnicas.
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

        return (

            ctx.diagnosis?.primary?.id ===
            "normal_environment"

        );

    }

});

export default NORMAL_OPERATION;