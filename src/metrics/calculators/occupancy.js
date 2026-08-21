/**
 * ======================================================================
 * CORE QAI
 * Occupancy Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : occupancy.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular um indicador operacional de ocupação utilizando
 * principalmente o comportamento do CO₂.
 *
 * Este indicador NÃO representa a quantidade real de pessoas.
 * Representa apenas a probabilidade de ocupação influenciar
 * a qualidade do ar.
 *
 * Entrada:
 *      ctx.validation
 *
 * Saída:
 *      {
 *          score,
 *          level,
 *          dominantFactor
 *      }
 * ======================================================================
 */

// ======================================================================
// Validação de disponibilidade
// ======================================================================

function isEvaluated(validation) {

    return (
        validation &&
        validation.state !== "MISSING" &&
        validation.value !== null &&
        validation.value !== undefined
    );

}


export function calculateOccupancy(ctx) {

    const validation = ctx.validation;

    const co2 = validation.co2;

    /*
     * Sem CO₂ disponível não é possível estimar ocupação.
     */

    if (!isEvaluated(co2)) {

        return {

            score: null,

            level: "UNKNOWN",

            dominantFactor: null

        };

    }

    /*
     * Pontuação inicial.
     */

    let score = 100;

    /*
     * Penalização por CO₂ acima do limite.
     */

    if (!co2.passed) {

        score -= 60;

    }

    /*
     * Limites.
     */

    score = Math.max(
        0,
        Math.min(100, score)
    );

    /*
     * Classificação operacional.
     */

    let level;

    if (score >= 90) {

        level = "LOW";

    }

    else if (score >= 70) {

        level = "MODERATE";

    }

    else if (score >= 40) {

        level = "HIGH";

    }

    else {

        level = "VERY_HIGH";

    }

    /*
     * Principal fator.
     */

    const dominantFactor =
        !co2.passed
            ? "co2"
            : null;

    return {

        score,

        level,

        dominantFactor

    };

}