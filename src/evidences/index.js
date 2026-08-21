/**
 * ======================================================================
 * CORE QAI
 * Evidence Library
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : Evidences
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Executar todas as evidências cadastradas na Evidence Library.
 *
 * Esta Library:
 *
 * • Não calcula métricas
 * • Não interpreta diagnósticos
 * • Não conhece Regulatory
 * • Apenas registra fatos observados durante a análise
 * ======================================================================
 */

import EVIDENCES from "./catalog/index.js";

/* ======================================================================
 * EVIDENCE LIBRARY
 * ====================================================================== */

function execute(ctx) {

    const records = [];

    /*
     * Executa todas as evidências.
     */

    for (const evidence of EVIDENCES) {

        if (evidence.when(ctx)) {

            records.push(evidence);

        }

    }

    /*
     * Ordena por prioridade.
     */

    records.sort(

        (a, b) => b.priority - a.priority

    );

    /*
     * Resultado.
     */

    ctx.evidence = {

        primary: records[0] ?? null,

        secondary: records.slice(1),

        records

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