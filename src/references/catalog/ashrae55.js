/**
 * ======================================================================
 * CORE QAI
 * Reference
 * ----------------------------------------------------------------------
 * Arquivo   : ashrae55.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Referência normativa utilizada pelo CORE QAI para avaliação das
 * condições de conforto térmico em ambientes internos.
 *
 * Esta biblioteca apenas registra metadados da referência.
 *
 * Não executa validações.
 * Não interpreta diagnósticos.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const ASHRAE55 = Object.freeze({

    /*
     * Identificador interno.
     */

    id: "ashrae55",

    /*
     * Código oficial.
     */

    code: "ASHRAE 55",

    /*
     * Nome oficial da publicação.
     */

    name:
        "Thermal Environmental Conditions for Human Occupancy",

    /*
     * Nome apresentado ao usuário.
     */

    title:
        "Condições Térmicas Ambientais para Ocupação Humana",

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

    category: "Conforto Térmico",

    /*
     * Escopo técnico da norma.
     */

    scope: [

        "Thermal Comfort",

        "Temperature",

        "Humidity",

        "Air Velocity",

        "Radiant Temperature"

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
     * Estrutura lógica da referência.
     *
     * A ASHRAE 55 não é representada aqui por "Partes".
     * As seções abaixo são agrupamentos técnicos utilizados
     * pelo Reference Resolver.
     */

    sections: Object.freeze({

        thermalComfort: Object.freeze({

            id: "thermal_comfort",

            key: "thermal_comfort",

            code: "Section",

            title: "Thermal Comfort",

            topics: [

                "thermalComfort",

                "comfort",

                "thermal"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        airTemperature: Object.freeze({

            id: "air_temperature",

            key: "air_temperature",

            code: "Section",

            title: "Air Temperature",

            topics: [

                "temperature",

                "air_temperature"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        relativeHumidity: Object.freeze({

            id: "relative_humidity",

            key: "relative_humidity",

            code: "Section",

            title: "Relative Humidity",

            topics: [

                "humidity",

                "relative_humidity"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        airMovement: Object.freeze({

            id: "air_movement",

            key: "air_movement",

            code: "Section",

            title: "Air Movement",

            topics: [

                "air_velocity",

                "air_movement",

                "draft"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        radiantEnvironment: Object.freeze({

            id: "radiant_environment",

            key: "radiant_environment",

            code: "Section",

            title: "Radiant Temperature",

            topics: [

                "radiant_temperature",

                "mean_radiant_temperature"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        })

    }),

    /*
     * Resumo da referência.
     */

    description:
        "Define critérios para avaliação do conforto térmico em ambientes ocupados, considerando temperatura do ar, temperatura radiante, umidade relativa, velocidade do ar, isolamento das vestimentas e atividade metabólica.",

    /*
     * Forma de citação apresentada ao usuário.
     */

    citation:
        "ASHRAE Standard 55:2023 — Thermal Environmental Conditions for Human Occupancy.",

    /*
     * Endereço oficial.
     */

    url:
        "https://www.ashrae.org/technical-resources/bookstore/standard-55"

});

export default ASHRAE55;