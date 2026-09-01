import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { resolveDomain } from "../../src/domains/index.js";
import { resolveRegulatory } from "../../src/regulatory/index.js";
import { validate } from "../../src/validation/index.js";
import { calculateMetrics } from "../../src/metrics/index.js";

import diagnostics from "../../src/diagnostics/index.js";
import evidences from "../../src/evidences/index.js";
import hypotheses from "../../src/hypotheses/index.js";
import mitigations from "../../src/mitigations/index.js";


/* ======================================================================
 * HELPERS
 * ====================================================================== */

function buildContext(reading = {}) {

    const ctx = createContext({

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

    resolveDomain(ctx);
    resolveRegulatory(ctx);
    validate(ctx);
    calculateMetrics(ctx);

    diagnostics.execute(ctx);
    evidences.execute(ctx);
    hypotheses.execute(ctx);
    mitigations.execute(ctx);

    return ctx;

}


function hasMitigation(ctx, id) {

    return ctx.mitigation.actions.some(

        action =>
            action.id === id

    );

}


/* ======================================================================
 * HEADER
 * ====================================================================== */

console.log("\n========================================");
console.log("CORE QAI — MITIGATIONS");
console.log("========================================\n");


/* ======================================================================
 * 1. CONTRATO BÁSICO
 * ====================================================================== */

{

    const ctx =
        buildContext();

    assert.ok(
        ctx.mitigation,
        "ctx.mitigation não foi produzido."
    );

    assert.ok(
        Object.hasOwn(ctx.mitigation, "primary"),
        "mitigation.primary ausente."
    );

    assert.ok(
        Object.hasOwn(ctx.mitigation, "secondary"),
        "mitigation.secondary ausente."
    );

    assert.ok(
        Object.hasOwn(ctx.mitigation, "actions"),
        "mitigation.actions ausente."
    );

    assert.ok(
        Array.isArray(ctx.mitigation.secondary),
        "mitigation.secondary deve ser array."
    );

    assert.ok(
        Array.isArray(ctx.mitigation.actions),
        "mitigation.actions deve ser array."
    );

    console.log(
        "✓ Contrato básico de Mitigations"
    );

}


/* ======================================================================
 * 2. NORMAL OPERATION
 * ====================================================================== */

{

    const ctx =
        buildContext();

    assert.ok(
        hasMitigation(
            ctx,
            "maintain_current_operation"
        ),
        "maintain_current_operation deveria existir no ambiente normal."
    );

    console.log(
        "✓ Ambiente normal gera maintain_current_operation"
    );

}


/* ======================================================================
 * 3. INSUFFICIENT AIR RENEWAL
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    assert.equal(
        hasMitigation(
            ctx,
            "increase_ventilation"
        ),
        false,
        "increase_ventilation não deve ser produzido apenas por CO2 OBSERVATION."
    );

    console.log(
        "✓ CO2 OBSERVATION não inventa increase_ventilation"
    );

}


/* ======================================================================
 * 4. OCCUPANCY
 * ====================================================================== */

{

    const ctx =
        buildContext();

    assert.equal(
        hasMitigation(
            ctx,
            "reduce_occupancy"
        ),
        false,
        "reduce_occupancy não deve ser produzido sem excessive_occupancy."
    );

    console.log(
        "✓ Occupancy UNKNOWN não gera reduce_occupancy"
    );

}


/* ======================================================================
 * 5. HVAC
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: 35

        });

    /*
     * Temperatura elevada, isoladamente, não produz
     * thermal_discomfort enquanto o indicador térmico
     * permanecer UNKNOWN.
     *
     * Portanto, a Mitigation não deve inventar
     * inspect_hvac_system sem thermal_discomfort.
     */

    if (
        ctx.diagnosis?.matches?.some(
            diagnosis =>
                diagnosis.id === "thermal_discomfort"
        )
    ) {

        assert.ok(
            hasMitigation(
                ctx,
                "inspect_hvac_system"
            ),
            "inspect_hvac_system deveria existir diante de thermal_discomfort."
        );

    } else {

        assert.equal(
            hasMitigation(
                ctx,
                "inspect_hvac_system"
            ),
            false,
            "inspect_hvac_system não deve ser produzido sem thermal_discomfort."
        );

    }

    console.log(
        "✓ HVAC inspection respeita thermal_discomfort"
    );

}


/* ======================================================================
 * 6. PARTICULATE / OUTDOOR POLLUTION
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: 100,
            pm10: 100

        });

    assert.ok(
        hasMitigation(
            ctx,
            "eliminate_pollution_source"
        ),
        "eliminate_pollution_source deveria existir com particulado elevado."
    );

    assert.ok(
        hasMitigation(
            ctx,
            "use_air_purification"
        ),
        "use_air_purification deveria existir com particulado elevado."
    );

    console.log(
        "✓ Particulado elevado gera ações de mitigação"
    );

}


/* ======================================================================
 * 7. VOC
 * ====================================================================== */

{

    const ctx =
        buildContext({

            vocIndex: 300

        });

    assert.ok(
        hasMitigation(
            ctx,
            "use_air_purification"
        ),
        "use_air_purification deveria existir com VOC elevado."
    );

    console.log(
        "✓ VOC elevado gera use_air_purification"
    );

}


/* ======================================================================
 * 8. HUMIDITY / DEW POINT
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: 24,
            humidity: 90

        });

    assert.ok(
        hasMitigation(
            ctx,
            "control_humidity"
        ),
        "control_humidity deveria existir diante de condição de condensação."
    );

    console.log(
        "✓ Condensação gera control_humidity"
    );

}


/* ======================================================================
 * 9. NOx
 * ====================================================================== */

{

    const ctx =
        buildContext({

            noxIndex: 200

        });

    assert.equal(
        hasMitigation(
            ctx,
            "use_air_purification"
        ),
        false,
        "NOx Index sem baseline disponível não deve gerar mitigação por threshold inventado."
    );

    console.log(
        "✓ NOx sem baseline não inventa use_air_purification"
    );

}


/* ======================================================================
 * 10. ORDENAÇÃO POR PRIORIDADE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: 35,
            humidity: 90,
            pm25: 100,
            pm10: 100,
            vocIndex: 300,
            noxIndex: 200

        });

    const actions =
        ctx.mitigation.actions;

    for (
        let i = 1;
        i < actions.length;
        i++
    ) {

        assert.ok(

            actions[i - 1].priority >=
            actions[i].priority,

            "Mitigations não estão ordenadas por prioridade."

        );

    }

    console.log(
        "✓ Mitigations ordenadas por prioridade"
    );

}


/* ======================================================================
 * 11. PRIMARY
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: 35,
            pm25: 100,
            pm10: 100,
            vocIndex: 300

        });

    const actions =
        ctx.mitigation.actions;

    if (actions.length > 0) {

        assert.equal(

            ctx.mitigation.primary.id,
            actions[0].id,

            "Primary deve corresponder à ação de maior prioridade."

        );

    }

    console.log(
        "✓ Primary corresponde à maior prioridade"
    );

}


/* ======================================================================
 * 12. SECONDARY
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: 35,
            pm25: 100,
            pm10: 100,
            vocIndex: 300

        });

    assert.deepEqual(

        ctx.mitigation.secondary,

        ctx.mitigation.actions.slice(1),

        "Secondary deve conter os demais matches."

    );

    console.log(
        "✓ Secondary contém os demais matches"
    );

}


/* ======================================================================
 * 13. INDEPENDÊNCIA DA CAMADA
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: 35,
            pm25: 100,
            pm10: 100,
            vocIndex: 300

        });

    assert.ok(
        ctx.metrics,
        "Metrics deve permanecer presente."
    );

    assert.ok(
        ctx.validation,
        "Validation deve permanecer presente."
    );

    assert.ok(
        ctx.diagnosis,
        "Diagnostics deve permanecer presente."
    );

    assert.ok(
        ctx.evidence,
        "Evidences deve permanecer presente."
    );

    assert.ok(
        ctx.hypotheses,
        "Hypotheses deve permanecer presente."
    );

    assert.ok(
        ctx.mitigation,
        "Mitigations deve permanecer presente."
    );

    console.log(
        "✓ Mitigations permanece como camada independente"
    );

}


console.log("\n✓ MITIGATIONS — PASSED\n");