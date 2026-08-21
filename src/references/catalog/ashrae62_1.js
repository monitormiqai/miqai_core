/**
 * ======================================================================
 * CORE QAI
 * Reference
 * ----------------------------------------------------------------------
 * Arquivo   : ashrae62_1.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Referência normativa utilizada pelo CORE QAI para avaliação das
 * condições de ventilação e qualidade do ar interior.
 *
 * Esta biblioteca apenas registra metadados da referência.
 *
 * Não executa validações.
 * Não interpreta diagnósticos.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const ASHRAE62_1 = Object.freeze({

    /*
     * Identificador interno.
     */

    id: "ashrae62_1",

    /*
     * Código oficial.
     */

    code: "ASHRAE 62.1",

    /*
     * Nome oficial da publicação.
     */

    name: "Ventilation for Acceptable Indoor Air Quality",

    /*
     * Nome apresentado ao usuário.
     */

    title: "Ventilação para Qualidade do Ar Interior Aceitável",

    /*
     * Organização responsável.
     */

    organization: "ASHRAE",

    /*
     * Nome institucional completo.
     */

    publisher:
        "American Society of Heating, Refrigerating and Air-Conditioning Engineers",

    /*
     * País de origem.
     */

    country: "Estados Unidos",

    /*
     * Tipo da referência.
     */

    type: "Norma Técnica",

    /*
     * Categoria principal.
     */

    category: "Ventilação",

    /*
     * Escopo técnico da norma.
     */

    scope: [

        "Ventilation Systems",

        "Indoor Air Quality"

    ],

    /*
     * Versão utilizada pelo CORE.
     */

    version: "2022",

    /*
     * Ano da publicação.
     */

    year: 2022,

    /*
     * Situação da referência.
     */

    status: "CURRENT",

    /*
     * Ambientes aos quais a referência se aplica.
     */

    applicability: [

        "Corporate",

        "Healthcare",

        "Education",

        "Residential"

    ],

    /*
     * Estrutura lógica da norma.
     *
     * Utilizada futuramente pelo Reference Resolver para
     * identificar a seção mais adequada conforme o ambiente
     * e o resultado produzido pelo CORE.
     */

    sections: Object.freeze({

        ventilation: Object.freeze({

            id: "ventilation",

            key: "ventilation",

            code: "Section",

            title: "Ventilation Requirements",

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ],

            topics: [

                "co2",

                "ventilation",

                "outdoor_air",

                "air_changes",

                "fresh_air"

            ]

        }),

        indoorAirQuality: Object.freeze({

            id: "indoor_air_quality",

            key: "indoor_air_quality",

            code: "Section",

            title: "Indoor Air Quality",

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ],

            topics: [

                "iaq",

                "indoor_air",

                "occupants",

                "air_quality",

                "contaminants"

            ]

        })

    }),

    /*
     * Resumo da referência.
     */

    description:
        "Estabelece requisitos mínimos de ventilação e renovação do ar para proporcionar qualidade do ar interior aceitável em ambientes ocupados.",

    /*
     * Forma de citação apresentada ao usuário.
     */

    citation:
        "ASHRAE Standard 62.1:2022 — Ventilation for Acceptable Indoor Air Quality.",

    /*
     * Endereço oficial.
     */

    url:
        "https://www.ashrae.org/technical-resources/bookstore/standards-62-1-62-2"

});

export default ASHRAE62_1;