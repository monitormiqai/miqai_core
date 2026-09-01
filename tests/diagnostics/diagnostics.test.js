import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { resolveDomain } from "../../src/domains/index.js";
import { resolveRegulatory } from "../../src/regulatory/index.js";
import { validate } from "../../src/validation/index.js";
import { calculateMetrics } from "../../src/metrics/index.js";
import diagnostics from "../../src/diagnostics/index.js";


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

    return ctx;

}


/* ======================================================================
 * HEADER
 * ====================================================================== */

console.log("\n========================================");
console.log("CORE QAI — DIAGNOSTICS");
console.log("========================================\n");


/* ======================================================================
 * 1. CONTRATO BÁSICO
 * ====================================================================== */

{

    const ctx =
        buildContext();

    assert.ok(
        ctx.diagnosis,
        "ctx.diagnosis não foi produzido."
    );

    assert.ok(
        Object.hasOwn(ctx.diagnosis, "primary"),
        "diagnosis.primary ausente."
    );

    assert.ok(
        Object.hasOwn(ctx.diagnosis, "secondary"),
        "diagnosis.secondary ausente."
    );

    assert.ok(
        Object.hasOwn(ctx.diagnosis, "matches"),
        "diagnosis.matches ausente."
    );

    assert.ok(
        Array.isArray(ctx.diagnosis.secondary),
        "diagnosis.secondary deve ser array."
    );

    assert.ok(
        Array.isArray(ctx.diagnosis.matches),
        "diagnosis.matches deve ser array."
    );

    console.log("✓ Contrato básico de Diagnosis");


}


/* ======================================================================
 * 2. MÉTRICAS UNKNOWN NÃO GERAM DIAGNÓSTICOS FALSOS
 * ====================================================================== */

{

    const ctx =
        buildContext();

    /*
     * Os calculators atuais de:
     *
     * thermalComfort
     * airQuality
     * particulateLoad
     *
     * permanecem UNKNOWN enquanto os critérios específicos
     * da Metrics não estiverem ativos.
     */

    assert.equal(
        ctx.metrics.thermalComfort.level,
        "UNKNOWN"
    );

    assert.equal(
        ctx.metrics.airQuality.level,
        "UNKNOWN"
    );

    assert.equal(
        ctx.metrics.particulateLoad.level,
        "UNKNOWN"
    );

    assert.ok(
        !ctx.diagnosis.matches.some(
            diagnosis =>
                diagnosis.id === "thermal_discomfort"
        ),
        "thermal_discomfort não deve disparar com Thermal Comfort UNKNOWN."
    );

    assert.ok(
        !ctx.diagnosis.matches.some(
            diagnosis =>
                diagnosis.id === "poor_air_quality"
        ),
        "poor_air_quality não deve disparar com Air Quality UNKNOWN."
    );

    assert.ok(
        !ctx.diagnosis.matches.some(
            diagnosis =>
                diagnosis.id === "particulate_pollution"
        ),
        "particulate_pollution não deve disparar com Particulate Load UNKNOWN."
    );

    console.log(
        "✓ Métricas UNKNOWN não geram diagnósticos falsos"
    );

}


/* ======================================================================
 * 3. CO2 NORMAL NÃO GERA INSUFFICIENT VENTILATION
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 650

        });

    const diagnosis =
        ctx.diagnosis.matches.find(
            item =>
                item.id === "insufficient_ventilation"
        );

    assert.equal(
        diagnosis,
        undefined
    );

    console.log(
        "✓ CO2 normal não gera insufficient_ventilation"
    );

}


/* ======================================================================
 * 4. CO2 OBSERVATION NÃO GERA INSUFFICIENT VENTILATION POR THRESHOLD
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    const diagnosis =
        ctx.diagnosis.matches.find(
            item =>
                item.id === "insufficient_ventilation"
        );

    assert.equal(
        ctx.validation.co2.state,
        "OBSERVATION"
    );

    assert.equal(
        ctx.validation.co2.passed,
        null
    );

    assert.equal(
        diagnosis,
        undefined,
        "CO2 OBSERVATION não deve gerar insufficient_ventilation por threshold arbitrário."
    );

    console.log(
        "✓ CO2 OBSERVATION não gera insufficient_ventilation por threshold"
    );

}


/* ======================================================================
 * 5. CO2 AUSENTE NÃO GERA DIAGNÓSTICO
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: null

        });

    const diagnosis =
        ctx.diagnosis.matches.find(
            item =>
                item.id === "insufficient_ventilation"
        );

    assert.equal(
        diagnosis,
        undefined
    );

    console.log(
        "✓ CO2 ausente não gera insufficient_ventilation"
    );

}


/* ======================================================================
 * 6. PRIMARY É O DIAGNÓSTICO DE MAIOR PRIORIDADE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    /*
     * CO2 permanece como OBSERVATION no contrato atual.
     *
     * Portanto, CO2 = 2000 não deve criar um diagnóstico
     * artificialmente. Quando nenhum diagnóstico é identificado,
     * primary deve permanecer null.
     *
     * Quando existem matches, primary deve corresponder ao
     * diagnóstico de maior prioridade.
     */

    if (ctx.diagnosis.matches.length === 0) {

        assert.equal(

            ctx.diagnosis.primary,

            null,

            "Primary deve ser null quando nenhum diagnóstico é identificado."

        );

    } else {

        assert.ok(

            ctx.diagnosis.primary,

            "Diagnosis primary deveria existir quando há matches."

        );

        const priorities =
            ctx.diagnosis.matches.map(
                diagnosis =>
                    diagnosis.priority
            );

        const highestPriority =
            Math.max(...priorities);

        assert.equal(

            ctx.diagnosis.primary.priority,

            highestPriority

        );

    }

    console.log(
        "✓ Primary é o diagnóstico de maior prioridade quando há matches"
    );

}
/* ======================================================================
 * 7. SECONDARY CONTÉM OS DEMAIS MATCHES
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    assert.equal(

        ctx.diagnosis.secondary.length,

        Math.max(
            0,
            ctx.diagnosis.matches.length - 1
        )

    );

    if (ctx.diagnosis.matches.length > 0) {

        assert.equal(

            ctx.diagnosis.primary.id,

            ctx.diagnosis.matches[0].id

        );

    }

    console.log(
        "✓ Secondary contém os demais diagnósticos"
    );

}


/* ======================================================================
 * 8. ORDENAÇÃO POR PRIORIDADE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    const matches =
        ctx.diagnosis.matches;

    for (
        let i = 1;
        i < matches.length;
        i++
    ) {

        assert.ok(

            matches[i - 1].priority >=
            matches[i].priority,

            "Diagnósticos não estão ordenados por prioridade."

        );

    }

    console.log(
        "✓ Diagnósticos ordenados por prioridade"
    );

}


/* ======================================================================
 * 9. DIAGNOSTICS NÃO CRIA CAMADAS ANALÍTICAS
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    assert.equal(
        Object.hasOwn(ctx.diagnosis, "evidence"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.diagnosis, "hypotheses"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.diagnosis, "impact"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.diagnosis, "recommendations"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.diagnosis, "mitigations"),
        false
    );

    console.log(
        "✓ Diagnostics não cria camadas analíticas"
    );

}


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "\n✓ DIAGNOSTICS — PASSED\n"
);