# Levantamento dos parâmetros adicionais para conforto térmico

## Escopo

Este documento reúne o levantamento técnico dos parâmetros que o MIQAI precisaria obter para que uma avaliação formal de conforto térmico pudesse ser implementada no futuro.

A análise foi feita exclusivamente com base em:

- [monitor/miqai_core/docs/DECISAO_CONFORTO_TERMICO.md](DECISAO_CONFORTO_TERMICO.md)
- [monitor/miqai_core/docs/CONHECIMENTO_CONFORTO_TERMICO_ESPECIFICACAO.md](CONHECIMENTO_CONFORTO_TERMICO_ESPECIFICACAO.md)
- [monitor/miqai_core/src/references/catalog/ashrae55.js](../src/references/catalog/ashrae55.js)
- [monitor/miqai_core/src/references/catalog/iso_7730.js](../src/references/catalog/iso_7730.js)
- [monitor/miqai_core/src/regulatory/catalog/temperature.js](../src/regulatory/catalog/temperature.js)
- [monitor/miqai_core/src/regulatory/catalog/humidity.js](../src/regulatory/catalog/humidity.js)
- [monitor/miqai_core/src/validation/validationEngine.js](../src/validation/validationEngine.js)
- [monitor/miqai_core/src/metrics/calculators/thermalComfort.js](../src/metrics/calculators/thermalComfort.js)
- [monitor/miqai_core/src/metrics/metricsEngine.js](../src/metrics/metricsEngine.js)
- domínios existentes em [monitor/miqai_core/src/domains/index.js](../src/domains/index.js)

Sem alterar código, pipeline, contratos, testes, sensores, firmware ou dashboard.

---

## 1. Resumo executivo

O conhecimento já registrado no CORE permite afirmar com segurança que:

- temperatura e umidade são dados ativos e disponíveis;
- o CORE já identifica desvio térmico;
- o CORE ainda não possui a base completa para uma avaliação formal de conforto térmico humano;
- a referência formal mais adequada para cálculo analítico é ISO 7730;
- ASHRAE 55 reconhece que conforto térmico depende de múltiplos fatores e não é reduzido a temperatura e umidade isoladas;
- para PMV/PPD e conforto térmico local, faltam parâmetros ambientais, pessoais e contextuais que não estão presentes no CORE atual.

A menor expansão necessária não é um ajuste de score; é a aquisição e formalização de dados adicionais que complementam o contexto atual do MIQAI.

---

## 2. Inventário dos parâmetros

### 2.1. Parâmetros ambientais

#### 2.1.1. Air temperature

1. Parâmetro: air temperature
2. Por que é necessário: aparece como parâmetro central no contexto de conforto térmico e é necessário para qualquer avaliação térmica formal.
3. Referência que o exige/utiliza: ASHRAE 55; ISO 7730; catálogos de temperatura do CORE.
4. Existe atualmente no CORE? Sim. A temperatura já existe em validation e leitura.
5. Existe atualmente no hardware documentado? Não há inventário explícito de hardware no workspace que confirme um sensor específico para temperatura e, por extensão, não há afirmação documental de um conjunto sensorial completo para conforto térmico.
6. Pode ser obtido por sensor já existente? Possivelmente sim, se o sistema já utiliza sensores de temperatura ambiente. Isso não está documentado como inventário explícito no workspace, mas a estrutura do CORE assume que a leitura existe.
7. Exigiria novo sensor ou entrada externa? Não necessariamente, se o sensor já estiver integrado. No entanto, o workspace não documenta a presença de um sensor específico para temperatura radiante ou ambiente múltiplo.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É obrigatório para PMV/PPD e para qualquer avaliação térmica formal.
9. Impacto futuro no contrato de dados: baixa, porque ja existe em validation. A expansão seria de enriquecimento, não de reestruturação essencial.
10. Impacto futuro no pipeline: baixo. Já entra na cadeia atual de leitura e validation.

#### 2.1.2. Relative humidity

1. Parâmetro: relative humidity
2. Por que é necessário: é exigido na avaliação térmica e aparece diretamente em ASHRAE 55 e ISO 7730.
3. Referência que o exige/utiliza: ASHRAE 55; ISO 7730; catálogo de umidade do CORE.
4. Existe atualmente no CORE? Sim. Já existe em validation e em regras de temperatura/umidade.
5. Existe atualmente no hardware documentado? Não há documentação explícita do sensor de umidade no workspace.
6. Pode ser obtido por sensor já existente? Possivelmente, se o hardware envolvido já tiver sensor de umidade. Mas o workspace não mostra inventário de hardware.
7. Exigiria novo sensor ou entrada externa? Não necessariamente, mas depende do hardware disponível.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É obrigatório para PMV/PPD.
9. Impacto futuro no contrato de dados: baixo; já existe.
10. Impacto futuro no pipeline: baixo; já é parte do fluxo atual.

