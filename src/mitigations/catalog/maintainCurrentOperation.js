/**
 * ======================================================================
 * CORE QAI
 * Mitigation
 * ----------------------------------------------------------------------
 * Arquivo   : maintainCurrentOperation.js
 * Módulo    : Mitigations
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Recomendar a manutenção das condições atuais quando não forem
 * identificados desvios relevantes durante a análise.
 *
 * Esta mitigação representa uma recomendação técnica baseada na
 * ausência de evidências que indiquem necessidade de intervenção.
 *
 * Não realiza validações.
 * Não produz diagnósticos.
 * Não formula hipóteses.
 * ======================================================================
 */

const MAINTAIN_CURRENT_OPERATION = Object.freeze({

    /*
     * Identificador único.
     */

    id: "maintain_current_operation",

    /*
     * Nome interno.
     */

    name: "Maintain Current Operation",

    /*
     * Título para apresentação.
     */

    title: "Manter as condições atuais de operação",

    /*
     * Descrição técnica.
     */

    description:
        "Os parâmetros avaliados encontram-se em conformidade com os critérios aplicáveis. Recomenda-se manter as condições atuais de operação e continuar o monitoramento periódico da qualidade do ar.",

    /*
     * Referências técnicas.
     */

    referenceIds: [

        "ashrae55",

        "ashrae62_1",

        "abnt_nbr_16401",


    ],

    /*
     * Prioridade.
     */

    priority: 0,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return (

            ctx.hypotheses?.primary?.id ===
            "normal_operation"

        );

    }

});

export default MAINTAIN_CURRENT_OPERATION;