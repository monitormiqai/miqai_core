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
        "Foi identificado VOC Index acima do baseline técnico documentado pela Sensirion. O índice é relativo e não representa concentração absoluta de VOC nem um limite regulatório.",

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

    return validation.currentAssessment === "ABOVE_REFERENCE";

    }

});

export default ELEVATED_VOC;