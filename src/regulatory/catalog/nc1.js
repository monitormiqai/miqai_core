/**
 * ======================================================================
 * CORE QAI
 * NC1.0 Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : nc1.js
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
 * The value characterizes particle number in the PM1.0 fraction and is not a QAI regulatory limit.
 * ======================================================================
 */

const NC1_REGULATORY = Object.freeze({

    parameter: "nc1",

    validationKey: "nc1",

    displayName: "NC1.0",

    description:
        "Number concentration of particles in the SPS30 PM1.0 size fraction.",

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

export default NC1_REGULATORY;
