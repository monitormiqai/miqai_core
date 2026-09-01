/**
 * ======================================================================
 * CORE QAI
 * Legacy Metric Calculator
 * ----------------------------------------------------------------------
 * Arquivo   : healthRisk.js
 * Módulo    : Metrics
 * Versão    : 1.1.0
 * Status    : LEGACY - DESABILITADO
 *
 * Objetivo original
 * ----------------------------------------------------------------------
 * Calcular um indicador agregado denominado Health Risk a partir de
 * penalizações aplicadas a parâmetros ambientais.
 *
 * STATUS ATUAL
 * ----------------------------------------------------------------------
 * Este calculator foi retirado do fluxo oficial da Metrics Library.
 *
 * O indicador anteriormente calculado por este módulo não possui,
 * no estado atual da Biblioteca de Ouro do CORE QAI, fundamentação
 * científica suficiente para representar ou classificar risco à saúde.
 *
 * Portanto:
 *
 *      healthRisk NÃO é uma métrica científica oficial do CORE QAI.
 *
 *      Os pesos e penalizações anteriormente utilizados NÃO devem ser
 *      tratados como conhecimento científico validado.
 *
 *      O resultado NÃO deve alimentar diagnóstico, impacto, hipótese,
 *      recomendação ou qualquer interpretação relacionada à saúde.
 *
 *      O resultado NÃO deve ser entregue pelo JSON oficial do CORE.
 *
 * PRINCÍPIO
 * ----------------------------------------------------------------------
 * O módulo Metrics deve utilizar somente conhecimento específico,
 * formalmente definido e suficientemente fundamentado para a finalidade
 * quantitativa que o indicador pretende representar.
 *
 * A ausência de fundamentação suficiente impede que uma pontuação
 * agregada seja apresentada como risco à saúde.
 *
 * RASTREABILIDADE
 * ----------------------------------------------------------------------
 * Este arquivo permanece temporariamente como registro histórico da
 * implementação anterior.
 *
 * Não importar.
 * Não registrar.
 * Não executar.
 *
 * A remoção física definitiva poderá ocorrer após a verificação de
 * todas as dependências e do contrato de saída do CORE QAI.
 * ======================================================================
 */

/*
 * LEGACY - DESABILITADO
 *
 * Nenhuma função de cálculo é exportada.
 *
 * Este arquivo existe exclusivamente para preservar rastreabilidade
 * durante a revisão estrutural do CORE QAI.
 */

const HEALTH_RISK_LEGACY = Object.freeze({

    id: "healthRisk",

    status: "LEGACY",

    enabled: false,

    reason:
        "Métrica retirada do fluxo ativo por ausência de fundamentação científica suficiente para classificação de risco à saúde."

});

export default HEALTH_RISK_LEGACY;