# Especificação técnica de decisão — conhecimento de conforto térmico

## Escopo

Esta especificação tem como base exclusiva:

- a especificação interna já documentada em [monitor/miqai_core/docs/CONHECIMENTO_CONFORTO_TERMICO_ESPECIFICACAO.md](CONHECIMENTO_CONFORTO_TERMICO_ESPECIFICACAO.md)
- a referência ASHRAE 55 registrada em [monitor/miqai_core/src/references/catalog/ashrae55.js](../src/references/catalog/ashrae55.js)
- a referência ISO 7730 registrada em [monitor/miqai_core/src/references/catalog/iso_7730.js](../src/references/catalog/iso_7730.js)
- os catálogos de temperatura e umidade em [monitor/miqai_core/src/regulatory/catalog/temperature.js](../src/regulatory/catalog/temperature.js) e [monitor/miqai_core/src/regulatory/catalog/humidity.js](../src/regulatory/catalog/humidity.js)
- a estrutura atual de [monitor/miqai_core/src/metrics/calculators/thermalComfort.js](../src/metrics/calculators/thermalComfort.js)
- a estrutura atual de [monitor/miqai_core/src/validation/validationEngine.js](../src/validation/validationEngine.js)
- os dominios existentes em [monitor/miqai_core/src/domains/index.js](../src/domains/index.js)

Sem alterar código, sem criar fórmula, sem criar score, sem criar pesos, sem criar limites, sem alterar pipeline, contratos, testes ou métricas.

---

## 1. Referência formal escolhida e justificativa

### Referência formal escolhida

A referência formal de decisão para o caminho analítico é ISO 7730.

### Justificativa

A seleção de ISO 7730 é tecnicamente adequada porque:

- o arquivo já registrado a declara como referência internacional para conforto térmico em ambientes ocupados;
- ele explicita PMV e PPD como índices formais;
- ele apresenta parâmetros ambientais e pessoais que tornam a avaliação tecnicamente completa;
- ele oferece uma linguagem formal de avaliação do ambiente térmico e do conforto local;
- ele é a referência mais diretamente compatível com uma abordagem analítica, em contraste com faixas operacionais que funcionam como observação contextual.

A ASHRAE 55 permanece relevante como referência de contexto e conforto térmico geral, especialmente para residential e para avaliação ambiental mais ampla, mas a decisão analítica de métrica formal deve ter ISO 7730 como referência mestre, porque a estrutura do próprio projeto já a registra como “analytical determination and interpretation of thermal comfort using calculation of the PMV and PPD indices and local thermal comfort criteria”.

### Papel de cada referência no projeto

- ASHRAE 55: contextual e técnica, especialmente para cultura de conforto térmico em ocupação humana;
- ISO 7730: analítica e formal, mais apropriada para qualquer implementação do tipo cálculo de conforto térmico;
- ABNT NBR 17037: faixa técnica de domínio em temperature e humidity, útil como critério de limite operacional e observação, não como substituto de um cálculo de conforto humano.

---

## 2. Nível de avaliação que pode ser implementado com os dados atuais

Com os dados que já existem no projeto, o nível de avaliação tecnicamente defensável é:

- avaliação de desvio térmico;
- observação contextual de temperatura e umidade;
- diagnóstico técnico de condição potencialmente desfavorável;
- evidência de desvio térmico em relação à referência aplicável;
- identificação de uma condição ambiental relevante para conforto térmico.

Esse nível é compatível com a arquitetura atual do CORE e com a semântica de UNKNOWN presente em thermalComfort.

O que o CORE não pode fazer de modo defensável hoje é:

- converter temperatura + umidade em conforto térmico humano;
- afirmar conforto térmico a partir de uma única leitura;
- produzir um score 0–100 sem critérios explícitos, parâmetros completos e decisão formal de referência.

---

## 3. Parâmetros obrigatórios disponíveis

Os parâmetros atualmente disponíveis no CORE, conforme a estrutura de Validation e os dados de leitura, são:

- temperatura
- umidade
- domain / ambiente
- avaliação de currentAssessment
- estado da validação
- value
- scoreEligible
- criterionKind
- applicability
- referenceIds

Esses parâmetros são suficientes para:

