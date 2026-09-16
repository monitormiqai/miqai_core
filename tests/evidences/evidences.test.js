import assert from "node:assert/strict";

import { createContext } from "../../src/engine/context.js";
import { resolveDomain } from "../../src/domains/index.js";
import { resolveRegulatory } from "../../src/regulatory/index.js";
import { validate } from "../../src/validation/index.js";
import { calculateMetrics } from "../../src/metrics/index.js";
import evidences from "../../src/evidences/index.js";


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

    evidences.execute(ctx);

    return ctx;

}


/* ======================================================================
 * HEADER
 * ====================================================================== */

console.log("\n========================================");
console.log("CORE QAI — EVIDENCES");
console.log("========================================\n");


/* ======================================================================
 * 1. CONTRATO BÁSICO
 * ====================================================================== */

{

    const ctx =
        buildContext();

    assert.ok(
        ctx.evidence,
        "ctx.evidence não foi produzido."
    );

    assert.ok(
        Object.hasOwn(ctx.evidence, "primary"),
        "evidence.primary ausente."
    );

    assert.ok(
        Object.hasOwn(ctx.evidence, "secondary"),
        "evidence.secondary ausente."
    );

    assert.ok(
        Object.hasOwn(ctx.evidence, "records"),
        "evidence.records ausente."
    );

    assert.ok(
        Array.isArray(ctx.evidence.secondary),
        "evidence.secondary deve ser array."
    );

    assert.ok(
        Array.isArray(ctx.evidence.records),
        "evidence.records deve ser array."
    );

    console.log(
        "✓ Contrato básico de Evidence"
    );

}


/* ======================================================================
 * 2. AMBIENTE NORMAL
 * ====================================================================== */

{

    const ctx =
        buildContext();

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "normal_environment"
        );

    /*
     * O caso-base deve produzir conformidade quando
     * todos os parâmetros avaliados estiverem passed === true.
     */

    assert.ok(
        evidence,
        "normal_environment deveria ser identificado no ambiente normal."
    );

    assert.equal(
        evidence.id,
        "normal_environment"
    );

    console.log(
        "✓ Ambiente normal gera normal_environment"
    );

}


/* ======================================================================
 * 3. CO2 NORMAL NÃO GERA EVIDÊNCIA ELEVATED_CO2
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 650

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "elevated_co2"
        );

    assert.equal(
        evidence,
        undefined,
        "CO2 normal não deve gerar elevated_co2."
    );

    console.log(
        "✓ CO2 normal não gera elevated_co2"
    );

}


/* ======================================================================
 * 4. CO2 OBSERVATION NÃO GERA EVIDÊNCIA POR THRESHOLD
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "elevated_co2"
        );

    /*
     * O CO2 permanece OBSERVATION na Validation.
     *
     * Portanto, a Evidence Library não deve transformar
     * diretamente o estado regulatório em evidência.
     */

    assert.equal(
        ctx.validation.co2.state,
        "OBSERVATION"
    );

    assert.equal(
        ctx.validation.co2.passed,
        null
    );

    assert.ok(
        evidence,
        "CO2 Analysis contextual pode gerar evidence complementar."
    );

    assert.equal(
        evidence.regulatory,
        false,
        "A evidence de CO₂ não deve ser regulatória."
    );

    console.log(
        "✓ CO2 OBSERVATION preserva análise complementar sem virar não conformidade regulatória"
    );

}


/* ======================================================================
 * 5. CO2 ANALYSIS ELEVATED GERA EVIDENCE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: 2000

        });

    /*
     * O Metrics Engine já produziu o resultado contextual real.
     */

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "elevated_co2"
        );

    assert.ok(
        evidence,
        "elevated_co2 deveria ser identificado quando metrics.co2Analysis.elevated === true."
    );

    assert.equal(
        evidence.id,
        "elevated_co2"
    );

    console.log(
        "✓ CO2 Analysis elevado gera elevated_co2"
    );

}


