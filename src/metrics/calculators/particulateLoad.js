/**
 * ======================================================================
 * CORE QAI
 * Particulate Load Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : particulateLoad.js
 * Módulo    : Metrics
 * Versão    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o indicador de carga de material particulado utilizando
 * os resultados produzidos pela Validation Engine.
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


// ======================================================================
// CALCULATOR
// ======================================================================

export function calculateParticulateLoad(ctx) {

    const validation =
        ctx.validation;

    const pm25 =
        validation.pm25;

    const pm10 =
        validation.pm10;

    /*
     * Nenhum parâmetro efetivamente disponível.
     *
     * MISSING não representa falha ambiental.
     */

    if (
        !isEvaluated(pm25) &&
        !isEvaluated(pm10)
    ) {

        return {

            score: null,

            level: "UNKNOWN",

            dominantFactor: null

        };

    }

    /*
     * Pontuação inicial
     */

    let score = 100;

    /*
     * PM2.5
     */

    if (
        isEvaluated(pm25) &&
        !pm25.passed
    ) {

        score -= 60;

    }

    /*
     * PM10
     */

    if (
        isEvaluated(pm10) &&
        !pm10.passed
    ) {

        score -= 40;

    }

    /*
     * Limites
     */

    score = Math.max(
        0,
        Math.min(100, score)
    );

    /*
     * Classificação
     */

    let level;

    if (score >= 90) {

        level = "EXCELLENT";

    }

    else if (score >= 75) {

        level = "GOOD";

    }

    else if (score >= 50) {

        level = "MODERATE";

    }

    else {

        level = "POOR";

    }

    /*
     * Principal fator
     */

    let dominantFactor = null;

    if (
        isEvaluated(pm25) &&
        !pm25.passed
    ) {

        dominantFactor = "pm25";

    }

    else if (
        isEvaluated(pm10) &&
        !pm10.passed
    ) {

        dominantFactor = "pm10";

    }

    return {

        score,

        level,

        dominantFactor

    };

}