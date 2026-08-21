/**
 * ======================================================================
 * CORE QAI
 * Corporate Domain
 * ----------------------------------------------------------------------
 * Arquivo   : corporateDomain.js
 * Módulo    : Domains
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar o ambiente Corporativo dentro do CORE QAI.
 *
 * O Domain é um descritor do ambiente operacional.
 *
 * Ele NÃO contém:
 *
 * • Regras regulatórias
 * • Limites técnicos
 * • Scores
 * • Métricas
 * • Diagnósticos
 * • Evidências
 * • Hipóteses
 * • Mitigações
 *
 * Sua única responsabilidade é informar quais perfis das
 * Libraries deverão ser utilizados durante o pipeline.
 * ======================================================================
 */

const CORPORATE_DOMAIN = Object.freeze({

    /*
     * Identificação
     */

    id: "corporate",

    name: "Corporate",

    description:
        "Corporate office environments.",

    /*
     * Perfis utilizados pelas Libraries
     */

    profiles: Object.freeze({

        regulatory: "corporate",

        metrics: "corporate",

        diagnostics: "corporate",

        evidences: "corporate",

        hypotheses: "corporate",

        mitigations: "corporate"

    })

});

export default CORPORATE_DOMAIN;