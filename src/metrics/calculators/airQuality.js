/**
 * ======================================================================
 * CORE QAI
 * Air Quality Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : airQuality.js
 * Módulo    : Metrics
 * Versão    : 1.1.0
 * Status    : RC1.1 - EM REVISÃO CONTROLADA
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular o indicador de qualidade do ar a partir dos parâmetros
 * químicos disponibilizados pela Validation Engine.
 *
 * O calculator executa os critérios específicos da métrica de
 * qualidade do ar definidos pelo conhecimento da Metrics.
 *
 * Cadeia funcional:
 *
 *      leitura
 *         ↓
 *      Validation
 *         ↓
 *      dados validados
 *         ↓
 *      Air Quality
 *         ↓
 *      indicador métrico
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
 * - avalia os parâmetros químicos contemplados pela métrica;
 * - aplica exclusivamente critérios próprios da Metrics;
 * - calcula o indicador de qualidade do ar;
 * - classifica o resultado segundo as faixas definidas para a métrica;
 * - identifica o fator dominante quando essa determinação estiver
 *   formalmente definida pelo conhecimento da métrica;
 * - retorna UNKNOWN quando os dados necessários ou os critérios
 *   necessários ao cálculo não estiverem disponíveis.
 *
 * PARÂMETROS CONTEMPLADOS
 * ----------------------------------------------------------------------
 *
 * - CO₂
 * - VOC Index
 * - NOx Index
 *
 * A disponibilidade desses parâmetros não implica, por si só,
 * que um parâmetro seja ambientalmente inadequado.
 *
 * SEPARAÇÃO DE RESPONSABILIDADES
 * ----------------------------------------------------------------------
 *
 * Validation:
 *      determina a classificação da leitura segundo os critérios
 *      de validação aplicáveis.
 *
 * Metrics:
 *      transforma os dados validados em indicadores quantitativos
 *      segundo os critérios próprios da métrica.
 *
 * Portanto:
 *
 *      validation.passed
 *
 * não deve ser interpretado automaticamente como:
 *
 *      qualidade do ar boa/ruim.
 *
 * O campo "passed" somente poderá participar do cálculo quando essa
 * utilização estiver explicitamente definida pelo conhecimento
 * específico da métrica.
 *
 * CONHECIMENTO
 * ----------------------------------------------------------------------
 *
 * Os critérios específicos da métrica de qualidade do ar, incluindo
 * quando aplicável:
 *
 * - parâmetros participantes;
 * - faixas de avaliação;
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
 * A Air Quality Calculator:
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

import { resolveScoreLevel } from "../utils/scoreLevel.js";


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
 * AIR QUALITY
 * ====================================================================== */

export function calculateAirQuality(ctx) {

    const validation =
        ctx.validation ?? {};

    const co2 =
        validation.co2;

    const voc =
        validation.vocIndex;

    const nox =
        validation.noxIndex;


    /*
     * ================================================================
     * DISPONIBILIDADE
     * ================================================================
     */

    if (
        !isEvaluated(co2) &&
        !isEvaluated(voc) &&
        !isEvaluated(nox)
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
     * Não aplicar pesos arbitrários ou penalizações provisórias.
     */

    return {

        score: null,

        level: "UNKNOWN",

        dominantFactor: null

    };

}