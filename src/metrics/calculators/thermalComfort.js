/**
 * ======================================================================
 * CORE QAI
 * Thermal Comfort Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : thermalComfort.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o indicador de conforto térmico utilizando as
 * leituras ambientais e o resultado da Validation Engine.
 *
 * Entrada:
 *      ctx.raw
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

/* ======================================================================
 * VALIDAÇÃO DE DISPONIBILIDADE
 * ====================================================================== */

function isEvaluated(validation) {

    return (
        validation &&
        validation.state !== "MISSING" &&
        validation.value !== null &&
        validation.value !== undefined
    );

}

/* ======================================================================
 * THERMAL COMFORT
 * ====================================================================== */

export function calculateThermalComfort(ctx) {

    const validation =
        ctx.validation;

    const temperature =
        validation.temperature;

    const humidity =
        validation.humidity;

    /*
     * Leituras ausentes
     */

    if (
        !isEvaluated(temperature) ||
        !isEvaluated(humidity)
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
     * Temperatura
     */

    if (!temperature.passed) {

        score -= 30;

    }

    /*
     * Umidade
     */

    if (!humidity.passed) {

        score -= 20;

    }

    /*
     * Limites
     */

    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );

    /*
     * Nível
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
     * Fator dominante
     */

    let dominantFactor = null;

    if (!temperature.passed) {

        dominantFactor = "temperature";

    }

    else if (!humidity.passed) {

        dominantFactor = "humidity";

    }

    return {

        score,

        level,

        dominantFactor

    };

}