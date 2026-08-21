/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : lowTemperature.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 * ======================================================================
 */

export default Object.freeze({

    id: "lowTemperature",

    title: "Temperatura reduzida",

    description:
        "Foi observada temperatura abaixo da faixa recomendada para o ambiente.",

    priority: 70,

    when(ctx) {

        return (
            ctx.validation?.temperature?.state === "LOW"
        );

    }

});