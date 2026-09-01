/**
 * ======================================================================
 * CORE QAI
 * CO₂ Analysis Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : co2Analysis.js
 * Módulo    : Metrics
 * Versão    : 2.0.0
 * Status    : V1 - CO₂ INTERNO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Produzir uma análise complementar da concentração interna de CO₂
 * para uso nas etapas posteriores do CORE QAI.
 *
 * O CO₂ NÃO participa do QAI Score.
 *
 * PRINCÍPIOS
 * ----------------------------------------------------------------------
 * - CO₂ não é componente do QAI Score;
 * - CO₂ não é tratado como limite universal de IAQ;
 * - a análise utiliza exclusivamente a leitura interna de CO₂;
 * - 1000 ppm não é tratado como limite regulatório universal;
 * - as faixas utilizadas são classificações contextuais de operação;
 * - persistência temporal não é avaliada pelo CORE;
 * - persistência depende do histórico disponível no SaaS;
 * - a análise não produz diagnóstico;
 * - a análise não estabelece causalidade;
 * - a análise não produz impacto;
 * - a análise não produz recomendação de mitigação.
 *
 * ======================================================================
 */


/* ======================================================================
 * CONSTANTES TÉCNICAS
 * ====================================================================== */

/*
 * Faixa operacional inferior.
 *
 * NÃO representa limite regulatório.
 */

const CO2_LOWER_RANGE_LIMIT = 800;


/*
 * Faixa operacional elevada.
 *
 * NÃO representa limite regulatório.
 */

const CO2_HIGH_CONTEXT_LIMIT = 1000;


/*
 * Referências utilizadas para contextualização técnica.
 *
 * O CORE utiliza as referências somente como base técnica contextual
 * para a leitura interna de CO₂.
 */

const REFERENCE_IDS = Object.freeze([

    "abnt_nbr_17037",

    "ashrae62_1"

]);


/* ======================================================================
 * UTILITÁRIOS
 * ====================================================================== */

/**
 * Verifica se um valor numérico pode ser utilizado.
 */

function isValidNumber(value) {

    return (

        typeof value === "number" &&

        Number.isFinite(value) &&

        value >= 0

    );

}


/**
 * Obtém a concentração interna de CO₂ a partir da Validation Engine.
 */

function getIndoorCo2(ctx) {

    const validation =
        ctx.validation?.co2;

    if (!validation) {

        return null;

    }

    if (

        validation.state === "MISSING" ||

        validation.value === null ||

        validation.value === undefined

    ) {

        return null;

    }

    if (!isValidNumber(validation.value)) {

        return null;

    }

    return validation.value;

}


/* ======================================================================
 * PERSISTÊNCIA
 * ====================================================================== */

/**
 * A persistência temporal NÃO é avaliada pelo CORE.
 *
 * O histórico pertence à camada que possui armazenamento temporal,
 * especialmente o SaaS.
 */

function persistenceGuidance() {

    return {

        required: true,

        evaluated: false,

        basis:
            "HISTORICAL_DATA_REQUIRED",

        instruction:
            "A persistência da condição deve ser avaliada no histórico de medições de CO₂."

    };

}


/* ======================================================================
 * CLASSIFICAÇÃO CONTEXTUAL
 * ====================================================================== */

/**
 * Classifica a concentração interna de CO₂.
 *
 * IMPORTANTE
 * ----------------------------------------------------------------------
 * Estas faixas NÃO representam:
 *
 * - limite regulatório;
 * - conformidade;
 * - não conformidade;
 * - diagnóstico de ventilação;
 * - risco à saúde.
 *
 * São classificações contextuais utilizadas pelo CORE QAI V1.
 */

function classifyCo2(indoor) {

    /*
     * Faixa inferior.
     */

    if (indoor < CO2_LOWER_RANGE_LIMIT) {

        return {

            level:
                "LOWER_RANGE",

            elevated:
                false

        };

    }


    /*
     * Faixa de atenção contextual.
     */

    if (indoor <= CO2_HIGH_CONTEXT_LIMIT) {

        return {

            level:
                "ELEVATED_CONTEXT",

            elevated:
                true

        };

    }


    /*
     * Faixa elevada.
     */

    return {

        level:
            "HIGH_CONTEXT",

        elevated:
            true

    };

}


/* ======================================================================
 * ANÁLISE CO₂
 * ====================================================================== */

export function calculateCo2Analysis(ctx) {

    const indoor =
        getIndoorCo2(ctx);


    /*
     * Sem CO₂ interno:
     *
     * não existe análise válida.
     */

    if (indoor === null) {

        return {

            available:
                false,

            indoor:
                null,

            basis:
                "UNAVAILABLE",

            level:
                "UNKNOWN",

            elevated:
                false,

            elevatedThreshold:
                null,

            referenceIds:
                [],

            referenceType:
                null,

            referenceValue:
                null,

            referenceUnit:
                null,

            persistence:
                persistenceGuidance()

        };

    }


    /*
     * Classificação contextual.
     */

    const classification =
        classifyCo2(indoor);


    /*
     * Resultado V1.
     *
     * A análise considera exclusivamente a leitura interna de CO₂.
     */

    return {

        available:
            true,

        indoor:
            indoor,

        basis:
            "INDOOR_CONTEXTUAL_OBSERVATION",

        level:
            classification.level,

        elevated:
            classification.elevated,

        /*
         * Não existe um threshold regulatório interno.
         *
         * Mantemos null para evitar interpretação equivocada.
         */

        elevatedThreshold:
            null,

        referenceIds:
            REFERENCE_IDS,

        referenceType:
            "TECHNICAL_CONTEXT",

        referenceValue:
            null,

        referenceUnit:
            "ppm",

        persistence:
            persistenceGuidance()

    };

}


/* ======================================================================
 * EXPORTAÇÃO
 * ====================================================================== */

export {

    CO2_LOWER_RANGE_LIMIT,

    CO2_HIGH_CONTEXT_LIMIT,

    REFERENCE_IDS

};