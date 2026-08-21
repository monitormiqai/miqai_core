/**
 * ======================================================================
 * CORE QAI
 * PM10 Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : pm10.js
 * Módulo    : Regulatory Library
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Catálogo regulatório para Material Particulado PM10.
 *
 * Este catálogo descreve exclusivamente os critérios regulatórios
 * utilizados pela Validation Engine.
 *
 * Não executa validações.
 * Não interpreta resultados.
 * Não calcula métricas.
 * ======================================================================
 */

const PM10_REGULATORY = Object.freeze({

    /* ==========================================================
     * IDENTIFICAÇÃO
     * ========================================================== */

    parameter: "pm10",

    validationKey: "pm10",

    displayName: "PM10",

    description: "Coarse particulate matter (PM10).",

    unit: "µg/m³",

    /* ==========================================================
     * PERFIS REGULATÓRIOS
     * ========================================================== */

    profiles: Object.freeze({

        corporate: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 45,

            regulatoryId: "WHO-AQG-2021"

        }),

        healthcare: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 45,

            regulatoryId: "WHO-AQG-2021"

        }),

        education: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 45,

            regulatoryId: "WHO-AQG-2021"

        }),

        residential: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 45,

            regulatoryId: "WHO-AQG-2021"

        }),

        datacenter: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 45,

            regulatoryId: "WHO-AQG-2021"

        })

    })

});

export default PM10_REGULATORY;