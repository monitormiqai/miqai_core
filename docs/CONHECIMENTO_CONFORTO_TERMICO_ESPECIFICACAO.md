# Especificação técnica interna de conhecimento — Unidade de Conforto Térmico

## Escopo e princípio

Esta especificação documenta apenas o conhecimento que já está presente no CORE MIQAI e nas referências registradas no projeto, sem criar regras novas, sem inventar limites, sem criar fórmulas, sem alterar pipeline e sem alterar contratos.

A unidade de conforto térmico, no estado atual do CORE, é tratada como:

- métrica do módulo Metrics;
- conhecimento de referência e regulamentação;
- diagnóstico de desvio térmico;
- evidência de desvio térmico;
- impacto possível associado ao cenário térmico;
- mas não como cálculo quantitativo final de conforto térmico humano.

A semântica preservada no projeto é a de UNKNOWN quando o critério específico da métrica ainda não foi formalmente definido.

---

## 1. CONHECIMENTO EXISTENTE NO CORE

### 1.1. Estrutura da métrica

No módulo Metrics, o CORE já registra a existência de thermalComfort como parte do conjunto de métricas executadas pela engine:

- [monitor/miqai_core/src/metrics/metricsEngine.js](../src/metrics/metricsEngine.js)
- [monitor/miqai_core/src/metrics/calculators/thermalComfort.js](../src/metrics/calculators/thermalComfort.js)

A estrutura do retorno formal presente hoje é:

- score
- level
- dominantFactor

No estado atual, a implementação efetiva retorna:

- score: null
- level: "UNKNOWN"
- dominantFactor: null

Quando os dados de entrada não estão disponíveis ou os critérios da métrica ainda não foram definidos.

### 1.2. Conhecimento regulatório por domínio

O CORE já registra faixas técnicas por domínio para temperatura e umidade:

- [monitor/miqai_core/src/regulatory/catalog/temperature.js](../src/regulatory/catalog/temperature.js)
- [monitor/miqai_core/src/regulatory/catalog/humidity.js](../src/regulatory/catalog/humidity.js)

Valores explicitamente definidos no presente projeto:

- corporate: temperatura 21 °C a 26 °C; umidade 35 % a 65 %
- healthcare: temperatura 21 °C a 26 °C; umidade 35 % a 65 %
- education: temperatura 21 °C a 26 °C; umidade 35 % a 65 %

Para residential e datacenter, o projeto não define faixa rígida universal; o catálogo marca esses casos como OBSERVATION.

### 1.3. Diagnóstico e evidência

O CORE já produz diagnóstico e evidência de desvio térmico:

- [monitor/miqai_core/src/diagnostics/catalog/thermalDiscomfort.js](../src/diagnostics/catalog/thermalDiscomfort.js)
- [monitor/miqai_core/src/evidences/catalog/thermalDeviation.js](../src/evidences/catalog/thermalDeviation.js)

A lógica ativa determina que:

- temperatura ou umidade com currentAssessment igual a ABOVE_REFERENCE ou BELOW_REFERENCE ativam o diagnóstico/evidência;
- o diagnóstico não afirma desconforto humano confirmado;
- o diagnóstico não calcula score;
- o diagnóstico não produz PMV/PPD.

### 1.4. Impacto

Há um impacto formal associado a cenário térmico e umidade elevada com CO₂ elevado:

- [monitor/miqai_core/src/impacts/catalog/thermalDiscomfort.js](../src/impacts/catalog/thermalDiscomfort.js)

Esse impacto é dependente da relationship warm_humid_high_co2 e do cenário warm_humid.

### 1.5. Semântica atual de segurança

A identidade funcional do projeto, confirmada nos testes, é a de que thermalComfort não inventa score:

- [monitor/miqai_core/tests/metrics/unknownCalculators.test.js](../tests/metrics/unknownCalculators.test.js)
- [monitor/miqai_core/tests/integration/finalSemantics.test.js](../tests/integration/finalSemantics.test.js)
- [monitor/miqai_core/tests/integration/metricsEngine.test.js](../tests/integration/metricsEngine.test.js)
- [monitor/miqai_core/tests/diagnostics/diagnostics.test.js](../tests/diagnostics/diagnostics.test.js)

