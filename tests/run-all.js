/**
 * ======================================================================
 * CORE QAI
 * Test Runner
 * ----------------------------------------------------------------------
 * Executa a suíte de testes RC atual.
 * ======================================================================
 */

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const testsDir = path.dirname(fileURLToPath(import.meta.url));

const tests = [
    "pipeline.test.js",
    "pipeline.e2e.test.js",
    "validation.test.js",

    path.join("metrics", "qai.test.js"),
    path.join("metrics", "co2Analysis.test.js"),
    path.join("metrics", "dewPoint.test.js"),
    path.join("metrics", "unknownCalculators.test.js"),
    path.join("metrics", "healthRisk.test.js"),

    path.join("integration", "metricsEngine.test.js"),
    path.join("integration", "co2InternalOnlyContract.test.js"),
    path.join("integration", "finalSemantics.test.js"),

    path.join("mitigations", "mitigations.test.js")
];

let failed = 0;

console.log("");
console.log("========================================");
console.log("CORE QAI — TEST SUITE");
console.log("========================================");

for (const test of tests) {

    console.log("");
    console.log(`>>> ${test}`);

    const testPath = path.join(testsDir, test);

    const result = spawnSync(
        process.execPath,
        [testPath],
        {
            stdio: "inherit"
        }
    );

    if (result.status !== 0) {

        failed++;

        console.log("");
        console.log(`✗ ${test}`);

    } else {

        console.log("");
        console.log(`✓ ${test}`);

    }

}

console.log("");
console.log("========================================");
console.log("CORE QAI — RESULTADO DA SUÍTE");
console.log("========================================");

if (failed === 0) {

    console.log("✓ TODOS OS TESTES PASSARAM");

} else {

    console.log(`✗ ${failed} TESTE(S) FALHARAM`);

}

console.log("");

process.exitCode = failed === 0 ? 0 : 1;