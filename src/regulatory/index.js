/**
 * ======================================================================
 * CORE QAI
 * Regulatory Library
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : Regulatory Library
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Resolver o perfil regulatório ativo para o Domain selecionado.
 *
 * A Regulatory Library não executa validações.
 * Não interpreta resultados.
 * Não calcula métricas.
 *
 * Sua única responsabilidade é disponibilizar ao Core o conjunto de
 * regras correspondente ao ambiente ativo.
 * ======================================================================
 */

import TEMPERATURE_REGULATORY from "./catalog/temperature.js";
import HUMIDITY_REGULATORY from "./catalog/humidity.js";
import CO2_REGULATORY from "./catalog/co2.js";
import PM25_REGULATORY from "./catalog/pm25.js";
import PM10_REGULATORY from "./catalog/pm10.js";
import VOC_INDEX_REGULATORY from "./catalog/vocIndex.js";
import NOX_INDEX_REGULATORY from "./catalog/noxIndex.js";

/* ======================================================================
 * CATÁLOGOS REGULATÓRIOS
 * ====================================================================== */

const CATALOGS = Object.freeze([

    TEMPERATURE_REGULATORY,

    HUMIDITY_REGULATORY,

    CO2_REGULATORY,

    PM25_REGULATORY,

    PM10_REGULATORY,

    VOC_INDEX_REGULATORY,

    NOX_INDEX_REGULATORY

]);

/* ======================================================================
 * REGULATORY RESOLVER
 * ====================================================================== */

export function resolveRegulatory(ctx) {

    const domain = ctx.domain;

    if (!domain?.profiles?.regulatory) {

        throw new Error(
            "Domain não possui regulatory profile."
        );

    }

    const profileName =
        domain.profiles.regulatory;

    const regulatory = {};

    for (const catalog of CATALOGS) {

        const profile =
            catalog.profiles?.[profileName];

        if (!profile) {

            throw new Error(

                `Perfil regulatório '${profileName}' não encontrado para '${catalog.parameter}'.`

            );

        }

        regulatory[catalog.parameter] = Object.freeze({

            parameter:
                catalog.parameter,

            validationKey:
                catalog.validationKey,

            displayName:
                catalog.displayName,

            description:
                catalog.description,

            unit:
                catalog.unit,

            ...profile

        });

    }

    ctx.regulatory =
        Object.freeze(regulatory);

    return ctx;

}

/* ======================================================================
 * EXPORTS
 * ====================================================================== */

export {

    CATALOGS

};

export default resolveRegulatory;