A regra ativa é:

- sem critério formal, thermalComfort permanece UNKNOWN;
- diagnóstico de thermal_discomfort pode existir sem score;
- a presença de um diagnóstico não substitui a métrica quantitativa.

---

## 2. CONHECIMENTO PRESENTE NAS REFERÊNCIAS

### 2.1. ASHRAE 55

Arquivo:

- [monitor/miqai_core/src/references/catalog/ashrae55.js](../src/references/catalog/ashrae55.js)

O que está registrado:

- código: ASHRAE 55
- categoria: Conforto Térmico
- escopo inclui: Thermal Comfort, Temperature, Humidity, Air Velocity, Radiant Temperature
- descrição: define critérios para avaliação do conforto térmico em ambientes ocupados, considerando temperatura do ar, temperatura radiante, umidade relativa, velocidade do ar, isolamento das vestimentas e atividade metabólica
- aplica-se a ambientes corporativos, healthcare, education e residential

Importante: a referência registra que o conforto térmico depende de múltiplos fatores, não apenas temperatura e umidade.

### 2.2. ISO 7730

Arquivo:

- [monitor/miqai_core/src/references/catalog/iso_7730.js](../src/references/catalog/iso_7730.js)

O que está registrado:

- código: ISO 7730
- categoria: Conforto Térmico
- escopo inclui: Thermal Comfort, PMV, PPD, Temperature, Humidity, Air Velocity, Mean Radiant Temperature
- descrição: determina e interpreta o conforto térmico por meio dos índices PMV e PPD, com critérios locais
- registra parâmetros ambientais e pessoais, incluindo:
  - temperatura do ar
  - temperatura radiante média
  - umidade relativa
  - velocidade do ar
  - vestimenta
  - taxa metabólica
  - conforto térmico local

Este é o único arquivo do CORE que explicita explicitamente o conceito de PMV e PPD e relaciona parâmetros pessoais e ambientais.

### 2.3. Relação com a regulamentação territorial

O projeto registra referência técnica para faixas operacionais em:

- ABNT NBR 17037, refletida em temperature.js e humidity.js

Observação crucial do projeto:

- essas faixas são registradas como technical reference;
- não são tratadas como “legal limit” universal;
- para residential e datacenter, o projeto evita criar faixas universais rígidas.

---

## 3. DADOS DISPONÍVEIS NO MIQAI

Os dados existentes no CORE, conforme a estrutura e as validações implementadas, incluem:

### 3.1. Dados de leitura válidos

- temperatura
- umidade
- co2
- pm25
- pm10
- vocIndex
- noxIndex

Esses valores aparecem em testes e contextos de análise. Os arquivos auditados mostram a presença de temperatura e umidade como variáveis centrais do conforto térmico.

### 3.2. Dados de estado da validação

O CORE disponibiliza informação sobre cada parâmetro em validation, incluindo:

- state
- value
- currentAssessment
- scoreEligible
- evaluationPeriod

### 3.3. Dados de domínio

O domain determina o contexto aplicável:

- corporate
- healthcare
- education
- residential
- datacenter

### 3.4. Dados que não existem no projeto para cálculo formal atual

Os arquivos auditados não registram dados para:

- mean radiant temperature
- air velocity
- clothing insulation
- metabolic rate
- local thermal comfort asymmetry
- floor temperature
- vertical temperature difference
- draft information

Portanto, o CORE não tem hoje um conjunto completo de dados para a avaliação técnica completa de conforto térmico humano.

---

## 4. DADOS NECESSÁRIOS PARA UMA AVALIAÇÃO COMPLETA

Com base apenas na referência registrada no projeto, para uma avaliação técnica completa de conforto térmico humano, seriam necessários dados de:

### 4.1. Parâmetros ambientais

- temperatura do ar
- temperatura radiante média
- umidade relativa
- velocidade do ar
- eventualmente condições locais de radiação e fluxo

### 4.2. Parâmetros pessoais

- isolamento do vestuário
- taxa metabólica / atividade

### 4.3. Contexto de aplicação

- ambiente/uso do espaço
- perfil de ocupação
- domínio relevante do ambiente

### 4.4. Critérios e contexto de interpretação

