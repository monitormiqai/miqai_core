/**
 * ======================================================================
 * CORE QAI
 * Datacenter Domain
 * ----------------------------------------------------------------------
 * Arquivo   : datacenterDomain.js
 * Módulo    : Domains
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar o ambiente Data Center dentro do CORE QAI.
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

const DATACENTER_DOMAIN = Object.freeze({

    /*
     * Identificação
     */

    id: "datacenter",

    name: "Datacenter",

    description:
        "Datacenter and mission-critical IT environments.",

    /*
     * Perfis utilizados pelas Libraries
     */

    profiles: Object.freeze({

        regulatory: "datacenter",

        metrics: "datacenter",

        diagnostics: "datacenter",

        evidences: "datacenter",

        hypotheses: "datacenter",

        mitigations: "datacenter"

    })

});

export default DATACENTER_DOMAIN;