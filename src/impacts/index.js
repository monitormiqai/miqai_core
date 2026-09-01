/**
 * ======================================================================
 * CORE QAI
 * Impacts Library
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : Impacts
 * Versão    : 1.1.0
 * Status    : V1
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar impactos ambientais potencialmente associados às
 * relações ambientais estabelecidas pelo CORE QAI.
 *
 * Cadeia analítica:
 *
 * leitura
 *    ↓
 * anomalia
 *    ↓
 * relação
 *    ↓
 * impacto
 *
 * Esta Library:
 *
 * - não calcula métricas;
 * - não executa validações;
 * - não cria diagnósticos;
 * - não cria hipóteses;
 * - não cria recomendações;
 * - não estabelece causalidade;
 * - não interpreta diretamente as leituras;
 * - utiliza exclusivamente as relações produzidas anteriormente
 *   no pipeline.
 *
 * Um impacto somente pode existir quando houver uma relação
 * compatível que o sustente.
 * ======================================================================
 */

import IMPACTS
    from "./catalog/index.js";


/* ======================================================================
 * EXECUTE
 * ====================================================================== */

function execute(ctx) {

    const relationships =
        ctx.relationships?.matches ?? [];

    const matches = [];


    /*
     * ================================================================
     * SEM RELAÇÕES
     * ================================================================
     *
     * Sem correlação ambiental estabelecida,
     * não existe impacto a ser produzido.
     */

    if (!relationships.length) {

        ctx.impacts = {

            primary: null,

            secondary: [],

            matches: []

        };

        return ctx;

    }


    /*
     * ================================================================
     * IMPACTS
     * ================================================================
     */

    for (const impact of IMPACTS) {

        /*
         * O impacto é sustentado exclusivamente pelas
         * relações declaradas em seu catálogo.
         */

        const matchedRelationships =
            relationships.filter(

                relationship =>

                    impact.relationshipIds?.includes(
                        relationship.id
                    )

            );


        if (!matchedRelationships.length) {

            continue;

        }


        matches.push({

            id:
                impact.id,

            title:
                impact.title,

            status:
                impact.status,

            description:
                impact.description,

            basis:
                impact.basis,

            priority:
                impact.priority,

            relationshipIds:
                matchedRelationships.map(
                    relationship => relationship.id
                ),

            scenarioIds:
                impact.scenarioIds ?? [],

            diagnosisIds:
                impact.diagnosisIds ?? [],

            referenceIds:
                impact.referenceIds ?? []

        });

    }


    /*
     * ================================================================
     * PRIORIDADE
     * ================================================================
     */

    matches.sort(

        (a, b) =>
            (b.priority ?? 0) -
            (a.priority ?? 0)

    );


    /*
     * ================================================================
     * RESULTADO
     * ================================================================
     */

    ctx.impacts = {

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