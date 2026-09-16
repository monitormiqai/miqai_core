/**
 * ======================================================================
 * CORE QAI
 * Validation Engine
 * ----------------------------------------------------------------------
 * Arquivo   : validationEngine.js
 * Módulo    : Validation
 * Versão    : 1.1.0
 * Status    : RC2 - REVISÃO CO2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Validar as leituras recebidas pelo CORE QAI utilizando os critérios
 * de validação previamente resolvidos pela Regulatory Library.
 *
 * A Validation Engine é responsável por determinar se os valores
 * recebidos podem ser utilizados com segurança pelas etapas analíticas
 * subsequentes do CORE QAI.
 *
 * Entrada:
 *      ctx.raw
 *      ctx.regulatory
 *
 * Saída:
 *      ctx.validation
 *
 * A Validation Engine:
 *
 *  - Não conhece Domains;
 *  - Não contém normas ou referências regulatórias próprias;
 *  - Utiliza os critérios de validação disponibilizados por Regulatory;
 *  - Não calcula métricas;
 *  - Não gera diagnósticos;
 *  - Não estabelece relações ambientais;
 *  - Não gera impactos;
 *  - Não gera hipóteses;
 *  - Não gera recomendações;
 *  - Não interpreta causalidade;
 *  - Apenas classifica a condição de validade das leituras para uso
 *    pelas etapas posteriores do pipeline.
 *
 * Princípio:
 * ----------------------------------------------------------------------
 * A Validation Engine determina se uma leitura é válida, inválida ou
 * possui condição que limite seu uso analítico, conforme os critérios
 * aplicáveis resolvidos pelo Regulatory.
 *
 * A Validation não cria conhecimento normativo.
 * A Validation aplica critérios previamente resolvidos.
 *
 * OBSERVATION:
 * ----------------------------------------------------------------------
 * O tipo OBSERVATION permite que uma leitura seja disponibilizada para
 * análise complementar sem que a Validation a classifique como aprovada
 * ou reprovada por um limite regulatório.
 *
 * OBSERVATION:
 *
 *  - preserva o valor observado;
 *  - não produz PASS/FAIL temporal por si só;
 *  - utiliza passed = null;
 *  - utiliza state = "OBSERVATION";
 *  - utiliza severity = "INFO";
 *  - pode produzir currentAssessment quando o Regulatory fornecer
 *    uma referência técnica comparável à leitura atual;
 *  - preserva evaluationPeriod, historicalAssessmentRequired,
 *    referenceIds e scoreEligible para as etapas posteriores.
 *
 * OBSERVATION não significa "descartar da esteira". Significa que a
 * leitura não deve ser convertida automaticamente em conformidade
 * regulatória ou PASS/FAIL.
 * ======================================================================
 */


/* ======================================================================
 * RANGE
 * ====================================================================== */

function validateRange(value, rule) {

    const passed =
        value >= rule.min &&
        value <= rule.max;

    return {

        value,

        min: rule.min,

        max: rule.max,

        state:
            value < rule.min
                ? "LOW"
                : value > rule.max
                    ? "HIGH"
                    : "NORMAL",

        severity:
            passed
                ? "NORMAL"
                : "WARNING",

        passed

    };

}


/* ======================================================================
 * MAX
 * ====================================================================== */

function validateMax(value, rule) {

    const passed =
        value <= rule.threshold;

    return {

        value,

        threshold: rule.threshold,

        state:
            passed
                ? "NORMAL"
                : "HIGH",

        severity:
            passed
                ? "NORMAL"
                : "WARNING",

        passed

    };

}


/* ======================================================================
 * MAX DYNAMIC
 * ====================================================================== */

function validateMaxDynamic(value, rule) {

    const threshold =
        rule.baseline +
        rule.delta;

    const passed =
        value <= threshold;

    return {

        value,

        threshold,

        baseline:
            rule.baseline,

        delta:
            rule.delta,

        state:
            passed
                ? "NORMAL"
                : "HIGH",

        severity:
            passed
                ? "NORMAL"
                : "WARNING",

        passed

    };

}


/* ======================================================================
 * OBSERVATION
 * ====================================================================== */

/**
 * Registra uma leitura para utilização analítica complementar sem
 * aplicar critério de aprovação/reprovação por limite regulatório.
 *
 * Não produz threshold.
 * Não produz PASS/FAIL.
 * Não interpreta a condição ambiental.
 */

function validateObservation(value) {

    return {

        value,

        state: "OBSERVATION",

        severity: "INFO",

        passed: null

    };

}


function getOperationalContextApplicability(environment) {

    const env =
        String(environment ?? "").toLowerCase();

    if (
        env === "corporate" ||
        env === "healthcare" ||
        env === "education" ||
        env === "residential" ||
        env === "datacenter"
    ) {
        return "indoor_air";
    }

    return null;

}


function isApplicabilityCompatible(ruleApplicability, contextApplicability) {

    if (!ruleApplicability || !contextApplicability) {
        return true;
    }

    if (
        contextApplicability === "indoor_air" &&
        ruleApplicability === "ambient_outdoor"
    ) {
        return false;
    }

    return true;

}

