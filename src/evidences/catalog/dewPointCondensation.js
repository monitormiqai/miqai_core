/**
 * ======================================================================
 * CORE QAI
 * Evidence
 * ----------------------------------------------------------------------
 * Evidência de condição de ponto de orvalho associada à possibilidade
 * de condensação superficial quando a umidade relativa está elevada.
 * ======================================================================
 */

const DEW_POINT_CONDENSATION = Object.freeze({

    id: "dew_point_condensation",

    parameters: [
        "temperature",
        "humidity",
        "dewPoint"
    ],

    title: "Condição favorável à condensação superficial",

    description:
        "Com umidade relativa elevada, superfícies com temperatura igual ou inferior ao ponto de orvalho calculado podem atingir condição de condensação.",

    priority: 85,

    when(ctx) {

        const humidity = ctx.validation?.humidity;
        const dewPoint = ctx.metrics?.dewPoint;

        return (
            humidity?.state === "HIGH" &&
            Number.isFinite(dewPoint?.value)
        );

    }

});

export default DEW_POINT_CONDENSATION;
