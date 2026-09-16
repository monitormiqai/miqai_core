/**
 * CORE QAI — Humidity Regulatory Catalog
 * Regulatory RC1 — rebuilt for traceability.
 */
import { HUMIDITY_KNOWLEDGE } from "../../knowledge/humidityCatalog.js";

const ABNT_HUMIDITY_MIN =
    HUMIDITY_KNOWLEDGE.abnt.min ?? 35;

const ABNT_HUMIDITY_MAX =
    HUMIDITY_KNOWLEDGE.abnt.max ?? 65;

const ABNT_HUMIDITY_EVALUATION_PERIOD =
    HUMIDITY_KNOWLEDGE.abnt.evaluationPeriod ?? "instantaneous_reading";

const ABNT_HUMIDITY_CRITERION_NOTE =
    HUMIDITY_KNOWLEDGE.abnt.methodNote ??
    "ABNT NBR 17037:2023 gives 35 % to 65 % as a recommended range for indoor relative humidity.";

const HUMIDITY_REGULATORY = Object.freeze({
    parameter: "humidity",
    validationKey: "humidity",
    displayName: "Relative Humidity",
    description: "Indoor relative humidity.",
    unit: "%",

    profiles: Object.freeze({

        corporate: Object.freeze({
            regulated: false,
            type: "RANGE",
            min: ABNT_HUMIDITY_MIN,
            max: ABNT_HUMIDITY_MAX,
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_HUMIDITY_EVALUATION_PERIOD,
            applicability: "non_residential_artificially_conditioned",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote: ABNT_HUMIDITY_CRITERION_NOTE
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "RANGE",
            min: ABNT_HUMIDITY_MIN,
            max: ABNT_HUMIDITY_MAX,
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_HUMIDITY_EVALUATION_PERIOD,
            applicability: "non_residential_artificially_conditioned",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote:
                "ABNT NBR 17037:2023 gives 35 % to 65 % as a recommended range. Specific healthcare requirements may require additional assessment."
        }),

        education: Object.freeze({
            regulated: false,
            type: "RANGE",
            min: ABNT_HUMIDITY_MIN,
            max: ABNT_HUMIDITY_MAX,
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: ABNT_HUMIDITY_EVALUATION_PERIOD,
            applicability: "non_residential_artificially_conditioned",
            referenceIds: ["abnt_nbr_17037"],
            regulatoryId: "abnt_nbr_17037",
            criterionNote:
                "ABNT NBR 17037:2023 gives 35 % to 65 % as a recommended range."
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
                "ASHRAE Standard 55 does not establish a single universal minimum or maximum relative-humidity limit for thermal comfort."
        }),

        datacenter: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: "instantaneous_reading",
            applicability: "data_center",
            referenceIds: ["ashrae55"],
            regulatoryId: "ashrae55",
            criterionNote:
                "The current reference catalog does not contain a dedicated ASHRAE data-center environmental-envelope reference. No artificial pass/fail limit is introduced."
        })

    })
});

export default HUMIDITY_REGULATORY;
