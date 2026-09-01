import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { resolveDomain } from "../../src/domains/index.js";
import { resolveRegulatory } from "../../src/regulatory/index.js";
import { validate } from "../../src/validation/index.js";
import { calculateMetrics } from "../../src/metrics/index.js";


console.log("\n========================================");
console.log("METRICS ENGINE — INTEGRAÇÃO");
console.log("========================================\n");


const ctx = createContext({

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


/* ======================================================================
 * DOMAIN
 * ====================================================================== */

resolveDomain(ctx);

assert.equal(

    ctx.domain.id,

    "corporate"

);


/* ======================================================================
 * REGULATORY
 * ====================================================================== */

resolveRegulatory(ctx);

assert.ok(

    ctx.regulatory,

    "Regulatory não resolvido."

);

assert.ok(

    Object.keys(ctx.regulatory).length > 0,

    "Regulatory vazio."

);


/* ======================================================================
 * VALIDATION
 * ====================================================================== */

validate(ctx);

assert.ok(

    ctx.validation,

    "Validation não produzida."

);

assert.ok(

    Object.keys(ctx.validation).length > 0,

    "Validation vazia."

);


/* ======================================================================
 * METRICS
 * ====================================================================== */

calculateMetrics(ctx);


/* ======================================================================
 * CONTRATO
 * ====================================================================== */

for (const key of [

    "thermalComfort",

    "airQuality",

    "particulateLoad",

    "occupancy",

    "dewPoint",

    "co2Analysis",

    "qaiScore"

]) {

    assert.ok(

        Object.hasOwn(ctx.metrics, key),

        `Métrica ausente: ${key}`

    );

}


/* ======================================================================
 * UNKNOWN — COMPONENTES SEM CRITÉRIO ATIVO
 * ====================================================================== */

assert.equal(

    ctx.metrics.thermalComfort.score,

    null

);

assert.equal(

    ctx.metrics.thermalComfort.level,

    "UNKNOWN"

);


assert.equal(

    ctx.metrics.airQuality.score,

    null

);

assert.equal(

    ctx.metrics.airQuality.level,

    "UNKNOWN"

);


assert.equal(

    ctx.metrics.particulateLoad.score,

    null

);

assert.equal(

    ctx.metrics.particulateLoad.level,

    "UNKNOWN"

);


assert.equal(

    ctx.metrics.occupancy.score,

    null

);

assert.equal(

    ctx.metrics.occupancy.level,

    "UNKNOWN"

);


/* ======================================================================
 * QAI SCORE
 * ====================================================================== */

assert.equal(

    ctx.metrics.qaiScore.score,

    null

);

assert.equal(

    ctx.metrics.qaiScore.level,

    "UNKNOWN"

);


/* ======================================================================
 * DEW POINT
 * ====================================================================== */

assert.equal(

    ctx.metrics.dewPoint.value,

    12

);


/* ======================================================================
 * CO2
 * ====================================================================== */

assert.equal(

    ctx.metrics.co2Analysis.indoor,

    650

);


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log("✓ Domain resolvido");

console.log("✓ Regulatory resolvido");

console.log("✓ Validation produzida");

console.log("✓ Metrics Engine produz contrato completo");

console.log("✓ Indicadores sem critério permanecem UNKNOWN");

console.log("✓ Occupancy não entra no Score");

console.log("✓ QAI Score permanece UNKNOWN sem componentes");

console.log("✓ Dew Point produzido");

console.log("✓ CO2 Analysis produzido");

console.log("\n✓ METRICS ENGINE — PASSED\n");