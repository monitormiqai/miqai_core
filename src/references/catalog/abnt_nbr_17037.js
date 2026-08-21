/**
 * ======================================================================
 * CORE QAI
 * Reference
 * ----------------------------------------------------------------------
 * Arquivo   : abnt_nbr_17037.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Referência normativa brasileira utilizada pelo CORE QAI para avaliação
 * da qualidade do ar interior em ambientes não residenciais climatizados
 * artificialmente.
 *
 * Esta biblioteca apenas registra metadados da referência.
 *
 * Não executa validações.
 * Não interpreta diagnósticos.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const ABNT_NBR_17037 = Object.freeze({

    /*
     * Identificador interno.
     */

    id: "abnt_nbr_17037",

    /*
     * Código oficial.
     */

    code: "ABNT NBR 17037",

    /*
     * Nome oficial da publicação.
     */

    name:
        "Qualidade do ar interior em ambientes não residenciais climatizados artificialmente — Padrões referenciais",

    /*
     * Nome apresentado ao usuário.
     */

    title:
        "Qualidade do Ar Interior em Ambientes Não Residenciais Climatizados Artificialmente — Padrões Referenciais",

    /*
     * Organização responsável.
     */

    organization: "ABNT",

    /*
     * Nome institucional completo.
     */

    publisher:
        "Associação Brasileira de Normas Técnicas",

    /*
     * País de origem.
     */

    country: "Brasil",

    /*
     * Tipo da referência.
     */

    type: "Norma Técnica",

    /*
     * Categoria principal.
     */

    category: "Qualidade do Ar Interior",

    /*
     * Escopo técnico da norma.
     */

    scope: [

        "Indoor Air Quality",

        "Ventilation",

        "Thermal Comfort",

        "Particulate Matter",

        "Contaminants"

    ],

    /*
     * Versão utilizada pelo CORE.
     */

    version: "2023",

    /*
     * Ano da publicação.
     */

    year: 2023,

    /*
     * Situação da referência.
     *
     * A edição de 2023 possui versão corrigida publicada
     * em 22.06.2023.
     */

    status: "CURRENT",

    /*
     * Ambientes aos quais a referência se aplica.
     *
     * A norma estabelece seu escopo para ambientes não
     * residenciais climatizados artificialmente.
     */

    applicability: [

        "Corporate",

        "Healthcare",

        "Education"

    ],

    /*
     * Estrutura lógica da norma.
     *
     * Utilizada futuramente pelo Reference Resolver para
     * relacionar o resultado do CORE ao grupo de requisitos
     * correspondente da referência.
     */

    sections: Object.freeze({

        generalRequirements: Object.freeze({

            id: "general_requirements",

            key: "general_requirements",

            code: "Section",

            title: "Requisitos Gerais",

            topics: [

                "iaq",

                "indoor_air",

                "air_quality",

                "pollution_sources",

                "outdoor_air",

                "ventilation"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education"

            ]

        }),

        chemicalContaminants: Object.freeze({

            id: "chemical_contaminants",

            key: "chemical_contaminants",

            code: "Section",

            title: "Contaminantes Químicos",

            topics: [

                "co2",

                "voc",

                "vocIndex",

                "nox",

                "noxIndex",

                "chemical_contaminants"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education"

            ]

        }),

        particulateMatter: Object.freeze({

            id: "particulate_matter",

            key: "particulate_matter",

            code: "Section",

            title: "Material Particulado",

            topics: [

                "pm25",

                "PM2.5",

                "pm10",

                "PM10",

                "particulate",

                "particulate_matter"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education"

            ]

        }),

        physicalParameters: Object.freeze({

            id: "physical_parameters",

            key: "physical_parameters",

            code: "Section",

            title: "Parâmetros Físicos",

            topics: [

                "temperature",

                "humidity",

                "relative_humidity",

                "air_velocity",

                "thermalComfort"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education"

            ]

        }),

        contaminantControl: Object.freeze({

            id: "contaminant_control",

            key: "contaminant_control",

            code: "Section",

            title: "Avaliação e Controle de Contaminantes",

            topics: [

                "contaminants",

                "pollution_sources",

                "source_control",

                "intervention",

                "monitoring"

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
        "Estabelece padrões referenciais de qualidade do ar interior para ambientes não residenciais climatizados artificialmente, abrangendo parâmetros físicos, químicos e biológicos, identificação de fontes poluentes, métodos de avaliação e recomendações para controle.",

    /*
     * Forma de citação apresentada ao usuário.
     */

    citation:
        "ABNT NBR 17037:2023 — Qualidade do ar interior em ambientes não residenciais climatizados artificialmente — Padrões referenciais.",

    /*
     * Endereço oficial.
     */

    url:
        "https://www.abntcatalogo.com.br/"

});

export default ABNT_NBR_17037;