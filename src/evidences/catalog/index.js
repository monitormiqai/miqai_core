/**
 * ======================================================================
 * CORE QAI
 * Evidence Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : catalog/index.js
 * Módulo    : Evidences
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar todas as evidências disponíveis no CORE QAI.
 *
 * Cada evidência é um módulo independente.
 *
 * Este arquivo apenas organiza e exporta o catálogo oficial.
 * ======================================================================
 */

import normalEnvironment from "./normalEnvironment.js";
import elevatedCo2 from "./elevatedCo2.js";
import elevatedParticulate from "./elevatedParticulate.js";
import thermalDeviation from "./thermalDeviation.js";
import elevatedVoc from "./elevatedVoc.js";
import elevatedNox from "./elevatedNox.js";

/* ======================================================================
 * EVIDENCES CATALOG
 * ====================================================================== */

const EVIDENCES = Object.freeze([

    normalEnvironment,

    elevatedCo2,

    elevatedParticulate,

    thermalDeviation,

    elevatedVoc,

    elevatedNox

]);

export default EVIDENCES;