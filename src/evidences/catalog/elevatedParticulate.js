/**
 * ======================================================================
 * CORE QAI
 * Evidence
 * ----------------------------------------------------------------------
 * Arquivo   : elevatedParticulate.js
 * Módulo    : Evidences
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar evidência de concentração elevada de material particulado
 * (PM2.5 e/ou PM10), identificada pela Validation Engine.
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

const ELEVATED_PARTICULATE = Object.freeze({

    /*
     * Identificador único.
     */

    id: "elevated_particulate",

    /*
     * Parâmetros relacionados.
     */

    parameters: [

        "pm25",

        "pm10"

    ],

    /*
     * Título para apresentação.
     */

    title: "Concentração elevada de material particulado",

    /*
     * Descrição técnica da evidência.
     */

    description:
        "Foi identificada concentração elevada de material particulado fino (PM2.5) e/ou particulado inalável (PM10) acima dos limites regulatórios aplicáveis.",

    /*
     * Referências técnicas relacionadas.
     */

    referenceIds: [

        "who_aqg_2021",

        "abnt_nbr_16401"

    ],

    /*
     * Prioridade.
     */

    priority: 90,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        const pm25 =
            ctx.validation?.pm25;

        const pm10 =
            ctx.validation?.pm10;

        const pm25Evaluated =
            pm25 &&
            pm25.state !== "MISSING" &&
            pm25.value !== null &&
            pm25.value !== undefined;

        const pm10Evaluated =
            pm10 &&
            pm10.state !== "MISSING" &&
            pm10.value !== null &&
            pm10.value !== undefined;

        return (

            (pm25Evaluated && pm25.passed === false)

            ||

            (pm10Evaluated && pm10.passed === false)

        );

    }

});

export default ELEVATED_PARTICULATE;