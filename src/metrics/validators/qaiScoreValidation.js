/**
 * ======================================================================
 * CORE QAI
 * QAI Score Validation
 * ----------------------------------------------------------------------
 * Versão : 1.1.0
 * Status : RC - SCORE V1
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Validar se cada parâmetro possui condições técnicas suficientes para
 * participar do QAI Score.
 *
 * Esta camada NÃO calcula o índice.
 *
 * Ela verifica:
 *
 * - pertencimento ao universo oficial do Score;
 * - existência de conhecimento;
 * - aprovação do conhecimento;
 * - existência do método;
 * - existência da normalização;
 * - existência do peso;
 * - disponibilidade da leitura validada;
 * - compatibilidade temporal quando exigida pelo conhecimento.
 *
 * Regulatory e Score Knowledge permanecem separados.
 * ======================================================================
 */

import QAI_SCORE_PARAMETERS
    from "../config/qaiScoreParameters.js";

import QAI_SCORE_KNOWLEDGE
    from "../config/qaiScoreKnowledge.js";


function invalidResult(
    parameter,
    reason,
    knowledge = null
) {
    return {
        parameter,
        eligible: false,
        reason,
        knowledgeStatus:
            knowledge?.status ?? null
    };
}


export function validateQaiScoreParameter(
    ctx,
    parameter
) {

    /* ================================================================
     * UNIVERSO DO SCORE
     * ================================================================ */

    if (!QAI_SCORE_PARAMETERS.includes(parameter)) {

        return invalidResult(
            parameter,
            "PARAMETER_NOT_IN_SCORE"
        );

    }


    /* ================================================================
     * SCORE KNOWLEDGE
     * ================================================================ */

    const knowledge =
        QAI_SCORE_KNOWLEDGE[parameter];

    if (!knowledge) {

        return invalidResult(
            parameter,
            "SCORE_KNOWLEDGE_MISSING"
        );

    }


    if (knowledge.status !== "APPROVED") {

        return invalidResult(
            parameter,
            "SCORE_KNOWLEDGE_NOT_APPROVED",
            knowledge
        );

    }


    if (!knowledge.method) {

        return invalidResult(
            parameter,
            "SCORE_METHOD_MISSING",
            knowledge
        );

    }


    if (!knowledge.normalization) {

        return invalidResult(
            parameter,
            "SCORE_NORMALIZATION_MISSING",
            knowledge
        );

    }


    if (
        !Number.isFinite(
            knowledge.weight
        ) ||
        knowledge.weight <= 0
    ) {

        return invalidResult(
            parameter,
            "SCORE_WEIGHT_MISSING",
            knowledge
        );

    }


    /* ================================================================
     * VALIDATION
     * ================================================================ */

    const validation =
        ctx?.validation?.[parameter];

    if (!validation) {

        return invalidResult(
            parameter,
            "VALIDATION_RESULT_MISSING",
            knowledge
        );

    }


    if (
        validation.state === "MISSING" ||
        validation.value === null ||
        validation.value === undefined
    ) {

        return invalidResult(
            parameter,
            "VALIDATED_VALUE_MISSING",
            knowledge
        );

    }


    /* ================================================================
     * COMPATIBILIDADE TEMPORAL
     * ================================================================
     *
     * O conhecimento pode exigir uma determinada janela temporal.
     *
     * A ausência de evidência temporal não pode ser convertida
     * artificialmente em uma avaliação válida.
     *
     * Neste estágio, a validação somente reconhece explicitamente
     * uma evidência temporal fornecida pelo contexto.
     * ================================================================ */

    if (
        knowledge.evaluationPeriod &&
        knowledge.evaluationPeriod !== "instant"
    ) {

        const temporalAssessment =
            validation.temporalAssessment;

        if (
            temporalAssessment !== "AVAILABLE"
        ) {

            return invalidResult(
                parameter,
                "TEMPORAL_ASSESSMENT_UNAVAILABLE",
                knowledge
            );

        }

    }


    /* ================================================================
     * ELEGIBILIDADE
     * ================================================================ */

    return {

        parameter,

        eligible: true,

        reason: null,

        knowledgeStatus:
            knowledge.status,

        method:
            knowledge.method,

        normalization:
            knowledge.normalization,

        weight:
            knowledge.weight,

        evaluationPeriod:
            knowledge.evaluationPeriod,

        references:
            knowledge.references

    };

}


export function validateQaiScore(ctx) {

    const results = {};

    for (
        const parameter
        of QAI_SCORE_PARAMETERS
    ) {

        results[parameter] =
            validateQaiScoreParameter(
                ctx,
                parameter
            );

    }

    return Object.freeze(results);

}
