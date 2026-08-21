/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : highHumidity.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 * ======================================================================
 */

export default Object.freeze({

    id: "highHumidity",

    title: "Umidade relativa elevada",

    description:
        "Foi observada umidade relativa acima da faixa recomendada para o ambiente.",

    priority: 70,

    when(ctx) {

        return (
            ctx.validation?.humidity?.state === "HIGH"
        );

    }

});