/**

* ======================================================================
* CORE QAI
* Evidence
* ---
* Arquivo   : normalEnvironment.js
* Módulo    : Evidences
* Versão    : 1.1.0
* Status    : RC2 - CORREÇÃO SEMÂNTICA
*
* Objetivo
* ---
* Registrar evidência de ausência de desvio observado entre os
* parâmetros efetivamente avaliados no cenário atual.
*
* Parâmetros observacionais não são interpretados como PASS ou FAIL
* e não participam de uma declaração de conformidade global.
*
* Esta evidência representa exclusivamente um fato observado durante
* a análise.
*
* Não interpreta causas.
* Não produz diagnósticos.
* Não formula hipóteses.
* Não recomenda mitigações.
* ======================================================================
  */

const NORMAL_ENVIRONMENT = Object.freeze({

/*
 * Identificador único.
 */

id: "normal_environment",

/*
 * Evidência composta.
 */

parameters: "all",

/*
 * Título para apresentação.
 */

title: "Nenhum desvio observado nos parâmetros avaliáveis",

/*
 * Descrição técnica da evidência.
 */

description:
    "Nenhuma condição de desvio foi identificada entre os parâmetros efetivamente avaliados no cenário atual. Parâmetros em estado OBSERVATION, não avaliáveis ou sem avaliação concluída não são interpretados como PASS, FAIL ou conformidade.",

/*
 * Referências técnicas relacionadas.
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
 * Parâmetros observacionais não participam da determinação
 * de conformidade.
 *
 * Somente parâmetros efetivamente avaliados são considerados
 * para identificar ausência de desvio observado.
 */

when(ctx) {

    const validation =
        ctx.validation ?? {};

    const parameters =
        Object.values(validation);

    /*
     * Sem parâmetros de validação, não é possível afirmar
     * ausência de desvio observado.
     */

    if (parameters.length === 0) {

        return false;

    }

    /*
     * A evidência requer pelo menos um parâmetro efetivamente
     * avaliado e dentro da referência aplicável.
     *
     * Estados OBSERVATION, desconhecidos ou não avaliados
     * não preenchem este requisito.
     */

    const assessedParameters =
        parameters.filter(
            parameter =>
                parameter?.passed === true &&
                parameter?.currentAssessment ===
                    "WITHIN_REFERENCE"
        );

    const noObservedDeviation =
        parameters.every(
            parameter =>
                parameter?.currentAssessment !== "ABOVE_REFERENCE" &&
                parameter?.currentAssessment !== "BELOW_REFERENCE"
        );

    return (
        assessedParameters.length > 0 &&
        noObservedDeviation
    );

}

});

export default NORMAL_ENVIRONMENT;
