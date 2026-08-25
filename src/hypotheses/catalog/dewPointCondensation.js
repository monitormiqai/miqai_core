/**
 * ======================================================================
 * CORE QAI
 * Hypothesis
 * ----------------------------------------------------------------------
 * Hipótese compatível com condensação recorrente em superfícies frias.
 * ======================================================================
 */

const DEW_POINT_CONDENSATION = Object.freeze({

    id: "dew_point_condensation",

    name: "Potential Surface Condensation",

    title: "Possibilidade de condensação em superfícies mais frias",

    description:
        "A combinação de umidade relativa elevada e ponto de orvalho elevado é compatível com possibilidade de condensação em superfícies cuja temperatura atinja ou fique abaixo do ponto de orvalho. Condensação recorrente pode manter superfícies úmidas e favorecer condições ambientais inadequadas.",

    priority: 85,

    when(ctx) {

        return (
            ctx.diagnosis?.matches?.some(
                diagnosis => diagnosis.id === "dew_point_condensation"
            ) === true
        );

    }

});

export default DEW_POINT_CONDENSATION;
