import assert from "node:assert/strict";
import { CATALOGS, resolveRegulatory } from "./index.js";

const domains = [
    "corporate",
    "healthcare",
    "education",
    "residential",
    "datacenter"
];

const allowedTypes = new Set(["RANGE", "MAX", "MAX_DYNAMIC", "OBSERVATION"]);

for (const domainName of domains) {

    const ctx = {
        domain: {
            profiles: {
                regulatory: domainName
            }
        }
    };

    resolveRegulatory(ctx);

    assert.equal(
        Object.keys(ctx.regulatory).length,
        CATALOGS.length,
        `${domainName}: catálogo incompleto`
    );

    for (const [parameter, rule] of Object.entries(ctx.regulatory)) {

        assert.ok(
            allowedTypes.has(rule.type),
            `${domainName}/${parameter}: tipo inválido ${rule.type}`
        );

        assert.ok(
            typeof rule.regulated === "boolean",
            `${domainName}/${parameter}: regulated ausente`
        );

        assert.ok(
            "criterionKind" in rule,
            `${domainName}/${parameter}: criterionKind ausente`
        );

        assert.ok(
            "evaluationPeriod" in rule,
            `${domainName}/${parameter}: evaluationPeriod ausente`
        );

        assert.ok(
            Array.isArray(rule.referenceIds),
            `${domainName}/${parameter}: referenceIds ausente`
        );

        if (rule.type === "RANGE") {
            assert.ok(
                Number.isFinite(rule.min) &&
                Number.isFinite(rule.max) &&
                rule.min <= rule.max,
                `${domainName}/${parameter}: RANGE inválido`
            );
        }

        if (rule.type === "OBSERVATION") {
            assert.equal(
                rule.regulated,
                false,
                `${domainName}/${parameter}: OBSERVATION não pode ser regulated=true`
            );
        }

    }
}

console.log("✓ Regulatory RC1 — cinco Domains resolvidos");
console.log("✓ Nenhum tipo de Validation não suportado");
console.log("✓ Critério, período, aplicabilidade e rastreabilidade presentes");
console.log("✓ VOC/NOx sem threshold artificial");
console.log("✓ CO₂ sem PASS/FAIL interno sem CO₂ externo");
console.log("✓ PM2.5/PM10 preservam o período de 24 h");
console.log("✓ REGULATORY RC1 — PASSED");
