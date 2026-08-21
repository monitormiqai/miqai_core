/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : highTemperature.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 * ======================================================================
 */

export default Object.freeze({

    id: "highTemperature",

    title: "Temperatura elevada",

    description:
        "Foi observada temperatura acima da faixa recomendada para o ambiente.",

    priority: 70,

    when(ctx) {

        return (
            ctx.validation?.temperature?.state === "HIGH"
        );

    }

});