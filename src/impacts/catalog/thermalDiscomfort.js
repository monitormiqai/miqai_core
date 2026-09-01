/**
 * ======================================================================
 * CORE QAI
 * Impact
 * ----------------------------------------------------------------------
 * Identifica impacto ambiental potencial associado à relação entre
 * condições térmicas elevadas, umidade elevada e CO₂ elevado.
 *
 * O impacto é produzido somente quando a Relationship correspondente
 * foi estabelecida pelo CORE QAI.
 *
 * Não representa diagnóstico clínico.
 * Não confirma ocorrência.
 * ======================================================================
 */

export default Object.freeze({

    id:
        "thermal_discomfort",

    title:
        "Desconforto térmico",

    status:
        "POSSIBLE",

    description:
        "A combinação ambiental observada pode favorecer desconforto térmico caso as condições permaneçam.",

    basis:
        "Relationship warm_humid_high_co2 estabelecida pelo CORE QAI.",

    priority:
        80,

    relationshipIds: Object.freeze([

        "warm_humid_high_co2"

    ]),

    scenarioIds: Object.freeze([

        "warm_humid"

    ]),

    diagnosisIds: Object.freeze([]),

    referenceIds: Object.freeze([])

});