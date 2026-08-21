/**
 * ======================================================================
 * CORE QAI
 * Reference
 * ----------------------------------------------------------------------
 * Arquivo   : abnt_nbr_16401.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 * ======================================================================
 */

const ABNT_NBR_16401 = Object.freeze({

    id: "abnt_nbr_16401",

    code: "ABNT NBR 16401",

    name:
        "Instalações de ar-condicionado — Sistemas centrais e unitários",

    title:
        "Instalações de Ar-Condicionado — Sistemas Centrais e Unitários",

    organization: "ABNT",

    publisher:
        "Associação Brasileira de Normas Técnicas",

    country: "Brasil",

    type: "Norma Técnica",

    category: "Climatização",

    scope: [

        "HVAC",
        "Indoor Air Quality",
        "Ventilation",
        "Thermal Comfort"

    ],

    version: "2021",

    year: 2021,

    status: "CURRENT",

    applicability: [

        "Corporate",
        "Healthcare",
        "Education",
        "Residential"

    ],

    /*
     * Estrutura oficial da norma.
     */

    sections: Object.freeze({

        part1: Object.freeze({

            id: "part1",

            key: "hvac_design",

            code: "Parte 1",

            title: "Projetos das Instalações",

            topics: [

                "hvac",
                "system_design",
                "installation",
                "project",
                "air_conditioning"

            ],

            applicability: [

                "Corporate",
                "Healthcare",
                "Education",
                "Residential"

            ]

        }),

        part2: Object.freeze({

            id: "part2",

            key: "thermal_comfort",

            code: "Parte 2",

            title: "Parâmetros de Conforto Térmico",

            topics: [

                "thermalComfort",
                "temperature",
                "humidity",
                "air_velocity",
                "radiant_temperature"

            ],

            applicability: [

                "Corporate",
                "Healthcare",
                "Education",
                "Residential"

            ]

        }),

        part3: Object.freeze({

            id: "part3",

            key: "indoor_air_quality",

            code: "Parte 3",

            title: "Qualidade do Ar Interior",

            topics: [

                "iaq",
                "indoor_air",

                "co2",

                "ventilation",

                "fresh_air",

                "outdoor_air",

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
                "Education",
                "Residential"

            ]

        })

    }),

    description:
        "Estabelece requisitos para projeto, instalação, operação e manutenção de sistemas de climatização, incluindo critérios de conforto térmico, ventilação e qualidade do ar interior.",

    citation:
        "ABNT NBR 16401:2021 — Instalações de ar-condicionado — Sistemas centrais e unitários.",

    url:
        "https://www.abntcatalogo.com.br/"

});

export default ABNT_NBR_16401;