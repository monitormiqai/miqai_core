/**
 * ======================================================================
 * CORE QAI
 * References Library
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar e disponibilizar todas as referências técnicas e normativas
 * utilizadas pelo CORE QAI.
 *
 * Esta biblioteca apenas organiza e exporta o catálogo oficial
 * de referências.
 *
 * Não executa validações.
 * Não resolve aplicabilidade.
 * Não interpreta diagnósticos.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

import abntNBR16401 from "./catalog/abnt_nbr_16401.js";
import abntNBR17037 from "./catalog/abnt_nbr_17037.js";

import ashrae55 from "./catalog/ashrae55.js";
import ashrae62_1 from "./catalog/ashrae62_1.js";

import iso7730 from "./catalog/iso_7730.js";

import nr17 from "./catalog/nr17.js";

import sensirionNox from "./catalog/sensirion_nox.js";
import sensirionVoc from "./catalog/sensirion_voc.js";

import whoAQG2021 from "./catalog/who_aqg_2021.js";

/* ======================================================================
 * REFERENCE CATALOG
 * ======================================================================
 */

const REFERENCE_CATALOG = Object.freeze([

    abntNBR16401,

    abntNBR17037,

    ashrae55,

    ashrae62_1,

    iso7730,

    nr17,

    sensirionNox,

    sensirionVoc,

    whoAQG2021

]);

/* ======================================================================
 * EXPORT
 * ======================================================================
 */

export default REFERENCE_CATALOG;