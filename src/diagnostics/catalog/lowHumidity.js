/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : lowHumidity.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 * ======================================================================
 */

export default Object.freeze({

    id: "lowHumidity",

    title: "Umidade relativa reduzida",

    description:
        "Foi observada umidade relativa abaixo da faixa recomendada para o ambiente.",

    priority: 70,

    when(ctx) {

        return (
            ctx.validation?.humidity?.state === "LOW"
        );

    }

});