/**
 * CORE QAI — NOx Index Regulatory Catalog
 * Regulatory RC1 — no artificial threshold.
 */
const NOX_INDEX_REGULATORY = Object.freeze({
    parameter: "noxIndex",
    validationKey: "noxIndex",
    displayName: "NOx Index",
    description:
        "Relative NOx index used as an operational indicator; it is not a direct NOx concentration.",
    unit: "index",

    profiles: Object.freeze({

        corporate: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "indoor_air",
            referenceIds: ["sensirion_nox"],
            regulatoryId: "sensirion_nox",
            criterionNote:
                "Sensirion NOx Index is an operational relative index. No regulatory concentration limit is inferred from the index."
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "indoor_air",
            referenceIds: ["sensirion_nox"],
            regulatoryId: "sensirion_nox",
            criterionNote:
                "Operational indicator only; no regulatory concentration limit is inferred."
        }),

        education: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "indoor_air",
            referenceIds: ["sensirion_nox"],
            regulatoryId: "sensirion_nox",
            criterionNote:
                "Operational indicator only; no regulatory concentration limit is inferred."
        }),

        residential: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "indoor_air",
            referenceIds: ["sensirion_nox"],
            regulatoryId: "sensirion_nox",
            criterionNote:
                "Operational indicator only; no regulatory concentration limit is inferred."
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            applicability: "indoor_air",
            referenceIds: ["sensirion_nox"],
            regulatoryId: "sensirion_nox",
            criterionNote:
                "Operational indicator only; no regulatory concentration limit is inferred."
        })

    })
});

export default NOX_INDEX_REGULATORY;
