import assert from "node:assert/strict";

import {
    calculateCo2Analysis,
    CO2_LOWER_RANGE_LIMIT,
    CO2_HIGH_CONTEXT_LIMIT,
    REFERENCE_IDS
} from "../../src/metrics/calculators/co2Analysis.js";


console.log("\n========================================");
console.log("CO2 ANALYSIS — CONTRATO V1");
console.log("========================================\n");


/* ======================================================================
 * CONSTANTES
 * ====================================================================== */

assert.equal(
    CO2_LOWER_RANGE_LIMIT,
    800
);

assert.equal(
    CO2_HIGH_CONTEXT_LIMIT,
    1000
);

assert.deepEqual(
    REFERENCE_IDS,
    [
        "abnt_nbr_17037",
        "ashrae62_1"
    ]
);


/* ======================================================================
 * CO2 BAIXO
 * ====================================================================== */

const lowerRange =
    calculateCo2Analysis({

        raw: {},

        validation: {

            co2: {

                state: "OBSERVATION",

                value: 650

            }

        }

    });


assert.equal(
    lowerRange.available,
    true
);

assert.equal(
    lowerRange.indoor,
    650
);


assert.equal(
    lowerRange.basis,
    "INDOOR_CONTEXTUAL_OBSERVATION"
);

assert.equal(
    lowerRange.level,
    "LOWER_RANGE"
);

assert.equal(
    lowerRange.elevated,
    false
);

assert.equal(
    lowerRange.elevatedThreshold,
    null
);

assert.deepEqual(
    lowerRange.referenceIds,
    [
        "abnt_nbr_17037",
        "ashrae62_1"
    ]
);

assert.equal(
    lowerRange.referenceType,
    "TECHNICAL_CONTEXT"
);

assert.equal(
    lowerRange.persistence.evaluated,
    false
);


/* ======================================================================
 * CO2 — CONTEXTO ELEVADO
 * ====================================================================== */

const elevatedContext =
    calculateCo2Analysis({

        raw: {},

        validation: {

            co2: {

                state: "OBSERVATION",

                value: 900

            }

        }

    });


assert.equal(
    elevatedContext.available,
    true
);

assert.equal(
    elevatedContext.indoor,
    900
);


assert.equal(
    elevatedContext.basis,
    "INDOOR_CONTEXTUAL_OBSERVATION"
);

assert.equal(
    elevatedContext.level,
    "ELEVATED_CONTEXT"
);

assert.equal(
    elevatedContext.elevated,
    true
);

assert.equal(
    elevatedContext.elevatedThreshold,
    null
);

assert.equal(
    elevatedContext.persistence.evaluated,
    false
);


/* ======================================================================
 * CO2 — CONTEXTO ALTO
 * ====================================================================== */

const highContext =
    calculateCo2Analysis({

        raw: {},

        validation: {

            co2: {

                state: "OBSERVATION",

                value: 1200

            }

        }

    });


assert.equal(
    highContext.available,
    true
);

assert.equal(
    highContext.indoor,
    1200
);


assert.equal(
    highContext.basis,
    "INDOOR_CONTEXTUAL_OBSERVATION"
);

assert.equal(
    highContext.level,
    "HIGH_CONTEXT"
);

assert.equal(
    highContext.elevated,
    true
);

assert.equal(
    highContext.elevatedThreshold,
    null
);

assert.equal(
    highContext.persistence.evaluated,
    false
);


/* ======================================================================
 * SEM CO2
 * ====================================================================== */

const missing =
    calculateCo2Analysis({

        raw: {},

        validation: {

            co2: {

                state: "MISSING",

                value: null

            }

        }

    });


assert.equal(
    missing.available,
    false
);

assert.equal(
    missing.indoor,
    null
);


assert.equal(
    missing.basis,
    "UNAVAILABLE"
);

assert.equal(
    missing.level,
    "UNKNOWN"
);


/* ======================================================================
 * CONTRATO SEM CO₂ EXTERNO
 * ====================================================================== */

/*
 * A análise não possui campos de CO₂ externo nem diferencial.
 * A leitura é exclusivamente interna.
 */
const internalOnly = calculateCo2Analysis({
    raw: {},
    validation: { co2: { state: "OBSERVATION", value: 1200 } }
});

assert.equal(internalOnly.indoor, 1200);
assert.equal(Object.hasOwn(internalOnly, "outdoor"), false);
assert.equal(Object.hasOwn(internalOnly, "differential"), false);
assert.equal(internalOnly.basis, "INDOOR_CONTEXTUAL_OBSERVATION");

/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "✓ Faixa inferior < 800 ppm"
);

console.log(
    "✓ Contexto elevado entre 800 e 1000 ppm"
);

console.log(
    "✓ Contexto alto > 1000 ppm"
);

console.log(
    "✓ CO2 externo não participa do V1"
);

console.log(
    "✓ Análise de CO₂ não possui diferencial"
);

console.log(
    "✓ 700 ppm não é aplicado como threshold interno"
);

console.log(
    "✓ Persistência não é avaliada pelo CORE"
);

console.log(
    "✓ CO2 ausente → unavailable"
);

console.log(
    "\n✓ CO2 ANALYSIS — PASSED\n"
);