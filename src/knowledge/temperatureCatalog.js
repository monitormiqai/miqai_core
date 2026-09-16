import fs from "node:fs";
import path from "node:path";

const RECORDS_DIR = path.join(process.cwd(), "knowledge", "records");

function isRuntimeEligible(record) {
    const validationStatus =
        record?.validation?.validationStatus;

    const useAsCriteria =
        record?.approval?.useAsCriteria;

    return (
        validationStatus === "APPROVED" &&
        useAsCriteria === true
    );
}

function readJsonIfExists(fileName) {
    try {
        const filePath = path.join(RECORDS_DIR, fileName);
        const raw = fs.readFileSync(filePath, "utf8");
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function normalizeRecord(record, fallbackReferenceId) {
    if (!isRuntimeEligible(record)) {
        return {
            referenceId: fallbackReferenceId,
            min: null,
            max: null,
            unit: null,
            evaluationPeriod: null,
            methodNote: null
        };
    }

    const criteria = record?.criteria ?? {};
    const typicalRange = record?.parameterDefinition?.typicalRange ?? {};

    return {
        referenceId: criteria.referenceId ?? fallbackReferenceId,
        min:
            Number.isFinite(typicalRange.min)
                ? typicalRange.min
                : null,
        max:
            Number.isFinite(typicalRange.max)
                ? typicalRange.max
                : null,
        unit: criteria.unit ?? record?.parameterDefinition?.unit ?? null,
        evaluationPeriod: criteria.evaluationPeriod ?? null,
        methodNote: criteria.methodNote ?? null
    };
}

const abntRecord = normalizeRecord(
    readJsonIfExists("abnt_nbr_17037_temperature.v1.json"),
    "abnt_nbr_17037"
);

export const TEMPERATURE_KNOWLEDGE = Object.freeze({
    abnt: abntRecord
});
