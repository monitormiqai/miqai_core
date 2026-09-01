/**
 * CORE QAI — CO₂ Regulatory Catalog
 * Regulatory RC1 — rebuilt for traceability.
 *
 * Critical rule:
 * Indoor CO₂ is handled as a contextual observation.
 * No universal indoor maximum is introduced by this catalog.
 */
const CO2_REGULATORY = Object.freeze({
    parameter: "co2",
    validationKey: "co2",
    displayName: "Carbon Dioxide",
    description:
        "Indoor carbon dioxide concentration used as a complementary indicator for indoor-air and ventilation analysis.",
    unit: "ppm",

    profiles: Object.freeze({

        corporate: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "non_residential_artificially_conditioned",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote:
                "CO₂ is treated as a contextual technical observation; this catalog does not introduce a universal indoor maximum for the current CORE."
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "non_residential_artificially_conditioned",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote:
                "CO₂ is treated as a contextual technical observation; this catalog does not introduce a universal indoor maximum for the current CORE."
        }),

        education: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "non_residential_artificially_conditioned",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote:
                "CO₂ is treated as a contextual technical observation; this catalog does not introduce a universal indoor maximum for the current CORE."
        }),

        residential: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "residential",
            referenceIds: [],
            regulatoryId: null,
            criterionNote:
                "No indoor CO₂ limit is introduced without an applicable, traceable criterion in the current reference catalog."
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "data_center",
            referenceIds: ["ashrae62_1"],
            regulatoryId: "ashrae62_1",
            criterionNote:
                "ASHRAE 62.1 does not establish a universal maximum indoor CO₂ concentration for acceptable IAQ. CO₂ remains contextual."
        })

    })
});

export default CO2_REGULATORY;
