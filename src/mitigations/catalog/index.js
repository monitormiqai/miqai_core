/**
 * ======================================================================
 * CORE QAI
 * Mitigation Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : catalog/index.js
 * Módulo    : Mitigations
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar todas as ações de mitigação disponíveis no CORE QAI.
 *
 * Cada mitigação é um módulo independente.
 *
 * Este arquivo apenas organiza e exporta o catálogo oficial.
 * ======================================================================
 */

import maintainCurrentOperation from "./maintainCurrentOperation.js";
import increaseVentilation from "./increaseVentilation.js";
import reduceOccupancy from "./reduceOccupancy.js";
import inspectHvacSystem from "./inspectHvacSystem.js";
import eliminatePollutionSource from "./eliminatePollutionSource.js";
import useAirPurification from "./useAirPurification.js";

/* ======================================================================
 * MITIGATIONS CATALOG
 * ======================================================================
 */

const MITIGATIONS_CATALOG = Object.freeze([

    maintainCurrentOperation,

    increaseVentilation,

    reduceOccupancy,

    inspectHvacSystem,

    eliminatePollutionSource,

    useAirPurification

]);

export default MITIGATIONS_CATALOG;