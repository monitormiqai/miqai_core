/**
 * ======================================================================
 * CORE QAI
 * Analysis API
 * ----------------------------------------------------------------------
 * Arquivo   : analysis.js
 * Módulo    : Core Engine
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Porta de entrada oficial do CORE QAI.
 *
 * Todo consumidor do CORE deve utilizar exclusivamente esta API.
 *
 * Nenhum módulo interno deve ser acessado diretamente.
 *
 * Fluxo:
 *
 * Entrada
 *      ↓
 * Context
 *      ↓
 * Pipeline
 *      ↓
 * Response
 * ======================================================================
 */

import { createContext } from "./context.js";
import { executePipeline } from "./pipeline.js";

/**
 * ======================================================================
 * API PÚBLICA
 * ======================================================================
 */

export function AnalisarQualidadeAmbiental({

    reading,

    environment

}) {

    const ctx = createContext({

        reading,

        environment

    });

    executePipeline(ctx);

    return ctx.response;

}

export default AnalisarQualidadeAmbiental;