/**
 * CORE QAI — PM10 Regulatory Catalog
 * Regulatory RC1 — rebuilt for traceability.
 */

import { PM10_KNOWLEDGE } from "../../knowledge/pm10Catalog.js";

const ABNT_PM10_THRESHOLD =
    PM10_KNOWLEDGE.abnt.threshold ?? 50;

const ABNT_PM10_UNIT =
    PM10_KNOWLEDGE.abnt.unit ?? "µg/m³";

const ABNT_PM10_EVALUATION_PERIOD =
    PM10_KNOWLEDGE.abnt.evaluationPeriod ?? "24h_mean";

const ABNT_PM10_TEMPORAL_GUIDANCE =
    PM10_KNOWLEDGE.abnt.temporalGuidance ??
    "Uma leitura atual pode ser sinalizada como acima do valor de referência, mas a referência de 24 horas não deve ser representada como um resultado de conformidade de 24 horas sem o período de observação necessário.";

const ABNT_PM10_CRITERION_NOTE =
    PM10_KNOWLEDGE.abnt.methodNote ??
    "ABNT NBR 17037:2023 gives 50 µg/m³ as a 24-hour mean reference value. An instantaneous value above it calls for further measurement/source diagnosis, not automatic 24-hour non-compliance.";

const WHO_PM10_THRESHOLD =
    PM10_KNOWLEDGE.who.threshold ?? 45;

const WHO_PM10_UNIT =
    PM10_KNOWLEDGE.who.unit ?? "µg/m³";

const WHO_PM10_EVALUATION_PERIOD =
    PM10_KNOWLEDGE.who.evaluationPeriod ?? "24h_mean";

const WHO_PM10_CRITERION_NOTE =
    PM10_KNOWLEDGE.who.methodNote ??
    "WHO 2021 guideline value for PM10 is a 24-hour exposure reference. It is not an instantaneous indoor legal limit.";

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
            evaluationPeriod: ABNT_PM10_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: ABNT_PM10_THRESHOLD,
            referenceUnit: ABNT_PM10_UNIT,
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance: ABNT_PM10_TEMPORAL_GUIDANCE,
            criterionNote: ABNT_PM10_CRITERION_NOTE
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_PM10_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: ABNT_PM10_THRESHOLD,
            referenceUnit: ABNT_PM10_UNIT,
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance: ABNT_PM10_TEMPORAL_GUIDANCE,
            criterionNote:
                "24-hour reference; instantaneous readings are not direct 24-hour PASS/FAIL."
        }),

        education: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_PM10_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: ABNT_PM10_THRESHOLD,
            referenceUnit: ABNT_PM10_UNIT,
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance: ABNT_PM10_TEMPORAL_GUIDANCE,
            criterionNote:
                "24-hour reference; instantaneous readings are not direct 24-hour PASS/FAIL."
        }),

        residential: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: WHO_PM10_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: WHO_PM10_THRESHOLD,
            referenceUnit: WHO_PM10_UNIT,
            applicability: "ambient_air_context",
            referenceIds: ["who_aqg_2021"],
            regulatoryId: "who_aqg_2021",
            temporalGuidance:
                "Uma leitura atual pode ser sinalizada como acima do valor de referência, mas a referência de 24 horas não deve ser representada como um resultado de conformidade de 24 horas sem o período de observação necessário.",
            criterionNote: WHO_PM10_CRITERION_NOTE
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_PM10_EVALUATION_PERIOD,
            currentObservation: "ABOVE_REFERENCE_MAY_BE_FLAGGED",
            historicalAssessmentRequired: true,
            referenceThreshold: ABNT_PM10_THRESHOLD,
            referenceUnit: ABNT_PM10_UNIT,
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037", "who_aqg_2021"],
            regulatoryId: "abnt_nbr_17037",
            temporalGuidance: ABNT_PM10_TEMPORAL_GUIDANCE,
            criterionNote:
                "24-hour reference; instantaneous readings are not direct compliance."
        })

    })
});

export default PM10_REGULATORY;