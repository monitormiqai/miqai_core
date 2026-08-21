/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : highCo2.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Classificar ambientes que apresentam concentração elevada de CO₂.
 *
 * Este diagnóstico representa apenas a classificação técnica do estado
 * ambiental observável.
 *
 * Não identifica causas.
 * Não interpreta normas.
 * Não gera evidências.
 * Não propõe hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

export default Object.freeze({

    id: "highCo2",

    title: "Concentração elevada de CO₂",

    description:
        "Foi observada concentração elevada de dióxido de carbono no ambiente.",

    priority: 80,

    when(ctx) {

        return (
            ctx.validation?.co2?.state === "HIGH"
        );

    }

});