/**
 * ======================================================================
 * CORE QAI
 * Mitigation
 * ----------------------------------------------------------------------
 * Arquivo   : increaseVentilation.js
 * Módulo    : Mitigations
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Recomendar o aumento da renovação de ar quando houver indícios
 * de ventilação insuficiente no ambiente.
 *
 * Esta mitigação representa uma ação técnica baseada nas hipóteses
 * produzidas pelo CORE QAI.
 *
 * Não realiza validações.
 * Não produz diagnósticos.
 * Não formula hipóteses.
 * ======================================================================
 */

const INCREASE_VENTILATION = Object.freeze({

    /*
     * Identificador único.
     */

    id: "increase_ventilation",

    /*
     * Nome interno.
     */

    name: "Increase Ventilation",

    /*
     * Título para apresentação.
     */

    title: "Aumentar a renovação de ar",

    /*
     * Descrição técnica.
     */

    description:
        "Recomenda-se aumentar a taxa de renovação de ar por meio da ventilação natural ou mecânica, assegurando vazão compatível com a ocupação do ambiente e reduzindo a concentração de contaminantes internos.",

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

    priority: 100,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return (

            ctx.hypotheses?.primary?.id ===
            "insufficient_air_renewal"

        );

    }

});

export default INCREASE_VENTILATION;