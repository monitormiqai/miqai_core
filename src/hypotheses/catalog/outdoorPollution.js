/**
 * ======================================================================
 * CORE QAI
 * Hypothesis
 * ----------------------------------------------------------------------
 * Arquivo   : outdoorPollution.js
 * Módulo    : Hypotheses
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar a hipótese de influência da poluição atmosférica externa.
 *
 * Esta hipótese é compatível com cenários em que a presença elevada de
 * material particulado pode estar relacionada à infiltração de poluentes
 * provenientes do ambiente externo.
 *
 * Não confirma a origem do material particulado.
 * Não exclui fontes internas de emissão.
 * ======================================================================
 */

const OUTDOOR_POLLUTION = Object.freeze({

    /*
     * Identificador único.
     */

    id: "outdoor_pollution",

    /*
     * Nome interno.
     */

    name: "Outdoor Pollution",

    /*
     * Título para apresentação.
     */

    title: "Possível influência da poluição atmosférica externa",

    /*
     * Descrição técnica.
     */

    description:
        "O conjunto de evidências observado é compatível com a entrada de material particulado proveniente do ambiente externo, embora outras fontes internas também possam explicar os resultados obtidos.",

    /*
     * Referências técnicas.
     */

    referenceIds: [

        "who_aqg_2021",

        "ashrae62_1",

        "abnt_nbr_16401"

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

            ctx.evidence.records.some(

                evidence =>

                    evidence.id === "elevated_particulate"

            )

        );

    }

});

export default OUTDOOR_POLLUTION;