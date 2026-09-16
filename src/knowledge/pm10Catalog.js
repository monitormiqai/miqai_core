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
            temporalGuidance: null,
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
        unit: criteria.unit ?? null,
        evaluationPeriod: criteria.evaluationPeriod ?? null,
        temporalGuidance: criteria.temporalGuidance ?? null,
        methodNote: criteria.methodNote ?? null
    };
}

const abntRecord = normalizeRecord(
    readJsonIfExists("abnt_nbr_17037_pm10_24h.v1.json"),
    "abnt_nbr_17037"
);

const whoRecord = normalizeRecord(
    readJsonIfExists("who_aqg_2021_pm10_24h.v1.json"),
    "who_aqg_2021"
);

export const PM10_KNOWLEDGE = Object.freeze({
    abnt: abntRecord,
    who: whoRecord
});
