/**
 * ======================================================================
 * CORE QAI
 * Diagnosis
 * ----------------------------------------------------------------------
 * Arquivo   : thermalDiscomfort.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar condições térmicas potencialmente desfavoráveis.
 *
 * Este diagnóstico representa exclusivamente uma orientação técnica
 * baseada nas condições atuais avaliadas pelo Regulatory/Validation.
 *
 * Não interpreta normas.
 * Não identifica causas.
 * Não gera evidências.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const THERMAL_DISCOMFORT = Object.freeze({

    /*
     * Identificador único.
     */

    id: "thermal_discomfort",

    /*
     * Nome de exibição.
     */

    name: "Condição térmica potencialmente desfavorável",

    title: "Condição térmica potencialmente desfavorável",

    description:
        "A leitura atual de temperatura e/ou umidade apresenta desvio em relação à referência aplicável. Essa condição pode ser relevante para conforto térmico, mas não constitui cálculo formal de conforto nem confirma desconforto dos ocupantes.",

    /*
     * Prioridade.
     */

    priority: 90,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        const metrics = ctx.metrics ?? {};

        /*
         * A avaliação instrutiva utiliza somente as condições atuais
         * disponibilizadas por Validation. Não calcula PMV/PPD, não
         * produz score e não presume desconforto dos ocupantes.
         */

        const temperature =
            ctx.validation?.temperature;

        const humidity =
            ctx.validation?.humidity;

        const temperatureDeviated =
            temperature?.currentAssessment === "ABOVE_REFERENCE" ||
            temperature?.currentAssessment === "BELOW_REFERENCE";

        const humidityDeviated =
            humidity?.currentAssessment === "ABOVE_REFERENCE" ||
            humidity?.currentAssessment === "BELOW_REFERENCE";

        return temperatureDeviated || humidityDeviated;

    }

});

export default THERMAL_DISCOMFORT;