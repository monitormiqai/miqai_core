import assert from "node:assert/strict";

import resolveReferences
    from "../../src/references/resolver.js";


console.log("\n========================================");
console.log("CORE QAI — REFERENCES");
console.log("========================================\n");


/* ======================================================================
 * HELPER
 * ====================================================================== */

function assertReferenceContract(result) {

    assert.ok(
        result,
        "Resolver não retornou resultado."
    );

    assert.ok(
        Object.hasOwn(result, "primary"),
        "references.primary ausente."
    );

    assert.ok(
        Object.hasOwn(result, "secondary"),
        "references.secondary ausente."
    );

    assert.ok(
        Object.hasOwn(result, "matches"),
        "references.matches ausente."
    );

    assert.ok(
        Array.isArray(result.secondary),
        "references.secondary deve ser array."
    );

    assert.ok(
        Array.isArray(result.matches),
        "references.matches deve ser array."
    );

}


/* ======================================================================
 * TEST 1 — SEM FUNDAMENTO
 *
 * Sem Evidence.referenceIds e sem condição regulatória aplicável,
 * o Resolver não deve inventar referência.
 * ====================================================================== */

const emptyContext = {

    domain: {
        id: "corporate"
    },

    validation: {

        temperature: {
            value: 23,
            passed: true,
            currentAssessment: "WITHIN_REFERENCE"
        },

        humidity: {
            value: 50,
            passed: true,
            currentAssessment: "WITHIN_REFERENCE"
        },

        co2: {
            value: 650,
            passed: true
        }

    },

    evidence: {

        primary: null,

        records: []

    },

    diagnosis: {

        primary: null

    },

    hypotheses: {

        primary: null

    }

};

const emptyResult =
    resolveReferences(emptyContext);

assertReferenceContract(emptyResult);

assert.equal(
    emptyResult.primary,
    null,
    "Sem fundamento não deveria existir referência primária."
);

assert.equal(
    emptyResult.matches.length,
    0,
    "Sem fundamento não deveria haver referências."
);

console.log(
    "✓ Ausência de fundamento não inventa referência"
);


/* ======================================================================
 * TEST 2 — CO2
 *
 * Evidence declara as referências aplicáveis.
 *
 * A referência brasileira deve possuir precedência sobre a internacional
 * quando ambas forem aplicáveis ao contexto brasileiro.
 * ====================================================================== */

