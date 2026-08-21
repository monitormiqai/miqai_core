/**
 * ======================================================================
 * CORE QAI
 * Reference
 * ----------------------------------------------------------------------
 * Arquivo   : who_aqg_2021.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Referência internacional utilizada pelo CORE QAI para avaliação da
 * exposição aos principais poluentes atmosféricos e seus impactos na
 * saúde humana.
 *
 * Esta biblioteca apenas registra metadados da referência.
 *
 * Não executa validações.
 * Não interpreta diagnósticos.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const WHO_AQG_2021 = Object.freeze({

    /*
     * Identificador interno.
     */

    id: "who_aqg_2021",

    /*
     * Código oficial.
     */

    code: "WHO AQG 2021",

    /*
     * Nome oficial da publicação.
     */

    name: "WHO Global Air Quality Guidelines",

    /*
     * Nome apresentado ao usuário.
     */

    title: "Diretrizes Globais de Qualidade do Ar da OMS",

    /*
     * Organização responsável.
     */

    organization: "WHO",

    /*
     * Nome institucional completo.
     */

    publisher:
        "World Health Organization",

    /*
     * País ou abrangência.
     */

    country: "Internacional",

    /*
     * Tipo da referência.
     */

    type: "Diretriz Internacional",

    /*
     * Categoria principal.
     */

    category: "Qualidade do Ar",

    /*
     * Escopo técnico.
     */

    scope: [

        "PM2.5",

        "PM10",

        "NO₂",

        "SO₂",

        "O₃",

        "CO",

        "Air Quality"

    ],

    /*
     * Versão utilizada pelo CORE.
     */

    version: "2021",

    /*
     * Ano da publicação.
     */

    year: 2021,

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
     * Estrutura lógica da diretriz.
     *
     * Utilizada futuramente pelo Reference Resolver para
     * relacionar parâmetros ambientais às recomendações
     * correspondentes da OMS.
     */

    sections: Object.freeze({

        particulateMatter: Object.freeze({

            id: "particulate_matter",

            key: "particulate_matter",

            code: "PM",

            title: "Material Particulado",

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ],

            topics: [

                "pm25",

                "PM2.5",

                "pm10",

                "PM10",

                "particulate",

                "particulate_matter",

                "particles"

            ]

        }),

        nitrogenDioxide: Object.freeze({

            id: "nitrogen_dioxide",

            key: "nitrogen_dioxide",

            code: "NO2",

            title: "Dióxido de Nitrogênio",

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ],

            topics: [

                "no2",

                "NO₂",

                "nitrogen_dioxide",

                "nox",

                "noxIndex"

            ]

        }),

        sulfurDioxide: Object.freeze({

            id: "sulfur_dioxide",

            key: "sulfur_dioxide",

            code: "SO2",

            title: "Dióxido de Enxofre",

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ],

            topics: [

                "so2",

                "SO₂",

                "sulfur_dioxide"

            ]

        }),

        ozone: Object.freeze({

            id: "ozone",

            key: "ozone",

            code: "O3",

            title: "Ozônio",

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ],

            topics: [

                "o3",

                "O₃",

                "ozone"

            ]

        }),

        carbonMonoxide: Object.freeze({

            id: "carbon_monoxide",

            key: "carbon_monoxide",

            code: "CO",

            title: "Monóxido de Carbono",

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ],

            topics: [

                "co",

                "CO",

                "carbon_monoxide"

            ]

        })

    }),

    /*
     * Resumo da referência.
     */

    description:
        "Estabelece diretrizes internacionais para limites de exposição aos principais poluentes atmosféricos, incluindo material particulado fino (PM2.5), material particulado inalável (PM10), dióxido de nitrogênio (NO₂), dióxido de enxofre (SO₂), ozônio (O₃) e monóxido de carbono (CO), visando reduzir riscos à saúde humana.",

    /*
     * Forma de citação apresentada ao usuário.
     */

    citation:
        "World Health Organization. WHO Global Air Quality Guidelines. Geneva: WHO, 2021.",

    /*
     * Endereço oficial.
     */

    url:
        "https://www.who.int/publications/i/item/9789240034228"

});

export default WHO_AQG_2021;