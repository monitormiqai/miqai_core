/**
 * ======================================================================
 * CORE QAI
 * NC0.5 Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : nc05.js
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
 * The SPS30 datasheet reports number concentration for the PM0.5 fraction; this value is descriptive and not a QAI regulatory limit.
 * ======================================================================
 */

const NC05_REGULATORY = Object.freeze({

    parameter: "nc05",

    validationKey: "nc05",

    displayName: "NC0.5",

    description:
        "Number concentration of particles in the SPS30 PM0.5 size fraction.",

    unit: "#/cm³",

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

export default NC05_REGULATORY;
