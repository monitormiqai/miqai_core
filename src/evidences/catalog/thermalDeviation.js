/**
 * ======================================================================
 * CORE QAI
 * Evidence
 * ----------------------------------------------------------------------
 * Arquivo   : thermalDeviation.js
 * Módulo    : Evidences
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar evidência de desvio das condições de conforto térmico,
 * identificada pela Validation Engine.
 *
 * Esta evidência representa exclusivamente um fato observado durante
 * a análise.
 *
 * Não interpreta causas.
 * Não produz diagnósticos.
 * Não formula hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const THERMAL_DEVIATION = Object.freeze({

    /*
     * Identificador único.
     */

    id: "thermal_deviation",

    /*
     * Parâmetros relacionados.
     */

    parameters: [

        "temperature",

        "humidity"

    ],

    /*
     * Título para apresentação.
     */

    title: "Desvio das condições térmicas",

    /*
     * Descrição técnica da evidência.
     */

    description:
        "Foi identificado desvio nos parâmetros de temperatura e/ou umidade em relação aos critérios regulatórios aplicáveis ao ambiente analisado.",

    /*
     * Referências técnicas relacionadas.
     */

    referenceIds: [

        "ashrae55",

        "iso_7730",

        "nr17"

    ],

    /*
     * Prioridade.
     */

    priority: 80,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        const temperature =
            ctx.validation?.temperature;

        const humidity =
            ctx.validation?.humidity;

        const temperatureEvaluated =
            temperature &&
            temperature.state !== "MISSING" &&
            temperature.value !== null &&
            temperature.value !== undefined;

        const humidityEvaluated =
            humidity &&
            humidity.state !== "MISSING" &&
            humidity.value !== null &&
            humidity.value !== undefined;

        return (

            (temperatureEvaluated &&
             temperature.passed === false)

            ||

            (humidityEvaluated &&
             humidity.passed === false)

        );

    }

});

export default THERMAL_DEVIATION;