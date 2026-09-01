/**
 * CORE QAI — VOC Index Regulatory Catalog
 * Regulatory RC1 — no artificial threshold.
 */
const VOC_INDEX_REGULATORY = Object.freeze({
    parameter: "vocIndex",
    validationKey: "vocIndex",
    displayName: "VOC Index",
    description:
        "Relative VOC index used as an operational indicator; it is not a direct VOC concentration.",
    unit: "index",

    profiles: Object.freeze({

        corporate: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            referenceThreshold: 100,
            applicability: "indoor_air",
            referenceIds: ["sensirion_voc"],
            regulatoryId: "sensirion_voc",
            criterionNote:
                "Sensirion VOC Index is an operational relative index. Values above the documented baseline of 100 indicate a relative deterioration from the recent environmental baseline; this is not a regulatory concentration limit."
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            referenceThreshold: 100,
            applicability: "indoor_air",
            referenceIds: ["sensirion_voc"],
            regulatoryId: "sensirion_voc",
            criterionNote:
                "Values above the documented Sensirion baseline of 100 indicate a relative deterioration of the VOC Index; this is not a regulatory concentration limit."
        }),

        education: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            referenceThreshold: 100,
            applicability: "indoor_air",
            referenceIds: ["sensirion_voc"],
            regulatoryId: "sensirion_voc",
            criterionNote:
                "Values above the documented Sensirion baseline of 100 indicate a relative deterioration of the VOC Index; this is not a regulatory concentration limit."
        }),

        residential: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            referenceThreshold: 100,
            applicability: "indoor_air",
            referenceIds: ["sensirion_voc"],
            regulatoryId: "sensirion_voc",
            criterionNote:
                "Values above the documented Sensirion baseline of 100 indicate a relative deterioration of the VOC Index; this is not a regulatory concentration limit."
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "current_reading",
            referenceThreshold: 100,
            applicability: "indoor_air",
            referenceIds: ["sensirion_voc"],
            regulatoryId: "sensirion_voc",
            criterionNote:
                "Values above the documented Sensirion baseline of 100 indicate a relative deterioration of the VOC Index; this is not a regulatory concentration limit."
        })

    })
});

export default VOC_INDEX_REGULATORY;
