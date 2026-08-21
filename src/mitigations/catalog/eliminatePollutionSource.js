/**
 * ======================================================================
 * CORE QAI
 * Mitigation
 * ----------------------------------------------------------------------
 * Arquivo   : eliminatePollutionSource.js
 * Módulo    : Mitigations
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Recomendar a identificação e eliminação da fonte de poluição
 * responsável pela degradação da qualidade do ar interno.
 *
 * Esta mitigação representa uma ação técnica baseada nas hipóteses
 * produzidas pelo CORE QAI.
 *
 * Não realiza validações.
 * Não produz diagnósticos.
 * Não formula hipóteses.
 * ======================================================================
 */

const ELIMINATE_POLLUTION_SOURCE = Object.freeze({

    /*
     * Identificador único.
     */

    id: "eliminate_pollution_source",

    /*
     * Nome interno.
     */

    name: "Eliminate Pollution Source",

    /*
     * Título para apresentação.
     */

    title: "Eliminar ou controlar a fonte de poluição",

    /*
     * Descrição técnica.
     */

    description:
        "Recomenda-se identificar, remover, isolar ou controlar a fonte responsável pela emissão de contaminantes no ambiente, reduzindo a exposição dos ocupantes e restabelecendo a qualidade do ar.",

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

    priority: 70,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return (

            ctx.hypotheses?.matches?.some(

                hypothesis =>

                    hypothesis.id === "chemical_contamination" ||

                    hypothesis.id === "outdoor_pollution"

            )

        );

    }

});

export default ELIMINATE_POLLUTION_SOURCE;