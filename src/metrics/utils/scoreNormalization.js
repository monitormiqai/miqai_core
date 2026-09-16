/**
 * ======================================================================
 * CORE QAI
 * Score Normalization
 * ----------------------------------------------------------------------
 * Arquivo   : scoreNormalization.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC - QAI SCORE METHODOLOGY
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Normalizar valores ambientais para uma escala contínua de 0 a 100
 * utilizando interpolação linear por trechos.
 *
 * Este módulo é puramente matemático.
 *
 * NÃO:
 * - interpreta normas;
 * - escolhe referências;
 * - determina aplicabilidade;
 * - executa Validation;
 * - executa Regulatory;
 * - gera diagnóstico;
 * - gera evidência;
 * - gera hipótese;
 * - gera mitigação.
 *
 * A seleção dos pontos de referência pertence ao conhecimento do CORE.
 *
 * Princípio:
 *
 *      Conhecimento define os pontos.
 *      Normalization calcula a posição entre os pontos.
 * ======================================================================
 */

/**
 * Interpolação linear entre dois pontos.
 *
 * x1 -> y1
 * x2 -> y2
 *
 * Retorna o valor de y correspondente a x.
 */
function linearInterpolate(x, x1, y1, x2, y2) {

    if (x2 === x1) {

        throw new Error(
            "Não é possível interpolar entre pontos com o mesmo eixo X."
        );

    }

    return (
        y1 +
        ((x - x1) * (y2 - y1)) /
        (x2 - x1)
    );

}


/**
 * Normalização monotônica.
 *
 * points deve ser fornecido em ordem crescente de x:
 *
 * [
 *   { value: 5, score: 100 },
 *   { value: 15, score: 50 },
 *   { value: 35, score: 0 }
 * ]
 *
 * Valores abaixo do primeiro ponto recebem a pontuação do primeiro
 * ponto.
 *
 * Valores acima do último ponto recebem a pontuação do último ponto.
 *
 * Entre os pontos é aplicada interpolação linear.
 */
export function normalizePiecewise(value, points) {

    if (
        value === null ||
        value === undefined ||
        !Number.isFinite(value)
    ) {

        return null;

    }

    if (
        !Array.isArray(points) ||
        points.length < 2
    ) {

        throw new Error(
            "normalizePiecewise exige pelo menos dois pontos."
        );

    }

    for (const point of points) {

        if (
            !Number.isFinite(point.value) ||
            !Number.isFinite(point.score)
        ) {

            throw new Error(
                "Todos os pontos devem possuir value e score numéricos."
            );

        }

    }

    for (let i = 1; i < points.length; i++) {

        if (
            points[i].value <=
            points[i - 1].value
        ) {

            throw new Error(
                "Os pontos devem possuir valores crescentes."
            );

        }

    }

    /*
     * Antes do primeiro ponto.
     */

    if (value <= points[0].value) {

        return points[0].score;

    }

    /*
     * Depois do último ponto.
     */

    const last =
        points[points.length - 1];

    if (value >= last.value) {

        return last.score;

    }

    /*
     * Localiza o intervalo.
     */

    for (let i = 1; i < points.length; i++) {

        const previous =
            points[i - 1];

        const current =
            points[i];

        if (
            value <= current.value
        ) {

            const score =
                linearInterpolate(
                    value,
                    previous.value,
                    previous.score,
                    current.value,
                    current.score
                );

            return Math.max(
                0,
                Math.min(100, score)
            );

        }

    }

    return null;

}


/**
 * Normalização para parâmetro com faixa ótima.
 *
 * Exemplo conceitual:
 *
 *             100
 *              ┌────────┐
 *             /          \
 *            /            \
 *           /              \
 *          0                0
 *
 * lowerCritical < lowerOptimal <= upperOptimal < upperCritical
 *
 * Dentro da faixa ótima: 100.
 *
 * Fora da faixa ótima: degradação linear até 0.
 */
export function normalizeOptimalRange(
    value,
    {
        lowerCritical,
        lowerOptimal,
        upperOptimal,
        upperCritical
    }
) {

    if (
        value === null ||
        value === undefined ||
        !Number.isFinite(value)
    ) {

        return null;

    }

    if (
        !Number.isFinite(lowerCritical) ||
        !Number.isFinite(lowerOptimal) ||
        !Number.isFinite(upperOptimal) ||
        !Number.isFinite(upperCritical)
    ) {

        throw new Error(
            "Todos os limites da faixa ótima devem ser numéricos."
        );

    }

    if (
        lowerCritical >= lowerOptimal ||
        lowerOptimal > upperOptimal ||
        upperOptimal >= upperCritical
    ) {

        throw new Error(
            "Faixa ótima inválida."
        );

    }

    if (
        value >= lowerOptimal &&
        value <= upperOptimal
    ) {

        return 100;

    }

    if (value < lowerOptimal) {

        return normalizePiecewise(
            value,
            [
                {
                    value: lowerCritical,
                    score: 0
                },
                {
                    value: lowerOptimal,
                    score: 100
                }
            ]
        );

    }

    return normalizePiecewise(
        value,
        [
            {
                value: upperOptimal,
                score: 100
            },
            {
                value: upperCritical,
                score: 0
            }
        ]
    );

}


/**
 * Média geométrica ponderada.
 *
 * score >= 0
 * weight > 0
 *
 * Os pesos são normalizados apenas entre os componentes disponíveis.
 */
export function weightedGeometricMean(
    components
) {

    if (
        !Array.isArray(components)
    ) {

        throw new Error(
            "weightedGeometricMean exige um array de componentes."
        );

    }

    const valid =
        components.filter(component =>
            Number.isFinite(component.score) &&
            Number.isFinite(component.weight) &&
            component.weight > 0
        );

    if (valid.length === 0) {

        return null;

    }

    const totalWeight =
        valid.reduce(
            (sum, component) =>
                sum + component.weight,
            0
        );

    if (totalWeight <= 0) {

        return null;

    }

    /*
     * O score 0 é matematicamente válido.
     *
     * log(0) não é finito, portanto tratamos esse caso
     * explicitamente antes da transformação logarítmica.
     */

    if (
        valid.some(component =>
            component.score === 0
        )
    ) {

        return 0;

    }

    const logarithmicSum =
        valid.reduce(
            (sum, component) => {

                const normalizedWeight =
                    component.weight /
                    totalWeight;

                return (
                    sum +
                    normalizedWeight *
                    Math.log(component.score)
                );

            },
            0
        );

    return Math.exp(
        logarithmicSum
    );

}