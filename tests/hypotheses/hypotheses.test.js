import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { resolveDomain } from "../../src/domains/index.js";
import { resolveRegulatory } from "../../src/regulatory/index.js";
import { validate } from "../../src/validation/index.js";
import { calculateMetrics } from "../../src/metrics/index.js";

import diagnostics from "../../src/diagnostics/index.js";
import evidences from "../../src/evidences/index.js";
import hypotheses from "../../src/hypotheses/index.js";


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

    return ctx;

}


function hasHypothesis(ctx, id) {

    return ctx.hypotheses.matches.some(

        hypothesis =>
            hypothesis.id === id

    );

}


/* ======================================================================
 * HEADER
 * ====================================================================== */

console.log("\n========================================");
console.log("CORE QAI — HYPOTHESES");
console.log("========================================\n");


/* ======================================================================
 * 1. CONTRATO BÁSICO
 * ====================================================================== */

{

    const ctx =
        buildContext();

    assert.ok(
        ctx.hypotheses,
        "ctx.hypotheses não foi produzido."
    );

    assert.ok(
        Object.hasOwn(ctx.hypotheses, "primary"),
        "hypotheses.primary ausente."
    );

    assert.ok(
        Object.hasOwn(ctx.hypotheses, "secondary"),
        "hypotheses.secondary ausente."
    );

    assert.ok(
        Object.hasOwn(ctx.hypotheses, "matches"),
        "hypotheses.matches ausente."
    );

    assert.ok(
        Array.isArray(ctx.hypotheses.secondary),
        "hypotheses.secondary deve ser array."
    );

    assert.ok(
        Array.isArray(ctx.hypotheses.matches),
        "hypotheses.matches deve ser array."
    );

    console.log(
        "✓ Contrato básico de Hypotheses"
    );

}


/* ======================================================================
 * 2. NORMAL OPERATION
 * ====================================================================== */

{

    const ctx =
        buildContext();

    assert.ok(
        hasHypothesis(
            ctx,
            "normal_operation"
        ),
        "normal_operation deveria ser identificado no ambiente normal."
    );

    console.log(
        "✓ Ambiente normal gera normal_operation"
    );

}


/* ======================================================================
 * 3. INSUFFICIENT AIR RENEWAL
 * ====================================================================== */

{

    /*
     * CO2 elevado isoladamente permanece OBSERVATION
     * na Validation atual.
     *
     * Portanto, esta hipótese não deve surgir somente
     * por threshold arbitrário de CO2.
     */

    const ctx =
        buildContext({

            co2: 2000

        });

    assert.equal(
        ctx.validation.co2.state,
        "OBSERVATION"
    );

    assert.equal(
        hasHypothesis(
            ctx,
            "insufficient_air_renewal"
        ),
        false,
        "insufficient_air_renewal não deve surgir apenas por CO2 OBSERVATION."
    );

    console.log(
        "✓ CO2 OBSERVATION não gera insufficient_air_renewal"
    );

}


/* ======================================================================
 * 4. EXCESSIVE OCCUPANCY
 * ====================================================================== */

{

    const ctx =
        buildContext();

    assert.equal(
        ctx.metrics?.occupancy?.level,
        "UNKNOWN"
    );

    assert.equal(
        hasHypothesis(
            ctx,
            "excessive_occupancy"
        ),
        false,
        "excessive_occupancy não deve surgir com Occupancy UNKNOWN."
    );

    console.log(
        "✓ Occupancy UNKNOWN não gera excessive_occupancy"
    );

}


/* ======================================================================
 * 5. OUTDOOR POLLUTION
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: 100,

            pm10: 150

        });

    const hypothesis =
        ctx.hypotheses.matches.find(
            item =>
                item.id === "outdoor_pollution"
        );

    assert.ok(
        hypothesis,
        "outdoor_pollution deveria ser identificado quando houver elevated_particulate."
    );

    assert.match(
        hypothesis.title,
        /investig|possível/i,
        "outdoor_pollution deve ser apresentada como hipótese investigativa."
    );

    assert.match(
        hypothesis.description,
        /material particulado elevado foi observado/i,
        "A descrição deve registrar o particulado elevado observado."
    );

    assert.match(
        hypothesis.description,
        /origem não pode ser determinada pela medição disponível/i,
        "A descrição deve explicitar que a origem não foi determinada pela medição disponível."
    );

    assert.match(
        hypothesis.description,
        /fontes internas continuam possíveis/i,
        "A descrição deve preservar a possibilidade de fontes internas."
    );

    assert.match(
        hypothesis.description,
        /contribuição de particulado externo é apenas uma possibilidade a investigar/i,
        "A descrição deve manter a contribuição externa como possibilidade a investigar."
    );

    assert.doesNotMatch(
        hypothesis.description,
        /detecção|detected|poluição externa.*confirm|causa.*determinada/i,
        "outdoor_pollution não deve ser apresentada como detecção ou certeza de poluição externa."
    );

    console.log(
        "✓ Particulado elevado gera hipótese outdoor_pollution investigativa e não conclusiva"
    );

}


/* ======================================================================
 * 6. HVAC FAILURE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: 35

        });

    /*
     * A hipótese depende do diagnóstico primário
     * thermal_discomfort.
     *
     * Se o indicador térmico permanecer UNKNOWN,
     * HVAC Failure não deve ser inventado.
     */

    if (
        ctx.diagnosis?.primary?.id ===
        "thermal_discomfort"
    ) {

        assert.ok(
            hasHypothesis(
                ctx,
                "hvac_failure"
            ),
            "hvac_failure deveria acompanhar thermal_discomfort."
        );

        console.log(
            "✓ Thermal discomfort gera hvac_failure"
        );

    } else {

        assert.equal(
            hasHypothesis(
                ctx,
                "hvac_failure"
            ),
            false
        );

        console.log(
            "✓ HVAC failure não é inventado sem thermal_discomfort"
        );

    }

}


