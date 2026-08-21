/**
 * ======================================================================
 * CORE QAI
 * Mitigation Library
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : Mitigations
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Executar todas as ações de mitigação cadastradas na Mitigation Library.
 *
 * Esta Library:
 *
 *  • Não calcula métricas
 *  • Não executa validações
 *  • Não interpreta normas regulatórias
 *  • Apenas determina as ações recomendadas com base no Context
 * ======================================================================
 */

import MITIGATION_CATALOG from "./catalog/index.js";

/* ======================================================================
 * MITIGATION LIBRARY
 * ======================================================================
 */

function execute(ctx) {

    const matches = [];

    /*
     * Executa todas as mitigações.
     */

    for (const mitigation of MITIGATION_CATALOG) {

        if (mitigation.when(ctx)) {

            matches.push(mitigation);

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

    ctx.mitigation = {

        primary:

            matches[0] ?? null,

        secondary:

            matches.slice(1),

        actions:

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