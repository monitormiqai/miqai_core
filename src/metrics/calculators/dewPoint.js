/**
 * ======================================================================
 * CORE QAI
 * Dew Point Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : dewPoint.js
 * Módulo    : Metrics
 * Versão    : 1.1.0
 * Status    : RC1.1 - EM REVISÃO CONTROLADA
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o ponto de orvalho a partir dos valores de temperatura e
 * umidade relativa disponibilizados pela Validation Engine.
 *
 * O ponto de orvalho é uma grandeza física derivada das condições
 * termodinâmicas observadas.
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
 *          unit,
 *          airToDewPointDifference
 *      }
 *
 * RESPONSABILIDADE
 * ----------------------------------------------------------------------
 * Este calculator:
 *
 * - utiliza temperatura e umidade relativa validadas;
 * - calcula o ponto de orvalho;
 * - calcula a diferença entre temperatura do ar e ponto de orvalho;
 * - realiza verificações básicas de validade física necessárias ao
 *   cálculo;
 * - retorna valores nulos quando os dados necessários não estão
 *   disponíveis ou não permitem o cálculo.
 *
 * O cálculo do ponto de orvalho constitui uma transformação física
 * quantitativa e não representa, por si só, uma interpretação ambiental.
 *
 * CONHECIMENTO
 * ----------------------------------------------------------------------
 *
 * O método matemático utilizado para o cálculo constitui conhecimento
 * específico da Metrics.
 *
 * Os parâmetros da equação e sua aplicação deverão permanecer
 * formalmente documentados e fundamentados na Biblioteca de Ouro.
 *
 * INTERPRETAÇÃO
 * ----------------------------------------------------------------------
 *
 * O ponto de orvalho e a diferença entre temperatura do ar e ponto
 * de orvalho são grandezas derivadas.
 *
 * Este calculator não deve transformar essas grandezas em diagnóstico,
 * risco, impacto ou classificação ambiental sem que o respectivo
 * critério esteja formalmente definido no conhecimento específico
 * da etapa responsável pela interpretação.
 *
 * LIMITES
 * ----------------------------------------------------------------------
 *
 * A Dew Point Calculator:
 *
 * - não executa Validation;
 * - não resolve Regulatory;
 * - não interpreta normas;
 * - não gera diagnósticos;
 * - não gera evidências;
 * - não formula hipóteses;
 * - não estabelece relationships;
 * - não gera impactos;
 * - não gera recomendações;
 * - não estabelece causalidade.
 *
 * Princípio:
 *
 *      Metrics calcula grandezas e indicadores derivados.
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
        ctx.validation ?? {};

    const temperature =
        validation.temperature;

    const humidity =
        validation.humidity;


    /*
     * ================================================================
     * DISPONIBILIDADE
     * ================================================================
     */

    if (
        !isEvaluated(temperature) ||
        !isEvaluated(humidity)
    ) {

        return {

            value: null,

            unit: "°C",

            airToDewPointDifference: null

        };

    }


    const t =
        Number(temperature.value);

    const rh =
        Number(humidity.value);


    /*
     * ================================================================
     * VALIDADE FÍSICA
     * ================================================================
     */

    if (
        !Number.isFinite(t) ||
        !Number.isFinite(rh) ||
        rh <= 0 ||
        rh > 100
    ) {

        return {

            value: null,

            unit: "°C",

            airToDewPointDifference: null

        };

    }


    /*
     * ================================================================
     * MAGNUS-TETENS
     * ================================================================
     *
     * Parâmetros utilizados pela implementação:
     *
     *      a = 17.625
     *      b = 243.04 °C
     *
     * A equação transforma temperatura do ar e umidade relativa
     * em temperatura de ponto de orvalho.
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
     * ================================================================
     * RESULTADO
     * ================================================================
     */

    const value =
        parseFloat(
            point.toFixed(1)
        );

    const airToDewPointDifference =
        parseFloat(
            (t - value).toFixed(1)
        );


    return {

        value,

        unit: "°C",

        airToDewPointDifference

    };

}