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
        "Foi observada concentração elevada de material particulado inalável (PM10) no ambiente.",

    priority: 80,

    when(ctx) {

        return (
            ctx.validation?.pm10?.state === "HIGH"
        );

    }

});