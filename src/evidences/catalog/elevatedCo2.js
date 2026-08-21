/**
 * ======================================================================
 * CORE QAI
 * Evidence
 * ----------------------------------------------------------------------
 * Arquivo   : elevatedCo2.js
 * Módulo    : Evidences
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar evidência de concentração elevada de dióxido de carbono
 * (CO₂), identificada pela Validation Engine.
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

const ELEVATED_CO2 = Object.freeze({

    /*
     * Identificador único.
     */

    id: "elevated_co2",

    /*
     * Parâmetro relacionado.
     */

    parameter: "co2",

    /*
     * Título para apresentação.
     */

    title: "Concentração elevada de CO₂",

    /*
     * Descrição técnica da evidência.
     */

    description:
        "Foi identificada concentração de dióxido de carbono acima do limite regulatório aplicável ao ambiente analisado.",

    /*
     * Referências técnicas relacionadas.
     */

    referenceIds: [

        "ashrae62_1",

        "abnt_nbr_16401"

    ],

    /*
     * Prioridade.
     */

    priority: 100,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        const co2 =
            ctx.validation?.co2;

        const co2Evaluated =
            co2 &&
            co2.state !== "MISSING" &&
            co2.value !== null &&
            co2.value !== undefined;

        return (
            co2Evaluated &&
            co2.passed === false
        );

    }

});

export default ELEVATED_CO2;