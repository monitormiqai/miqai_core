/**
 * ======================================================================
 * CORE QAI
 * Evidence
 * ----------------------------------------------------------------------
 * Arquivo   : elevatedVoc.js
 * Módulo    : Evidences
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar evidência de índice elevado de Compostos Orgânicos Voláteis
 * (VOC), identificada pela Validation Engine.
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

const ELEVATED_VOC = Object.freeze({

    /*
     * Identificador único.
     */

    id: "elevated_voc",

    /*
     * Parâmetro relacionado.
     */

    parameter: "vocIndex",

    /*
     * Título para apresentação.
     */

    title: "Índice elevado de VOC",

    /*
     * Descrição técnica da evidência.
     */

    description:
        "Foi identificado índice de Compostos Orgânicos Voláteis (VOC) acima do limite de referência aplicável ao ambiente analisado.",

    /*
     * Referências técnicas relacionadas.
     */

    referenceIds: [

        "sensirion_voc"

    ],

    /*
     * Prioridade.
     */

    priority: 70,

    /*
     * Critério de ativação.
     */

    when(ctx) {

    const validation =
        ctx.validation?.vocIndex;

    if (!validation) {

        return false;

    }

    if (
        validation.value === null ||
        validation.value === undefined
    ) {

        return false;

    }

    return validation.passed === false;

    }

});

export default ELEVATED_VOC;