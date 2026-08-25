/**
 * ======================================================================
 * CORE QAI
 * Diagnosis
 * ----------------------------------------------------------------------
 * Identifica condição compatível com risco potencial de condensação
 * superficial a partir do ponto de orvalho calculado e da umidade elevada.
 * ======================================================================
 */

const DEW_POINT_CONDENSATION = Object.freeze({

    id: "dew_point_condensation",

    name: "Possível condição de condensação superficial",

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
