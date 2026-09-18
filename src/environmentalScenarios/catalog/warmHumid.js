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

    title: "Ambiente quente e úmido",

    description: "Ambiente em que a temperatura e a umidade relativa estão elevadas em conjunto, caracterizando uma condição quente e úmida.",

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
