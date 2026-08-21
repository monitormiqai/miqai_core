/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : highVoc.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 * ======================================================================
 */

export default Object.freeze({

    id: "highVoc",

    title: "Índice elevado de VOC",

    description:
        "Foi observado índice elevado de Compostos Orgânicos Voláteis (VOC) no ambiente.",

    priority: 75,

    when(ctx) {

        return (
            ctx.validation?.vocIndex?.state === "HIGH"
        );

    }

});