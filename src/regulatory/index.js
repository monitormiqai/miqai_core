/**
 * ======================================================================
 * CORE QAI
 * Regulatory Library
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : Regulatory Library
 * Versão    : 1.1.0
 * Status    : RC1 - SPS30 COMPLEMENTARY
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Resolver o perfil de conhecimento aplicável ao Domain selecionado.
 *
 * A Regulatory Library não executa validações.
 * Não interpreta resultados.
 * Não calcula métricas.
 *
 * Os parâmetros complementares do SPS30 são disponibilizados como
 * OBSERVATION e não são elegíveis para o QAI Score.
 * ======================================================================
 */

import TEMPERATURE_REGULATORY from "./catalog/temperature.js";
import HUMIDITY_REGULATORY from "./catalog/humidity.js";
import CO2_REGULATORY from "./catalog/co2.js";
import PM25_REGULATORY from "./catalog/pm25.js";
import PM10_REGULATORY from "./catalog/pm10.js";
import PM1_REGULATORY from "./catalog/pm1.js";
import PM4_REGULATORY from "./catalog/pm4.js";
import NC05_REGULATORY from "./catalog/nc05.js";
import NC1_REGULATORY from "./catalog/nc1.js";
import NC25_REGULATORY from "./catalog/nc25.js";
import NC4_REGULATORY from "./catalog/nc4.js";
import NC10_REGULATORY from "./catalog/nc10.js";
import TYPICAL_PARTICLE_SIZE_REGULATORY from "./catalog/typicalParticleSize.js";
import VOC_INDEX_REGULATORY from "./catalog/vocIndex.js";
import NOX_INDEX_REGULATORY from "./catalog/noxIndex.js";

const CATALOGS = Object.freeze([
    TEMPERATURE_REGULATORY,
    HUMIDITY_REGULATORY,
    CO2_REGULATORY,
    PM25_REGULATORY,
    PM10_REGULATORY,
    PM1_REGULATORY,
    PM4_REGULATORY,
    NC05_REGULATORY,
    NC1_REGULATORY,
    NC25_REGULATORY,
    NC4_REGULATORY,
    NC10_REGULATORY,
    TYPICAL_PARTICLE_SIZE_REGULATORY,
    VOC_INDEX_REGULATORY,
    NOX_INDEX_REGULATORY
]);

export function resolveRegulatory(ctx) {

    const domain = ctx.domain;

    if (!domain?.profiles?.regulatory) {
        throw new Error("Domain não possui regulatory profile.");
    }

    const profileName = domain.profiles.regulatory;
    const regulatory = {};

    for (const catalog of CATALOGS) {

        const profile = catalog.profiles?.[profileName];

        if (!profile) {
            throw new Error(
                `Perfil regulatório '${profileName}' não encontrado para '${catalog.parameter}'.`
            );
        }

        regulatory[catalog.parameter] = Object.freeze({
            parameter: catalog.parameter,
            validationKey: catalog.validationKey,
            displayName: catalog.displayName,
            description: catalog.description,
            unit: catalog.unit,
            ...profile,
            scoreEligible: profile.scoreEligible === true
        });
    }

    ctx.regulatory = Object.freeze(regulatory);

    return ctx;
}

export { CATALOGS };

export default resolveRegulatory;
