/**
 * ======================================================================
 * CORE QAI
 * Diagnosis
 * ----------------------------------------------------------------------
 * Arquivo   : insufficientVentilation.js
 * Módulo    : Diagnostics
 * Versão    : 1.0.0
 * Status    : RC2
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Identificar condições ambientais compatíveis com possível renovação
 * insuficiente do ar.
 *
 * Este diagnóstico representa uma condição técnica compatível
 * com possível renovação insuficiente do ar, sem estabelecer
 * relação causal.
 *
 * Não confirma insuficiência de ventilação.
 * Não identifica causas.
 * Não confirma falhas em sistemas HVAC.
 * Não interpreta normas.
 * Não gera evidências.
 * Não produz recomendações de mitigação.
 * ======================================================================
 */

const INSUFFICIENT_VENTILATION = Object.freeze({

    id: "insufficient_ventilation",

    name:
        "Possível renovação insuficiente do ar",

    priority: 100,

    when(ctx) {

        const validation =
            ctx.validation ?? {};

        const co2 =
            validation.co2;

        /*
         * O CO₂ somente pode participar da análise quando existe
         * uma leitura efetivamente disponível.
         */

        if (
            !co2 ||
            co2.state === "MISSING" ||
            co2.value === null ||
            co2.value === undefined
        ) {

            return false;

        }

        /*
         * Condição ambiental compatível com possível renovação
         * insuficiente do ar.
         *
         * A condição não representa confirmação causal.
         */

        return (
            co2.state === "HIGH"
        );

    }

});

export default INSUFFICIENT_VENTILATION;