- referência aplicável ao domínio
- regra de avaliação por faixa ou por modelo analítico
- definição de o que constitui “conforto aceitável” no caso específico

Sem esses elementos, o CORE pode observar desvio operacional, mas não pode concluir conforto térmico humano completo.

---

## 5. O QUE O CORE PODE AFIRMAR HOJE

Com base exclusiva no conhecimento atualmente presente nos arquivos auditados, o CORE pode afirmar com segurança:

1. O módulo de métricas inclui thermalComfort como métrica formal de catálogo.
2. O calculator de thermalComfort tem status de placeholder e retorna UNKNOWN quando os critérios não estão definidos.
3. O CORE possui faixas técnicas de temperatura e umidade para corporate, healthcare e education.
4. O CORE registra que residential e datacenter não devem receber faixas rígidas universais neste desenho.
5. O CORE possui registros de referências técnicas para conforto térmico em ASHRAE 55 e ISO 7730.
6. O CORE pode identificar desvio térmico quando temperatura ou umidade saem da referência aplicável.
7. O CORE pode produzir diagnóstico, evidência e impacto associados a esse desvio, sem afirmar conforto humano.
8. O CORE pode manter a semântica UNKNOWN quando não há critério calculável definido.
9. O CORE pode separar corretamente:
   - condição de leitura
   - diagnóstico de desvio
   - métrica formal
   - interpretação humana mais ampla

---

## 6. O QUE O CORE NÃO PODE AFIRMAR HOJE

O CORE não pode afirmar hoje, com suporte no conhecimento atual:

1. Que uma leitura instantânea de temperatura e umidade define conforto térmico humano.
2. Que thermalComfort possui score operacional.
3. Que o resultado de temperatura e umidade sozinho garante conforto aceitável.
4. Que PMV/PPD pode ser calculado sem parâmetros adicionais.
5. Que thermalComfort pode ser convertido em score 0–100 sem critérios explícitos.
6. Que o indicador de conforto térmico humano será igual ao estado de validação de temperatura ou umidade.
7. Que a condição atual de ambiente é confortante apenas por estar dentro de uma faixa específica sem considerar outros fatores.
8. Que a presença de desvio térmico equivale a desconforto real dos ocupantes.

---

## 7. DIFERENÇA ENTRE OS CONCEITOS

### 7.1. Desvio térmico

É a situação em que uma leitura de temperatura ou umidade fica acima ou abaixo da referência aplicável.

O CORE implementa isso em:

- [monitor/miqai_core/src/diagnostics/catalog/thermalDiscomfort.js](../src/diagnostics/catalog/thermalDiscomfort.js)
- [monitor/miqai_core/src/evidences/catalog/thermalDeviation.js](../src/evidences/catalog/thermalDeviation.js)

É um fato observacional, não um julgamento completo de conforto humano.

### 7.2. Condição ambiental

É o estado físico observável do ambiente, como:

- temperatura do ar
- umidade relativa
- concentração de CO₂
- presença de cenário térmico quente e úmido

Este é um estado técnico do ambiente, não um índice de conforto humano.

### 7.3. Conforto térmico

É o conceito mais amplo e técnico, registrado nas referências:

- ASHRAE 55
- ISO 7730

No projeto, o conforto térmico existe como tema e referência, mas ainda não há cálculo formal definido.

### 7.4. Conforto térmico humano

É a interpretação de que as pessoas se sentem confortáveis em um ambiente, considerando múltiplos fatores pessoais e ambientais.

Esse conceito não pode ser inferido apenas de temperatura e umidade no estado atual do CORE.

### 7.5. PMV/PPD

PMV (Predicted Mean Vote) e PPD (Predicted Percentage of Dissatisfied) são conceitos explicitamente registrados em ISO 7730.

O projeto registra sua existência como referência, mas não a implementa e não possui os dados necessários para calculá-los de forma defensável.

---

## 8. POSSÍVEIS NÍVEIS FUTUROS DE CONHECIMENTO, SEM IMPLEMENTAR

### Nível 1 — Observação de desvios

- identificar temperatura/umidade fora da referência
- registrar diagnóstico e evidência
- não concluir conforto humano

### Nível 2 — Classificação contextual

- classificar a leitura em categorias de desvios e faixa operativa
- usar regras de domínio e referência
- sem modelo de conforto completo

