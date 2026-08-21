/**
 * ======================================================================
 * CORE QAI
 * Residential Domain
 * ----------------------------------------------------------------------
 * Arquivo   : residentialDomain.js
 * Módulo    : Domains
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar o ambiente Residencial dentro do CORE QAI.
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

const RESIDENTIAL_DOMAIN = Object.freeze({

    /*
     * Identificação
     */

    id: "residential",

    name: "Residential",

    description:
        "Residential environments, including houses and apartments.",

    /*
     * Perfis utilizados pelas Libraries
     */

    profiles: Object.freeze({

        regulatory: "residential",

        metrics: "residential",

        diagnostics: "residential",

        evidences: "residential",

        hypotheses: "residential",

        mitigations: "residential"

    })

});

export default RESIDENTIAL_DOMAIN;