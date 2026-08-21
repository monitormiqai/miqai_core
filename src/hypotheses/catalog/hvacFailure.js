/**
 * ======================================================================
 * CORE QAI
 * Hypothesis
 * ----------------------------------------------------------------------
 * Arquivo   : hvacFailure.js
 * Módulo    : Hypotheses
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar a hipótese de desempenho inadequado do sistema HVAC.
 *
 * Esta hipótese é compatível com cenários em que os indicadores
 * ambientais sugerem que o sistema de climatização pode não estar
 * mantendo as condições de conforto previstas para o ambiente.
 *
 * Não confirma falha do equipamento.
 * Não substitui inspeção ou manutenção técnica.
 * ======================================================================
 */

const HVAC_FAILURE = Object.freeze({

    /*
     * Identificador único.
     */

    id: "hvac_failure",

    /*
     * Nome interno.
     */

    name: "HVAC Failure",

    /*
     * Título para apresentação.
     */

    title: "Possível desempenho inadequado do sistema HVAC",

    /*
     * Descrição técnica.
     */

    description:
        "O conjunto de evidências observado é compatível com desempenho insuficiente do sistema de climatização, podendo estar relacionado a falhas de operação, controle, manutenção ou capacidade de condicionamento do ambiente.",

    /*
     * Referências técnicas.
     */

    referenceIds: [

        "ashrae55",

        "abnt_nbr_16401",


    ],

    /*
     * Prioridade.
     */

    priority: 70,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return (

            ctx.diagnosis?.primary?.id ===
            "thermal_discomfort"

        );

    }

});

export default HVAC_FAILURE;