### Nível 3 — Indicador sintético de ambiente

- transformar dados ambientais em um indicador resumido
- exigir definição explícita de função, pesos e critérios
- obedecer à semântica da biblioteca de ouro do projeto

### Nível 4 — Métrica de conforto térmico formal

- exigir dados de temperatura do ar, umidade, velocidade do ar, temperatura radiante e parâmetros pessoais
- provisão explícita de referência e cálculo
- sem uso genérico ou arbitrário

### Nível 5 — Conforto humano estimado

- cálculo completo de conforto térmico para ocupantes
- uso de PMV/PPD ou equivalente formalmente definido
- requer dados pessoais e ambientais completos

Hoje, o CORE está no Nível 1, e parcialmente no Nível 2, mas não no Nível 3+.

---

## 9. CRITÉRIOS QUE DEVERÃO SER DEFINIDOS ANTES DE QUALQUER IMPLEMENTAÇÃO DE SCORE

Antes de qualquer score 0–100, o projeto deve definir explicitamente:

1. qual é a referência formal de cálculo:
   - ASHRAE 55,
   - ISO 7730,
   - ou outra referência formal já registrada no CORE
2. quais parâmetros ambientais são obrigatórios
3. quais parâmetros pessoais são obrigatórios
4. quais campos do validation serão usados como entrada
5. qual é a regra de agregação de temperatura e umidade
6. como a faixa por domínio será seleccionada
7. como será tratada a diferença entre ambiente residencial e ambiente condicionado artificialmente
8. qual será a estrutura do retorno para score, level e dominantFactor
9. quais condições serão tratadas como UNKNOWN
10. como o diagnóstico de thermal_discomfort será separado da métrica de conforto térmico
11. como a semântica de UNKNOWN será preservada

Sem esses critérios, qualquer score seria arbitrário e incompatível com a governança atual do CORE.

---

## 10. REFERÊNCIAS E RASTREABILIDADE

### 10.1. Referências registradas no CORE

- ASHRAE 55
  - [monitor/miqai_core/src/references/catalog/ashrae55.js](../src/references/catalog/ashrae55.js)

- ISO 7730
  - [monitor/miqai_core/src/references/catalog/iso_7730.js](../src/references/catalog/iso_7730.js)

- ABNT NBR 17037
  - [monitor/miqai_core/src/regulatory/catalog/temperature.js](../src/regulatory/catalog/temperature.js)
  - [monitor/miqai_core/src/regulatory/catalog/humidity.js](../src/regulatory/catalog/humidity.js)

### 10.2. Rastreador de conhecimento

- temperatura e umidade: regulatory/catalog/temperature.js e humidity.js
- referência técnica: references/catalog/ashrae55.js e iso_7730.js
- diagnóstico e evidência: diagnostics/catalog/thermalDiscomfort.js e evidences/catalog/thermalDeviation.js
- impacto: impacts/catalog/thermalDiscomfort.js
- métrica: metrics/calculators/thermalComfort.js
- engine: metrics/metricsEngine.js
- semântica de guardrail: tests/metrics/unknownCalculators.test.js e tests/integration/finalSemantics.test.js

### 10.3. Conclusão de rastreabilidade

O projeto já tem:

- conhecimento de referência;
- conhecimento regulatório por faixa;
- diagnóstico/evidência para desvio térmico;
- semântica explícita de não inventar score;

O que ainda falta é o processo formal que converte esse conhecimento em um cálculo operacional de conforto térmico, com dados e semântica regradas.

---

## Resumo executivo

O CORE hoje possui um conhecimento robusto sobre:

- o tema do conforto térmico;
- as referências relevantes;
- a diferença entre desvio térmico e conforto humano;
- a necessidade de não inventar score;
- a necessidade de preservar UNKNOWN até que o critério específico exista.

O CORE ainda não possui, no conhecimento atual documentado, a base formal para:

- score 0–100;
- PMV/PPD operacional;
- inferência de conforto humano apenas por temperatura e umidade;
- critérios definitivos de score sem definição explícita antes da implementação.

A unidade de conforto térmico está, portanto, em estado de conhecimento formal de contexto e diagnóstico, e em estado de placeholder para métrica quantitativa.
