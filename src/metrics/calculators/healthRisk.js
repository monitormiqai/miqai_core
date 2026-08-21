/**
 * ======================================================================
 * CORE QAI
 * Health Risk Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : healthRisk.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular um indicador agregado de risco potencial à saúde
 * utilizando os parâmetros críticos identificados durante a
 * Validation Engine.
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

import { resolveScoreLevel } from "../utils/scoreLevel.js";

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
 * HEALTH RISK
 * ====================================================================== */

export function calculateHealthRisk(ctx) {

    const validation = ctx.validation || {};

    const factors = [

        {
            name: "co2",
            result: validation.co2,
            penalty: 30
        },

        {
            name: "pm25",
            result: validation.pm25,
            penalty: 30
        },

        {
            name: "pm10",
            result: validation.pm10,
            penalty: 20
        },

        {
            name: "vocIndex",
            result: validation.vocIndex,
            penalty: 10
        },

        {
            name: "noxIndex",
            result: validation.noxIndex,
            penalty: 10
        }

    ];

    /*
     * Somente parâmetros efetivamente avaliados
     * participam do cálculo.
     */

    const evaluatedFactors =
        factors.filter(
            factor =>
                isEvaluated(factor.result)
        );

    /*
     * Nenhum parâmetro disponível.
     *
     * Sem dados não é possível classificar
     * o risco potencial à saúde.
     */

    if (evaluatedFactors.length === 0) {

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

    let dominantFactor = null;

    let highestPenalty = 0;

    /*
     * Aplicação das penalizações.
     */

    for (const factor of evaluatedFactors) {

        if (factor.result.passed === false) {

            score -= factor.penalty;

            if (
                factor.penalty >
                highestPenalty
            ) {

                highestPenalty =
                    factor.penalty;

                dominantFactor =
                    factor.name;

            }

        }

    }

    /*
     * Limites.
     */

    score = Math.max(
        0,
        Math.min(
            100,
            score
        )
    );

    /*
     * Resultado.
     */

    return {

        score,

        level:
            resolveScoreLevel(score),

        dominantFactor

    };

}