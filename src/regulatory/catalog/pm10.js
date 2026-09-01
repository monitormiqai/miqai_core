/**
 * CORE QAI — PM10 Regulatory Catalog
 * Regulatory RC1 — rebuilt for traceability.
 */
const PM10_REGULATORY = Object.freeze({
    parameter: "pm10",
    validationKey: "pm10",
    displayName: "PM10",
    description: "Inhalable particulate matter concentration.",
    unit: "µg/m³",

    profiles: Object.freeze({

        corporate: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 50,
            referenceUnit: "µg/m³",
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "ABNT NBR 17037:2023 gives 50 µg/m³ as a 24-hour mean reference value. An instantaneous value above it calls for further measurement/source diagnosis, not automatic 24-hour non-compliance."
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 50,
            referenceUnit: "µg/m³",
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "24-hour reference; instantaneous readings are not direct 24-hour PASS/FAIL."
        }),

        education: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 50,
            referenceUnit: "µg/m³",
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "24-hour reference; instantaneous readings are not direct 24-hour PASS/FAIL."
        }),

        residential: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 45,
            referenceUnit: "µg/m³",
            applicability: "ambient_air_context",
            referenceIds: ["who_aqg_2021"],
            regulatoryId: "who_aqg_2021",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "WHO 2021 guideline value for PM10 is a 24-hour exposure reference. It is not an instantaneous indoor legal limit."
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "24h_mean",
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: 50,
            referenceUnit: "µg/m³",
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance:
                "A current reading may be flagged as above the reference value, but the 24-hour reference must not be represented as a 24-hour compliance result without the required observation period.",
            criterionNote:
                "24-hour reference; instantaneous readings are not direct compliance."
        })

    })
});

export default PM10_REGULATORY;
