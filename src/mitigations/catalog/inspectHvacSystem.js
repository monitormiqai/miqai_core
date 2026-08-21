/**
 * ======================================================================
 * CORE QAI
 * Mitigation
 * ----------------------------------------------------------------------
 * Arquivo   : inspectHvacSystem.js
 * Módulo    : Mitigations
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Recomendar a inspeção do sistema HVAC quando houver indícios
 * de falha operacional capazes de comprometer a qualidade do ar
 * ou o conforto ambiental.
 *
 * Esta mitigação representa uma ação técnica baseada nas hipóteses
 * produzidas pelo CORE QAI.
 *
 * Não realiza validações.
 * Não produz diagnósticos.
 * Não formula hipóteses.
 * ======================================================================
 */

const INSPECT_HVAC_SYSTEM = Object.freeze({

    /*
     * Identificador único.
     */

    id: "inspect_hvac_system",

    /*
     * Nome interno.
     */

    name: "Inspect HVAC System",

    /*
     * Título para apresentação.
     */

    title: "Inspecionar o sistema HVAC",

    /*
     * Descrição técnica.
     */

    description:
        "Recomenda-se inspecionar o sistema de climatização (HVAC), verificando operação dos equipamentos, filtros, dutos, vazão de ar, renovação de ar e condições gerais de manutenção para identificar possíveis falhas que afetem a qualidade do ar interno.",

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

    priority: 80,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return (

            ctx.hypotheses?.matches?.some(

                hypothesis =>

                    hypothesis.id === "hvac_failure"

            )

        );

    }

});

export default INSPECT_HVAC_SYSTEM;