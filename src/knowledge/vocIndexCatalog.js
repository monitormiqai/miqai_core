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
            threshold: null,
            unit: null,
            evaluationPeriod: null,
            methodNote: null
        };
    }

    const criteria = record?.criteria ?? {};

    return {
        referenceId: criteria.referenceId ?? fallbackReferenceId,
        threshold:
            Number.isFinite(criteria.threshold)
                ? criteria.threshold
                : null,
        unit: criteria.unit ?? record?.parameterDefinition?.unit ?? null,
        evaluationPeriod: criteria.evaluationPeriod ?? null,
        methodNote: criteria.methodNote ?? null
    };
}

const sensirionRecord = normalizeRecord(
    readJsonIfExists("sensirion_voc_index.v1.json"),
    "sensirion_voc"
);

export const VOC_INDEX_KNOWLEDGE = Object.freeze({
    sensirion: sensirionRecord
});
