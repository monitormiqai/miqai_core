/**
 * ======================================================================
 * CORE QAI
 * VOC Index Regulatory Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : vocIndex.js
 * Módulo    : Regulatory Library
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Catálogo regulatório para VOC Index.
 *
 * Este catálogo descreve exclusivamente os critérios operacionais
 * utilizados pela Validation Engine.
 *
 * Não executa validações.
 * Não interpreta resultados.
 * Não calcula métricas.
 * ======================================================================
 */

const VOC_INDEX_REGULATORY = Object.freeze({

    /* ==========================================================
     * IDENTIFICAÇÃO
     * ========================================================== */

    parameter: "vocIndex",

    validationKey: "vocIndex",

    displayName: "VOC Index",

    description: "Volatile Organic Compounds Index.",

    unit: "index",

    /* ==========================================================
     * PERFIS REGULATÓRIOS
     * ========================================================== */

    profiles: Object.freeze({

        corporate: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 150,

            regulatoryId: "SENSIRION-VOC-INDEX"

        }),

        healthcare: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 150,

            regulatoryId: "SENSIRION-VOC-INDEX"

        }),

        education: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 150,

            regulatoryId: "SENSIRION-VOC-INDEX"

        }),

        residential: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 150,

            regulatoryId: "SENSIRION-VOC-INDEX"

        }),

        datacenter: Object.freeze({

            regulated: true,

            type: "MAX",

            threshold: 150,

            regulatoryId: "SENSIRION-VOC-INDEX"

        })

    })

});

export default VOC_INDEX_REGULATORY;