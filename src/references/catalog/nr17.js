/**
 * ======================================================================
 * CORE QAI
 * Reference
 * ----------------------------------------------------------------------
 * Arquivo   : nr17.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Referência regulamentadora brasileira utilizada pelo CORE QAI para
 * avaliação das condições ergonômicas e das condições de conforto no
 * ambiente de trabalho.
 *
 * Esta biblioteca apenas registra metadados da referência.
 *
 * Não executa validações.
 * Não interpreta diagnósticos.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const NR17 = Object.freeze({

    /*
     * Identificador interno.
     */

    id: "nr17",

    /*
     * Código oficial.
     */

    code: "NR-17",

    /*
     * Nome oficial da referência.
     */

    name: "Ergonomia",

    /*
     * Nome apresentado ao usuário.
     */

    title: "Ergonomia",

    /*
     * Organização responsável.
     */

    organization: "MTE",

    /*
     * Nome institucional completo.
     */

    publisher:
        "Ministério do Trabalho e Emprego",

    /*
     * País de origem.
     */

    country: "Brasil",

    /*
     * Tipo da referência.
     */

    type: "Norma Regulamentadora",

    /*
     * Categoria principal.
     */

    category: "Ergonomia",

    /*
     * Escopo técnico da referência.
     */

    scope: [

        "Ergonomics",

        "Workplace Conditions",

        "Thermal Comfort",

        "Work Organization",

        "Workstation"

    ],

    /*
     * Versão utilizada pelo CORE.
     */

    version: "2022",

    /*
     * Ano da redação atualmente publicada na página oficial.
     */

    year: 2022,

    /*
     * Situação da referência.
     */

    status: "CURRENT",

    /*
     * Ambientes aos quais a referência pode ser aplicável.
     *
     * A aplicação depende da existência de atividade laboral.
     */

    applicability: [

        "Corporate",

        "Healthcare",

        "Education"

    ],

    /*
     * Relações normativas.
     */

    relatedReferences: [

        "nr01",

    ],

    /*
     * Estrutura lógica da referência.
     *
     * As seções representam agrupamentos utilizados pelo
     * Reference Resolver. Não representam limites específicos
     * de qualidade do ar definidos pela NR-17.
     */

    sections: Object.freeze({

        workAssessment: Object.freeze({

            id: "work_assessment",

            key: "work_assessment",

            code: "17.3",

            title: "Avaliação das Situações de Trabalho",

            topics: [

                "ergonomic_assessment",

                "work_assessment",

                "aep",

                "aet",

                "work_conditions"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education"

            ]

        }),

        workOrganization: Object.freeze({

            id: "work_organization",

            key: "work_organization",

            code: "17.4",

            title: "Organização do Trabalho",

            topics: [

                "work_organization",

                "workload",

                "work_duration",

                "work_pace",

                "breaks"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education"

            ]

        }),

        workstation: Object.freeze({

            id: "workstation",

            key: "workstation",

            code: "17.6",

            title: "Mobiliário dos Postos de Trabalho",

            topics: [

                "workstation",

                "furniture",

                "posture",

                "work_position"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education"

            ]

        }),

        environmentalComfort: Object.freeze({

            id: "environmental_comfort",

            key: "environmental_comfort",

            code: "17.8",

            title: "Condições de Conforto no Ambiente de Trabalho",

            topics: [

                "thermalComfort",

                "temperature",

                "humidity",

                "air_velocity",

                "environmental_comfort",

                "workplace_comfort"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education"

            ]

        })

    }),

    /*
     * Resumo da referência.
     */

    description:
        "Estabelece diretrizes para adaptação das condições de trabalho às características psicofisiológicas dos trabalhadores, abrangendo avaliação das situações de trabalho, organização do trabalho, postos de trabalho e condições de conforto no ambiente laboral.",

    /*
     * Forma de citação apresentada ao usuário.
     */

    citation:
        "NR-17 — Ergonomia.",

    /*
     * Endereço oficial.
     */

    url:
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-17-nr-17"

});

export default NR17;