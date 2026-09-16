/**
 * CORE QAI — Temperature Regulatory Catalog
 * Regulatory RC1 — rebuilt for traceability.
 *
 * Regulatory only declares the knowledge applicable to each Domain.
 * It does not calculate, diagnose, infer causes or recommend actions.
 */
import { TEMPERATURE_KNOWLEDGE } from "../../knowledge/temperatureCatalog.js";

const ABNT_TEMPERATURE_MIN =
    TEMPERATURE_KNOWLEDGE.abnt.min ?? 21;

const ABNT_TEMPERATURE_MAX =
    TEMPERATURE_KNOWLEDGE.abnt.max ?? 26;

const ABNT_TEMPERATURE_EVALUATION_PERIOD =
    TEMPERATURE_KNOWLEDGE.abnt.evaluationPeriod ?? "instantaneous_reading";

const ABNT_TEMPERATURE_CRITERION_NOTE =
    TEMPERATURE_KNOWLEDGE.abnt.methodNote ??
    "ABNT NBR 17037:2023 specifies 21 °C to 26 °C for indoor dry-bulb air temperature. This is a technical reference for indoor air quality, not a universal legal limit.";

const TEMPERATURE_REGULATORY = Object.freeze({
    parameter: "temperature",
    validationKey: "temperature",
    displayName: "Temperature",
    description: "Indoor dry-bulb air temperature.",
    unit: "°C",

    profiles: Object.freeze({

        corporate: Object.freeze({
            regulated: false,
            type: "RANGE",
            min: ABNT_TEMPERATURE_MIN,
            max: ABNT_TEMPERATURE_MAX,
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_TEMPERATURE_EVALUATION_PERIOD,
            applicability: "non_residential_artificially_conditioned",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote: ABNT_TEMPERATURE_CRITERION_NOTE
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "RANGE",
            min: ABNT_TEMPERATURE_MIN,
            max: ABNT_TEMPERATURE_MAX,
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_TEMPERATURE_EVALUATION_PERIOD,
            applicability: "non_residential_artificially_conditioned",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote:
                "ABNT NBR 17037:2023 specifies 21 °C to 26 °C for indoor dry-bulb air temperature. Specific healthcare requirements may require additional assessment."
        }),

        education: Object.freeze({
            regulated: false,
            type: "RANGE",
            min: ABNT_TEMPERATURE_MIN,
            max: ABNT_TEMPERATURE_MAX,
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_TEMPERATURE_EVALUATION_PERIOD,
            applicability: "non_residential_artificially_conditioned",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote:
                "ABNT NBR 17037:2023 specifies 21 °C to 26 °C for indoor dry-bulb air temperature."
        }),

        residential: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "instantaneous_reading",
            applicability: "residential",
            referenceIds: ["ashrae55"],
            regulatoryId: "ashrae55",
            criterionNote:
                "ASHRAE Standard 55 evaluates thermal comfort from multiple environmental and personal factors. No single universal temperature range is used here as a regulatory pass/fail limit."
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "instantaneous_reading",
            applicability: "data_center",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote:
                "The generic indoor-air criterion is retained only as contextual information. Data-center equipment envelopes require dedicated technical assessment."
        })

    })
});

export default TEMPERATURE_REGULATORY;
