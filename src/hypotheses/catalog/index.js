/**
 * ======================================================================
 * CORE QAI
 * Hypothesis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : catalog/index.js
 * Módulo    : Hypotheses
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar todas as hipóteses disponíveis no CORE QAI.
 *
 * Cada hipótese é um módulo independente.
 *
 * Este arquivo apenas organiza e exporta o catálogo oficial.
 * ======================================================================
 */

import normalOperation from "./normalOperation.js";
import insufficientAirRenewal from "./insufficientAirRenewal.js";
import excessiveOccupancy from "./excessiveOccupancy.js";
import outdoorPollution from "./outdoorPollution.js";
import hvacFailure from "./hvacFailure.js";
import chemicalContamination from "./chemicalContamination.js";

/* ======================================================================
 * HYPOTHESES CATALOG
 * ======================================================================
 */

const HYPOTHESES_CATALOG = Object.freeze([

    normalOperation,

    insufficientAirRenewal,

    excessiveOccupancy,

    outdoorPollution,

    hvacFailure,

    chemicalContamination

]);

export default HYPOTHESES_CATALOG;