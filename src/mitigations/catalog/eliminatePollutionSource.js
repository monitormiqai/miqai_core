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

    name: "Investigate and control suspected source",

    /*
     * Título para apresentação.
     */

    title: "Investigar e controlar fonte suspeita de particulado ou contaminação",

    /*
     * Descrição técnica.
     */

    description:
        "Quando houver material particulado elevado ou sinais compatíveis com contaminação, recomenda-se investigar a origem do material e, se houver indicação, controlar ou isolar a fonte suspeita. A presença de uma fonte externa não é determinada por esta hipótese isoladamente.",

    /*
     * Referências técnicas.
     */

    referenceIds: [

        "ashrae62_1"

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