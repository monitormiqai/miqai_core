/**
 * ======================================================================
 * CORE QAI
 * Diagnostics Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : catalog/index.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar todos os diagnósticos disponíveis no CORE QAI.
 *
 * Cada diagnóstico é um módulo independente.
 *
 * Este arquivo apenas organiza e exporta o catálogo oficial.
 * ======================================================================
 */

import normalEnvironment from "./normalEnvironment.js";

import highCo2 from "./highCo2.js";
import highPm25 from "./highPm25.js";
import highPm10 from "./highPm10.js";
import highVoc from "./highVoc.js";
import highNox from "./highNox.js";
import highTemperature from "./highTemperature.js";
import lowTemperature from "./lowTemperature.js";
import highHumidity from "./highHumidity.js";
import lowHumidity from "./lowHumidity.js";
import highOccupancy from "./highOccupancy.js";

import insufficientVentilation from "./insufficientVentilation.js";
import thermalDiscomfort from "./thermalDiscomfort.js";
import particulatePollution from "./particulatePollution.js";
import poorAirQuality from "./poorAirQuality.js";
import highHealthRisk from "./highHealthRisk.js";

/* ======================================================================
 * DIAGNOSTICS CATALOG
 * ======================================================================
 */

const DIAGNOSTICS = Object.freeze([

    /* ==========================================================
     * DIAGNÓSTICOS BASE
     * ==========================================================
     */

    normalEnvironment,

    /* ==========================================================
     * DIAGNÓSTICOS ATÔMICOS
     * ==========================================================
     */

    highCo2,

    highPm25,

    highPm10,

    highVoc,

    highNox,

    highTemperature,

    lowTemperature,

    highHumidity,

    lowHumidity,

    highOccupancy,

    /* ==========================================================
     * DIAGNÓSTICOS COMPOSTOS
     * ==========================================================
     */

    insufficientVentilation,

    thermalDiscomfort,

    particulatePollution,

    poorAirQuality,

    highHealthRisk

]);

export default DIAGNOSTICS;