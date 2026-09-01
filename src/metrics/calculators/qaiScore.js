/**
 * ======================================================================
 * CORE QAI
 * QAI Score Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : qaiScore.js
 * Módulo    : Metrics
 * Versão    : 1.1.0
 * Status    : RC2 - REVISÃO CO2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o QAI Score principal do CORE utilizando os indicadores
 * produzidos pela Metrics Engine e os pesos definidos para o
 * Domain ativo.
 *
 * O QAI Score representa exclusivamente a composição dos indicadores
 * quantitativos definidos para a métrica global.
 *
 * O indicador operacional de ocupação NÃO participa do QAI Score.
 *
 * CO2 permanece disponível para Validation, Evidence, Diagnostics,
 * Hypotheses, Relationships e Mitigations, mas não influencia
 * diretamente ou indiretamente o QAI Score por meio de occupancy.
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

    /*
     * ================================================================
     * COMPONENTES OFICIAIS DO QAI SCORE
     * ================================================================
     *
     * Occupancy foi deliberadamente removido da composição.
     *
     * O indicador occupancy permanece disponível no CORE como
     * indicador operacional auxiliar, mas não participa do cálculo
     * do QAI Score enquanto sua estimativa depender exclusivamente
     * do comportamento do CO2.
     *
     * CO2 também não é componente direto do Score.
     */

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

        if (
            component.weight === null ||
            component.weight === undefined ||
            component.weight <= 0
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

    /*
     * Nenhum componente disponível.
     */

    if (totalWeight === 0) {

        return {

            score: null,

            level: "UNKNOWN",

            dominantFactor: null

        };

    }

    /*
     * ================================================================
     * FATOR DOMINANTE
     * ================================================================
     *
     * Determina o pior indicador somente quando existir um único
     * componente com a menor pontuação.
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

    /*
     * ================================================================
     * SCORE FINAL
     * ================================================================
     *
     * A divisão pelo totalWeight permite a normalização dos pesos
     * efetivamente disponíveis.
     */

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