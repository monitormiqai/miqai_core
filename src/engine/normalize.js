/**
 * ======================================================================
 * CORE QAI
 * Normalize Engine
 * ----------------------------------------------------------------------
 * Arquivo   : normalize.js
 * Módulo    : Core Engine
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Padronizar a leitura recebida pelo CORE QAI.
 *
 * Produz exclusivamente:
 *
 *      ctx.raw
 *
 * Não interpreta.
 * Não valida.
 * Não calcula métricas.
 * Não aplica regras regulatórias.
 * ======================================================================
 */

/* ======================================================================
 * NORMALIZA NÚMEROS
 * ====================================================================== */

function normalizeNumber(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return null;
    }

    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : null;

}

/* ======================================================================
 * NORMALIZA LEITURA
 * ====================================================================== */

export function normalize(ctx) {

    const r = ctx.raw ?? {};

    ctx.raw = {

        /* ==========================================================
         * IDENTIFICAÇÃO
         * ========================================================== */

        deviceId:
            r.deviceId ??
            r.device_id ??
            null,

        created_at:
            r.created_at ??
            new Date().toISOString(),

        /* ==========================================================
         * CONFORTO TÉRMICO
         * ========================================================== */

        temperature:
            normalizeNumber(r.temperature),

        humidity:
            normalizeNumber(r.humidity),

        /* ==========================================================
         * GASES
         * ========================================================== */

        co2:
            normalizeNumber(r.co2),

        vocIndex:
            normalizeNumber(r.vocIndex),

        noxIndex:
            normalizeNumber(r.noxIndex),

        /* ==========================================================
         * MATERIAL PARTICULADO
         * ========================================================== */

        pm1_0:
            normalizeNumber(r.pm1_0),

        pm25:
            normalizeNumber(r.pm25),

        pm4_0:
            normalizeNumber(r.pm4_0),

        pm10:
            normalizeNumber(r.pm10),

        /* ==========================================================
         * CONTAGEM DE PARTÍCULAS
         * ========================================================== */

        nc0_5:
            normalizeNumber(r.nc0_5),

        nc1_0:
            normalizeNumber(r.nc1_0),

        nc2_5:
            normalizeNumber(r.nc2_5),

        nc4_0:
            normalizeNumber(r.nc4_0),

        nc10_0:
            normalizeNumber(r.nc10_0),

        /* ==========================================================
         * SENSOR
         * ========================================================== */

        typicalSize:
            normalizeNumber(r.typicalSize),

        /* ==========================================================
         * DISPOSITIVO
         * ========================================================== */

        signalStrength:
            normalizeNumber(
                r.signalStrength ??
                r.signal
            )

    };

}