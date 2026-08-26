/**
 * ======================================================================
 * CORE QAI
 * Relationships Library
 * ----------------------------------------------------------------------
 * Executa as relações técnicas cadastradas no CORE.
 *
 * Esta Library:
 *
 * - não calcula métricas;
 * - não cria diagnósticos;
 * - não cria hipóteses;
 * - não produz recomendações;
 * - apenas identifica relações explicitamente cadastradas
 *   no Relationships Catalog.
 * ======================================================================
 */

import RELATIONSHIPS
    from "./catalog/index.js";

/* ======================================================================
 * RELATIONSHIPS LIBRARY
 * ======================================================================
 */

function execute(ctx) {

    const matches = [];

    for (const relationship of RELATIONSHIPS) {

        if (relationship.when(ctx)) {

            matches.push(relationship);

        }

    }

    matches.sort(

        (a, b) => b.priority - a.priority

    );

    ctx.relationships = {

        primary:
            matches[0] ?? null,

        secondary:
            matches.slice(1),

        matches

    };

    return ctx;

}

/* ======================================================================
 * EXPORTS
 * ======================================================================
 */

export default {

    execute

};