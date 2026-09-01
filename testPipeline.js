import AnalisarQualidadeAmbiental from "./src/engine/analysis.js";

const reading = {
    temperature: 24,
    humidity: 55,
    co2: 800,
    pm25: 8,
    pm10: 15,
    vocIndex: 100,
    noxIndex: 1
};

const environment = "corporate";

const result = AnalisarQualidadeAmbiental({
    reading,
    environment
});

console.log("\n========================================");
console.log(" MIQAI CORE — TESTE DO PIPELINE");
console.log("========================================\n");

console.log("1. METADATA");
console.dir(result.metadata, { depth: null });

console.log("\n2. DOMAIN");
console.dir(result.domain, { depth: null });

console.log("\n3. VALIDATION");
console.dir(result.validation, { depth: null });

console.log("\n4. METRICS");
console.dir(result.metrics, { depth: null });

console.log("\n5. DIAGNOSIS");
console.dir(result.diagnosis, { depth: null });

console.log("\n6. EVIDENCE");
console.dir(result.evidence, { depth: null });

console.log("\n7. HYPOTHESES");
console.dir(result.hypotheses, { depth: null });

console.log("\n8. ENVIRONMENTAL SCENARIO");
console.dir(result.environmentalScenario, { depth: null });

console.log("\n9. RELATIONSHIPS");
console.dir(result.relationships, { depth: null });

console.log("\n10. IMPACTS");
console.dir(result.impacts, { depth: null });

console.log("\n11. HUMAN IMPACT");
console.dir(result.humanImpact, { depth: null });

console.log("\n12. MITIGATION");
console.dir(result.mitigation, { depth: null });

console.log("\n13. REFERENCES");
console.dir(result.references, { depth: null });

console.log("\n========================================");
console.log(" FIM DO TESTE");
console.log("========================================\n");