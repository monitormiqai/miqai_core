/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : highPm10.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 * ======================================================================
 */

export default Object.freeze({

    id: "highPm10",

    title: "Concentração elevada de PM10",

    description:
        "A leitura atual de PM10 está acima da referência aplicável. Quando a referência possuir requisito temporal, esta condição não constitui, isoladamente, uma avaliação de conformidade para o período exigido.",

    priority: 80,

    when(ctx) {

        return (
            ctx.validation?.pm10?.currentAssessment === "ABOVE_REFERENCE"
        );

    }

});