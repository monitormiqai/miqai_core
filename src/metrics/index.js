/**
 * ======================================================================
 * CORE QAI
 * Metrics Module
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : Metrics
 * Versão    : 1.2.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Expor a interface oficial da Metrics Library para o CORE QAI.
 *
 * RESPONSABILIDADE DO MÓDULO
 * ----------------------------------------------------------------------
 * A Metrics Library transforma dados ambientais previamente validados
 * em indicadores quantitativos e classificações métricas definidos
 * pelo conhecimento específico deste módulo.
 *
 * Cadeia funcional:
 *
 *      dados validados
 *             ↓
 *          Metrics
 *             ↓
 *      indicadores métricos
 *             ↓
 *      métricas derivadas
 *             ↓
 *         QAI Score
 *
 * A Metrics Library pode utilizar:
 *
 * - valores produzidos pela Validation;
 * - estados e informações de qualidade da leitura quando
 *   necessários à execução da métrica;
 * - parâmetros e critérios pertencentes à própria Metrics;
 * - pesos e configurações métricas definidos para o cálculo;
 * - fórmulas matemáticas e métodos quantitativos formalmente
 *   definidos para cada indicador.
 *
 * PRINCÍPIO DE SEPARAÇÃO DE RESPONSABILIDADES
 * ----------------------------------------------------------------------
 * A Metrics Library não deve assumir que:
 *
 *      validation.passed
 *      validation.state
 *      validation.severity
 *
 * representam automaticamente o critério semântico da métrica.
 *
 * Esses campos pertencem ao resultado da Validation e somente podem
 * influenciar uma métrica quando essa relação estiver explicitamente
 * definida pelo conhecimento específico da Metrics.
 *
 * Portanto:
 *
 *      VALIDATION ≠ METRICS
 *
 * Validation determina a classificação da leitura segundo os critérios
 * aplicáveis à validação.
 *
 * Metrics determina como os dados validados são transformados em
 * indicadores quantitativos e classificações métricas.
 *
 * RESPONSABILIDADES
 * ----------------------------------------------------------------------
 *
 * A Metrics Library é responsável por:
 *
 * - calcular indicadores ambientais;
 * - aplicar fórmulas quantitativas;
 * - aplicar critérios específicos de cada métrica;
 * - produzir classificações métricas;
 * - calcular métricas derivadas;
 * - calcular o QAI Score;
 * - fornecer resultados quantitativos para as etapas posteriores
 *   do CORE QAI.
 *
 * LIMITES
 * ----------------------------------------------------------------------
 *
 * A Metrics Library:
 *
 * - não resolve normas;
 * - não substitui a Regulatory Library;
 * - não executa a Validation;
 * - não cria diagnósticos;
 * - não cria evidências;
 * - não cria hipóteses;
 * - não cria relationships;
 * - não cria impactos;
 * - não gera recomendações;
 * - não estabelece causalidade;
 * - não interpreta diretamente o ambiente além do necessário
 *   para o cálculo formal da métrica.
 *
 * CONHECIMENTO
 * ----------------------------------------------------------------------
 *
 * Os critérios, fórmulas, pesos, faixas e classificações utilizados
 * pelas métricas constituem conhecimento específico da Metrics Library.
 *
 * Esse conhecimento deverá ser alimentado e mantido na Biblioteca
 * de Ouro do CORE QAI, com sua respectiva fundamentação técnica,
 * científica ou normativa quando aplicável.
 *
 * O código dos calculators executa o conhecimento definido para a
 * métrica; não deve criar arbitrariamente critérios científicos,
 * pesos ou interpretações que não estejam formalmente definidos.
 *
 * ORGANIZAÇÃO
 * ----------------------------------------------------------------------
 *
 * calculators/
 *      Implementação das métricas individuais.
 *
 * config/
 *      Configurações e parâmetros métricos compartilhados.
 *
 * utils/
 *      Funções auxiliares utilizadas pelos calculators.
 *
 * metricsEngine.js
 *      Orquestração da execução das métricas.
 *
 * INTERFACE OFICIAL
 * ----------------------------------------------------------------------
 *
 * Este arquivo permanece como ponto de entrada público da Metrics
 * Library.
 *
 * Não executar lógica de cálculo diretamente neste arquivo.
 * ======================================================================
 */

export { calculateMetrics } from "./metricsEngine.js";