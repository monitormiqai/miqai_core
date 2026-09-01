/**
 * ======================================================================
 * CORE QAI
 * Particulate Load Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : particulateLoad.js
 * Módulo    : Metrics
 * Versão    : 1.1.0
 * Status    : RC1.1 - EM REVISÃO CONTROLADA
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o indicador de carga de material particulado a partir dos
 * parâmetros PM2.5 e PM10 disponibilizados pela Validation Engine.
 *
 * Cadeia funcional:
 *
 *      leitura
 *         ↓
 *      Validation
 *         ↓
 *      dados validados
 *         ↓
 *   Particulate Load
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
 * - utiliza os valores disponibilizados pela Validation;
 * - avalia os parâmetros PM2.5 e PM10 contemplados pela métrica;
 * - aplica exclusivamente critérios próprios da Metrics;
 * - calcula o indicador de carga de material particulado;
 * - classifica o resultado segundo as faixas definidas para a métrica;
 * - identifica o fator dominante quando essa determinação estiver
 *   formalmente definida pelo conhecimento da métrica;
 * - retorna UNKNOWN quando os dados necessários ou os critérios
 *   necessários ao cálculo não estiverem disponíveis.
 *
 * PARÂMETROS CONTEMPLADOS
 * ----------------------------------------------------------------------
 *
 * - PM2.5
 * - PM10
 *
 * SEPARAÇÃO DE RESPONSABILIDADES
 * ----------------------------------------------------------------------
 *
 * Validation:
 *      determina a classificação da leitura segundo os critérios
 *      de validação aplicáveis.
 *
 * Metrics:
 *      transforma os dados validados em indicador quantitativo
 *      segundo os critérios próprios da métrica.
 *
 * Portanto:
 *
 *      validation.passed
 *
 * não deve ser interpretado automaticamente como:
 *
 *      carga de partículas adequada/inadequada.
 *
 * O campo "passed" somente poderá participar do cálculo quando essa
 * utilização estiver explicitamente definida pelo conhecimento
 * específico da métrica.
 *
 * CONHECIMENTO
 * ----------------------------------------------------------------------
 *
 * Os critérios específicos da métrica, incluindo quando aplicável:
 *
 * - faixas de concentração;
 * - pesos relativos entre PM2.5 e PM10;
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
 * A Particulate Load Calculator:
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
 * PARTICULATE LOAD
 * ====================================================================== */

export function calculateParticulateLoad(ctx) {

    const validation =
        ctx.validation ?? {};

    const pm25 =
        validation.pm25;

    const pm10 =
        validation.pm10;


    /*
     * ================================================================
     * DISPONIBILIDADE
     * ================================================================
     */

    if (
        !isEvaluated(pm25) &&
        !isEvaluated(pm10)
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
     *
     * Não aplicar pesos ou faixas provisórias.
     */

    return {

        score: null,

        level: "UNKNOWN",

        dominantFactor: null

    };

}