/**
 * ======================================================================
 * CORE QAI
 * Hypothesis
 * ----------------------------------------------------------------------
 * Arquivo   : excessiveOccupancy.js
 * Módulo    : Hypotheses
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar a hipótese de ocupação elevada do ambiente.
 *
 * Esta hipótese é compatível com cenários em que a densidade de
 * ocupação estimada pode contribuir para a degradação da qualidade
 * do ar interno e do conforto ambiental.
 *
 * Não confirma o número real de ocupantes.
 * Não substitui medições ou contagens de ocupação.
 * ======================================================================
 */

const EXCESSIVE_OCCUPANCY = Object.freeze({

    /*
     * Identificador único.
     */

    id: "excessive_occupancy",

    /*
     * Nome interno.
     */

    name: "Excessive Occupancy",

    /*
     * Título para apresentação.
     */

    title: "Possível ocupação excessiva do ambiente",

    /*
     * Descrição técnica.
     */

    description:
        "Os indicadores produzidos pelo CORE são compatíveis com uma elevada densidade de ocupação, condição que pode contribuir para o aumento da concentração de CO₂, redução da renovação efetiva do ar e comprometimento da qualidade ambiental.",

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

            ctx.metrics?.occupancy?.level ===
            "VERY_HIGH"

        );

    }

});

export default EXCESSIVE_OCCUPANCY;