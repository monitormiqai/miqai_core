/**
 * ======================================================================
 * CORE QAI
 * Reference
 * ----------------------------------------------------------------------
 * Arquivo   : iso_7730.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Referência internacional utilizada pelo CORE QAI para avaliação das
 * condições de conforto térmico em ambientes ocupados.
 *
 * Esta biblioteca apenas registra metadados da referência.
 *
 * Não executa validações.
 * Não interpreta diagnósticos.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const ISO_7730 = Object.freeze({

    /*
     * Identificador interno.
     */

    id: "iso_7730",

    /*
     * Código oficial.
     */

    code: "ISO 7730",

    /*
     * Nome oficial da publicação.
     */

    name:
        "Ergonomics of the thermal environment — Analytical determination and interpretation of thermal comfort using calculation of the PMV and PPD indices and local thermal comfort criteria",

    /*
     * Nome apresentado ao usuário.
     */

    title:
        "Ergonomia do Ambiente Térmico — Determinação e Interpretação do Conforto Térmico",

    /*
     * Organização responsável.
     */

    organization: "ISO",

    /*
     * Nome institucional completo.
     */

    publisher:
        "International Organization for Standardization",

    /*
     * País ou abrangência.
     */

    country: "Internacional",

    /*
     * Tipo da referência.
     */

    type: "Norma Internacional",

    /*
     * Categoria principal.
     */

    category: "Conforto Térmico",

    /*
     * Escopo técnico da norma.
     */

    scope: [

        "Thermal Comfort",

        "PMV",

        "PPD",

        "Temperature",

        "Humidity",

        "Air Velocity",

        "Mean Radiant Temperature"

    ],

    /*
     * Versão utilizada pelo CORE.
     */

    version: "2005",

    /*
     * Ano da publicação.
     */

    year: 2005,

    /*
     * Situação da referência.
     */

    status: "CURRENT",

    /*
     * Ambientes aos quais a referência pode ser aplicada.
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
     * Utilizada pelo Reference Resolver para relacionar
     * parâmetros ambientais aos critérios de conforto térmico.
     */

    sections: Object.freeze({

        thermalComfort: Object.freeze({

            id: "thermal_comfort",

            key: "thermal_comfort",

            code: "Section",

            title: "Conforto Térmico",

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

        pmv: Object.freeze({

            id: "pmv",

            key: "pmv",

            code: "PMV",

            title: "Voto Médio Predito",

            topics: [

                "pmv",

                "predicted_mean_vote",

                "thermal_sensation"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        ppd: Object.freeze({

            id: "ppd",

            key: "ppd",

            code: "PPD",

            title: "Percentual de Pessoas Insatisfeitas",

            topics: [

                "ppd",

                "predicted_percentage_dissatisfied",

                "thermal_comfort"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        environmentalParameters: Object.freeze({

            id: "environmental_parameters",

            key: "environmental_parameters",

            code: "Section",

            title: "Parâmetros Ambientais",

            topics: [

                "temperature",

                "air_temperature",

                "mean_radiant_temperature",

                "humidity",

                "relative_humidity",

                "air_velocity"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        personalParameters: Object.freeze({

            id: "personal_parameters",

            key: "personal_parameters",

            code: "Section",

            title: "Parâmetros Pessoais",

            topics: [

                "clothing",

                "clothing_insulation",

                "metabolic_rate",

                "activity"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        localThermalComfort: Object.freeze({

            id: "local_thermal_comfort",

            key: "local_thermal_comfort",

            code: "Section",

            title: "Conforto Térmico Local",

            topics: [

                "local_comfort",

                "draft",

                "radiant_asymmetry",

                "vertical_temperature_difference",

                "floor_temperature"

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
        "Estabelece métodos para determinação e interpretação do conforto térmico por meio dos índices PMV e PPD e apresenta critérios para avaliação do conforto térmico local, considerando parâmetros ambientais e pessoais.",

    /*
     * Forma de citação apresentada ao usuário.
     */

    citation:
        "ISO 7730:2005 — Ergonomia do ambiente térmico — Determinação e interpretação do conforto térmico pelos índices PMV e PPD e critérios de conforto térmico local.",

    /*
     * Endereço institucional da organização responsável.
     */

    url:
        "https://www.iso.org/standard/39155.html"

});

export default ISO_7730;