/**
 * ======================================================================
 * CORE QAI
 * Healthcare Domain
 * ----------------------------------------------------------------------
 * Arquivo   : healthcareDomain.js
 * Módulo    : Domains
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar o ambiente Hospitalar dentro do CORE QAI.
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

const HEALTHCARE_DOMAIN = Object.freeze({

    /*
     * Identificação
     */

    id: "healthcare",

    name: "Healthcare",

    description:
        "Healthcare and hospital environments.",

    /*
     * Perfis utilizados pelas Libraries
     */

    profiles: Object.freeze({

        regulatory: "healthcare",

        metrics: "healthcare",

        diagnostics: "healthcare",

        evidences: "healthcare",

        hypotheses: "healthcare",

        mitigations: "healthcare"

    })

});

export default HEALTHCARE_DOMAIN;