/**
 * ======================================================================
 * CORE QAI
 * Reference
 * ----------------------------------------------------------------------
 * Arquivo   : sensirion_nox.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Referência técnica utilizada pelo CORE QAI para interpretação do
 * NOx Index produzido pelo algoritmo da Sensirion para sensores da
 * família SGP4x, incluindo o SGP41.
 *
 * Esta referência descreve o significado técnico do NOx Index e sua
 * utilização como indicador relativo de eventos associados a gases
 * oxidantes em ambientes internos.
 *
 * Esta biblioteca apenas registra metadados da referência.
 *
 * Não executa validações.
 * Não interpreta diagnósticos.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const SENSIRION_NOX = Object.freeze({

    /*
     * Identificador interno.
     */

    id: "sensirion_nox",

    /*
     * Código da referência.
     */

    code: "SENSIRION NOx INDEX",

    /*
     * Nome oficial da referência técnica.
     */

    name:
        "What is Sensirion's NOx Index?",

    /*
     * Nome apresentado ao usuário.
     */

    title:
        "Índice de NOx da Sensirion",

    /*
     * Organização responsável.
     */

    organization: "Sensirion",

    /*
     * Nome institucional completo.
     */

    publisher:
        "Sensirion AG",

    /*
     * País de origem.
     */

    country: "Suíça",

    /*
     * Tipo da referência.
     */

    type: "Referência Técnica",

    /*
     * Categoria principal.
     */

    category: "Sensoriamento de Gases",

    /*
     * Escopo técnico.
     */

    scope: [

        "NOx",

        "NOx Index",

        "Oxidizing Gases",

        "Indoor Air Quality",

        "Gas Sensing",

        "SGP41"

    ],

    /*
     * Versão da referência utilizada pelo CORE.
     */

    version: "2022",

    /*
     * Ano da publicação da referência técnica.
     */

    year: 2022,

    /*
     * Situação da referência.
     */

    status: "CURRENT",

    /*
     * Ambientes nos quais a referência pode ser utilizada.
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
     * Utilizada pelo Reference Resolver para identificar
     * a fundamentação técnica relacionada ao NOx Index.
     */

    sections: Object.freeze({

        noxIndex: Object.freeze({

            id: "nox_index",

            key: "nox_index",

            code: "NOx Index",

            title: "Índice de NOx",

            topics: [

                "noxIndex",

                "nox",

                "oxidizing_gases",

                "gas_events"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        relativeGasCondition: Object.freeze({

            id: "relative_gas_condition",

            key: "relative_gas_condition",

            code: "Relative Condition",

            title: "Condição Relativa de Gases",

            topics: [

                "relative_concentration",

                "gas_condition",

                "baseline",

                "gas_events",

                "indoor_air"

            ],

            applicability: [

                "Corporate",

                "Healthcare",

                "Education",

                "Residential"

            ]

        }),

        gasIndexAlgorithm: Object.freeze({

            id: "gas_index_algorithm",

            key: "gas_index_algorithm",

            code: "Gas Index Algorithm",

            title: "Algoritmo de Índice de Gases",

            topics: [

                "gas_index",

                "algorithm",

                "baseline",

                "learning_time",

                "sensor_history"

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
     * Resumo técnico.
     */

    description:
        "Descreve o NOx Index da Sensirion como um indicador relativo das condições de NOx e de gases oxidantes, processado pelo Gas Index Algorithm a partir do sinal do sensor e relacionado ao histórico recente do ambiente.",

    /*
     * Observação técnica importante.
     *
     * O NOx Index não deve ser tratado pelo CORE como uma
     * concentração absoluta ou como limite regulatório.
     */

    measurementModel:
        "relative_index",

    /*
     * Faixa de saída documentada para o NOx Index.
     */

    outputRange: Object.freeze({

        min: 1,

        max: 500,

        unit: "index"

    }),

    /*
     * Interpretação técnica básica.
     */

    interpretation: Object.freeze({

        baseline:
            "O valor de referência do ambiente é estabelecido pelo histórico recente do sensor.",

        elevated:
            "Valores superiores ao baseline indicam aumento relativo da presença de gases oxidantes detectáveis.",

        normal:
            "Valores próximos ao baseline indicam condição relativa semelhante ao histórico recente."

    }),

    /*
     * Forma de citação apresentada ao usuário.
     */

    citation:
        "Sensirion AG — What is Sensirion's NOx Index?",

    /*
     * Endereço oficial da referência.
     */

    url:
        "https://sensirion.com/media/documents/9F289B95/6294DFFC/Info_Note_NOx_Index.pdf"

});

export default SENSIRION_NOX;