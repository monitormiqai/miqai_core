/**
 * ======================================================================
 * CORE QAI
 * Occupancy Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : occupancy.js
 * Módulo    : Metrics
 * Versão    : 2.0.0
 * Status    : RC2 - CO2 REVISÃO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Reservar a estrutura de indicador de ocupação para futura utilização
 * somente quando houver conhecimento técnico suficiente para produzir
 * uma estimativa formalmente fundamentada.
 *
 * O CORE QAI NÃO estima ocupação a partir de CO2 isoladamente.
 *
 * CO2 pode apresentar associação com presença humana e renovação de ar,
 * porém uma concentração medida de CO2, isoladamente, não determina:
 *
 * - número de ocupantes;
 * - taxa de ocupação;
 * - probabilidade de ocupação;
 * - ocupação efetiva do ambiente.
 *
 * Portanto, enquanto não existir método formalmente definido na
 * Biblioteca de Ouro, este calculator permanece não determinante.
 *
 * Entrada:
 *      ctx.validation
 *
 * Saída:
 *      {
 *          score,
 *          level,
 *          dominantFactor
 *      }
 *
 * ======================================================================
 *
 * PRINCÍPIO
 * ----------------------------------------------------------------------
 *
 * CO2 observado NÃO é convertido automaticamente em ocupação.
 *
 * O indicador de ocupação não participa do QAI Score.
 *
 * ======================================================================
 */

export function calculateOccupancy(ctx) {

    /*
     * ================================================================
     * ESTADO ATUAL
     * ================================================================
     *
     * Não existe, nesta versão do CORE, método formalmente definido
     * para estimar ocupação a partir exclusivamente de CO2.
     *
     * Portanto, não produzir score, nível ou fator dominante.
     */

    return {

        score: null,

        level: "UNKNOWN",

        dominantFactor: null

    };

}