/**
 * ======================================================================
 * CORE QAI
 * QAI Score Calculator
 * ----------------------------------------------------------------------
 * Versão   : 3.0.0
 * Status   : RC - SCORE V1
 *
 * QAI Score V1 = fotografia quantitativa da condição ambiental atual.
 *
 * Universo oficial:
 *   temperature
 *   humidity
 *   pm25
 *   pm10
 *
 * Regulatory e Score permanecem independentes.
 *
 * Regulatory:
 *   PM2.5 / PM10 → avaliação temporal própria, incluindo 24h_mean
 *
 * Score:
 *   PM2.5 / PM10 → leitura instantânea atual
 *
 * Este módulo:
 * - NÃO define thresholds;
 * - NÃO define referências;
 * - NÃO interpreta regulamentação;
 * - NÃO cria critérios;
 * - NÃO produz diagnóstico;
 * - NÃO produz evidência;
 * - NÃO produz hipótese;
 * - NÃO produz mitigação.
 *
 * O conhecimento do Score define a curva.
 * A normalização calcula o índice.
 * ======================================================================
 */

import QAI_SCORE_PARAMETERS
    from "../config/qaiScoreParameters.js";

import QAI_SCORE_KNOWLEDGE
    from "../config/qaiScoreKnowledge.js";

import {
    validateQaiScoreParameter
} from "../validators/qaiScoreValidation.js";

import {
    normalizePiecewise,
    weightedGeometricMean
} from "../utils/scoreNormalization.js";

import {
    resolveScoreLevel
} from "../utils/scoreLevel.js";


/**
 * ----------------------------------------------------------------------
 * COMPONENTES
 * ----------------------------------------------------------------------
 *
 * O valor ambiental é obtido da Validation.
 *
 * O Score não utiliza metric.score, pois os índices de Score são
 * calculados aqui a partir do valor validado + Score Knowledge.
 * ----------------------------------------------------------------------
 */
function getScoreComponents(ctx) {

    const components = [];

    for (const parameter of QAI_SCORE_PARAMETERS) {

        const scoreValidation =
            validateQaiScoreParameter(
                ctx,
                parameter
            );

        if (!scoreValidation.eligible) {
            continue;
        }

        const knowledge =
            QAI_SCORE_KNOWLEDGE[parameter];

        if (!knowledge) {
            continue;
        }

        const validation =
            ctx?.validation?.[parameter];

        if (!validation) {
            continue;
        }

        const value =
            validation.value;

        if (
            value === null ||
            value === undefined ||
            !Number.isFinite(value)
        ) {
            continue;
        }

        const points =
            knowledge.normalization?.points;

        if (
            !Array.isArray(points) ||
            points.length < 2
        ) {
            continue;
        }

        const score =
            normalizePiecewise(
                value,
                points
            );

        if (
            score === null ||
            !Number.isFinite(score)
        ) {
            continue;
        }

        components.push({

            parameter,

            value,

            score,

            weight:
                scoreValidation.weight

        });

    }

    return components;

}


/**
 * ----------------------------------------------------------------------
 * QAI SCORE V1
 * ----------------------------------------------------------------------
 */
export function calculateQaiScore(ctx) {

    if (!ctx.domain?.id) {

        throw new Error(
            "Domain não definido."
        );

    }

    const components =
        getScoreComponents(ctx);

    /*
     * O Score global somente é produzido quando
     * todos os quatro componentes oficiais estão disponíveis.
     *
     * Não produzir Score parcial.
     */

    if (
        components.length !==
        QAI_SCORE_PARAMETERS.length
    ) {

        return {

            score: null,

            level: "UNKNOWN",

            dominantFactor: null,

            components

        };

    }

    /*
     * Média geométrica ponderada.
     *
     * Os quatro parâmetros possuem peso 0.25 no Knowledge.
     */

    const rawScore =
        weightedGeometricMean(
            components
        );

    if (
        rawScore === null ||
        !Number.isFinite(rawScore)
    ) {

        return {

            score: null,

            level: "UNKNOWN",

            dominantFactor: null,

            components

        };

    }

    const score =
        Math.round(rawScore);

    /*
     * O fator dominante é o componente com menor índice.
     *
     * Em caso de empate, não há fator único dominante.
     */

    const lowestScore =
        Math.min(
            ...components.map(
                component =>
                    component.score
            )
        );

    const worstComponents =
        components.filter(
            component =>
                component.score ===
                lowestScore
        );

    const dominantFactor =
        worstComponents.length === 1
            ? worstComponents[0].parameter
            : null;

    return {

        score,

        level:
            resolveScoreLevel(score),

        dominantFactor,

        components

    };

}