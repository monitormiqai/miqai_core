import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.resolve(here, "../../src");

const forbidden = [
    "co2Outdoor",
    "co2_outdoor",
    "outdoorCo2",
    "outdoor_co2",
    "co2Delta",
    "OUTDOOR_DIFFERENTIAL",
    "analyzeWithOutdoor"
];

function walk(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full));
        else if (/\.(js|md|json)$/.test(entry.name)) out.push(full);
    }
    return out;
}

const files = walk(srcRoot);
const violations = [];

for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const token of forbidden) {
        if (text.includes(token)) violations.push(`${path.relative(srcRoot, file)} -> ${token}`);
    }
}

assert.deepEqual(violations, []);
console.log("✓ CORE não contém dependências legadas de CO₂ externo/diferencial");
