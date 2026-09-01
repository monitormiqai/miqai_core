/**
 * ======================================================================
 * CORE QAI
 * Typical Particle Size Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : typicalParticleSize.js
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
 * The SPS30 datasheet describes this as an indication of average particle diameter derived from the measured particle-number distribution; it does not identify a pollution source by itself.
 * ======================================================================
 */

const TYPICAL_PARTICLE_SIZE_REGULATORY = Object.freeze({

    parameter: "typicalParticleSize",

    validationKey: "typicalParticleSize",

    displayName: "Typical Particle Size",

    description:
        "Indicative average particle diameter in the sampled aerosol, as defined by the SPS30 manufacturer.",

    unit: "µm",

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

export default TYPICAL_PARTICLE_SIZE_REGULATORY;
