import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import AnalisarQualidadeAmbiental from "../../src/engine/analysis.js";


/* ======================================================================
 * PATHS
 * ====================================================================== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(
    __dirname,
    "../../docs"
);

const outputFile = path.join(
    outputDir,
    "json-real-v1.json"
);


/* ======================================================================
 * HEADER
 * ====================================================================== */

console.log("\n========================================");
console.log("CORE QAI — REAL JSON V1");
console.log("========================================\n");


/* ======================================================================
 * 1. EXECUÇÃO DA API PÚBLICA
 * ====================================================================== */

const response = AnalisarQualidadeAmbiental({

    environment: "corporate",

    reading: {

        temperature: 23,

        humidity: 50,

        co2: 650,

        pm25: 6,

        pm10: 12,

        vocIndex: 90,

        noxIndex: 1

    }

});


assert.ok(
    response,
    "A API pública não produziu response."
);

console.log(
    "✓ API pública executada"
);


/* ======================================================================
 * 2. SERIALIZAÇÃO
 * ====================================================================== */

const json = JSON.stringify(
    response,
    null,
    2
);

assert.ok(
    json,
    "Não foi possível serializar o response."
);

console.log(
    "✓ Response serializado"
);


/* ======================================================================
 * 3. GARANTIR DIRETÓRIO
 * ====================================================================== */

fs.mkdirSync(
    outputDir,
    {
        recursive: true
    }
);


/* ======================================================================
 * 4. GRAVAÇÃO DO JSON REAL
 * ====================================================================== */

fs.writeFileSync(
    outputFile,
    json,
    "utf8"
);

assert.ok(
    fs.existsSync(outputFile),
    "Arquivo JSON REAL não foi criado."
);

console.log(
    "✓ JSON REAL salvo"
);


/* ======================================================================
 * 5. LEITURA NOVAMENTE
 * ====================================================================== */

const savedJson =
    fs.readFileSync(
        outputFile,
        "utf8"
    );

assert.ok(
    savedJson.length > 0,
    "Arquivo JSON REAL está vazio."
);

console.log(
    "✓ JSON REAL lido novamente"
);


/* ======================================================================
 * 6. VALIDAR JSON
 * ====================================================================== */

const parsed =
    JSON.parse(savedJson);

assert.deepEqual(
    parsed,
    JSON.parse(json),
    "JSON salvo não corresponde ao payload serializado produzido pela API."
);

console.log(
    "✓ Integridade do JSON preservada"
);


/* ======================================================================
 * 7. RESUMO ESTRUTURAL
 * ====================================================================== */

console.log("\n----------------------------------------");
console.log("ARQUIVO GERADO");
console.log("----------------------------------------");

console.log(
    outputFile
);

console.log("\n----------------------------------------");
console.log("TOP-LEVEL");
console.log("----------------------------------------");

console.log(
    Object.keys(parsed)
);


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log("\n✓ REAL JSON V1 — PASSED\n");