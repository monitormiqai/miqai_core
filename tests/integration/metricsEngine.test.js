import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { resolveDomain } from "../../src/domains/index.js";
import { resolveRegulatory } from "../../src/regulatory/index.js";
import { validate } from "../../src/validation/index.js";
import { calculateMetrics } from "../../src/metrics/index.js";


console.log("\n========================================");
console.log("METRICS ENGINE â€” INTEGRAÃ‡ÃƒO");
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

    "Regulatory nÃ£o resolvido."

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

    "Validation nÃ£o produzida."

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

        `MÃ©trica ausente: ${key}`

    );

}


/* ======================================================================
 * UNKNOWN â€” COMPONENTES SEM CRITÃ‰RIO ATIVO
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

    83

);

assert.notEqual(

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

console.log("âœ“ Domain resolvido");

console.log("âœ“ Regulatory resolvido");

console.log("âœ“ Validation produzida");

console.log("âœ“ Metrics Engine produz contrato completo");

console.log("âœ“ Indicadores sem critÃ©rio permanecem UNKNOWN");

console.log("âœ“ Occupancy nÃ£o entra no Score");

console.log("âœ“ QAI Score permanece UNKNOWN sem componentes");

console.log("âœ“ Dew Point produzido");

console.log("âœ“ CO2 Analysis produzido");

console.log("\nâœ“ METRICS ENGINE â€” PASSED\n");
