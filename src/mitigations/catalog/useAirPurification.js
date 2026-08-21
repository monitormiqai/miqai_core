/**
 * ======================================================================
 * CORE QAI
 * Mitigation
 * ----------------------------------------------------------------------
 * Arquivo   : useAirPurification.js
 * Módulo    : Mitigations
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Recomendar o uso de sistemas de purificação do ar quando forem
 * identificadas evidências de contaminantes que possam ser reduzidos
 * por processos de filtração ou adsorção.
 *
 * Esta mitigação representa uma ação técnica baseada nas evidências
 * produzidas pelo CORE QAI.
 *
 * Não realiza validações.
 * Não produz diagnósticos.
 * Não formula hipóteses.
 * ======================================================================
 */

const USE_AIR_PURIFICATION = Object.freeze({

    /*
     * Identificador único.
     */

    id: "use_air_purification",

    /*
     * Nome interno.
     */

    name: "Use Air Purification",

    /*
     * Título para apresentação.
     */

    title: "Utilizar sistema de purificação do ar",

    /*
     * Descrição técnica.
     */

    description:
        "Recomenda-se utilizar sistemas de purificação do ar equipados com filtros adequados, como HEPA e/ou carvão ativado, para reduzir a concentração de material particulado e compostos orgânicos voláteis presentes no ambiente.",

    /*
     * Referências técnicas.
     */

    referenceIds: [

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

            ctx.evidence?.records?.some(

                evidence =>

                    evidence.id === "elevated_particulate" ||

                    evidence.id === "elevated_voc"

            )

        );

    }

});

export default USE_AIR_PURIFICATION;