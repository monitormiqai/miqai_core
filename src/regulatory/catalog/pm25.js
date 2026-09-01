/**
 * CORE QAI — PM2.5 Regulatory Catalog
 * Regulatory RC1 — rebuilt for traceability.
 *
 * Important: ABNT NBR 17037 uses a 24-hour mean. An instantaneous
 * 60-second sensor reading must not be represented as compliance with
 * that 24-hour criterion.
 */
const PM25_REGULATORY = Object.freeze({
    parameter: "pm25",
    validationKey: "pm25",
    displayName: "PM2.5",
    description: "Fine particulate matter concentration.",
    unit: "µg/m³",

    profiles: Object.freeze({

        corporate: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 25,
            referenceUnit: "µg/m³",
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "ABNT NBR 17037:2023 gives 25 µg/m³ as a 24-hour mean reference value. An instantaneous reading above this value indicates the need for additional measurements or source diagnosis; it is not by itself a 24-hour compliance failure."
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 25,
            referenceUnit: "µg/m³",
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "24-hour reference; instantaneous readings are treated as evidence requiring further assessment, not as direct 24-hour PASS/FAIL."
        }),

        education: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 25,
            referenceUnit: "µg/m³",
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "24-hour reference; instantaneous readings are not converted into 24-hour compliance."
        }),

        residential: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 15,
            referenceUnit: "µg/m³",
            applicability: "ambient_air_context",
            referenceIds: ["who_aqg_2021"],
            regulatoryId: "who_aqg_2021",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "WHO 2021 guideline value for PM2.5 is a 24-hour exposure reference. It is not an instantaneous indoor legal limit."
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 25,
            referenceUnit: "µg/m³",
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "24-hour reference; instantaneous readings are not treated as direct compliance."
        })

    })
});

export default PM25_REGULATORY;
