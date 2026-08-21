/**
 * ======================================================================
 * CORE QAI
 * Air Quality Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : airQuality.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o indicador de qualidade do ar utilizando os parâmetros
 * químicos disponíveis.
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


export function calculateAirQuality(ctx) {

    const validation = ctx.validation;

    const co2 = validation.co2;
    const voc = validation.vocIndex;
    const nox = validation.noxIndex;

    /*
     * Nenhum parâmetro disponível
     */

    if (
        !isEvaluated(co2) &&
        !isEvaluated(voc) &&
        !isEvaluated(nox)
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
     * CO₂
     */

    if (
        isEvaluated(co2) &&
        !co2.passed
    ) {

        score -= 40;

    }

    /*
     * VOC
     */

    if (
        isEvaluated(voc) &&
        !voc.passed
    ) {

        score -= 30;

    }

    /*
     * NOx
     */

    if (
        isEvaluated(nox) &&
        !nox.passed
    ) {

        score -= 30;

    }

    /*
     * Limites
     */

    score = Math.max(
        0,
        Math.min(100, score)
    );

    /*
     * Classificação padronizada
     */

    const level =
        resolveScoreLevel(score);

    /*
     * Principal fator
     */

    let dominantFactor = null;

    if (
        isEvaluated(co2) &&
        !co2.passed
    ) {

        dominantFactor = "co2";

    }

    else if (
        isEvaluated(voc) &&
        !voc.passed
    ) {

        dominantFactor = "vocIndex";

    }

    else if (
        isEvaluated(nox) &&
        !nox.passed
    ) {

        dominantFactor = "noxIndex";

    }

    return {

        score,

        level,

        dominantFactor

    };

}