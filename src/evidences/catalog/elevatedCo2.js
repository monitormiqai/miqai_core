/**
 * ======================================================================
 * CORE QAI
 * Evidence
 * ----------------------------------------------------------------------
 * Arquivo   : elevatedCo2.js
 * Módulo    : Evidence
 * Versão    : 1.2.0
 * Status    : RC2 - CO₂ COMPLEMENTAR
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Registrar evidência de concentração de CO₂ acima do critério
 * de referência utilizado na análise complementar quando essa
 * condição tiver sido identificada pelo CO₂ Analysis Calculator.
 *
 * IMPORTANTE
 * ----------------------------------------------------------------------
 * Esta evidência NÃO representa:
 *
 * - limite regulatório universal de CO₂;
 * - não conformidade regulatória;
 * - diagnóstico de ventilação inadequada;
 * - risco à saúde;
 * - causalidade;
 * - persistência temporal.
 *
 * O CO₂ é tratado pelo CORE como indicador complementar.
 *
 * A análise quantitativa é realizada pelo co2Analysis.
 *
 * A persistência temporal depende do histórico de medições e
 * não é determinada pelo CORE a partir de uma única leitura.
 * ======================================================================
 */

const ELEVATED_CO2 = Object.freeze({

    /*
     * ================================================================
     * IDENTIFICAÇÃO
     * ================================================================
     */

    id: "elevated_co2",

    parameter: "co2",

    title:
        "Concentração elevada de CO₂",

    /*
     * ================================================================
     * DESCRIÇÃO
     * ================================================================
     *
     * A descrição permanece observacional.
     *
     * Não afirma causa, risco ou não conformidade.
     */

    description:
        "Foi observada concentração elevada de CO₂ segundo a classificação contextual interna do CORE QAI.",

    /*
     * ================================================================
     * NATUREZA
     * ================================================================
     */

    type: "OBSERVATION",

    regulatory: false,

    /*
     * ================================================================
     * REFERÊNCIAS
     * ================================================================
     *
     * As referências são herdadas da análise que determinou
     * o critério aplicável.
     */

    referenceIds: [

        "abnt_nbr_17037",

        "ashrae62_1"

    ],

    /*
     * ================================================================
     * PRIORIDADE
     * ================================================================
     */

    priority: 100,

    /*
     * ================================================================
     * CRITÉRIO DE ATIVAÇÃO
     * ================================================================
     *
     * O Evidence NÃO utiliza:
     *
     *     validation.passed
     *
     * O CO₂ é tratado como OBSERVATION pela Validation Engine.
     *
     * A decisão quantitativa pertence ao co2Analysis.
     *
     * Portanto, o Evidence é ativado somente quando:
     *
     *     ctx.metrics.co2Analysis.elevated === true
     *
     * A persistência NÃO é exigida aqui porque o CORE não possui
     * acesso ao histórico.
     *
     * A análise informa explicitamente que o histórico deve ser
     * consultado para avaliar persistência.
     */

    when(ctx) {

        const analysis =
            ctx.metrics?.co2Analysis;

        /*
         * Sem análise:
         *
         * não existe base para ativar a evidência.
         */

        if (!analysis) {

            return false;

        }

        /*
         * Análise indisponível:
         */

        if (
            analysis.available !== true
        ) {

            return false;

        }

        /*
         * A evidência depende exclusivamente do resultado
         * quantitativo produzido pelo co2Analysis.
         */

        return (
            analysis.elevated === true
        );

    }

});

export default ELEVATED_CO2;