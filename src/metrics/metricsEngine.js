/**
 * ======================================================================
 * CORE QAI
 * Metrics Engine
 * ----------------------------------------------------------------------
 * Arquivo   : metricsEngine.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Calcular os indicadores derivados do CORE QAI.
 *
 * Entrada:
 *      ctx.raw
 *      ctx.validation
 *
 * Saída:
 *      ctx.metrics
 *
 * A Metrics Engine:
 *
 *  - Orquestra os calculators de métricas
 *  - Não executa validações
 *  - Não interpreta normas regulatórias
 *  - Não gera diagnósticos
 * ======================================================================
 */

import { calculateThermalComfort } from "./calculators/thermalComfort.js";
import { calculateAirQuality } from "./calculators/airQuality.js";
import { calculateParticulateLoad } from "./calculators/particulateLoad.js";
import { calculateOccupancy } from "./calculators/occupancy.js";
import { calculateQaiScore } from "./calculators/qaiScore.js";
import { calculateHealthRisk } from "./calculators/healthRisk.js";

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
            calculateOccupancy(ctx)

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

    metrics.healthRisk =
        calculateHealthRisk(ctx);

    /*
     * Congela o resultado final.
     */

    ctx.metrics =
        Object.freeze(metrics);

    return ctx;

}

