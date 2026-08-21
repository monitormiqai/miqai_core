/**
 * ======================================================================
 * CORE QAI
 * Humidity Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : humidity.js
 * Módulo    : Regulatory Library
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Catálogo regulatório para Umidade Relativa do Ar.
 *
 * Este catálogo descreve exclusivamente os critérios regulatórios
 * utilizados pela Validation Engine.
 *
 * Não executa validações.
 * Não interpreta resultados.
 * Não calcula métricas.
 * ======================================================================
 */

const HUMIDITY_REGULATORY = Object.freeze({

    /* ==========================================================
     * IDENTIFICAÇÃO
     * ========================================================== */

    parameter: "humidity",

    validationKey: "humidity",

    displayName: "Relative Humidity",

    description: "Indoor relative humidity.",

    unit: "%",

    /* ==========================================================
     * PERFIS REGULATÓRIOS
     * ========================================================== */

    profiles: Object.freeze({

        corporate: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 40,

            max: 65,

            regulatoryId: "ASHRAE-55"

        }),

        healthcare: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 40,

            max: 60,

            regulatoryId: "ANVISA-RDC-50"

        }),

        education: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 40,

            max: 65,

            regulatoryId: "ASHRAE-55"

        }),

        residential: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 40,

            max: 65,

            regulatoryId: "ASHRAE-55"

        }),

        datacenter: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 20,

            max: 80,

            regulatoryId: "ASHRAE-TC9.9"

        })

    })

});

export default HUMIDITY_REGULATORY;