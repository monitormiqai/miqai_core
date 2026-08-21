/**
 * ======================================================================
 * CORE QAI
 * QAI Weights
 * ----------------------------------------------------------------------
 * Arquivo   : qaiWeights.js
 * Módulo    : Metrics
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Definir os pesos utilizados pelo cálculo do QAI Score para cada
 * perfil de ambiente.
 *
 * O cálculo permanece idêntico para todos os Domains.
 * Apenas os pesos podem variar.
 * ======================================================================
 */

const QAI_WEIGHTS = Object.freeze({

    corporate: Object.freeze({

        thermalComfort: 0.20,

        airQuality: 0.35,

        particulateLoad: 0.30,

        occupancy: 0.15

    }),

    healthcare: Object.freeze({

        thermalComfort: 0.15,

        airQuality: 0.40,

        particulateLoad: 0.30,

        occupancy: 0.15

    }),

    education: Object.freeze({

        thermalComfort: 0.20,

        airQuality: 0.35,

        particulateLoad: 0.25,

        occupancy: 0.20

    }),

    residential: Object.freeze({

        thermalComfort: 0.25,

        airQuality: 0.35,

        particulateLoad: 0.25,

        occupancy: 0.15

    }),

    datacenter: Object.freeze({

        thermalComfort: 0.35,

        airQuality: 0.25,

        particulateLoad: 0.25,

        occupancy: 0.15

    })

});

export default QAI_WEIGHTS;