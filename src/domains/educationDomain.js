/**
 * ======================================================================
 * CORE QAI
 * Education Domain
 * ----------------------------------------------------------------------
 * Arquivo   : educationDomain.js
 * Módulo    : Domains
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar o ambiente Educacional dentro do CORE QAI.
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

const EDUCATION_DOMAIN = Object.freeze({

    /*
     * Identificação
     */

    id: "education",

    name: "Education",

    description:
        "Educational environments, including schools, universities and training centers.",

    /*
     * Perfis utilizados pelas Libraries
     */

    profiles: Object.freeze({

        regulatory: "education",

        metrics: "education",

        diagnostics: "education",

        evidences: "education",

        hypotheses: "education",

        mitigations: "education"

    })

});

export default EDUCATION_DOMAIN;