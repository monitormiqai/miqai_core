/**
 * CORE QAI — NOx Index Regulatory Catalog
 * Regulatory RC1 — no artificial threshold.
 */
import { NOX_INDEX_KNOWLEDGE } from "../../knowledge/noxIndexCatalog.js";

const NOX_INDEX_UNIT =
    NOX_INDEX_KNOWLEDGE.sensirion.unit ?? "index";

const NOX_INDEX_EVALUATION_PERIOD =
    NOX_INDEX_KNOWLEDGE.sensirion.evaluationPeriod ?? "current_reading";

const NOX_INDEX_CRITERION_NOTE =
    NOX_INDEX_KNOWLEDGE.sensirion.methodNote ??
    "Sensirion NOx Index is an operational relative index. No regulatory concentration limit is inferred from the index.";

const NOX_INDEX_REGULATORY = Object.freeze({
    parameter: "noxIndex",
    validationKey: "noxIndex",
    displayName: "NOx Index",
    description:
        "Relative NOx index used as an operational indicator; it is not a direct NOx concentration.",
    unit: NOX_INDEX_UNIT,

    profiles: Object.freeze({

        corporate: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: NOX_INDEX_EVALUATION_PERIOD,
            applicability: "indoor_air",
            referenceIds: ["sensirion_nox"],
            regulatoryId: "sensirion_nox",
            criterionNote: NOX_INDEX_CRITERION_NOTE
        }),

        healthcare: Object.freeze({
            regulated: false,
            type: "OBSERVATION",
            criterionKind: "TECHNICAL_REFERENCE",
            evaluationPeriod: NOX_INDEX_EVALUATION_PERIOD,
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
            evaluationPeriod: NOX_INDEX_EVALUATION_PERIOD,
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
            evaluationPeriod: NOX_INDEX_EVALUATION_PERIOD,
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
            evaluationPeriod: NOX_INDEX_EVALUATION_PERIOD,
            applicability: "indoor_air",
            referenceIds: ["sensirion_nox"],
            regulatoryId: "sensirion_nox",
            criterionNote:
                "Operational indicator only; no regulatory concentration limit is inferred."
        })

    })
});

export default NOX_INDEX_REGULATORY;
