/**
 * ======================================================================
 * CORE QAI
 * QAI Weights
 * ----------------------------------------------------------------------
 * Arquivo   : qaiWeights.js
 * Módulo    : Metrics
 * Versão    : 1.2.0
 * Status    : RC2 - REVISÃO CO2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Definir os pesos utilizados pelo cálculo do QAI Score para cada
 * perfil de ambiente.
 *
 * O QAI Score considera exclusivamente indicadores ambientais
 * quantitativos que possuem composição própria no índice.
 *
 * A análise de CO₂/ocupação permanece fora do Score principal e
 * poderá ser utilizada pelas etapas analíticas complementares.
 *
 * NOTA DE GOVERNANÇA
 * ----------------------------------------------------------------------
 * Os pesos foram renormalizados proporcionalmente após a retirada
 * do indicador occupancy da composição do QAI Score.
 *
 * Nenhum novo peso foi introduzido por critério arbitrário.
 * A relação proporcional entre os indicadores anteriormente utilizados
 * foi preservada.
 *
 * A soma dos pesos de cada Domain é igual a 1.
 * ======================================================================
 */

const QAI_WEIGHTS = Object.freeze({

    corporate: Object.freeze({

        thermalComfort: 0.2353,

        airQuality: 0.4118,

        particulateLoad: 0.3529

    }),

    healthcare: Object.freeze({

        thermalComfort: 0.1765,

        airQuality: 0.4706,

        particulateLoad: 0.3529

    }),

    education: Object.freeze({

        thermalComfort: 0.2500,

        airQuality: 0.4375,

        particulateLoad: 0.3125

    }),

    residential: Object.freeze({

        thermalComfort: 0.2941,

        airQuality: 0.4118,

        particulateLoad: 0.2941

    }),

    datacenter: Object.freeze({

        thermalComfort: 0.4118,

        airQuality: 0.2941,

        particulateLoad: 0.2941

    })

});

export default QAI_WEIGHTS;