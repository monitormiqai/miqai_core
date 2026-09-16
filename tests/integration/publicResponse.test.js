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

    return {
        coreResponse,
        publicResponse: adaptPublicResponse(coreResponse)
    };
}

/* ================================================================
 * NORMAL
 * ================================================================= */

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
     * CONTRATO BÁSICO
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.version,
        "1.0"
    );

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

    /* ------------------------------------------------------------
     * TEMPERATURA
     * ------------------------------------------------------------ */

    const temperature =
        publicResponse.current.readings.find(
            x => x.parameter === "temperature"
        );

    assert.ok(temperature);

    assert.equal(
        temperature.value,
        coreResponse.validation.temperature.value
    );

    assert.equal(
        temperature.unit,
        coreResponse.validation.temperature.unit
    );

    assert.equal(
        temperature.state,
        coreResponse.validation.temperature.state
    );

    assert.equal(
        temperature.assessment,
        coreResponse.validation.temperature.currentAssessment
    );

    assert.equal(
        temperature.evaluationPeriod,
        coreResponse.validation.temperature.evaluationPeriod
    );

    /* ------------------------------------------------------------
     * UMIDADE
     * ------------------------------------------------------------ */

    const humidity =
        publicResponse.current.readings.find(
            x => x.parameter === "humidity"
        );

    assert.ok(humidity);

    assert.equal(
        humidity.value,
        coreResponse.validation.humidity.value
    );

    assert.equal(
        humidity.unit,
        coreResponse.validation.humidity.unit
    );

    assert.equal(
        humidity.state,
        coreResponse.validation.humidity.state
    );

    assert.equal(
        humidity.assessment,
        coreResponse.validation.humidity.currentAssessment
    );

    /* ------------------------------------------------------------
     * CO2 — CONTEXTUAL
     * ------------------------------------------------------------ */

    const co2 =
        publicResponse.current.readings.find(
            x => x.parameter === "co2"
        );

    assert.ok(co2);

    assert.equal(
        co2.value,
        coreResponse.validation.co2.value
    );

    assert.equal(
        co2.assessment,
        "NOT_ASSESSED"
    );

    assert.equal(
        co2.evaluationPeriod,
        "current_reading"
    );

    /* O Adapter não cria threshold regulatório. */
    assert.equal(
        "referenceThreshold" in co2,
        false
    );

    /* O Adapter não cria severity pública. */
    assert.equal(
        "severity" in co2,
        false
    );

    /* ------------------------------------------------------------
     * PM2.5 — SEMÂNTICA TEMPORAL
     * ------------------------------------------------------------ */

    const pm25 =
        publicResponse.current.readings.find(
            x => x.parameter === "pm25"
        );

    assert.ok(pm25);

    assert.equal(
        pm25.value,
        coreResponse.validation.pm25.value
    );

    assert.equal(
        pm25.evaluationPeriod,
        "24h_mean"
    );

    assert.equal(
        pm25.historicalAssessmentRequired,
        true
    );

    /* O Dashboard não transforma leitura instantânea
       em conformidade de 24 horas. */
    assert.equal(
        "compliance" in pm25,
        false
    );

    /* ------------------------------------------------------------
     * PM10 — SEMÂNTICA TEMPORAL
     * ------------------------------------------------------------ */

    const pm10 =
        publicResponse.current.readings.find(
            x => x.parameter === "pm10"
        );

    assert.ok(pm10);

    assert.equal(
        pm10.value,
        coreResponse.validation.pm10.value
    );

    assert.equal(
        pm10.evaluationPeriod,
        "24h_mean"
    );

    assert.equal(
        pm10.historicalAssessmentRequired,
        true
    );

    assert.equal(
        "compliance" in pm10,
        false
    );

    /* ------------------------------------------------------------
     * DEW POINT
     * ------------------------------------------------------------ */

    const dewPoint =
        publicResponse.current.readings.find(
            x => x.parameter === "dewPoint"
        );

    assert.ok(dewPoint);

    assert.equal(
        dewPoint.value,
        coreResponse.metrics.dewPoint.value
    );

    assert.equal(
        dewPoint.unit,
        coreResponse.metrics.dewPoint.unit
    );

    /*
     * O CORE não fornece uma avaliação temporal específica
     * para dewPoint. O Adapter não deve inventar
     * "instantaneous_reading".
     */
    assert.equal(
        dewPoint.evaluationPeriod,
        null
    );

    /* ------------------------------------------------------------
     * QAI SCORE V1
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

    /* ------------------------------------------------------------
     * NORMAL — SEM CENÁRIO
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.scenario.available,
        false
    );

    assert.equal(
        publicResponse.scenario.title,
        null
    );

    assert.equal(
        publicResponse.scenario.description,
        null
    );

    /* ------------------------------------------------------------
     * NORMAL — SEM RELATIONSHIP
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.relationship.available,
        false
    );

    assert.equal(
        publicResponse.relationship.title,
        null
    );

    assert.equal(
        publicResponse.relationship.description,
        null
    );

    /* ------------------------------------------------------------
     * NORMAL — SEM IMPACTS
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.impacts.available,
        false
    );

    assert.deepEqual(
        publicResponse.impacts.items,
        []
    );

    /* ------------------------------------------------------------
     * ACTION — RASTREABILIDADE
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
     * FOUNDATION — RASTREABILIDADE
     * ------------------------------------------------------------ */

    assert.equal(
        publicResponse.foundation.available,
        true
    );

    assert.equal(
        publicResponse.foundation.explanation,
        coreResponse.evidence.primary.description
    );

    /* ------------------------------------------------------------
     * REFERENCES
     * ------------------------------------------------------------ */

    assert.ok(
        Array.isArray(publicResponse.references)
    );

    assert.ok(
        publicResponse.references.length > 0
    );

    /* ------------------------------------------------------------
     * NÃO-CRIAÇÃO ANALÍTICA
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
}

