/**
 * ======================================================================
 * CORE QAI
 * Hypothesis
 * ----------------------------------------------------------------------
 * Arquivo   : chemicalContamination.js
 * Módulo    : Hypotheses
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Representar a hipótese de contaminação química do ambiente.
 *
 * Esta hipótese é compatível com cenários em que compostos químicos
 * presentes no ar possam estar contribuindo para a degradação da
 * qualidade ambiental observada durante a análise.
 *
 * Não identifica a substância presente.
 * Não determina a origem da contaminação.
 * Não substitui análises laboratoriais.
 * ======================================================================
 */

const CHEMICAL_CONTAMINATION = Object.freeze({

    /*
     * Identificador único.
     */

    id: "chemical_contamination",

    /*
     * Nome interno.
     */

    name: "Chemical Contamination",

    /*
     * Título para apresentação.
     */

    title: "Possível contaminação química do ambiente",

    /*
     * Descrição técnica.
     */

    description:
        "O conjunto de evidências observado é compatível com a presença de contaminantes químicos no ambiente, indicada pela elevação dos índices de Compostos Orgânicos Voláteis (VOC) e/ou Óxidos de Nitrogênio (NOx). A origem e a composição dos contaminantes devem ser confirmadas por investigação técnica específica.",

    /*
     * Referências técnicas.
     */

    referenceIds: [

        "sensirion_voc",

        "sensirion_nox",

        "ashrae62_1",

        "abnt_nbr_16401",


    ],

    /*
     * Prioridade.
     */

    priority: 60,

    /*
     * Critério de ativação.
     */

    when(ctx) {

        return (

            ctx.evidence.records.some(

                evidence =>

                    evidence.id === "elevated_voc" ||

                    evidence.id === "elevated_nox"

            )

        );

    }

});

export default CHEMICAL_CONTAMINATION;