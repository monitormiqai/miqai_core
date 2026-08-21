/**
 * ======================================================================
 * CORE QAI
 * Hypothesis Library
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : Hypotheses
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Executar todas as hipóteses cadastradas na Hypothesis Library.
 *
 * Esta Library:
 *
 *  • Não calcula métricas
 *  • Não executa validações
 *  • Não interpreta normas regulatórias
 *  • Apenas infere as causas mais prováveis com base no Context
 * ======================================================================
 */

import HYPOTHESIS_CATALOG from "./catalog/index.js";

/* ======================================================================
 * HYPOTHESIS LIBRARY
 * ======================================================================
 */

function execute(ctx) {

    const matches = [];

    /*
     * Executa todas as hipóteses.
     */

    for (const hypothesis of HYPOTHESIS_CATALOG) {

        if (hypothesis.when(ctx)) {

            matches.push(hypothesis);

        }

    }

    /*
     * Ordena por prioridade.
     */

    matches.sort(

        (a, b) => b.priority - a.priority

    );

    /*
     * Resultado.
     */

    ctx.hypotheses = {

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