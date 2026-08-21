/**
 * ======================================================================
 * CORE QAI
 * Diagnostics Library
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Executar todos os diagnósticos cadastrados na Diagnostics Library.
 *
 * Esta Library:
 *
 *  • Não conhece sensores
 *  • Não conhece Regulatory
 *  • Não calcula métricas
 *  • Apenas interpreta o Context produzido pelo CORE
 * ======================================================================
 */

import DIAGNOSTIC_CATALOG from "./catalog/index.js";

/* ======================================================================
 * DIAGNOSTICS LIBRARY
 * ====================================================================== */

function execute(ctx) {

    const matches = [];

    /*
     * Executa todas as regras.
     */

    for (const diagnosis of DIAGNOSTIC_CATALOG) {

        if (diagnosis.when(ctx)) {

            matches.push(diagnosis);

        }

    }

    /*
     * Ordena por prioridade.
     */

    matches.sort(

        (a, b) => b.priority - a.priority

    );

    /*
     * Resultado
     */

    ctx.diagnosis = {

        primary:

            matches[0] ?? null,

        secondary:

            matches.slice(1),

        matches

    };

    return ctx;

}

/* ======================================================================
 * EXPORTS
 * ======================================================================
 */

export default {

    execute

};