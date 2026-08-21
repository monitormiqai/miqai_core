/**
 * ======================================================================
 * CORE QAI
 * PM2.5 Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : pm25.js
 * Módulo    : Regulatory Library
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Catálogo regulatório para Material Particulado PM2.5.
 *
 * Este catálogo descreve exclusivamente os critérios regulatórios
 * utilizados pela Validation Engine.
 *
 * Não executa validações.
 * Não interpreta resultados.
 * Não calcula métricas.
 * ======================================================================
 */

const PM25_REGULATORY = Object.freeze({

    /* ==========================================================
     * IDENTIFICAÇÃO
     * ========================================================== */

    parameter: "pm25",

    validationKey: "pm25",

    displayName: "PM2.5",

    description: "Fine particulate matter (PM2.5).",

    unit: "µg/m³",

    /* ==========================================================
     * PERFIS REGULATÓRIOS
     * ========================================================== */

    profiles: Object.freeze({

        corporate: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 15,

            regulatoryId: "WHO-AQG-2021"

        }),

        healthcare: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 15,

            regulatoryId: "WHO-AQG-2021"

        }),

        education: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 15,

            regulatoryId: "WHO-AQG-2021"

        }),

        residential: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 15,

            regulatoryId: "WHO-AQG-2021"

        }),

        datacenter: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 15,

            regulatoryId: "WHO-AQG-2021"

        })

    })

});

export default PM25_REGULATORY;