/* ======================================================================
 * 7. CHEMICAL CONTAMINATION
 * ====================================================================== */

{

    const ctx =
        buildContext({

            vocIndex: 300

        });

    assert.ok(
        ctx.evidence.records.some(
            evidence =>
                evidence.id === "elevated_voc"
        ),
        "elevated_voc deveria existir."
    );

    assert.ok(
        hasHypothesis(
            ctx,
            "chemical_contamination"
        ),
        "chemical_contamination deveria ser identificado com elevated_voc."
    );

    console.log(
        "✓ VOC elevado gera chemical_contamination"
    );

}


/* ======================================================================
 * 8. NOx / CHEMICAL CONTAMINATION SEM BASELINE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            noxIndex: 200

        });

    assert.equal(
        ctx.evidence.records.some(
            evidence =>
                evidence.id === "elevated_nox"
        ),
        false,
        "elevated_nox não deve ser criado sem baseline explícito."
    );

    assert.equal(
        hasHypothesis(
            ctx,
            "chemical_contamination"
        ),
        false,
        "chemical_contamination não deve ser inferido de NOx sem evidence fundamentada."
    );

    console.log(
        "✓ NOx sem baseline não gera hipótese química por threshold inventado"
    );

}


/* ======================================================================
 * 9. DEW POINT CONDENSATION
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: 24,

            humidity: 90

        });

    const diagnosisExists =
        ctx.diagnosis?.matches?.some(

            diagnosis =>
                diagnosis.id ===
                "dew_point_condensation"

        );

    if (diagnosisExists) {

        assert.ok(
            hasHypothesis(
                ctx,
                "dew_point_condensation"
            ),
            "dew_point_condensation deveria acompanhar o diagnóstico correspondente."
        );

        console.log(
            "✓ Diagnóstico de condensação gera dew_point_condensation"
        );

    } else {

        assert.equal(
            hasHypothesis(
                ctx,
                "dew_point_condensation"
            ),
            false
        );

        console.log(
            "✓ Condensação não gera hipótese sem diagnóstico correspondente"
        );

    }

}


/* ======================================================================
 * 10. ORDENAÇÃO POR PRIORIDADE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: 100,

            pm10: 150,

            vocIndex: 300,

            noxIndex: 100

        });

    const matches =
        ctx.hypotheses.matches;

    for (
        let i = 1;
        i < matches.length;
        i++
    ) {

        assert.ok(

            matches[i - 1].priority >=
            matches[i].priority,

            "Hipóteses não estão ordenadas por prioridade."

        );

    }

    console.log(
        "✓ Hipóteses ordenadas por prioridade"
    );

}


/* ======================================================================
 * 11. PRIMARY
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: 100,

            pm10: 150,

            vocIndex: 300,

            noxIndex: 100

        });

    const matches =
        ctx.hypotheses.matches;

    if (matches.length > 0) {

        const highestPriority =
            Math.max(

                ...matches.map(
                    hypothesis =>
                        hypothesis.priority
                )

            );

        assert.ok(
            ctx.hypotheses.primary,
            "Hypotheses primary deveria existir quando existem matches."
        );

        assert.equal(

            ctx.hypotheses.primary.priority,

            highestPriority

        );

        assert.equal(

            ctx.hypotheses.primary.id,

            matches[0].id

        );

    } else {

        assert.equal(
            ctx.hypotheses.primary,
            null
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

            pm25: 100,

            pm10: 150,

            vocIndex: 300,

            noxIndex: 100

        });

    assert.equal(

        ctx.hypotheses.secondary.length,

        Math.max(

            0,

            ctx.hypotheses.matches.length - 1

        )

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

            pm25: 100,

            pm10: 150,

            vocIndex: 300,

            noxIndex: 100

        });

    assert.equal(
        Object.hasOwn(ctx.hypotheses, "evidence"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.hypotheses, "diagnosis"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.hypotheses, "mitigations"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.hypotheses, "impacts"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.hypotheses, "recommendations"),
        false
    );

    console.log(
        "✓ Hypotheses permanece como camada independente"
    );

}


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "\n✓ HYPOTHESES — PASSED\n"
);