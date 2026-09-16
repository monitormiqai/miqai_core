import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { executePipeline } from "../../src/engine/pipeline.js";

function build(reading = {}) {
    return createContext({
        environment: "corporate",
        reading: {
            temperature: 23,
            humidity: 50,
            co2: 650,
            pm25: 6,
            pm10: 12,
            vocIndex: 90,
            noxIndex: 1,
            ...reading
        }
    });
}

console.log("\n========================================");
console.log("CORE QAI — FINAL SEMANTICS");
console.log("========================================\n");

{
    const ctx = build({ pm25: 30 });
    executePipeline(ctx);

    assert.equal(ctx.validation.pm25.currentAssessment, "ABOVE_REFERENCE");
    assert.equal(ctx.validation.pm25.evaluationPeriod, "24h_mean");
    assert.equal(ctx.validation.pm25.historicalAssessmentRequired, true);
    assert.equal(ctx.validation.pm25.scoreEligible, false);
    assert.equal(ctx.validation.pm25.passed, null);

    assert.equal(ctx.diagnosis.primary.id, "highPm25");
    assert.ok(ctx.evidence.records.some(x => x.id === "elevated_particulate"));
    assert.ok(ctx.hypotheses.matches.some(x => x.id === "outdoor_pollution"));
    assert.ok(ctx.mitigation.actions.length > 0);
    assert.equal(ctx.metrics.qaiScore.score, 50);

    assert.equal(ctx.references.primary.reference.id, "abnt_nbr_17037");
    assert.equal(ctx.references.primary.match.source, "regulatory");

    console.log("✓ PM2.5 mantém semântica regulatória 24h e participa independentemente do Score instantâneo");
}

{
    const ctx = build({ temperature: 29, humidity: 70 });
    executePipeline(ctx);

    assert.equal(ctx.metrics.thermalComfort.score, null);
    assert.equal(ctx.metrics.thermalComfort.level, "UNKNOWN");
    assert.equal(ctx.diagnosis.primary.id, "thermal_discomfort");
    assert.ok(ctx.evidence.records.some(x => x.id === "thermal_deviation"));
    assert.equal(ctx.validation.temperature.scoreEligible, false);
    assert.equal(ctx.validation.humidity.scoreEligible, false);
    assert.equal(ctx.references.primary.reference.id, "abnt_nbr_17037");
    assert.equal(ctx.references.primary.match.source, "regulatory");

    console.log("✓ Condição térmica atual gera orientação instrutiva sem criar Score de conforto");
}

{
    const ctx = build({ co2: 1400 });
    executePipeline(ctx);

    assert.equal(ctx.validation.co2.currentAssessment, "NOT_ASSESSED");
    assert.equal(ctx.validation.co2.scoreEligible, false);
    assert.equal(ctx.metrics.co2Analysis.level, "HIGH_CONTEXT");
    assert.ok(ctx.evidence.records.some(x => x.id === "elevated_co2"));

    console.log("✓ CO₂ interno permanece contextual");
}

{
    const ctx = build({
        temperature: null,
        humidity: null,
        co2: null,
        pm25: null,
        pm10: null,
        vocIndex: null,
        noxIndex: null
    });

    executePipeline(ctx);

    assert.equal(
        ctx.evidence.records.some(x => x.id === "normal_environment"),
        false
    );
    assert.equal(
        ctx.hypotheses.matches.some(x => x.id === "normal_operation"),
        false
    );
    assert.equal(
        ctx.mitigation.actions.some(x => x.id === "maintain_current_operation"),
        false
    );
    assert.equal(ctx.metrics.thermalComfort.level, "UNKNOWN");
    assert.equal(ctx.metrics.thermalComfort.score, null);

    console.log("✓ Dados ausentes não produzem normalidade ou manutenção operacional");
}

console.log("\n✓ FINAL SEMANTICS — PASSED\n");
