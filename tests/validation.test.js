import assert from "node:assert/strict";

import { createContext } from "../src/engine/context.js";
import { resolveDomain } from "../src/domains/index.js";
import { resolveRegulatory } from "../src/regulatory/index.js";
import { validate } from "../src/validation/index.js";

function build(reading = {}) {
    const ctx = createContext({
        environment: "corporate",
        reading: {
            temperature: 23,
            humidity: 50,
            co2: 650,
            pm25: 30,
            pm10: 60,
            vocIndex: 100,
            noxIndex: 1,
            ...reading
        }
    });
    resolveDomain(ctx);
    resolveRegulatory(ctx);
    validate(ctx);
    return ctx;
}

console.log("\n========================================");
console.log("VALIDATION — CURRENT ASSESSMENT / SCORE ELIGIBILITY");
console.log("========================================\n");

{
    const ctx = build();
    const pm25 = ctx.validation.pm25;

    assert.equal(pm25.state, "OBSERVATION");
    assert.equal(pm25.passed, null);
    assert.equal(pm25.currentAssessment, "ABOVE_REFERENCE");
    assert.equal(pm25.evaluationPeriod, "24h_mean");
    assert.equal(pm25.historicalAssessmentRequired, true);
    assert.equal(pm25.scoreEligible, false);
    assert.deepEqual(pm25.referenceIds, ["abnt_nbr_17037", "who_aqg_2021"]);

    console.log("✓ PM2.5 preserva condição atual sem transformar 24h em PASS/FAIL");
}

{
    const ctx = build({ pm25: 10 });
    const pm25 = ctx.validation.pm25;

    assert.equal(pm25.currentAssessment, "WITHIN_REFERENCE");
    assert.equal(pm25.scoreEligible, false);

    console.log("✓ PM2.5 dentro da referência continua fora do Score");
}

{
    const ctx = build({ vocIndex: 300 });
    const voc = ctx.validation.vocIndex;

    assert.equal(voc.state, "OBSERVATION");
    assert.equal(voc.currentAssessment, "ABOVE_REFERENCE");
    assert.equal(voc.evaluationPeriod, "current_reading");
    assert.equal(voc.scoreEligible, false);

    console.log("✓ VOC Index usa baseline técnico sem criar limite regulatório");
}

{
    const ctx = build({ co2: 1400 });
    const co2 = ctx.validation.co2;

    assert.equal(co2.currentAssessment, "NOT_ASSESSED");
    assert.equal(co2.scoreEligible, false);

    console.log("✓ CO₂ interno permanece contextual sem threshold universal");
}

{
    const ctx = build({ pm25: 20 });

    ctx.regulatory = {
        ...ctx.regulatory,
        pm25: {
            ...ctx.regulatory.pm25,
            threshold: 10,
            referenceThreshold: 100
        }
    };

    validate(ctx);

    const pm25 = ctx.validation.pm25;

    assert.equal(
        pm25.currentAssessment,
        "ABOVE_REFERENCE"
    );

    console.log("✓ threshold prevalece sobre referenceThreshold");
}

{
    const ctx = build({ pm25: 20 });

    ctx.regulatory = {
        ...ctx.regulatory,
        pm25: {
            ...ctx.regulatory.pm25,
            threshold: undefined,
            referenceThreshold: 10
        }
    };

    validate(ctx);

    const pm25 = ctx.validation.pm25;

    assert.equal(
        pm25.currentAssessment,
        "ABOVE_REFERENCE"
    );

    console.log("✓ referenceThreshold é usado quando threshold não existe");
}

{
    const ctx = build({ pm25: 20 });

    ctx.regulatory = {
        ...ctx.regulatory,
        pm25: {
            ...ctx.regulatory.pm25,
            threshold: undefined,
            referenceThreshold: 10,
            applicability: "ambient_outdoor",
            criterionKind: "TECHNICAL_REFERENCE",
            referenceIds: ["who_aqg_2021"]
        }
    };

    validate(ctx);

    const pm25 = ctx.validation.pm25;

    assert.equal(
        pm25.currentAssessment,
        "NOT_ASSESSED"
    );
    assert.equal(
        pm25.criterionKind,
        "TECHNICAL_REFERENCE"
    );
    assert.equal(
        pm25.applicability,
        "ambient_outdoor"
    );
    assert.equal(
        pm25.referenceThreshold,
        10
    );
    assert.deepEqual(
        pm25.referenceIds,
        ["who_aqg_2021"]
    );

    console.log("✓ mismatch de applicability não gera ABOVE_REFERENCE operacional e preserva semântica");
}

{
    const ctx = build({ temperature: 25 });

    ctx.regulatory = {
        ...ctx.regulatory,
        temperature: {
            ...ctx.regulatory.temperature,
            type: "RANGE",
            min: undefined,
            max: undefined,
            criterionKind: "TECHNICAL_REFERENCE",
            applicability: "indoor_air",
            referenceIds: ["abnt_nbr_17037"]
        }
    };

    validate(ctx);

    const temperature = ctx.validation.temperature;

    assert.equal(temperature.currentAssessment, "NOT_ASSESSED");
    assert.equal(temperature.state, "OBSERVATION");
    assert.equal(temperature.passed, null);
    assert.deepEqual(temperature.referenceIds, ["abnt_nbr_17037"]);

    console.log("✓ RANGE sem min/max mantém metadata e não dispara comparação operacional");
}

console.log("\n✓ VALIDATION — PASSED\n");
