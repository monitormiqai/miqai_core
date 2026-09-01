/**
 * ======================================================================
 * CORE QAI
 * PM1.0 Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : pm1.js
 * Módulo    : Regulatory Library
 * Versão    : 1.0.0
 * Status    : RC1 - SPS30 COMPLEMENTARY
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar conhecimento complementar fornecido pelo SPS30.
 *
 * Este parâmetro:
 * - é disponibilizado para caracterização do material particulado;
 * - não representa, por si só, um limite regulatório de QAI;
 * - não participa do QAI Score;
 * - pode enriquecer Evidence, Hypotheses e Mitigations em etapas futuras;
 * - não estabelece causalidade.
 *
 * Fonte primária:
 * Sensirion SPS30 Datasheet.
 *
 * Nota:
 * PM1.0 is an additional mass-concentration output of the SPS30 and is treated here as complementary information.
 * ======================================================================
 */

const PM1_REGULATORY = Object.freeze({

    parameter: "pm1",

    validationKey: "pm1",

    displayName: "PM1.0",

    description:
        "Mass concentration of particulate matter with aerodynamic size up to approximately 1.0 µm.",

    unit: "µg/m³",

    profiles: Object.freeze({

        corporate: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            role: "COMPLEMENTARY",
            scoreEligible: false,
            regulatoryId: null,
            sourceType: "MANUFACTURER",
            sourceId: "SENSIRION-SPS30-DATASHEET",
            sourceUrl: "https://sensirion.com/file/datasheet_sps30"
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            role: "COMPLEMENTARY",
            scoreEligible: false,
            regulatoryId: null,
            sourceType: "MANUFACTURER",
            sourceId: "SENSIRION-SPS30-DATASHEET",
            sourceUrl: "https://sensirion.com/file/datasheet_sps30"
        }),

        education: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            role: "COMPLEMENTARY",
            scoreEligible: false,
            regulatoryId: null,
            sourceType: "MANUFACTURER",
            sourceId: "SENSIRION-SPS30-DATASHEET",
            sourceUrl: "https://sensirion.com/file/datasheet_sps30"
        }),

        residential: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            role: "COMPLEMENTARY",
            scoreEligible: false,
            regulatoryId: null,
            sourceType: "MANUFACTURER",
            sourceId: "SENSIRION-SPS30-DATASHEET",
            sourceUrl: "https://sensirion.com/file/datasheet_sps30"
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            role: "COMPLEMENTARY",
            scoreEligible: false,
            regulatoryId: null,
            sourceType: "MANUFACTURER",
            sourceId: "SENSIRION-SPS30-DATASHEET",
            sourceUrl: "https://sensirion.com/file/datasheet_sps30"
        })

    })

});

export default PM1_REGULATORY;
