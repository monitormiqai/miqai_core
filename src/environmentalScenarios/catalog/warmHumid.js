/**
 * ======================================================================
 * CORE QAI
 * Environmental Scenario
 * ----------------------------------------------------------------------
 * Identifica cenário ambiental quente e úmido a partir das condições
 * validadas de temperatura e umidade.
 * ======================================================================
 */

const WARM_HUMID = Object.freeze({

    id: "warm_humid",

    name: "Ambiente quente e úmido",

    priority: 80,

    when(ctx) {

        const temperature =
            ctx.validation?.temperature;

        const humidity =
            ctx.validation?.humidity;

        return (

            temperature?.state === "HIGH" &&

            humidity?.state === "HIGH"

        );

    }

});

export default WARM_HUMID;