/* ======================================================================
 * 6. CO2 ANALYSIS INDISPONÍVEL NÃO GERA EVIDENCE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: null

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "elevated_co2"
        );

    assert.equal(
        evidence,
        undefined,
        "CO2 Analysis indisponível não deve gerar elevated_co2."
    );

    console.log(
        "✓ CO2 Analysis indisponível não gera elevated_co2"
    );

}


/* ======================================================================
 * 7. CO2 AUSENTE NÃO GERA EVIDENCE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            co2: null

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "elevated_co2"
        );

    assert.equal(
        evidence,
        undefined
    );

    console.log(
        "✓ CO2 ausente não gera elevated_co2"
    );

}


/* ======================================================================
 * 8. PARTICULADO ELEVADO GERA EVIDENCE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: 100

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "elevated_particulate"
        );

    assert.ok(
        evidence,
        "elevated_particulate deveria ser identificado."
    );

    assert.equal(
        evidence.id,
        "elevated_particulate"
    );

    console.log(
        "✓ Particulado elevado gera elevated_particulate"
    );

}


/* ======================================================================
 * 9. PARTÍCULAS AUSENTES NÃO GERAM EVIDENCE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: null,

            pm10: null

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "elevated_particulate"
        );

    assert.equal(
        evidence,
        undefined
    );

    console.log(
        "✓ Partículas ausentes não geram elevated_particulate"
    );

}


/* ======================================================================
 * 10. DESVIO TÉRMICO GERA EVIDENCE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: 35

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "thermal_deviation"
        );

    assert.ok(
        evidence,
        "thermal_deviation deveria ser identificado."
    );

    assert.equal(
        evidence.id,
        "thermal_deviation"
    );

    console.log(
        "✓ Desvio térmico gera thermal_deviation"
    );

}


/* ======================================================================
 * 11. VOC ELEVADO GERA EVIDENCE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            vocIndex: 300

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "elevated_voc"
        );

    assert.ok(
        evidence,
        "elevated_voc deveria ser identificado."
    );

    assert.equal(
        evidence.id,
        "elevated_voc"
    );

    console.log(
        "✓ VOC elevado gera elevated_voc"
    );

}


/* ======================================================================
 * 12. NOX SEM BASELINE NÃO GERA EVIDENCE POR THRESHOLD INVENTADO
 * ====================================================================== */

{

    const ctx =
        buildContext({

            noxIndex: 200

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "elevated_nox"
        );

    assert.equal(
        evidence,
        undefined,
        "NOx Index sem baseline explícito não deve gerar evidence por threshold inventado."
    );

    console.log(
        "✓ NOx sem baseline não gera elevated_nox por threshold inventado"
    );

}


/* ======================================================================
 * 13. ORDENAÇÃO POR PRIORIDADE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: 100,

            temperature: 35,

            vocIndex: 300,

            noxIndex: 200

        });

    const records =
        ctx.evidence.records;

    for (
        let i = 1;
        i < records.length;
        i++
    ) {

        assert.ok(

            records[i - 1].priority >=
            records[i].priority,

            "Evidências não estão ordenadas por prioridade."

        );

    }

    console.log(
        "✓ Evidências ordenadas por prioridade"
    );

}


/* ======================================================================
 * 14. PRIMARY É A MAIOR PRIORIDADE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: 100,

            temperature: 35,

            vocIndex: 300

        });

    const records =
        ctx.evidence.records;

    assert.ok(
        records.length > 0,
        "Deveria existir pelo menos uma evidência."
    );

    const highestPriority =
        Math.max(
            ...records.map(
                evidence =>
                    evidence.priority
            )
        );

    assert.equal(
        ctx.evidence.primary.priority,
        highestPriority
    );

    assert.equal(
        ctx.evidence.primary.id,
        records[0].id
    );

    console.log(
        "✓ Primary corresponde à maior prioridade"
    );

}


/* ======================================================================
 * 15. SECONDARY CONTÉM OS DEMAIS RECORDS
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: 100,

            temperature: 35,

            vocIndex: 300

        });

    assert.equal(

        ctx.evidence.secondary.length,

        Math.max(
            0,
            ctx.evidence.records.length - 1
        )

    );

    if (ctx.evidence.records.length > 0) {

        assert.equal(

            ctx.evidence.primary.id,

            ctx.evidence.records[0].id

        );

    }

    console.log(
        "✓ Secondary contém os demais records"
    );

}


/* ======================================================================
 * 16. AUSÊNCIA NÃO GERA NORMALIDADE
 * ====================================================================== */

{

    const ctx =
        buildContext({

            temperature: null,
            humidity: null,
            co2: null,
            pm25: null,
            pm10: null,
            vocIndex: null,
            noxIndex: null

        });

    const evidence =
        ctx.evidence.records.find(
            item =>
                item.id === "normal_environment"
        );

    assert.equal(
        evidence,
        undefined,
        "Dados ausentes não devem produzir normal_environment."
    );

    console.log(
        "✓ Ausência de dados não gera normal_environment"
    );

}


/* ======================================================================
 * 17. EVIDENCE NÃO CRIA CAMADAS ANALÍTICAS
 * ====================================================================== */

{

    const ctx =
        buildContext({

            pm25: 100,

            temperature: 35,

            vocIndex: 300

        });

    assert.equal(
        Object.hasOwn(ctx.evidence, "diagnosis"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.evidence, "hypotheses"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.evidence, "impact"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.evidence, "recommendations"),
        false
    );

    assert.equal(
        Object.hasOwn(ctx.evidence, "mitigations"),
        false
    );

    console.log(
        "✓ Evidence não cria camadas analíticas"
    );

}


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "\n✓ EVIDENCES — PASSED\n"
);
