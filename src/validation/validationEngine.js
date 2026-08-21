/**
 * ======================================================================
 * CORE QAI
 * Validation Engine
 * ----------------------------------------------------------------------
 * Arquivo   : validationEngine.js
 * Módulo    : Validation
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Validar as leituras utilizando as regras resolvidas pela
 * Regulatory Library.
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
 *  - Não conhece Domains
 *  - Não conhece normas
 *  - Não calcula métricas
 *  - Não gera diagnósticos
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
 * VALIDATORS
 * ====================================================================== */

const VALIDATORS = Object.freeze({

    RANGE: validateRange,

    MAX: validateMax,

    MAX_DYNAMIC: validateMaxDynamic

});

/* ======================================================================
 * VALIDATION ENGINE
 * ====================================================================== */

export function validate(ctx) {

    const raw =
        ctx.raw || {};

    const regulatory =
        ctx.regulatory || {};

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
                    rule.regulatoryId

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

            ...result

        };

    }

    ctx.validation =
        Object.freeze(validation);

    return ctx;

}