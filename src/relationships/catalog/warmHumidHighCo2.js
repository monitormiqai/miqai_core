/**
 * ======================================================================
 * CORE QAI
 * Relationship
 * ----------------------------------------------------------------------
 * Arquivo   : warmHumidHighCo2.js
 * Módulo    : Relationships
 * Versão    : 1.1.0
 * Status    : RC2 - CO₂ COMPLEMENTAR
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar a combinação entre:
 *
 * - temperatura elevada;
 * - umidade elevada;
 * - CO₂ em contexto elevado segundo a análise interna do CORE.
 *
 * Esta relação representa uma combinação de condições ambientais
 * observadas pelo CORE QAI.
 *
 * NÃO estabelece:
 *
 * - causalidade;
 * - insuficiência de ventilação como fato;
 * - diagnóstico clínico;
 * - risco à saúde;
 * - persistência temporal.
 *
 * A persistência deve ser verificada mediante histórico de medições.
 *
 * ======================================================================
 */

const WARM_HUMID_HIGH_CO2 = Object.freeze({

    /*
     * ================================================================
     * IDENTIFICAÇÃO
     * ================================================================
     */

    id:
        "warm_humid_high_co2",

    title:
        "Temperatura, umidade e CO₂ elevados",

    description:
    "Foi identificada uma combinação de temperatura elevada, umidade elevada e CO₂ em contexto elevado segundo a análise interna do CORE.",

    priority:
        100,


    /*
     * ================================================================
     * PARÂMETROS ENVOLVIDOS
     * ================================================================
     */

    parameters: Object.freeze([

        "temperature",

        "humidity",

        "co2"

    ]),


    /*
     * ================================================================
     * DIAGNÓSTICOS COMPATÍVEIS
     * ================================================================
     *
     * Estes identificadores representam diagnósticos que poderão ser
     * avaliados pela etapa posterior.
     *
     * O Relationship não confirma o diagnóstico.
     */

    diagnosisIds: Object.freeze([

        "insufficient_ventilation"

    ]),


    /*
     * ================================================================
     * CENÁRIOS COMPATÍVEIS
     * ================================================================
     */

    scenarioIds: Object.freeze([

        "warm_humid"

    ]),


    /*
     * ================================================================
     * CRITÉRIO DE ATIVAÇÃO
     * ================================================================
     *
     * Temperatura e umidade utilizam os estados produzidos pela
     * Validation Engine.
     *
     * CO₂ utiliza exclusivamente o resultado produzido pelo
     * CO₂ Analysis Calculator.
     *
     * NÃO utilizar:
     *
     *     validation.co2.state === "HIGH"
     *
     * porque CO₂ é tratado como OBSERVATION.
     *
     * A condição elevada é determinada por:
     *
     *     ctx.co2Analysis.elevated
     *
     * conforme a classificação contextual da leitura interna.
     *
     * A persistência histórica não é avaliada nesta camada.
     */

    when(ctx) {

        const validation =
            ctx.validation ?? {};

        const temperature =
            validation.temperature;

        const humidity =
            validation.humidity;

        const co2Analysis =
            ctx.metrics?.co2Analysis;


        /*
         * ============================================================
         * CENÁRIO AMBIENTAL
         * ============================================================
         *
         * O cenário warm_humid deve ter sido identificado
         * anteriormente pela Environmental Scenario Engine.
         */

        const warmHumidScenario =
            ctx.environmentalScenario?.matches?.some(

                scenario =>
                    scenario.id === "warm_humid"

            );


        /*
         * ============================================================
         * TEMPERATURA E UMIDADE
         * ============================================================
         */

        const warmHumidConditions =

            temperature?.state === "HIGH" &&

            humidity?.state === "HIGH";


        /*
         * ============================================================
         * CO₂
         * ============================================================
         *
         * O Relationship utiliza somente a classificação contextual
         * produzida pela análise da leitura interna de CO₂.
         */

        const elevatedCo2 =

            co2Analysis?.available === true &&

            co2Analysis?.elevated === true;


        /*
         * ============================================================
         * RESULTADO
         * ============================================================
         */

        return (

            warmHumidScenario === true &&

            warmHumidConditions &&

            elevatedCo2

        );

    }

});


export default WARM_HUMID_HIGH_CO2;