const co2Context = {

    domain: {
        id: "corporate"
    },

    jurisdiction: "BR",

    validation: {

        co2: {

            value: 1450,

            passed: false,

            currentAssessment: "ABOVE_REFERENCE"

        }

    },

    regulatory: {

        co2: {

            referenceIds: [

                "ashrae62_1",
                "abnt_nbr_16401"

            ]

        }

    },

    diagnosis: {

        primary: {

            id: "insufficient_ventilation"

        }

    },

    evidence: {

        primary: {

            id: "elevated_co2",

            parameter: "co2",

            referenceIds: [

                "ashrae62_1",
                "abnt_nbr_16401"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {

            id: "insufficient_air_renewal"

        }

    }

};

const co2Result =
    resolveReferences(co2Context);

assertReferenceContract(co2Result);

assert.ok(
    co2Result.primary,
    "CO2 deveria produzir referência primária."
);

assert.equal(
    co2Result.primary.reference.id,
    "abnt_nbr_16401",
    "No Brasil, ABNT NBR 16401 deveria possuir precedência."
);

assert.ok(
    co2Result.primary.section,
    "CO2 deveria resolver uma seção aplicável."
);

assert.ok(
    co2Result.secondary.some(
        item =>
            item.reference?.id === "ashrae62_1"
    ),
    "ASHRAE 62.1 deveria permanecer como referência secundária."
);

console.log(
    "✓ CO2 resolve referência brasileira e mantém referência internacional"
);


/* ======================================================================
 * TEST 3 — PARTICULADO
 * ====================================================================== */

const particulateContext = {

    domain: {
        id: "corporate"
    },

    jurisdiction: "BR",

    validation: {

        pm25: {

            value: 35,

            passed: false,

            currentAssessment: "ABOVE_REFERENCE"

        }

    },

    regulatory: {

        pm25: {

            referenceIds: [

                "abnt_nbr_17037",
                "who_aqg_2021"

            ]

        }

    },

    diagnosis: {

        primary: {

            id: "elevated_particulate"

        }

    },

    evidence: {

        primary: {

            id: "elevated_particulate",

            parameter: "pm25",

            referenceIds: [

                "abnt_nbr_17037",
                "who_aqg_2021"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {

            id: "outdoor_pollution"

        }

    }

};

const particulateResult =
    resolveReferences(particulateContext);

assertReferenceContract(particulateResult);

assert.ok(
    particulateResult.primary,
    "PM2.5 deveria produzir referência primária."
);

assert.equal(
    particulateResult.primary.reference.id,
    "abnt_nbr_17037",
    "PM2.5 deveria priorizar ABNT NBR 17037 no Brasil."
);

assert.ok(
    particulateResult.primary.section,
    "PM2.5 deveria resolver uma seção aplicável."
);

console.log(
    "✓ PM2.5 resolve referência normativa aplicável"
);


/* ======================================================================
 * TEST 4 — CONFORTO TÉRMICO
 * ====================================================================== */

const thermalContext = {

    domain: {
        id: "corporate"
    },

    jurisdiction: "BR",

    validation: {

        temperature: {

            value: 29,

            passed: false,

            currentAssessment: "ABOVE_REFERENCE"

        },

        humidity: {

            value: 70,

            passed: false,

            currentAssessment: "ABOVE_REFERENCE"

        }

    },

    regulatory: {

        temperature: {

            referenceIds: [

                "ashrae55",
                "iso_7730",
                "abnt_nbr_16401"

            ]

        }

    },

    diagnosis: {

        primary: {

            id: "thermal_discomfort"

        }

    },

    evidence: {

        primary: {

            id: "thermal_discomfort",

            parameter: "temperature",

            referenceIds: [

                "ashrae55",
                "iso_7730",
                "abnt_nbr_16401"

            ]

        },

        records: []

    },

    hypotheses: {

        primary: {

            id: "hvac_failure"

        }

    }

};

const thermalResult =
    resolveReferences(thermalContext);

assertReferenceContract(thermalResult);

assert.ok(
    thermalResult.primary,
    "Conforto térmico deveria produzir referência."
);

assert.ok(
    thermalResult.primary.section,
    "Conforto térmico deveria resolver seção."
);

assert.ok(
    [
        "abnt_nbr_16401",
        "ashrae55",
        "iso_7730"
    ].includes(
        thermalResult.primary.reference.id
    ),
    "Referência térmica primária não pertence ao conjunto declarado."
);

console.log(
    "✓ Condição térmica resolve referência técnica"
);


/* ======================================================================
 * TEST 5 — VOC
 * ====================================================================== */

const vocContext = {

    domain: {
        id: "corporate"
    },

    jurisdiction: "BR",

    validation: {

        vocIndex: {

            value: 220,

            passed: false,

            currentAssessment: "ABOVE_REFERENCE"

        }

    },

    evidence: {

        primary: {

            id: "elevated_voc",

            parameter: "vocIndex",

            referenceIds: [

                "sensirion_voc"

            ]

        },

        records: []

    },

    diagnosis: {

        primary: {

            id: "chemical_contamination"

        }

    },

    hypotheses: {

        primary: {

            id: "chemical_contamination"

        }

    }

};

const vocResult =
    resolveReferences(vocContext);

assertReferenceContract(vocResult);

assert.ok(
    vocResult.primary,
    "VOC deveria produzir referência."
);

assert.equal(
    vocResult.primary.reference.id,
    "sensirion_voc",
    "Referência Sensirion VOC não foi resolvida."
);

assert.ok(
    vocResult.primary.section,
    "VOC deveria resolver uma seção."
);

console.log(
    "✓ VOC resolve referência técnica"
);


/* ======================================================================
 * TEST 6 — NOx SEM BASELINE
 *
 * Regra importante:
 *
 * Sem indicador/critério válido, não se cria inferência.
 *
 * Portanto, o teste NÃO fornece referenceIds.
 * ====================================================================== */

const noxContext = {

    domain: {
        id: "corporate"
    },

    jurisdiction: "BR",

    validation: {

        noxIndex: {

            value: 1,

            passed: true

        }

    },

    diagnosis: {

        primary: null

    },

    evidence: {

        primary: null,

        records: []

    },

    hypotheses: {

        primary: null

    }

};

const noxResult =
    resolveReferences(noxContext);

assertReferenceContract(noxResult);

assert.equal(
    noxResult.primary,
    null,
    "NOx sem baseline não deve produzir referência derivada."
);

assert.equal(
    noxResult.matches.length,
    0,
    "NOx sem baseline não deve produzir referências."
);

console.log(
    "✓ NOx sem baseline não inventa referência"
);


/* ======================================================================
 * TEST 7 — REFERÊNCIA ÓRFÃ
 *
 * ID declarado pela Evidence mas inexistente no catálogo.
 * ====================================================================== */

const orphanContext = {

    domain: {
        id: "corporate"
    },

    evidence: {

        primary: {

            id: "elevated_co2",

            parameter: "co2",

            referenceIds: [

                "reference_that_does_not_exist"

            ]

        },

        records: []

    },

    diagnosis: {

        primary: {

            id: "insufficient_ventilation"

        }

    },

    hypotheses: {

        primary: {

            id: "insufficient_air_renewal"

        }

    }

};

const orphanResult =
    resolveReferences(orphanContext);

assertReferenceContract(orphanResult);

assert.equal(
    orphanResult.primary,
    null,
    "Referência órfã não deve se tornar referência primária."
);

assert.equal(
    orphanResult.matches.length,
    0,
    "Referência órfã não deve produzir match."
);

console.log(
    "✓ Referência órfã é rejeitada"
);


/* ======================================================================
 * TEST 8 — INTEGRIDADE DO RESULTADO
 * ====================================================================== */

for (const result of [

    co2Result,
    particulateResult,
    thermalResult,
    vocResult

]) {

    for (const match of result.matches) {

        assert.ok(
            match.reference,
            "Match deve possuir reference."
        );

        assert.ok(
            match.reference.id,
            "Reference deve possuir id."
        );

        assert.ok(
            match.section,
            "Match deve possuir section."
        );

        assert.ok(
            match.match,
            "Match deve possuir metadados de correspondência."
        );

        assert.equal(
            Object.hasOwn(match, "_ranking"),
            false,
            "Metadado interno _ranking não deve vazar."
        );

    }

}

console.log(
    "✓ Integridade dos matches"
);


/* ======================================================================
 * RESULTADO
 * ====================================================================== */

console.log(
    "\n✓ REFERENCES — PASSED\n"
);