- detectar desvio térmico;
- determinar se a leitura está ABOVE_REFERENCE, BELOW_REFERENCE ou WITHIN_REFERENCE;
- alimentar diagnóstico e evidência;
- manter a métrica em UNKNOWN quando a regra de cálculo não estiver definida.

---

## 4. Parâmetros obrigatórios ausentes

Os parâmetros que faltam para uma avaliação técnica completa de conforto térmico humano são os que ISO 7730 registra como parte do cálculo analítico:

- mean radiant temperature
- air velocity
- clothing insulation
- metabolic rate / activity
- condições locais de conforto térmico, como:
  - draft
  - radiant asymmetry
  - vertical temperature difference
  - floor temperature

Esses elementos não aparecem na estrutura atual de validation nem como dados da leitura principal. Sem isso, o cálculo não pode fundamentar PMV/PPD ou conforto humano completo.

---

## 5. É tecnicamente defensável calcular alguma métrica somente com temperatura + umidade?

### Resposta: não.

A resposta é negativa, com a seguinte razão:

- ASHRAE 55 e ISO 7730 explicitamente tratam conforto térmico como dependente de múltiplos fatores;
- o próprio projeto registra que a ASHRAE 55 não usa um intervalo único universal para temperatura ou umidade como critério único;
- o fluxo atual de validation trata temperatura e umidade como dados observacionais ou comparativos; ele não as transforma em conforto humano;
- a métrica thermalComfort, no arquivo atual, declara que a métrica ainda não tem critérios formalizados;
- a semântica atual do projeto preserva UNKNOWN exatamente para esse caso.

Portanto, não é tecnicamente defensável assumir que temperatura + umidade equivalem a conforto humano, e ainda menos a um score 0–100.

---

## 6. O que falta exatamente

Falta o que está descrito em ISO 7730 e em ASHRAE 55 como conhecimento de avaliação completa:

1. conjunto mínimo de parâmetros ambientais além de temperatura e umidade;
2. dados pessoais de vestimenta e atividade;
3. critério formal de combinação dos parâmetros;
4. decisão explícita de método de cálculo ou de referência de domínio;
5. decisão de como o CORE tratará residential, healthcare, education, corporate e datacenter;
6. definição de semântica de score, level e dominantFactor;
7. definição de quando thermalComfort deve permanecer UNKNOWN;
8. separação formal entre:
   - condição ambiental
   - desvio térmico
   - conforto térmico
   - conforto térmico humano
   - PMV/PPD

Sem isso, a implementação seria inferência técnica não sustentada.

---

## 7. Parâmetros adicionais necessários para PMV/PPD

Com base na referência já registrada em ISO 7730, os parâmetros adicionais esperados para PMV/PPD são:

### Ambientais

- temperature
- mean radiant temperature
- relative humidity
- air velocity

### Pessoais

- clothing insulation
- metabolic rate / activity level

### Locais

- local thermal comfort criteria, como:
  - draft risk
  - radiant asymmetry
  - vertical temperature difference
  - floor temperature

Não há suporte no CORE para esses dados como parte do esquema atual de validation, e este é o principal motivo de que PMV/PPD não pode ser implementado hoje sem ampliar a base de conhecimento e a base de dados.

---

## 8. Quais parâmetros poderiam ser adicionados futuramente sem alterar o pipeline

A resposta técnica correta é: apenas como dados complementares fora do contrato atual, em uma extensão controlada do fluxo de entrada, sem mudar o pipeline formal do CORE.

Em outras palavras:

- não criar novos parâmetros obrigatórios no CORE;
- não modificar a estrutura do contrato-base do validation;
- não mudar a execução do pipeline;
- permitir que a camada de entrada (fora do contrato atual) forneça adicionais em uma extensão dirigida do sistema, quando decidida pela Biblioteca de Ouro.

Parâmetros cuja adição seria lógica em extensão futura:

- mean_radiant_temperature
- air_velocity
- clothing_insulation
- metabolic_rate
- draft
- radiant_asymmetry
- vertical_temperature_difference
- floor_temperature

Mas isso deve ser tratado como expansão de conhecimento e de dados, não como ajuste imediato do contrato existente.

---

## 9. Proposta de semântica para score, level e dominantFactor