function hasOperationalRange(rule) {

    if (!rule || rule.type !== "RANGE") {
        return false;
    }

    if (
        rule.min == null ||
        rule.max == null
    ) {
        return false;
    }

    const min = Number(rule.min);
    const max = Number(rule.max);

    return Number.isFinite(min) && Number.isFinite(max);

}


/* ======================================================================
 * CURRENT ASSESSMENT
 * ====================================================================== */

function assessCurrentCondition(value, rule, contextApplicability = null) {

    if (
        !isApplicabilityCompatible(
            rule.applicability,
            contextApplicability
        )
    ) {
        return "NOT_ASSESSED";
    }

    if (rule.type === "RANGE") {

        if (!hasOperationalRange(rule)) {
            return "NOT_ASSESSED";
        }

        if (value < rule.min) return "BELOW_REFERENCE";
        if (value > rule.max) return "ABOVE_REFERENCE";
        return "WITHIN_REFERENCE";

    }

    const threshold =
        rule.threshold ?? rule.referenceThreshold;

    if (threshold !== undefined && threshold !== null) {

        if (value > threshold) return "ABOVE_REFERENCE";
        return "WITHIN_REFERENCE";

    }

    if (rule.type === "MAX_DYNAMIC") {

        const dynamicThreshold =
            rule.baseline + rule.delta;

        if (value > dynamicThreshold) return "ABOVE_REFERENCE";
        return "WITHIN_REFERENCE";

    }

    return "NOT_ASSESSED";
}

function buildAssessmentMetadata(value, rule, contextApplicability = null) {

    const currentAssessment =
        assessCurrentCondition(
            value,
            rule,
            contextApplicability
        );

    const historicalAssessmentRequired =
        rule.historicalAssessmentRequired === true;

    /*
     * Score eligibility belongs to Regulatory. Validation only carries
     * the decision forward and prevents temporal criteria from being
     * treated as score-ready when no history is available in CORE.
     */
    const scoreEligible =
        rule.scoreEligible === true;

    return {

        currentAssessment,

        evaluationPeriod:
            rule.evaluationPeriod ?? null,

        historicalAssessmentRequired,

        scoreEligible,

        criterionKind:
            rule.criterionKind ?? null,

        applicability:
            rule.applicability ?? null,

        currentObservation:
            rule.currentObservation ?? null,

        temporalGuidance:
            rule.temporalGuidance ?? null,

        criterionNote:
            rule.criterionNote ?? null,

        referenceThreshold:
            rule.referenceThreshold ?? null,

        referenceIds:
            Array.isArray(rule.referenceIds)
                ? [...rule.referenceIds]
                : []

    };
}

/* ======================================================================
 * VALIDATORS
 * ====================================================================== */

const VALIDATORS = Object.freeze({

    RANGE: validateRange,

    MAX: validateMax,

    MAX_DYNAMIC: validateMaxDynamic,

    OBSERVATION: validateObservation

});


/* ======================================================================
 * VALIDATION ENGINE
 * ====================================================================== */

export function validate(ctx) {

    const raw =
        ctx.raw || {};

    const regulatory =
        ctx.regulatory || {};

    const contextApplicability =
        getOperationalContextApplicability(ctx.environment);

    const validation = {};

    for (const [parameter, rule] of Object.entries(regulatory)) {

        const value =
            raw[parameter];

        /*
         * Leitura ausente
         */

        if (
            value === undefined ||
            value === null
        ) {

            validation[parameter] = {

                parameter,

                value: null,

                state: "MISSING",

                severity: "UNKNOWN",

                passed: false,

                regulated:
                    rule.regulated,

                regulatoryId:
                    rule.regulatoryId,

                criterionKind:
                    rule.criterionKind ?? null,

                applicability:
                    rule.applicability ?? null,

                referenceThreshold:
                    rule.referenceThreshold ?? null,

                referenceIds:
                    Array.isArray(rule.referenceIds)
                        ? [...rule.referenceIds]
                        : []

            };

            continue;

        }

        if (
            rule.type === "RANGE" &&
            !hasOperationalRange(rule)
        ) {

            validation[parameter] = {

                parameter,

                validationKey:
                    rule.validationKey,

                displayName:
                    rule.displayName,

                description:
                    rule.description,

                unit:
                    rule.unit,

                regulated:
                    rule.regulated,

                regulatoryId:
                    rule.regulatoryId,

                ...buildAssessmentMetadata(
                    value,
                    rule,
                    contextApplicability
                ),

                value,

                state: "OBSERVATION",

                severity: "INFO",

                passed: null

            };

            continue;

        }

        const validator =
            VALIDATORS[rule.type];

        if (!validator) {

            throw new Error(

                `Validation type '${rule.type}' não suportado.`

            );

        }

        const result =
            validator(
                value,
                rule
            );

        validation[parameter] = {

            parameter,

            validationKey:
                rule.validationKey,

            displayName:
                rule.displayName,

            description:
                rule.description,

            unit:
                rule.unit,

            regulated:
                rule.regulated,

            regulatoryId:
                rule.regulatoryId,

            ...buildAssessmentMetadata(
                value,
                rule,
                contextApplicability
            ),

            ...result

        };

    }

    ctx.validation =
        Object.freeze(validation);

    return ctx;

}