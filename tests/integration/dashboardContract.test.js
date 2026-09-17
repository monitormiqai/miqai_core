import assert from "node:assert/strict";

import AnalisarQualidadeAmbiental
    from "../../src/engine/analysis.js";

import {
    adaptPublicResponse
} from "../../src/engine/publicResponse/index.js";


function analyze(reading) {
    const coreResponse = AnalisarQualidadeAmbiental({
        environment: "corporate",
        reading
    });

    const publicResponse =
        adaptPublicResponse(coreResponse);

    return {
        coreResponse,
        publicResponse
    };
}


/* ================================================================
 * DASHBOARD CONTRACT V1
 *
 * Objetivo:
 * Validar a interface pï¿½blica entre CORE QAI e Dashboard.
 *
 * REGRA:
 * O Dashboard Contract nï¿½o pode criar significado analï¿½tico.
 * ================================================================ */


/* ================================================================
 * 1. NORMAL ï¿½ RASTREABILIDADE
 * ================================================================ */

{
    const { coreResponse, publicResponse } = analyze({
        temperature: 23,
        humidity: 50,
        co2: 650,
        pm25: 6,
        pm10: 12,
        vocIndex: 90,
        noxIndex: 1
    });

    /* ------------------------------------------------------------
     * Estrutura raiz
     * ------------------------------------------------------------ */

    assert.equal(publicResponse.version, "1.0");

    assert.equal(
        publicResponse.status.state,
        coreResponse.metadata.status
    );

    assert.equal(
        publicResponse.environment.type,
        coreResponse.domain.id
    );

    assert.equal(
        publicResponse.environment.name,
        coreResponse.domain.name
    );
    assert.equal(
    publicResponse.timestamp,
    coreResponse.metadata.timestamp
    );

    assert.equal(
        typeof publicResponse.timestamp,
        "string"
    );

    /* ------------------------------------------------------------
     * Temperature
     * ------------------------------------------------------------ */

    const temperature =
        publicResponse.current.readings.find(
            item => item.parameter === "temperature"
        );

    const coreTemperature =
        coreResponse.validation.temperature;

    assert.ok(temperature);

    assert.equal(
        temperature.value,
        coreTemperature.value
    );

    assert.equal(
        temperature.unit,
        coreTemperature.unit
    );

    assert.equal(
        temperature.state,
        coreTemperature.state
    );

    assert.equal(
        temperature.assessment,
        coreTemperature.currentAssessment
    );

    assert.equal(
        temperature.evaluationPeriod,
        coreTemperature.evaluationPeriod
    );

    assert.equal(
        temperature.historicalAssessmentRequired,
        coreTemperature.historicalAssessmentRequired
    );


    /* ------------------------------------------------------------
     * Humidity
     * ------------------------------------------------------------ */

    const humidity =
        publicResponse.current.readings.find(
            item => item.parameter === "humidity"
        );

    const coreHumidity =
        coreResponse.validation.humidity;

    assert.ok(humidity);

    assert.equal(
        humidity.value,
        coreHumidity.value
    );

    assert.equal(
        humidity.unit,
        coreHumidity.unit
    );

    assert.equal(
        humidity.state,
        coreHumidity.state
    );

    assert.equal(
        humidity.assessment,
        coreHumidity.currentAssessment
    );


    /* ------------------------------------------------------------
     * CO2
     * ------------------------------------------------------------ */

    const co2 =
        publicResponse.current.readings.find(
            item => item.parameter === "co2"
        );

    const coreCo2 =
        coreResponse.validation.co2;

    assert.ok(co2);

    assert.equal(
        co2.value,
        coreCo2.value
    );

    assert.equal(
        co2.unit,
        coreCo2.unit
    );

    assert.equal(
        co2.state,
        coreCo2.state
    );

    assert.equal(
        co2.assessment,
        "NOT_ASSESSED"
    );

    assert.equal(
        co2.assessment,
        coreCo2.currentAssessment
    );

    assert.equal(
        co2.evaluationPeriod,
        coreCo2.evaluationPeriod
    );


    /* ------------------------------------------------------------
     * PM2.5 ï¿½ semï¿½ntica temporal
     * ------------------------------------------------------------ */

    const pm25 =
        publicResponse.current.readings.find(
            item => item.parameter === "pm25"
        );

    const corePm25 =
        coreResponse.validation.pm25;

    assert.ok(pm25);

    assert.equal(
        pm25.value,
        corePm25.value
    );

    assert.equal(
        pm25.unit,
        corePm25.unit
    );

    assert.equal(
        pm25.evaluationPeriod,
        "24h_mean"
    );

    assert.equal(
        pm25.evaluationPeriod,
        corePm25.evaluationPeriod
    );

    assert.equal(
        pm25.historicalAssessmentRequired,
        true
    );

    assert.equal(
        pm25.historicalAssessmentRequired,
        corePm25.historicalAssessmentRequired
    );


    /* ------------------------------------------------------------
     * PM10 ï¿½ semï¿½ntica temporal
     * ------------------------------------------------------------ */

    const pm10 =
        publicResponse.current.readings.find(
            item => item.parameter === "pm10"
        );

    const corePm10 =
        coreResponse.validation.pm10;

    assert.ok(pm10);

    assert.equal(
        pm10.value,
        corePm10.value
    );

    assert.equal(
        pm10.unit,
        corePm10.unit
    );

    assert.equal(
        pm10.evaluationPeriod,
        "24h_mean"
    );

    assert.equal(
        pm10.historicalAssessmentRequired,
        true
    );


    /* ------------------------------------------------------------
     * QAI Score
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.current.qaiScore.value,
        coreResponse.metrics.qaiScore.score
    );

    assert.equal(
        publicResponse.current.qaiScore.level,
        coreResponse.metrics.qaiScore.level
    );

    assert.equal(
        publicResponse.current.qaiScore.available,
        true
    );

    assert.equal(
        publicResponse.current.qaiScore.value,
        coreResponse.metrics.qaiScore.score
    );

    assert.notEqual(
        publicResponse.current.qaiScore.level,
        "UNKNOWN"
    );


    /* ------------------------------------------------------------
     * Ausï¿½ncia sem inferï¿½ncia
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.scenario.available,
        false
    );

    assert.equal(
        publicResponse.relationship.available,
        false
    );

    assert.equal(
        publicResponse.impacts.available,
        false
    );


    /* ------------------------------------------------------------
     * Action ? CORE mitigation
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.action.available,
        true
    );

    assert.equal(
        publicResponse.action.primary.id,
        coreResponse.mitigation.primary.id
    );

    assert.equal(
        publicResponse.action.primary.title,
        coreResponse.mitigation.primary.title
    );


    /* ------------------------------------------------------------
     * Foundation ? CORE evidence
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.evidence.available,
        true
    );

    assert.equal(
        publicResponse.evidence.explanation,
        coreResponse.evidence.primary.description
    );


    /* ------------------------------------------------------------
     * References
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.references.items.length > 0,
        true
    );
}


/* ================================================================
 * 2. HOT / HUMID ï¿½ CADEIA ANALï¿½TICA
 * ================================================================ */

{
    const { coreResponse, publicResponse } = analyze({
        temperature: 29,
        humidity: 70,
        co2: 1400,
        pm25: 6,
        pm10: 12,
        vocIndex: 90,
        noxIndex: 1
    });


    /* ------------------------------------------------------------
     * Scenario
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.scenario.available,
        true
    );

    assert.equal(
        publicResponse.scenario.id,
        coreResponse.environmentalScenario.primary.id
    );

    assert.equal(
        publicResponse.scenario.title,
        coreResponse.environmentalScenario.primary.name
    );

    assert.equal(
        publicResponse.scenario.description,
        (coreResponse.environmentalScenario.primary.description ?? null)
    );


    /* ------------------------------------------------------------
     * Relationship
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.relationship.available,
        true
    );

    assert.equal(
        publicResponse.relationship.id,
        coreResponse.relationships.primary.id
    );

    assert.equal(
        publicResponse.relationship.title,
        coreResponse.relationships.primary.title
    );

    assert.equal(
        publicResponse.relationship.description,
        coreResponse.relationships.primary.description
    );


    /* ------------------------------------------------------------
     * Impacts
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.impacts.available,
        true
    );

    assert.equal(
        publicResponse.impacts.items.length,
        3
    );

    for (const item of publicResponse.impacts.items) {
        assert.equal(
            item.status,
            "POSSIBLE"
        );
    }

    assert.equal(
        publicResponse.impacts.items[0].id,
        coreResponse.impacts.primary.id
    );


    /* ------------------------------------------------------------
     * Action
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.action.primary.id,
        coreResponse.mitigation.primary.id
    );

    assert.equal(
        publicResponse.action.primary.title,
        coreResponse.mitigation.primary.title
    );

    assert.equal(
        publicResponse.action.primary.title,
        "Controlar fontes de umidade"
    );


    /* ------------------------------------------------------------
     * CO2 continua contextual
     * ------------------------------------------------------------ */

    const co2 =
        publicResponse.current.readings.find(
            item => item.parameter === "co2"
        );

    assert.equal(
        co2.value,
        1400
    );

    assert.equal(
        co2.assessment,
        "NOT_ASSESSED"
    );

    assert.equal(
        "referenceThreshold" in co2,
        false
    );


    /* ------------------------------------------------------------
     * QAI Score V1
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.current.qaiScore.available,
        true
    );

    assert.equal(
        publicResponse.current.qaiScore.value,
        coreResponse.metrics.qaiScore.score
    );

    assert.equal(
        publicResponse.current.qaiScore.level,
        coreResponse.metrics.qaiScore.level
    );
}


/* ================================================================
 * 3. Nï¿½O-CRIAï¿½ï¿½O ANALï¿½TICA
 * ================================================================ */

{
    const { publicResponse } = analyze({
        temperature: 23,
        humidity: 50,
        co2: 650,
        pm25: 6,
        pm10: 12,
        vocIndex: 90,
        noxIndex: 1
    });


    /* ------------------------------------------------------------
     * Camadas proibidas
     * ------------------------------------------------------------ */

    assert.equal(
        "humanImpact" in publicResponse,
        false
    );

    assert.equal(
        "healthRisk" in publicResponse,
        false
    );

    assert.equal(
        "risk" in publicResponse,
        false
    );

    assert.equal(
        "urgency" in publicResponse,
        false
    );

    assert.equal(
        "severity" in publicResponse,
        false
    );

    assert.equal(
        "compliance" in publicResponse,
        false
    );

    assert.equal(
        "trend" in publicResponse,
        false
    );

    assert.equal(
        "historicalScore" in publicResponse,
        false
    );

    assert.equal(
        "occupancyEstimate" in publicResponse,
        false
    );


    /* ------------------------------------------------------------
     * Nï¿½o criar interpretaï¿½ï¿½o dentro das leituras
     * ------------------------------------------------------------ */

    const co2 =
        publicResponse.current.readings.find(
            item => item.parameter === "co2"
        );

    assert.equal(
        co2.assessment,
        "NOT_ASSESSED"
    );

    assert.equal(
        "referenceThreshold" in co2,
        false
    );

    assert.equal(
        "severity" in co2,
        false
    );


    /* ------------------------------------------------------------
     * Score nï¿½o pode ser inventado
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.current.qaiScore.available,
        true
    );

    assert.equal(
        typeof publicResponse.current.qaiScore.value,
        "number"
    );
}


/* ================================================================
 * 4. AUSï¿½NCIA ï¿½ Nï¿½O TRANSFORMAR AUSï¿½NCIA EM CONCLUSï¿½O
 * ================================================================ */

{
    const { coreResponse, publicResponse } = analyze({
        temperature: null,
        humidity: null,
        co2: null,
        pm25: null,
        pm10: null,
        vocIndex: null,
        noxIndex: null
    });


    assert.equal(
        publicResponse.scenario.available,
        false
    );

    assert.equal(
        publicResponse.relationship.available,
        false
    );

    assert.equal(
        publicResponse.impacts.available,
        false
    );


    assert.equal(
        publicResponse.current.qaiScore.available,
        false
    );


    const temperature =
        publicResponse.current.readings.find(
            item => item.parameter === "temperature"
        );

    assert.equal(
        temperature.state,
        "MISSING"
    );

    assert.equal(
        temperature.value,
        null
    );


    const co2 =
        publicResponse.current.readings.find(
            item => item.parameter === "co2"
        );

    assert.equal(
        co2.state,
        "MISSING"
    );

    assert.equal(
        co2.value,
        null
    );


    /* ------------------------------------------------------------
     * Ausï¿½ncia do CORE nï¿½o pode gerar aï¿½ï¿½o analï¿½tica
     * ------------------------------------------------------------ */

    assert.equal(
        coreResponse.diagnosis.primary,
        null
    );

    assert.deepEqual(
        coreResponse.diagnosis.secondary,
        []
    );
}


/* ================================================================
 * 5. IMUTABILIDADE
 * ================================================================ */

{
    const { publicResponse } = analyze({
        temperature: 23,
        humidity: 50,
        co2: 650,
        pm25: 6,
        pm10: 12,
        vocIndex: 90,
        noxIndex: 1
    });

    assert.equal(
        Object.isFrozen(publicResponse),
        true
    );
}


/* ================================================================
 * RESULTADO
 * ================================================================ */

console.log("\n========================================");
console.log("DASHBOARD CONTRACT V1");
console.log("========================================");
console.log("? Normal ï¿½ rastreabilidade");
console.log("? Hot/Humid ï¿½ cadeia analï¿½tica");
console.log("? CO2 contextual preservado");
console.log("? PM2.5 / PM10 ï¿½ semï¿½ntica temporal");
console.log("? QAI Score UNKNOWN preservado");
console.log("? POSSIBLE preservado");
console.log("? Prioridade do CORE preservada");
console.log("? Ausï¿½ncia sem inferï¿½ncia");
console.log("? Nï¿½o-criaï¿½ï¿½o analï¿½tica");
console.log("? Imutabilidade");
console.log("\n? DASHBOARD CONTRACT V1 ï¿½ PASSED\n");





