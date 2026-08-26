/**
 * ======================================================================
 * CORE QAI
 * Relationship
 * ----------------------------------------------------------------------
 * Identifica a relação entre temperatura elevada, umidade elevada
 * e concentração elevada de CO₂.
 *
 * A relação descreve uma combinação observável de condições.
 *
 * Não estabelece causalidade.
 * Não confirma insuficiência de ventilação.
 * Não representa diagnóstico médico.
 * ======================================================================
 */

const WARM_HUMID_HIGH_CO2 = Object.freeze({

    id: "warm_humid_high_co2",

    title:
        "Temperatura, umidade e CO₂ elevados",

    description:
        "A combinação de temperatura elevada, umidade elevada e concentração elevada de CO₂ constitui uma condição ambiental compatível com possível renovação insuficiente do ar.",

    priority: 100,

    parameters: Object.freeze([

        "temperature",

        "humidity",

        "co2"

    ]),

    diagnosisIds: Object.freeze([

        "insufficient_ventilation"

    ]),

    scenarioIds: Object.freeze([

        "warm_humid"

    ]),

    when(ctx) {

        const validation =
            ctx.validation ?? {};

        const temperature =
            validation.temperature;

        const humidity =
            validation.humidity;

        const co2 =
            validation.co2;

        return (

            temperature?.state === "HIGH" &&

            humidity?.state === "HIGH" &&

            co2?.state === "HIGH"

        );

    }

});

export default WARM_HUMID_HIGH_CO2;