#### 2.1.3. Mean radiant temperature

1. Parâmetro: mean radiant temperature
2. Por que é necessário: é referenciado em ASHRAE 55 e ISO 7730 como elemento central da avaliação do ambiente térmico.
3. Referência que o exige/utiliza: ASHRAE 55; ISO 7730.
4. Existe atualmente no CORE? Não. Não aparece em validation nem em métricas atuais.
5. Existe atualmente no hardware documentado? Não há documentação no workspace de sensor de temperatura radiante ou de globo.
6. Pode ser obtido por sensor já existente? Não com os dados documentados no workspace; exige sensor específico ou entrada complementar.
7. Exigiria novo sensor ou entrada externa? Sim, a maior parte do tempo exigiria sensor específico ou entrada externa dedicada.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É obrigatório para PMV/PPD e para uma avaliação térmica analítica completa.
9. Impacto futuro no contrato de dados: alto. Exigiria nova entrada estruturada em validation.
10. Impacto futuro no pipeline: médio a alto; a leitura precisaria entrar na fase de validation e ser processada na métrica.

#### 2.1.4. Air velocity

1. Parâmetro: air velocity
2. Por que é necessário: está explícito em ASHRAE 55 e ISO 7730 como parte do conforto térmico e do conforto local.
3. Referência que o exige/utiliza: ASHRAE 55; ISO 7730.
4. Existe atualmente no CORE? Não. Não há entrada de velocidade do ar no validation atual.
5. Existe atualmente no hardware documentado? Não há inventário documental de anemômetro ou sensor de velocidade do ar.
6. Pode ser obtido por sensor já existente? Não com os dados atuais documentados.
7. Exigiria novo sensor ou entrada externa? Sim. Exigiria sensor específico ou dado externo.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É obrigatório para PMV/PPD.
9. Impacto futuro no contrato de dados: alto.
10. Impacto futuro no pipeline: médio a alto.

#### 2.1.5. Draft risk / air movement local condition

1. Parâmetro: draft risk / local air movement condition
2. Por que é necessário: aparece em ISO 7730 como critério de conforto térmico local.
3. Referência que o exige/utiliza: ISO 7730.
4. Existe atualmente no CORE? Não.
5. Existe atualmente no hardware documentado? Não há documentação de sensor de velocidade local ou risco de corrente de ar.
6. Pode ser obtido por sensor já existente? Não pelos dados documentados.
7. Exigiria novo sensor ou entrada externa? Sim, em geral exige sensor ou medição localizada.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É complementar para conforto térmico local; não é o principal parâmetro de PMV/PPD, mas integra a avaliação local.
9. Impacto futuro no contrato de dados: alto se o CORE quiser incluir conforto local.
10. Impacto futuro no pipeline: médio a alto.

#### 2.1.6. Radiant asymmetry

1. Parâmetro: radiant asymmetry
2. Por que é necessário: aparece em ISO 7730 como critério local de conforto térmico.
3. Referência que o exige/utiliza: ISO 7730.
4. Existe atualmente no CORE? Não.
5. Existe atualmente no hardware documentado? Não há documentação específica.
6. Pode ser obtido por sensor já existente? Não com os dados documentados.
7. Exigiria novo sensor ou entrada externa? Sim.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É complementar; relevante para conforto local.
9. Impacto futuro no contrato de dados: médio a alto.
10. Impacto futuro no pipeline: médio.

#### 2.1.7. Vertical temperature difference

1. Parâmetro: vertical temperature difference
2. Por que é necessário: aparece como critério local de conforto térmico.
3. Referência que o exige/utiliza: ISO 7730.
4. Existe atualmente no CORE? Não.
5. Existe atualmente no hardware documentado? Não.
6. Pode ser obtido por sensor já existente? Não com o conjunto documentado.
7. Exigiria novo sensor ou entrada externa? Sim, exigiria instalação ou sensores em múltiplos pontos.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É complementar para conforto local.
9. Impacto futuro no contrato de dados: médio a alto.
10. Impacto futuro no pipeline: médio.

#### 2.1.8. Floor temperature

