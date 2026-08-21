/**
 * ======================================================================
 * CORE QAI
 * Diagnosis Catalog
 * ----------------------------------------------------------------------
 * Arquivo   : highOccupancy.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 * ======================================================================
 */

export default Object.freeze({

    id: "highOccupancy",

    title:
        "Possível influência de ocupação elevada",

    description:
        "O comportamento observado do CO₂ é compatível com possível influência da ocupação sobre a qualidade do ar. A ocupação efetiva deve ser confirmada por observação ou informação operacional do ambiente.",

    priority: 65,

    when(ctx) {

        return (
            ctx.metrics?.occupancy?.level === "HIGH" ||
            ctx.metrics?.occupancy?.level === "VERY_HIGH"
        );

    }

});