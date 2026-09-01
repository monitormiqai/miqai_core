/**
 * ======================================================================
 * CORE QAI
 * Impacts Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : catalog/index.js
 * Módulo    : Impacts
 * Versão    : V1
 * Status    : V1
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar os impactos ambientais disponíveis no CORE QAI.
 *
 * Este arquivo apenas organiza e exporta o catálogo oficial.
 * ======================================================================
 */

import thermalDiscomfort
    from "./thermalDiscomfort.js";

import humidityRelatedRisk
    from "./humidityRelatedRisk.js";

import biologicalRisk
    from "./biologicalRisk.js";


const IMPACTS = Object.freeze([

    thermalDiscomfort,

    humidityRelatedRisk,

    biologicalRisk

]);


export default IMPACTS;