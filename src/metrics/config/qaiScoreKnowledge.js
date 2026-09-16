/**
 * CORE QAI
 * QAI Score V1 — Knowledge
 *
 * O Knowledge define:
 * - quais parâmetros participam do Score;
 * - método de normalização;
 * - pontos da curva;
 * - peso;
 * - período de avaliação;
 * - unidade;
 * - aplicabilidade;
 * - fundamentos utilizados.
 *
 * O calculator NÃO deve conter thresholds próprios.
 */

const QAI_SCORE_KNOWLEDGE = {
    temperature: {
        parameter: "temperature",
        status: "APPROVED",

        method: "piecewise_linear",
        unit: "°C",
        evaluationPeriod: "instant",

        applicability: {
            domains: ["corporate", "healthcare", "education", "residential", "datacenter"],
            context: "mechanically_cooled_non_heating_season"
        },

        normalization: {
            scale: {
                min: 0,
                max: 100
            },

            points: [
                { value: 22.0, score: 0 },
                { value: 23.0, score: 50 },
                { value: 23.5, score: 100 },
                { value: 25.5, score: 100 },
                { value: 26.0, score: 50 },
                { value: 27.0, score: 0 }
            ]
        },

        weight: 0.25,

        references: [
            "atlas_ieq_2026",
            "en_16798_1"
        ]
    },

    humidity: {
        parameter: "humidity",
        status: "APPROVED",

        method: "piecewise_linear",
        unit: "%",
        evaluationPeriod: "instant",

        applicability: {
            domains: ["corporate", "healthcare", "education", "residential", "datacenter"],
            context: "indoor_environment"
        },

        normalization: {
            scale: {
                min: 0,
                max: 100
            },

            points: [
                { value: 20.0, score: 0 },
                { value: 25.0, score: 50 },
                { value: 30.0, score: 100 },
                { value: 50.0, score: 100 },
                { value: 60.0, score: 50 },
                { value: 70.0, score: 0 }
            ]
        },

        weight: 0.25,

        references: [
            "atlas_ieq_2026",
            "en_16798_1"
        ]
    },

    pm25: {
        parameter: "pm25",
        status: "APPROVED",

        method: "piecewise_linear",
        unit: "µg/m³",
        evaluationPeriod: "instant",

        applicability: {
            domains: ["corporate", "healthcare", "education", "residential", "datacenter"],
            context: "indoor_environment"
        },

        normalization: {
            scale: {
                min: 0,
                max: 100
            },

            points: [
                { value: 5.0, score: 100 },
                { value: 15.0, score: 50 },
                { value: 35.0, score: 0 }
            ]
        },

        weight: 0.25,

        references: [
            "atlas_ieq_2026",
            "who_aqg_2021_pm25_24h"
        ]
    },

    pm10: {
        parameter: "pm10",
        status: "APPROVED",

        method: "piecewise_linear",
        unit: "µg/m³",
        evaluationPeriod: "instant",

        applicability: {
            domains: ["corporate", "healthcare", "education", "residential", "datacenter"],
            context: "indoor_environment"
        },

        normalization: {
            scale: {
                min: 0,
                max: 100
            },

            points: [
                { value: 15.0, score: 100 },
                { value: 45.0, score: 50 },
                { value: 70.0, score: 0 }
            ]
        },

        weight: 0.25,

        references: [
            "atlas_ieq_2026",
            "who_aqg_2021_pm10_24h"
        ]
    }
};

export default QAI_SCORE_KNOWLEDGE;