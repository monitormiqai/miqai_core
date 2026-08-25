/**
 * ======================================================================
 * CORE QAI
 * Mitigation
 * ----------------------------------------------------------------------
 * Ação solicitada pela UX para condições associadas a ponto de orvalho
 * elevado e possibilidade de condensação superficial.
 * ======================================================================
 */

const CONTROL_HUMIDITY = Object.freeze({

    id: "control_humidity",

    name: "Control Humidity",

    title: "Controlar fontes de umidade",

    description:
        "Recomenda-se controlar fontes de umidade e manter a umidade relativa em condições mais adequadas, reduzindo a possibilidade de condensação em superfícies mais frias.",

    priority: 85,

    when(ctx) {

        return (
            ctx.hypotheses?.matches?.some(
                hypothesis => hypothesis.id === "dew_point_condensation"
            ) === true
        );

    }

});

export default CONTROL_HUMIDITY;
