/**
 * ======================================================================
 * CORE QAI
 * Reference
 * ----------------------------------------------------------------------
 * Arquivo   : sensirion_voc.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Referência técnica utilizada pelo CORE QAI para interpretação do
 * VOC Index produzido pelo algoritmo da Sensirion para sensores da
 * família SGP4x, incluindo SGP40 e SGP41.
 *
 * Esta referência descreve o significado técnico do VOC Index e sua
 * utilização como indicador relativo de eventos associados a compostos
 * orgânicos voláteis em ambientes internos.
 *
 * Esta biblioteca apenas registra metadados da referência.
 *
 * Não executa validações.
 * Não interpreta diagnósticos.
 * Não produz hipóteses.
 * Não recomenda mitigações.
 * ======================================================================
 */

const SENSIRION_VOC = Object.freeze({

    /*
     * Identificador interno.
     */

    id: "sensirion_voc",

    /*
     * Código da referência.
     */

    code: "SENSIRION VOC INDEX",

    /*
     * Nome oficial da referência técnica.
     */

    name:
        "What is Sensirion's VOC Index?",

    /*
     * Nome apresentado ao usuário.
     */

    title:
        "Índice de VOC da Sensirion",

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

        "VOC",

        "VOC Index",

        "Volatile Organic Compounds",

        "Indoor Air Quality",

        "Gas Sensing",

        "SGP40",

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
     * a fundamentação técnica relacionada ao VOC Index.
     */

    sections: Object.freeze({

        vocIndex: Object.freeze({

            id: "voc_index",

            key: "voc_index",

            code: "VOC Index",

            title: "Índice de VOC",

            topics: [

                "vocIndex",

                "voc",

                "volatile_organic_compounds",

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

            title: "Condição Relativa de VOC",

            topics: [

                "relative_concentration",

                "gas_condition",

                "baseline",

                "voc_events",

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
        "Descreve o VOC Index da Sensirion como um indicador relativo das condições de compostos orgânicos voláteis, processado pelo Gas Index Algorithm a partir do sinal do sensor e relacionado ao histórico recente do ambiente.",

    /*
     * Modelo de medição.
     *
     * O VOC Index é um índice relativo e não uma concentração
     * absoluta de compostos orgânicos voláteis.
     */

    measurementModel:
        "relative_index",

    /*
     * Faixa de saída documentada para o VOC Index.
     */

    outputRange: Object.freeze({

        min: 1,

        max: 500,

        unit: "index"

    }),

    /*
     * Referência central do índice.
     *
     * No SGP41, o valor 100 representa a composição média
     * de gases do ambiente observada nas últimas 24 horas.
     */

    baseline: Object.freeze({

        value: 100,

        period: "24h",

        unit: "index"

    }),

    /*
     * Interpretação técnica básica.
     *
     * Esta interpretação descreve o comportamento relativo do
     * índice e não representa limite regulatório.
     */

    interpretation: Object.freeze({

        improved: {

            range: "1-99",

            meaning:
                "Condição relativa de VOC inferior à média recente do ambiente."

        },

        average: {

            value: 100,

            meaning:
                "Condição média de VOC utilizada como referência pelo algoritmo."

        },

        deteriorated: {

            range: "101-500",

            meaning:
                "Condição relativa de VOC superior à média recente do ambiente."

        }

    }),

    /*
     * Observação técnica.
     */

    regulatoryStatus:
        "not_regulatory_limit",

    /*
     * Forma de citação apresentada ao usuário.
     */

    citation:
        "Sensirion AG — What is Sensirion's VOC Index?",

    /*
     * Endereço oficial da referência.
     */

    url:
        "https://sensirion.com/products/catalog/SGP41"

});

export default SENSIRION_VOC;