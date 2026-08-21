/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : highNox.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 * ======================================================================
 */

export default Object.freeze({

    id: "highNox",

    title: "Índice elevado de NOx",

    description:
        "Foi observado índice elevado de óxidos de nitrogênio (NOx) no ambiente.",

    priority: 75,

    when(ctx) {

        return (
            ctx.validation?.noxIndex?.state === "HIGH"
        );

    }

});