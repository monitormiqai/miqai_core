/**
 * ======================================================================
 * CORE QAI
 * Public Response Adapter
 *
 * Arquivo   : adapter.js
 * Módulo    : Public Response V1
 * Versão    : 1.0.0
 * Status    : RC1
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Organizar resultados já produzidos pelo CORE QAI em uma estrutura
 * pública destinada ao Dashboard/App.
 *
 * REGRA FUNDAMENTAL:
 * Este módulo NÃO calcula, interpreta, diagnostica, infere ou cria
 * resultados analíticos.
 *
 * Tudo que aparece na resposta pública deve possuir origem no resultado
 * produzido pelo CORE.
 * ======================================================================
 */

const PUBLIC_RESPONSE_VERSION = "1.0";

const READING_KEYS = [
    "temperature",
    "humidity",
    "co2",
    "pm25",
    "pm10",
    "vocIndex",
    "noxIndex"
];

const QAI_SCORE_PUBLIC_INTERPRETATION = Object.freeze({
    EXCELLENT: {
        title: "Condição ambiental excelente",
        description: "O nível geral do ambiente está em uma condição muito favorável para operação estável e conforto contínuo."
    },
    GOOD: {
        title: "Condição ambiental geral favorável",
        description: "O nível geral do ambiente está em uma condição favorável. Esse resultado indica um desempenho aceitável, com manutenção e monitoramento contínuos como prática adequada."
    },
    MODERATE: {
        title: "Condição ambiental moderada",
        description: "O nível geral do ambiente está em uma condição moderada. Esse resultado indica que o ambiente requer atenção e acompanhamento para manter o desempenho desejado."
    },
    POOR: {
        title: "Condição ambiental preocupante",
        description: "O nível geral do ambiente está abaixo do desejado. Esse resultado indica que a condição atual exige atenção e acompanhamento mais próximo."
    }
});

function adaptQaiScorePublicInterpretation(level) {
    const interpretation = QAI_SCORE_PUBLIC_INTERPRETATION[level];

    if (!interpretation) {
        return {
            title: null,
            description: null
        };
    }

    return {
        title: interpretation.title,
        description: interpretation.description
    };
}

function adaptReading(parameter, source) {
    if (!source) {
        return {
            parameter,
            value: null,
            unit: null,
            state: "MISSING",
            assessment: null,
            evaluationPeriod: null,
            historicalAssessmentRequired: false
        };
    }

    return {
        parameter,
        value: source.value ?? null,
        unit: source.unit ?? null,
        state: source.state ?? null,
        assessment: source.currentAssessment ?? null,
        evaluationPeriod: source.evaluationPeriod ?? null,
        historicalAssessmentRequired:
            source.historicalAssessmentRequired ?? false
    };
}

function adaptQaiScore(metrics) {
    const source = metrics?.qaiScore;

    if (!source) {
        return {
            available: false,
            value: null,
            level: "UNKNOWN",
            publicInterpretation: {
                title: null,
                description: null
            }
        };
    }

    const level = source.level ?? "UNKNOWN";

    return {
        available: source.score !== null && source.score !== undefined,
        value: source.score ?? null,
        level,
        publicInterpretation: adaptQaiScorePublicInterpretation(level)
    };
}

function adaptSection(source) {
    if (!source) {
        return {
            available: false,
            title: null,
            description: null
        };
    }

    return {
        available: true,
        id: source.id ?? null,
        title: source.title ?? source.name ?? null,
        description: source.description ?? null
    };
}

function adaptImpacts(impacts) {
    const items = [];

    if (impacts?.primary) {
        items.push({
            id: impacts.primary.id ?? null,
            title: impacts.primary.title ?? null,
            status: impacts.primary.status ?? null,
            description: impacts.primary.description ?? null
        });
    }

    for (const item of impacts?.secondary ?? []) {
        items.push({
            id: item.id ?? null,
            title: item.title ?? null,
            status: item.status ?? null,
            description: item.description ?? null
        });
    }

    return {
        available: items.length > 0,
        items
    };
}

function adaptActions(mitigation) {
    const primary = mitigation?.primary
        ? {
            id: mitigation.primary.id ?? null,
            title: mitigation.primary.title ?? null,
            description: mitigation.primary.description ?? null
        }
        : null;

    const additional = (mitigation?.secondary ?? []).map(item => ({
        id: item.id ?? null,
        title: item.title ?? null,
        description: item.description ?? null
    }));

    return {
        available: primary !== null || additional.length > 0,
        primary,
        additional
    };
}

function adaptFollowUp(response) {
    const guidance = [];
    const seen = new Set();

    function addGuidance(text) {
        if (!text || seen.has(text)) {
            return;
        }

        seen.add(text);
        guidance.push(text);
    }

    const validation = response?.validation ?? {};

    for (const parameter of ["pm25", "pm10"]) {
        addGuidance(validation[parameter]?.temporalGuidance);
    }

    addGuidance(
        response?.metrics?.co2Analysis?.persistence?.instruction
    );

    return {
        available: guidance.length > 0,
        guidance
    };
}

function adaptEvidence(response) {
    const evidence = response?.evidence?.records ?? [];

    return {
        available: evidence.length > 0,
        explanation: response?.evidence?.primary?.description ?? null,
        items: evidence.map(item => ({
            id: item.id ?? null,
            title: item.title ?? null,
            description: item.description ?? null,
            referenceIds: item.referenceIds ?? []
        }))
    };
}

function adaptReferences(response) {
    const items = [];
    const source = response?.references;

    if (source?.primary?.reference) {
        items.push({
            id: source.primary.reference.id ?? null,
            code: source.primary.reference.code ?? null,
            title:
                source.primary.reference.title ??
                source.primary.reference.name ??
                null
        });
    }

    for (const item of source?.secondary ?? []) {
        if (item.reference) {
            items.push({
                id: item.reference.id ?? null,
                code: item.reference.code ?? null,
                title:
                    item.reference.title ??
                    item.reference.name ??
                    null
            });
        }
    }

    return {
        available: items.length > 0,
        items
    };
}

export function adaptPublicResponse(response) {
    if (!response) {
        throw new TypeError("CORE response is required.");
    }

    const validation = response.validation ?? {};
    const metrics = response.metrics ?? {};

    const readings = READING_KEYS.map(parameter =>
        adaptReading(parameter, validation[parameter])
    );

    const dewPoint = metrics.dewPoint;

    if (dewPoint?.value !== undefined && dewPoint?.value !== null) {
        readings.push({
            parameter: "dewPoint",
            value: dewPoint.value,
            unit: dewPoint.unit ?? null,
            state: null,
            assessment: null,
            evaluationPeriod: null,
            historicalAssessmentRequired: false
        });
    }

    const scenario = adaptSection(
        response.environmentalScenario?.primary
    );

    const relationship = adaptSection(
        response.relationships?.primary
    );

    const impacts = adaptImpacts(response.impacts);
    const action = adaptActions(response.mitigation);

    return Object.freeze({
        version: PUBLIC_RESPONSE_VERSION,

        timestamp: response.metadata?.timestamp ?? null,

        status: {
            state: response.metadata?.status ?? "ERROR",
            message: null
        },

        environment: {
            type: response.domain?.id ?? null,
            name: response.domain?.name ?? null
        },

        current: {
            readings,
            message: null,
            qaiScore: adaptQaiScore(metrics)
        },

        scenario,

        relationship,

        impacts,

        action,

        followUp: adaptFollowUp(response),

        evidence: adaptEvidence(response),

        references: adaptReferences(response)
    });
}

export default adaptPublicResponse;