/**
 * ======================================================================
 * CORE QAI
 * Dew Point Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : dewPoint.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o ponto de orvalho a partir das leituras atuais de
 * temperatura e umidade relativa.
 *
 * Método:
 *      Magnus-Tetens
 *
 * Entrada:
 *      ctx.validation.temperature
 *      ctx.validation.humidity
 *
 * Saída:
 *      {
 *          value,
 *          unit
 *      }
 *
 * O Dashboard não calcula o ponto de orvalho.
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
 * DEW POINT
 * ====================================================================== */

export function calculateDewPoint(ctx) {

    const validation =
        ctx.validation;

    const temperature =
        validation.temperature;

    const humidity =
        validation.humidity;

    /*
     * Temperatura ou umidade indisponível.
     *
     * Não retornar 0, pois 0 °C é um valor físico válido.
     */

    if (
        !isEvaluated(temperature) ||
        !isEvaluated(humidity)
    ) {

        return {

            value: null,

            unit: "°C"

        };

    }

    const t =
        Number(temperature.value);

    const rh =
        Number(humidity.value);

    /*
     * Validação física da umidade.
     */

    if (
        !Number.isFinite(t) ||
        !Number.isFinite(rh) ||
        rh <= 0 ||
        rh > 100
    ) {

        return {

            value: null,

            unit: "°C"

        };

    }

    /*
     * ================================================================
     * MATRIZ DE MAGNUS-TETENS
     * ================================================================
     */

    const a = 17.625;

    const b = 243.04;

    const alfa =
        ((a * t) / (b + t)) +
        Math.log(rh / 100);

    const point =
        (b * alfa) /
        (a - alfa);

    /*
     * Arredondamento para uma casa decimal,
     * conforme a implementação legada.
     */

    const value =
        parseFloat(
            point.toFixed(1)
        );

    return {

        value,

        unit: "°C"

    };

}