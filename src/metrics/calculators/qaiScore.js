/**
 * ======================================================================
 * CORE QAI
 * QAI Score Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : qaiScore.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o QAI Score principal do CORE utilizando os indicadores
 * produzidos pela Metrics Engine e os pesos definidos para o
 * Domain ativo.
 *
 * Entrada:
 *      ctx.domain
 *      ctx.metrics
 *
 * Saída:
 *      {
 *          score,
 *          level,
 *          dominantFactor
 *      }
 * ======================================================================
 */

import QAI_WEIGHTS from "../config/qaiWeights.js";
import { resolveScoreLevel } from "../utils/scoreLevel.js";

export function calculateQaiScore(ctx) {

    const metrics =
        ctx.metrics || {};

    const domain =
        ctx.domain?.id;

    if (!domain) {

        throw new Error(
            "Domain não definido."
        );

    }

    const weights =
        QAI_WEIGHTS[domain];

    if (!weights) {

        throw new Error(
            `Pesos do Domain '${domain}' não encontrados.`
        );

    }

    let weightedScore = 0;

    let totalWeight = 0;

    const components = [

        {
            name: "thermalComfort",
            score: metrics.thermalComfort?.score,
            weight: weights.thermalComfort
        },

        {
            name: "airQuality",
            score: metrics.airQuality?.score,
            weight: weights.airQuality
        },

        {
            name: "particulateLoad",
            score: metrics.particulateLoad?.score,
            weight: weights.particulateLoad
        },

        {
            name: "occupancy",
            score: metrics.occupancy?.score,
            weight: weights.occupancy
        }

    ];

    let lowestScore = Infinity;

    const validComponents = [];

    for (const component of components) {

        if (
            component.score === null ||
            component.score === undefined
        ) {

            continue;

        }

        validComponents.push(component);

        weightedScore +=
            component.score *
            component.weight;

        totalWeight +=
            component.weight;

        if (component.score < lowestScore) {

            lowestScore =
                component.score;

        }

    }

    if (totalWeight === 0) {

        return {

            score: null,

            level: "UNKNOWN",

            dominantFactor: null

        };

    }

    /*
     * Determina o fator dominante somente
     * quando existir um único pior indicador.
     */

    const worstComponents =
        validComponents.filter(

            component =>
                component.score === lowestScore

        );

    const dominantFactor =
        worstComponents.length === 1
            ? worstComponents[0].name
            : null;

    const score = Math.round(

        weightedScore /
        totalWeight

    );

    return {

        score,

        level:
            resolveScoreLevel(score),

        dominantFactor

    };

}