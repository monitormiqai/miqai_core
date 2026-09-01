/**
 * ======================================================================
 * CORE QAI
 * Impact
 * ----------------------------------------------------------------------
 * Identifica impacto ambiental potencial associado à persistência
 * de condições ambientais de temperatura e umidade elevadas.
 *
 * O impacto representa uma possibilidade ambiental.
 * Não confirma presença de mofo, fungos, bactérias ou alérgenos.
 *
 * O impacto é produzido somente quando a Relationship correspondente
 * foi estabelecida pelo CORE QAI.
 * ======================================================================
 */

export default Object.freeze({

    id:
        "biological_environmental_risk",

    title:
        "Condição ambiental potencialmente favorável a agentes biológicos",

    status:
        "POSSIBLE",

    description:
        "A combinação das condições ambientais observadas pode favorecer determinados cenários associados à umidade e a agentes biológicos caso essas condições permaneçam, sem confirmar sua presença.",

    basis:
        "Relationship warm_humid_high_co2 estabelecida pelo CORE QAI.",

    priority:
        60,

    relationshipIds: Object.freeze([

        "warm_humid_high_co2"

    ]),

    scenarioIds: Object.freeze([

        "warm_humid"

    ]),

    diagnosisIds: Object.freeze([]),

    referenceIds: Object.freeze([])

});