A proposta de semântica deve respeitar a atual e explícita regra de segurança do projeto: quando o conhecimento não estiver formalizado, permanecer UNKNOWN.

### score

- tipo: numérico quando a métrica estiver formalmente definida;
- sem score quando as entradas mínimas ainda não existirem;
- quando não houver critério formal, score = null;
- nenhuma inferência de score com base apenas em temperatura e umidade.

### level

- deve refletir a classificação formal da métrica quando houver critérios definidos;
- deve permanecer "UNKNOWN" enquanto a métrica não tiver regra materializada;
- deve ser usado para representar ausência de critério formal, e não como anúncio de valor arbitrário.

### dominantFactor

- somente deve existir quando o conhecimento da métrica definir explicitamente qual dado domina na avaliação;
- deve ser null enquanto a métrica não tiver critérios de dominância formalizados;
- não deve ser derivado ad hoc a partir de temperatura ou umidade sem regra definida.

Em sintese: a semântica correta é:

- score: null / UNKNOWN
- level: "UNKNOWN"
- dominantFactor: null

até que a Biblioteca de Ouro defina a métrica completa.

---

## 10. Condições que devem continuar como UNKNOWN

As seguintes condições devem continuar como UNKNOWN enquanto o conhecimento não for expandido:

1. qualquer cálculo de thermalComfort baseado apenas em temperatura + umidade;
2. qualquer score de conforto térmico sem critérios formais;
3. qualquer inferência de conforto humano a partir de uma leitura instantânea;
4. qualquer PMV/PPD sem os parâmetros necessários;
5. qualquer tentativa de dominância de fator sem regra formal;
6. qualquer nível de conforto que não tenha sua regra definida pela Biblioteca de Ouro;
7. qualquer avaliação de conforto térmico em residential e datacenter sem critério explícito para esses domínios;
8. qualquer métrica que misture diagnóstico térmico com avaliação humana final.

---

## 11. Separação entre thermalComfort, thermal_discomfort, evidence e impact

### thermalComfort

É a métrica formal da Metrics Engine.

Sua responsabilidade é calcular um indicador quantitativo apenas quando houver critério formal definido.

Hoje, ela deve continuar como UNKNOWN por ausência de critério definido.

### thermal_discomfort

É um diagnóstico técnico. Ele identifica que a leitura atual de temperatura e/ou umidade apresenta desvio em relação à referência aplicável.

Ele não é uma métrica quantitativa nem uma conclusão de desconforto humano.

### evidence

É o registro de fato observado.

O CORE já formaliza thermal_deviation como evidência de desvio térmico. Isso é um fato, não uma conclusão.

### impact

É uma possível consequência ambiental associada à relação de cenário. No projeto, impact térmico depende de relationship e cenário, e não substitui a métrica.

A separação correta é:

- thermalComfort: indicador calculado
- thermal_discomfort: diagnóstico
- evidence: fato observado
- impact: consequência potencial do cenário

Todos estes itens são distintos, e a combinação deles não pode ser misturada em um único conceito.

---

## 12. Critérios que deverão ser aprovados antes de qualquer alteração em thermalComfort.js

Antes de qualquer alteração em thermalComfort.js, os seguintes critérios devem ser aprovados formalmente:

1. escolha de referência formal de suporte, com preferência por ISO 7730 para cálculo analítico;
2. definição explícita de quais dados ambientais são obrigatórios;
3. definição explícita de quais dados pessoais são obrigatórios;
4. decisão sobre o uso de ASHRAE 55 como contexto ou de ISO 7730 como cálculo analítico;
5. definição de como os domínios serão tratados;
6. definição de quando a métrica deve retornar UNKNOWN;
7. definição da semântica exata de score, level e dominantFactor;
8. definição de como a métrica será separada de thermal_discomfort;
9. garantia de que a alteração não muda o pipeline;
10. garantia de que a alteração não muda o contrato;
11. garantia de que a alteração não cria faixas ou pesos arbitrários;
12. garantia de que a alteração não trata temperatura + umidade como conforto humano;
13. garantia de que a alteração respeita o estado atual e a governança do projeto.

Se esses critérios não forem aprovados, thermalComfort deve continuar em UNKNOWN.

---

## DECISÃO

C — é necessário obter parâmetros adicionais antes de implementar.
