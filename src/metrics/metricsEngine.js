/**
 * ======================================================================
 * CORE QAI
 * Metrics Engine
 * ----------------------------------------------------------------------
 * Arquivo   : metricsEngine.js
 * Módulo    : Metrics
 * Versão    : 1.2.0
 * Status    : RC1.2 - REVISÃO ESTRUTURAL
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Transformar os resultados de validação em indicadores quantitativos
 * e classificações padronizadas utilizadas pelas etapas posteriores
 * do CORE QAI.
 *
 * A Metrics Engine é responsável por executar os calculators oficiais
 * de métricas e organizar seus resultados em ctx.metrics.
 *
 * Entrada:
 *      ctx.validation
 *      ctx.domain
 *      ctx.raw
 *
 * Saída:
 *      ctx.metrics
 *
 * A Metrics Engine:
 *
 *  - Utiliza os resultados produzidos pela Validation Engine;
 *  - Utiliza o Domain ativo quando necessário para parâmetros específicos
 *    de cálculo;
 *  - Executa exclusivamente os calculators registrados na Metrics Library;
 *  - Pode produzir indicadores derivados das leituras validadas;
 *  - Pode combinar métricas previamente calculadas para produzir
 *    indicadores derivados, como o QAI Score;
 *  - Não executa validações;
 *  - Não resolve critérios regulatórios;
 *  - Não interpreta normas;
 *  - Não gera diagnósticos;
 *  - Não gera evidências;
 *  - Não formula hipóteses;
 *  - Não estabelece relationships;
 *  - Não gera impactos ambientais;
 *  - Não gera impactos humanos;
 *  - Não gera recomendações ou mitigações;
 *  - Não estabelece causalidade;
 *  - Não calcula risco à saúde.
 *
 * Princípio:
 * ----------------------------------------------------------------------
 * Metrics transforma dados validados em indicadores calculados.
 *
 * A Metrics não decide o significado ambiental ou humano dos
 * indicadores. A interpretação pertence às etapas analíticas
 * posteriores.
 *
 * Dependência de conhecimento:
 * ----------------------------------------------------------------------
 * O conhecimento utilizado pela Metrics deve ser restrito aos critérios,
 * parâmetros, pesos, fórmulas e classificações necessários para produzir
 * os indicadores definidos pelo CORE QAI.
 *
 * Esse conhecimento não deve ser utilizado para criar diagnósticos,
 * hipóteses, relationships, impactos ou recomendações.
 * ======================================================================
 */

import { calculateThermalComfort } from "./calculators/thermalComfort.js";
import { calculateAirQuality } from "./calculators/airQuality.js";
import { calculateParticulateLoad } from "./calculators/particulateLoad.js";
import { calculateOccupancy } from "./calculators/occupancy.js";
import { calculateQaiScore } from "./calculators/qaiScore.js";
import { calculateDewPoint } from "./calculators/dewPoint.js";
import { calculateCo2Analysis } from "./calculators/co2Analysis.js";


/* ======================================================================
 * METRICS ENGINE
 * ====================================================================== */

export function calculateMetrics(ctx) {

    /*
     * Primeira etapa:
     * calcula todas as métricas independentes.
     */

    const metrics = {

        thermalComfort:
            calculateThermalComfort(ctx),

        airQuality:
            calculateAirQuality(ctx),

        particulateLoad:
            calculateParticulateLoad(ctx),

        occupancy:
            calculateOccupancy(ctx),

        dewPoint:
            calculateDewPoint(ctx),

        co2Analysis:
            calculateCo2Analysis(ctx),    

    };


    /*
     * Disponibiliza as métricas básicas para os
     * calculators dependentes.
     */

    ctx.metrics = metrics;


    /*
     * Segunda etapa:
     * métricas derivadas.
     */

    metrics.qaiScore =
        calculateQaiScore(ctx);


    /*
     * Congela o resultado final.
     */

    ctx.metrics =
        Object.freeze(metrics);

    return ctx;

}