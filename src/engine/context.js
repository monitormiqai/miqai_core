/**
 * ======================================================================
 * CORE QAI
 * Context Factory
 * ----------------------------------------------------------------------
 * Arquivo   : context.js
 * Módulo    : Core Engine
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Criar o Context oficial utilizado durante toda a execução do
 * CORE QAI.
 *
 * O Context é o único objeto compartilhado entre todos os módulos
 * do pipeline.
 *
 * Nenhum Engine deve criar estruturas próprias de processamento.
 *
 * Todo o estado da análise reside exclusivamente neste objeto.
 * ======================================================================
 */

import { CORE_INFO } from "./constants.js";

export function createContext({

    reading = {},

    environment = null

} = {}) {

    return {

        /* ==========================================================
         * ENGINE
         * ========================================================== */

        engine: {

            name: CORE_INFO.NAME,

            version: CORE_INFO.VERSION,

            apiVersion: CORE_INFO.API_VERSION,

            status: CORE_INFO.STATUS,

            startedAt: Date.now(),

            finishedAt: null,

            processingTime: 0,

            pipeline: []

        },

        /* ==========================================================
         * CONTEXTO OPERACIONAL
         * ========================================================== */

        environment,

        domain: null,

        /* ==========================================================
         * ENTRADA NORMALIZADA
         * ========================================================== */

        raw: reading,

        /* ==========================================================
         * REGULATORY
         * ========================================================== */

        regulatory: {},

        /* ==========================================================
         * VALIDAÇÃO
         * ========================================================== */

        validation: {

            parameters: {}

        },

        /* ==========================================================
         * MÉTRICAS
         * ========================================================== */

        metrics: {},

        /* ==========================================================
         * DIAGNÓSTICO
         * ========================================================== */

        diagnosis: {

            primary: null,

            secondary: [],

            matches: []

        },

        /* ==========================================================
         * EVIDÊNCIAS
         * ========================================================== */

        evidence: {

            records: []

        },

        /* ==========================================================
         * HIPÓTESES
         * ========================================================== */

        hypotheses: {

            primary: null,

            secondary: [],

            matches: []

        },

        /* ==========================================================
         * MITIGAÇÕES
         * ========================================================== */

        mitigation: {

            primary: null,

            secondary: [],

            actions: []

        },
        /* ==========================================================
        * REFERÊNCIAS
        * ========================================================== */

        references: {

            primary: null,

            secondary: [],

            matches: []

        },
        /* ==========================================================
         * RESPOSTA
         * ========================================================== */

        response: {}

    };

}