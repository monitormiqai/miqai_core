/**
 * CORE QAI — PM2.5 Regulatory Catalog
 * Regulatory RC1 — rebuilt for traceability.
 *
 * Important: ABNT NBR 17037 uses a 24-hour mean. An instantaneous
 * 60-second sensor reading must not be represented as compliance with
 * that 24-hour criterion.
 */

import { PM25_KNOWLEDGE } from "../../knowledge/pm25Catalog.js";

const ABNT_PM25_THRESHOLD =
    PM25_KNOWLEDGE.abnt.threshold ?? 25;

const ABNT_PM25_UNIT =
    PM25_KNOWLEDGE.abnt.unit ?? "µg/m³";

const ABNT_PM25_EVALUATION_PERIOD =
    PM25_KNOWLEDGE.abnt.evaluationPeriod ?? "24h_mean";

const ABNT_PM25_TEMPORAL_GUIDANCE =
    PM25_KNOWLEDGE.abnt.temporalGuidance ??
    "Uma leitura atual pode ser sinalizada como acima do valor de referência, mas a referência de 24 horas não deve ser representada como um resultado de conformidade de 24 horas sem o período de observação necessário.";

const ABNT_PM25_CRITERION_NOTE =
    PM25_KNOWLEDGE.abnt.methodNote ??
    "ABNT NBR 17037:2023 gives 25 µg/m³ as a 24-hour mean reference value. An instantaneous reading above this value indicates the need for additional measurements or source diagnosis; it is not by itself a 24-hour compliance failure.";

const WHO_PM25_THRESHOLD =
    PM25_KNOWLEDGE.who.threshold ?? 15;

const WHO_PM25_UNIT =
    PM25_KNOWLEDGE.who.unit ?? "µg/m³";

const WHO_PM25_EVALUATION_PERIOD =
    PM25_KNOWLEDGE.who.evaluationPeriod ?? "24h_mean";

const WHO_PM25_CRITERION_NOTE =
    PM25_KNOWLEDGE.who.methodNote ??
    "WHO 2021 guideline value for PM2.5 is a 24-hour exposure reference. It is not an instantaneous indoor legal limit.";

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
            evaluationPeriod: ABNT_PM25_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: ABNT_PM25_THRESHOLD,
            referenceUnit: ABNT_PM25_UNIT,
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance: ABNT_PM25_TEMPORAL_GUIDANCE,
            criterionNote: ABNT_PM25_CRITERION_NOTE
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_PM25_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: ABNT_PM25_THRESHOLD,
            referenceUnit: ABNT_PM25_UNIT,
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance: ABNT_PM25_TEMPORAL_GUIDANCE,
            criterionNote:
                "24-hour reference; instantaneous readings are treated as evidence requiring further assessment, not as direct 24-hour PASS/FAIL."
        }),

        education: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_PM25_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: ABNT_PM25_THRESHOLD,
            referenceUnit: ABNT_PM25_UNIT,
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance: ABNT_PM25_TEMPORAL_GUIDANCE,
            criterionNote:
                "24-hour reference; instantaneous readings are not converted into 24-hour compliance."
        }),

        residential: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: WHO_PM25_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: WHO_PM25_THRESHOLD,
            referenceUnit: WHO_PM25_UNIT,
            applicability: "ambient_air_context",
            referenceIds: ["who_aqg_2021"],
            regulatoryId: "who_aqg_2021",
            temporalGuidance:
                "Uma leitura atual pode ser sinalizada como acima do valor de referência, mas a referência de 24 horas não deve ser representada como um resultado de conformidade de 24 horas sem o período de observação necessário.",
            criterionNote: WHO_PM25_CRITERION_NOTE
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_PM25_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: ABNT_PM25_THRESHOLD,
            referenceUnit: ABNT_PM25_UNIT,
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance: ABNT_PM25_TEMPORAL_GUIDANCE,
            criterionNote:
                "24-hour reference; instantaneous readings are not treated as direct compliance."
        })

    })
});

export default PM25_REGULATORY;