/**
 * ======================================================================
 * CORE QAI
 * Temperature Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : temperature.js
 * Módulo    : Regulatory Library
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Catálogo regulatório para Temperatura.
 *
 * Este catálogo descreve exclusivamente os critérios regulatórios
 * utilizados pela Validation Engine.
 *
 * Não executa validações.
 * Não interpreta resultados.
 * Não calcula métricas.
 * ======================================================================
 */

const TEMPERATURE_REGULATORY = Object.freeze({

/* ==========================================================
 * IDENTIFICAÇÃO
 * ========================================================== */

parameter: "temperature",

validationKey: "temperature",

displayName: "Temperature",

description: "Indoor air temperature.",

unit: "°C",

    /* ==========================================================
     * PERFIS REGULATÓRIOS
     * ========================================================== */

    profiles: Object.freeze({

        corporate: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 20,

            max: 26,

            regulatoryId: "ASHRAE-55"

        }),

        healthcare: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 20,

            max: 24,

            regulatoryId: "ANVISA-RDC-50"

        }),

        education: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 20,

            max: 26,

            regulatoryId: "ASHRAE-55"

        }),

        residential: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 18,

            max: 26,

            regulatoryId: "ASHRAE-55"

        }),

        datacenter: Object.freeze({

            regulated: true,

            type: "RANGE",

            min: 18,

            max: 27,

            regulatoryId: "ASHRAE-TC9.9"

        })

    })

});

export default TEMPERATURE_REGULATORY;