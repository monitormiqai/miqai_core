/**
 * ======================================================================
 * CORE QAI
 * Hypothesis
 * ----------------------------------------------------------------------
 * Arquivo   : insufficientAirRenewal.js
 * Módulo    : Hypotheses
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar a hipótese de renovação insuficiente do ar.
 *
 * Esta hipótese é compatível com cenários em que as evidências
 * observadas sugerem que a taxa de renovação de ar pode ser inferior
 * à necessária para as condições atuais do ambiente.
 *
 * Não afirma a causa do problema.
 * Não substitui inspeção técnica do sistema de ventilação.
 * ======================================================================
 */

const INSUFFICIENT_AIR_RENEWAL = Object.freeze({

    /*
     * Identificador único.
     */

    id: "insufficient_air_renewal",

    /*
     * Nome interno.
     */

    name: "Insufficient Air Renewal",

    /*
     * Título para apresentação.
     */

    title: "Indícios de renovação insuficiente do ar",

    /*
     * Descrição técnica.
     */

    description:
        "O conjunto de evidências observado é compatível com uma taxa de renovação de ar inferior à recomendada para o ambiente analisado, podendo resultar em acúmulo de contaminantes e elevação da concentração de CO₂.",

    /*
     * Referências técnicas relacionadas.
     */

    referenceIds: [

        "ashrae62_1",

        "abnt_nbr_16401",


    ],

    /*
     * Prioridade.
     */

    priority: 100,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return (

            ctx.diagnosis?.primary?.id ===
            "insufficient_ventilation"

        );

    }

});

export default INSUFFICIENT_AIR_RENEWAL;