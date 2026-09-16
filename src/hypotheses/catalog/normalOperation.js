/**

* ======================================================================
* CORE QAI
* Hypothesis
* ---
* Arquivo   : normalOperation.js
* Módulo    : Hypotheses
* Versão    : 1.0.0
* Status    : RC2 - CORREÇÃO SEMÂNTICA
*
* Objetivo
* ---
* Representar a hipótese de operação atual compatível com os dados
* observados durante a análise.
*
* Esta hipótese não constitui declaração de conformidade global.
*
* Não afirma ausência absoluta de riscos.
* Apenas representa a hipótese técnica mais compatível com os
* indicadores observados durante a análise.
* ======================================================================
  */

const NORMAL_OPERATION = Object.freeze({

/*
 * Identificador único.
 */

id: "normal_operation",

/*
 * Nome interno.
 */

name: "Normal Operation",

/*
 * Título para apresentação.
 */

title:
    "Condições observadas compatíveis com a operação atual",

/*
 * Descrição técnica.
 */

description:
    "As evidências observadas são compatíveis com a operação atual do ambiente, sem indicação de desvio nos parâmetros efetivamente avaliados. Esta hipótese não representa declaração de conformidade global.",

/*
 * Referências técnicas.
 */

referenceIds: [

    "ashrae55",

    "ashrae62_1"

],

/*
 * Prioridade.
 */

priority: 0,

/*
 * Critério de ativação.
 *
 * A hipótese não recalcula condições ambientais.
 *
 * Ela apenas consome o resultado produzido pelas
 * camadas anteriores do CORE.
 *
 * A condição de operação atual é representada pela
 * Evidence Library através da evidência:
 *
 * normal_environment
 */

when(ctx) {

    return (

        ctx.evidence?.primary?.id ===
        "normal_environment"

    );

}

});

export default NORMAL_OPERATION;
