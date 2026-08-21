/**
 * ======================================================================
 * CORE QAI
 * Constants
 * ----------------------------------------------------------------------
 * Arquivo   : constants.js
 * Módulo    : Core Engine
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Centralizar as constantes globais utilizadas pelo Kernel do CORE QAI.
 *
 * Este arquivo NÃO contém:
 *
 * - Regras regulatórias
 * - Limites ambientais
 * - Scores
 * - Diagnósticos
 * - Hipóteses
 * - Mitigações
 * - Configurações de Domains
 *
 * Toda regra de negócio pertence às respectivas Libraries.
 * ======================================================================
 */

export const CORE_INFO = Object.freeze({

    NAME: "CORE QAI",

    VERSION: "1.0.0",

    API_VERSION: "1.0.0",

    STATUS: "RC1",

    AUTHOR: "Clim Care"

});


/* ======================================================================
 * PIPELINE OFICIAL
 * ====================================================================== */

export const PIPELINE_STEPS = Object.freeze([

    "normalize",

    "domain",

    "regulatory",

    "validation",

    "metrics",

    "diagnostic",

    "evidence",

    "hypothesis",

    "mitigation",

    "response"

]);


/* ======================================================================
 * ENGINE STATUS
 * ====================================================================== */

export const ENGINE_STATUS = Object.freeze({

    SUCCESS: "SUCCESS",

    WARNING: "WARNING",

    ERROR: "ERROR"

});


/* ======================================================================
 * ANALYSIS STATUS
 * ====================================================================== */

export const ANALYSIS_STATUS = Object.freeze({

    OK: "OK",

    PARTIAL: "PARTIAL",

    FAILED: "FAILED"

});


/* ======================================================================
 * VALIDATION STATES
 * ====================================================================== */

export const VALIDATION_STATE = Object.freeze({

    NORMAL: "NORMAL",

    LOW: "LOW",

    HIGH: "HIGH",

    CRITICAL: "CRITICAL",

    MISSING: "MISSING",

    UNKNOWN: "UNKNOWN",

    UNAVAILABLE: "UNAVAILABLE"

});


/* ======================================================================
 * VALIDATION SEVERITY
 * ====================================================================== */

export const VALIDATION_SEVERITY = Object.freeze({

    NORMAL: "NORMAL",

    WARNING: "WARNING",

    CRITICAL: "CRITICAL",

    UNKNOWN: "UNKNOWN"

});