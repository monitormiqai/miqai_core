/**
 * ======================================================================
 * CORE QAI
 * Thermal Comfort Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : thermalComfort.js
 * Módulo    : Metrics
 * Versão    : 1.2.0
 * Status    : RC1.1 - EM REVISÃO CONTROLADA
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o indicador de conforto térmico a partir dos valores de
 * temperatura e umidade disponibilizados pela Validation Engine.
 *
 * O calculator executa os critérios específicos da métrica de
 * conforto térmico definidos pela Metrics Knowledge.
 *
 * Cadeia funcional:
 *
 *      leitura
 *         ↓
 *      Validation
 *         ↓
 *      dados validados
 *         ↓
 *   Thermal Comfort
 *         ↓
 *   indicador métrico
 *
 * Entrada:
 *      ctx.validation
 *
 * Saída:
 *      {
 *          score,
 *          level,
 *          dominantFactor
 *      }
 *
 * RESPONSABILIDADE
 * ----------------------------------------------------------------------
 * Este calculator:
 *
 * - utiliza valores disponibilizados pela Validation;
 * - aplica exclusivamente critérios próprios da métrica;
 * - calcula o indicador de conforto térmico;
 * - classifica o resultado segundo as faixas definidas para a métrica;
 * - identifica o fator dominante quando essa informação estiver
 *   formalmente determinada pelos critérios da métrica;
 * - retorna UNKNOWN quando os dados necessários ou os critérios
 *   necessários ao cálculo não estiverem disponíveis.
 *
 * SEPARAÇÃO DE RESPONSABILIDADES
 * ----------------------------------------------------------------------
 *
 * Validation:
 *      determina a classificação da leitura segundo o critério
 *      de validação aplicável.
 *
 * Metrics:
 *      transforma os dados validados em indicadores quantitativos.
 *
 * Portanto:
 *
 *      validation.passed
 *
 * não deve ser interpretado automaticamente como:
 *
 *      conforto térmico adequado/inadequado.
 *
 * O campo "passed" somente poderá participar do cálculo quando essa
 * utilização estiver explicitamente definida pelo conhecimento
 * específico da métrica.
 *
 * CONHECIMENTO
 * ----------------------------------------------------------------------
 * Os critérios de conforto térmico, incluindo quando aplicável:
 *
 * - faixas de temperatura;
 * - faixas de umidade;
 * - pesos;
 * - método de pontuação;
 * - níveis de classificação;
 * - determinação do fator dominante;
 *
 * constituem conhecimento específico da Metrics e deverão ser
 * formalmente definidos e fundamentados na Biblioteca de Ouro.
 *
 * Este arquivo não deve inventar ou assumir esses critérios.
 *
 * LIMITES
 * ----------------------------------------------------------------------
 *
 * Não:
 *
 * - executa Validation;
 * - resolve Regulatory;
 * - interpreta normas;
 * - gera diagnósticos;
 * - gera evidências;
 * - formula hipóteses;
 * - estabelece relationships;
 * - gera impactos;
 * - gera recomendações;
 * - estabelece causalidade.
 *
 * Princípio:
 *
 *      Metrics calcula indicadores.
 *
 * O resultado deste calculator não constitui, isoladamente,
 * diagnóstico ambiental, clínico ou regulatório.
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
 * THERMAL COMFORT
 * ====================================================================== */

export function calculateThermalComfort(ctx) {

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

            score: null,

            level: "UNKNOWN",

            dominantFactor: null

        };

    }


    /*
     * ================================================================
     * CONHECIMENTO DA MÉTRICA
     * ================================================================
     *
     * Os critérios científicos do indicador ainda serão definidos
     * na Biblioteca de Ouro da Metrics.
     *
     * Não utilizar validation.passed como substituto desses critérios.
     */

    return {

        score: null,

        level: "UNKNOWN",

        dominantFactor: null

    };

}