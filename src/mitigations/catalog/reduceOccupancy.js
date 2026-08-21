/**
 * ======================================================================
 * CORE QAI
 * Mitigation
 * ----------------------------------------------------------------------
 * Arquivo   : reduceOccupancy.js
 * Módulo    : Mitigations
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Recomendar a redução da ocupação do ambiente quando houver
 * indícios de superlotação capazes de comprometer a qualidade do
 * ar e o conforto ambiental.
 *
 * Esta mitigação representa uma ação técnica baseada nas hipóteses
 * produzidas pelo CORE QAI.
 *
 * Não realiza validações.
 * Não produz diagnósticos.
 * Não formula hipóteses.
 * ======================================================================
 */

const REDUCE_OCCUPANCY = Object.freeze({

    /*
     * Identificador único.
     */

    id: "reduce_occupancy",

    /*
     * Nome interno.
     */

    name: "Reduce Occupancy",

    /*
     * Título para apresentação.
     */

    title: "Reduzir a ocupação do ambiente",

    /*
     * Descrição técnica.
     */

    description:
        "Recomenda-se reduzir temporariamente a ocupação do ambiente ou redistribuir os ocupantes, adequando a densidade de pessoas à capacidade de ventilação disponível e reduzindo a geração de contaminantes internos.",

    /*
     * Referências técnicas.
     */

    referenceIds: [

        "ashrae62_1",

        "abnt_nbr_16401",


    ],

    /*
     * Prioridade.
     */

    priority: 90,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return (

            ctx.hypotheses?.matches?.some(

                hypothesis =>

                    hypothesis.id === "excessive_occupancy"

            )

        );

    }

});

export default REDUCE_OCCUPANCY;