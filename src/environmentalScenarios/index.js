/**
 * ======================================================================
 * CORE QAI
 * Environmental Scenario Library
 * ----------------------------------------------------------------------
 * Executa os cenários ambientais cadastrados no CORE.
 *
 * Esta Library:
 *
 * - não calcula métricas;
 * - não altera validações;
 * - não cria diagnósticos;
 * - apenas classifica o cenário ambiental observado.
 * ======================================================================
 */

import ENVIRONMENTAL_SCENARIOS
    from "./catalog/index.js";


/* ======================================================================
 * EXECUTE
 * ====================================================================== */

function execute(ctx) {

    const matches = [];

    for (const scenario of ENVIRONMENTAL_SCENARIOS) {

        if (scenario.when(ctx)) {

            matches.push({

                id:
                    scenario.id,

                name:
                    scenario.name,

                priority:
                    scenario.priority

            });

        }

    }


    /*
     * ================================================================
     * PRIORIDADE
     * ================================================================
     */

    matches.sort(

        (a, b) =>
            b.priority -
            a.priority

    );


    /*
     * ================================================================
     * RESULTADO
     * ================================================================
     */

    ctx.environmentalScenario = {

        primary:
            matches[0] ?? null,

        secondary:
            matches.slice(1),

        matches

    };


    return ctx;

}


/* ======================================================================
 * EXPORT
 * ====================================================================== */

export default {

    execute

};