/**
 * ======================================================================
 * CORE QAI
 * Impact
 * ----------------------------------------------------------------------
 * Identifica impacto ambiental potencial associado à persistência de
 * condições de umidade elevada.
 *
 * O impacto é produzido somente quando a Relationship correspondente
 * foi estabelecida pelo CORE QAI.
 *
 * Não confirma presença de mofo, fungos ou agentes biológicos.
 * ======================================================================
 */

export default Object.freeze({

    id:
        "humidity_related_risk",

    title:
        "Condição ambiental favorável à persistência de umidade",

    status:
        "POSSIBLE",

    description:
        "A combinação ambiental observada pode favorecer a persistência de condições associadas à umidade elevada caso o cenário permaneça.",

    basis:
        "Relationship warm_humid_high_co2 estabelecida pelo CORE QAI.",

    priority:
        70,

    relationshipIds: Object.freeze([

        "warm_humid_high_co2"

    ]),

    scenarioIds: Object.freeze([

        "warm_humid"

    ]),

    diagnosisIds: Object.freeze([]),

    referenceIds: Object.freeze([])

});