1. Parâmetro: floor temperature
2. Por que é necessário: é um critério local de conforto térmico registrado em ISO 7730.
3. Referência que o exige/utiliza: ISO 7730.
4. Existe atualmente no CORE? Não.
5. Existe atualmente no hardware documentado? Não.
6. Pode ser obtido por sensor já existente? Não com os dados documentados.
7. Exigiria novo sensor ou entrada externa? Sim.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? Complementar para conforto local.
9. Impacto futuro no contrato de dados: médio.
10. Impacto futuro no pipeline: médio.

### 2.2. Parâmetros pessoais

#### 2.2.1. Clothing insulation

1. Parâmetro: clothing insulation
2. Por que é necessário: ASHRAE 55 e ISO 7730 registram que o conforto térmico depende do isolamento das vestimentas.
3. Referência que o exige/utiliza: ASHRAE 55; ISO 7730.
4. Existe atualmente no CORE? Não.
5. Existe atualmente no hardware documentado? Não. Não é um dado de sensor físico, mas uma variável de contexto ocupacional.
6. Pode ser obtido por sensor já existente? Não.
7. Exigiria novo sensor ou entrada externa? Não exige sensor físico; exige entrada externa ou perfil de ocupação.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É obrigatório para PMV/PPD.
9. Impacto futuro no contrato de dados: médio. Exigiria novo campo de contexto ou perfil.
10. Impacto futuro no pipeline: médio.

#### 2.2.2. Metabolic rate / activity level

1. Parâmetro: metabolic rate / activity level
2. Por que é necessário: ISO 7730 e ASHRAE 55 explicitamente reconhecem atividade metabólica como fator do conforto térmico.
3. Referência que o exige/utiliza: ASHRAE 55; ISO 7730.
4. Existe atualmente no CORE? Não.
5. Existe atualmente no hardware documentado? Não.
6. Pode ser obtido por sensor já existente? Não.
7. Exigiria novo sensor ou entrada externa? Não exige sensor físico; exigiria dado externo/operacional ou perfil de atividade.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É obrigatório para PMV/PPD.
9. Impacto futuro no contrato de dados: médio.
10. Impacto futuro no pipeline: médio.

### 2.3. Parâmetros contextuais

#### 2.3.1. Domain / environment applicability

1. Parâmetro: domain / environment applicability
2. Por que é necessário: o CORE já usa domain para escolher os catálogos e regras relevantes. O contexto do ambiente define quais critérios aplicar.
3. Referência que o exige/utiliza: catálogos do CORE, domínios existentes, ASHRAE 55, ABNT NBR 17037.
4. Existe atualmente no CORE? Sim. Está implementado em domain e em regulatory.
5. Existe atualmente no hardware documentado? Não se trata de sensor; é dado de configuração/ambiente.
6. Pode ser obtido por sensor já existente? Não, é dado de contexto, não de sensor.
7. Exigiria novo sensor ou entrada externa? Não.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É obrigatório para aplicar a referência correta e para contextualizar a avaliação.
9. Impacto futuro no contrato de dados: baixo.
10. Impacto futuro no pipeline: baixo.

#### 2.3.2. Occupancy profile / activity context

1. Parâmetro: occupancy profile / activity context
2. Por que é necessário: o projeto registra que ASHRAE 55 e ISO 7730 dependem de atividade e contexto de ocupação, mesmo que isso não esteja formalizado como estrutura de dados no CORE atual.
3. Referência que o exige/utiliza: ASHRAE 55; ISO 7730.
4. Existe atualmente no CORE? Não como dado estruturado formal de thermalComfort.
5. Existe atualmente no hardware documentado? Não.
6. Pode ser obtido por sensor já existente? Não, é dado operacional ou de perfil, não sensor.
7. Exigiria novo sensor ou entrada externa? Não exige sensor; exige entrada contextual ou configuração operacional.
8. É obrigatório para PMV/PPD ou apenas para avaliações complementares? É obrigatório para PMV/PPD em um cenário formal.
9. Impacto futuro no contrato de dados: médio.
10. Impacto futuro no pipeline: médio, se a entrada for adicionada ao fluxo de leitura ou configuração.

### 2.4. Parâmetros necessários para conforto térmico local

1. draft risk / local air movement
2. radiant asymmetry
3. vertical temperature difference
4. floor temperature

Todos estes parâmetros são explícitos no ISO 7730 como critérios locais. Eles não têm representação atual no CORE.

### 2.5. Parâmetros necessários para PMV/PPD

1. air temperature
2. mean radiant temperature
3. relative humidity
4. air velocity
5. clothing insulation
6. metabolic rate / activity level

