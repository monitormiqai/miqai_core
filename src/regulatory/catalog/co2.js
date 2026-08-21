/**
 * ======================================================================
 * CORE QAI
 * CO₂ Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : co2.js
 * Módulo    : Regulatory Library
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Catálogo regulatório para Dióxido de Carbono (CO₂).
 *
 * Este catálogo descreve exclusivamente os critérios regulatórios
 * utilizados pela Validation Engine.
 *
 * Não executa validações.
 * Não interpreta resultados.
 * Não calcula métricas.
 * ======================================================================
 */

const CO2_REGULATORY = Object.freeze({

    /* ==========================================================
     * IDENTIFICAÇÃO
     * ========================================================== */

    parameter: "co2",

    validationKey: "co2",

    displayName: "Carbon Dioxide",

    description: "Indoor carbon dioxide concentration.",

    unit: "ppm",

    /* ==========================================================
     * PERFIS REGULATÓRIOS
     * ========================================================== */

    profiles: Object.freeze({

        corporate: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 1000,

            regulatoryId: "ASHRAE-62.1"

        }),

        healthcare: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 1000,

            regulatoryId: "ASHRAE-62.1"

        }),

        education: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 1000,

            regulatoryId: "ASHRAE-62.1"

        }),

        residential: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 1000,

            regulatoryId: "ASHRAE-62.1"

        }),

        datacenter: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 1000,

            regulatoryId: "ASHRAE-62.1"

        })

    })

});

export default CO2_REGULATORY;