Esses são os parâmetros principais exigidos pela referência registrada em ISO 7730. O CORE já possui temperatura e umidade; os demais estão ausentes.

---

## 3. Disponíveis atualmente

### Dados atualmente presentes no CORE

- temperature
- humidity
- domain
- validation state and currentAssessment
- applicability and referenceIds

### Dados atualmente ausentes no CORE

- mean radiant temperature
- air velocity
- clothing insulation
- metabolic rate / activity level
- draft risk
- radiant asymmetry
- vertical temperature difference
- floor temperature

### Dados documentados no workspace sobre hardware

Não há inventário documental explícito do hardware ou sensores no workspace que confirme a presença de:

- termômetro radiante;
- anemômetro;
- sensor de velocidade do ar;
- sensor de radiação térmica local;
- sensor de temperatura de piso;
- sensor de vestimenta ou atividade.

Portanto, o workspace documenta o modelo de dados do CORE e as referências, mas não documenta uma infraestrutura de sensores que suporte PMV/PPD completo.

---

## 4. Lacunas e dependências

### 4.1. Lacuna principal

A lacuna principal é que a referência identifica requisitos completos para conforto térmico humano, mas o MIQAI atual não coleta nem formaliza os dados necessários.

### 4.2. Dependência da referência

A decisão de implementações futuras depende de ISO 7730 para PMV/PPD e de ASHRAE 55 para contexto de ambiente e ocupação humana.

### 4.3. Dependência de domínio

O domínio já existe e precisa continuar sendo usado para escolher a referência e o perfil correto. Porém, o domínio sozinho não substitui dados físicos e pessoais faltantes.

### 4.4. Dependência de contexto operacional

A estrutura do projeto ainda não formaliza perfil de atividade ou vestimenta. Isso é uma dependência direta de dados que precisará ser adicionada antes de qualquer implementação formal.

---

## 5. Origem possível dos dados

### Dados de sensores físicos

- air temperature: sensor de temperatura ambiente
- relative humidity: sensor de umidade relativa
- mean radiant temperature: sensor radiométrico ou equivalente
- air velocity: anemômetro ou sensor de fluxo
- local thermal comfort values: sensores locais/temperaturas em múltiplos pontos

### Dados de contexto

- domain/application context: configuração do ambiente
- clothing insulation: perfil do usuário ou regra operacional
- metabolic rate / activity level: perfil ocupacional ou entrada externa

### Dados que não podem ser derivados por inferência sem base documental

- conforto térmico humano completo
- PMV/PPD com segurança
- conforto local sem dados locais

---

## 6. Menor expansão necessária

A menor expansão necessária para qualquer implementação futura de thermalComfort, além do estado atual do CORE, é:

1. manter temperatura e umidade como base atual;
2. adicionar mean radiant temperature;
3. adicionar air velocity;
4. adicionar clothing insulation;
5. adicionar metabolic rate / activity level;
6. se houver foco em conforto local, adicionar draft, radiant asymmetry, vertical temperature difference e floor temperature;
7. formalizar esses dados como entrada complementar, sem quebrar o pipeline atual;
8. manter a semântica UNKNOWN até que todos os requisitos mínimos da referência escolhida sejam atendidos.

Essa é a menor expansão tecnicamente defensável, porque ela se alinha com os elementos que ASHRAE 55 e ISO 7730 registram como essenciais.

---

## 7. Recomendação de implementação futura

A recomendação documental é a seguinte:

- não implementar metricamente thermalComfort com base apenas em temperatura + umidade;
- separar a etapa atual de diagnóstico de desvio térmico da futura etapa de cálculo de conforto térmico formal;
- definir a biblioteca de ouro para a nova métrica antes de qualquer mudança em thermalComfort.js;
- aceitar a expansão de dados somente após a definição formal de referência, requisitos e estrutura de entrada.

---

## DECISÃO DE DADOS

Os parâmetros que precisam ser obtidos antes que qualquer implementação de thermalComfort seja autorizada são, no mínimo:

- mean radiant temperature
- air velocity
- clothing insulation
- metabolic rate / activity level

Se o objetivo incluir conforto térmico local, também são necessários:

- draft risk / local air movement
- radiant asymmetry
- vertical temperature difference
- floor temperature

Sem esses dados, o CORE poderá continuar a afirmar:

- desvio térmico;
- condição ambiental;
- diagnóstico e evidência;
- UNKNOWN em thermalComfort;

Mas não poderá implementar uma métrica formal de conforto térmico humano de forma tecnicamente defensável.
