# Viabilidade técnica dos parâmetros de conforto térmico para o MIQAI

## Escopo

Este documento analisa somente:

- o que o projeto já documenta sobre estrutura de dados e arquitetura;
- a referência ASHRAE 55 já registrada no CORE;
- a referência ISO 7730 já registrada no CORE;
- a estrutura atual de validation e metrics;
- o que o workspace documenta sobre hardware ou sensores.

Não há implementação, não há alteração de código, não há alteração de pipeline, contratos, sensores, firmware, testes ou dashboard.

---

## 1. Inventário dos sensores atuais

### Conclusão documentada

O workspace não apresenta um inventário explícito de hardware/sensores ativos do MIQAI.

O que o projeto documenta de forma clara é:

- a estrutura de validation já considera temperature e humidity como dados válidos;
- a referência ASHRAE 55 e ISO 7730 listam parâmetros de conforto térmico e PMV/PPD;
- a arquitetura atual do CORE não registra mean radiant temperature, air velocity, clothing insulation, metabolic rate, asymmetry, floor temperature, etc.

Portanto, o único inventário tecnicamente defensável a partir do workspace é:

- temperatura do ar: presente no modelo de dados e validation;
- umidade relativa: presente no modelo de dados e validation;
- demais parâmetros: não documentados como dados existentes no CORE, nem como sensores reconhecidos no workspace.

---

## 2. Classificação por parâmetro

### 2.1. Temperatura do ar

1. Já mede diretamente?
   - No nível do CORE: sim, a estrutura de validation e leitura considera temperature como dado nativo.
   - No nível do hardware documentado: não há inventário explícito que confirme o sensor específico no workspace.

2. Pode ser obtido indiretamente?
   - Sim, em princípio, a partir de um sensor ambiental de temperatura já integrado.

3. Precisa de novo sensor?
   - Não necessariamente, se o sensor já está presente e integrado.
   - O workspace não documenta isso de forma explícita.

4. Deve ser um parâmetro configurável/contextual?
   - Não necessariamente, mas pode ser tratado como dado ambiental base.

5. Não é viável obter com o hardware atual?
   - Não há evidência de inviabilidade no projeto; apenas falta documentação do hardware específico.

6. Impacto futuro em thermalComfort:
   - essencial; é um requisito mínimo para qualquer avaliação formal.

### 2.2. Umidade relativa

1. Já mede diretamente?
   - No nível do CORE: sim, humidity já existe no modelo de dados e validation.
   - No nível do hardware documentado: não há inventário explícito de sensor de umidade no workspace.

2. Pode ser obtido indiretamente?
   - Sim, se houver sensor de umidade ambiente integrado.

3. Precisa de novo sensor?
   - Não necessariamente, mas depende do hardware efetivo.

4. Deve ser um parâmetro configurável/contextual?
   - Pode ser tratado como dado ambiental básico.

5. Não é viável obter com o hardware atual?
   - Não há evidência no workspace de que seja inviável; apenas não foi documentado como sensor específico.

6. Impacto futuro em thermalComfort:
   - essencial; faz parte do conjunto mínimo de dados da avaliação térmica.

### 2.3. Temperatura radiante média

1. Já mede diretamente?
   - Não, não existe no CORE nem no modelo de validation atual.

2. Pode ser obtido indiretamente?
   - Em teoria, pode ser estimada com sensores específicos ou composição de medições radiométricas, mas isso não está implementado no projeto atual.

3. Precisa de novo sensor?
   - Sim. Necessita de sensor radiométrico ou equivalente, ou de entrada externa específica.

4. Deve ser um parâmetro configurável/contextual?
   - Sim, como dado complementar ou entrada externa operacional, se não houver sensor dedicado.

5. Não é viável obter com o hardware atual?
   - Não há prova de viabilidade no hardware atual documentado; o projeto não registra esse sensor.

6. Impacto futuro em thermalComfort:
   - crítico para avaliação formal; ausência impede uma leitura analítica completa.

### 2.4. Velocidade do ar

1. Já mede diretamente?
   - Não, não existe no CORE como parâmetro formal de validation.

2. Pode ser obtido indiretamente?
   - Só em contexto de sensor específico ou entrada externa. O projeto não registra anemômetro nem cálculo derivado.

3. Precisa de novo sensor?
   - Sim.

4. Deve ser um parâmetro configurável/contextual?
   - Sim, como dado externo de ambiente ou sensor específico.

5. Não é viável obter com o hardware atual?
   - Não há suporte documental para viabilidade; o projeto não registra esse hardware.

6. Impacto futuro em thermalComfort:
   - crítico para PMV/PPD e para conforto térmico local.

### 2.5. Isolamento das vestimentas

1. Já mede diretamente?
   - Não.

2. Pode ser obtido indiretamente?
   - Em geral, não por sensor. Pode ser inferido apenas por perfil operacional ou configuração de ocupação, se houver uma regra externa.

3. Precisa de novo sensor?
   - Não é sensor físico; exige um dado contextual ou perfil de ocupação.

4. Deve ser um parâmetro configurável/contextual?
   - Sim, necessariamente.

5. Não é viável obter com o hardware atual?
   - Não é viável como dado sensorial; é um dado contextual.

6. Impacto futuro em thermalComfort:
   - obrigatório para PMV/PPD formal e para conforto térmico humano.

### 2.6. Taxa metabólica / atividade

1. Já mede diretamente?
   - Não.

2. Pode ser obtido indiretamente?
   - Só por perfil de atividade, dado contextual ou entrada operacional.

3. Precisa de novo sensor?
   - Não exige sensor físico; exige entrada contextual ou perfil de ocupação.

4. Deve ser um parâmetro configurável/contextual?
   - Sim, necessariamente.

5. Não é viável obter com o hardware atual?
   - Não é viável como dado sensorial; é dado de contexto.

6. Impacto futuro em thermalComfort:
   - obrigatório para PMV/PPD formal.

### 2.7. Assimetria radiante

1. Já mede diretamente?
   - Não.

2. Pode ser obtido indiretamente?
   - Só por múltiplas medições radiométricas e análise local, não pela arquitetura atual.

3. Precisa de novo sensor?
   - Sim, em geral exige sensores de temperatura radiante em múltiplos pontos ou entrada externa especializada.

4. Deve ser um parâmetro configurável/contextual?
   - Pode ser um parâmetro complementar, mas na prática exige medição especial.

5. Não é viável obter com o hardware atual?
   - Sim, não é viável com o hardware documentado até o momento.

6. Impacto futuro em thermalComfort:
   - relevante para conforto local, não para a base mínima de PMV/PPD.

### 2.8. Diferença vertical de temperatura

1. Já mede diretamente?
   - Não.

2. Pode ser obtido indiretamente?
   - Só por múltiplos pontos de medição em altura diferente.

3. Precisa de novo sensor?
   - Sim, em geral exige vários sensores ou configuração multidispositivo.

4. Deve ser um parâmetro configurável/contextual?
   - Sim, como dado complementar de conforto local.

5. Não é viável obter com o hardware atual?
   - Sim, não é viável sem uma extensão do conjunto de sensores.

6. Impacto futuro em thermalComfort:
   - relevante para conforto local, não para a base mínima do cálculo formal geral.

### 2.9. Temperatura do piso

1. Já mede diretamente?
   - Não.

2. Pode ser obtido indiretamente?
   - Só por sensor de superfície ou sensor de piso específico.

3. Precisa de novo sensor?
   - Sim.

4. Deve ser um parâmetro configurável/contextual?
   - Pode ser complementar e dependente da geometria do ambiente.

5. Não é viável obter com o hardware atual?
   - Sim, não há suporte documental de sensor de superfície.

6. Impacto futuro em thermalComfort:
   - complementar para conforto local.

### 2.10. Risco de draft / movimento de ar

1. Já mede diretamente?
   - Não.

2. Pode ser obtido indiretamente?
   - Só por sensor de velocidade do ar local ou por perfil do ambiente.

3. Precisa de novo sensor?
   - Sim, em geral exige anemômetro ou sensor de fluxo.

4. Deve ser um parâmetro configurável/contextual?
   - Sim, como dado complementar de ambiente.

5. Não é viável obter com o hardware atual?
   - Sim, não há documentação de sensor apropriado no workspace.

6. Impacto futuro em thermalComfort:
   - importante para conforto local, mas não substitui os requisitos básicos de PMV/PPD.

---

## 3. Parâmetros obrigatórios para uma avaliação formal

Com base em ASHRAE 55 e ISO 7730, os parâmetros que devem ser considerados obrigatórios para uma avaliação formal de conforto térmico humano são:

- temperatura do ar
- umidade relativa
- temperatura radiante média
- velocidade do ar
- isolamento das vestimentas
- taxa metabólica / atividade

Esses são os parâmetros que aparecem diretamente nas descrições das referências já registradas no CORE.

### Conclusão de viabilidade

- temperatura do ar: viável no modelo atual, condicionada ao sensor real existente;
- umidade relativa: viável no modelo atual, condicionada ao sensor real existente;
- temperatura radiante média: não documentado e exigiria novo sensor ou dado externo;
- velocidade do ar: não documentado e exigiria novo sensor ou dado externo;
- isolamento das vestimentas: não sensorial; deve ser contextual;
- taxa metabólica / atividade: não sensorial; deve ser contextual.

---

## 4. Parâmetros necessários somente para avaliação de conforto local

Os parâmetros abaixo são específicos para conforto térmico local e não são parte da base mínima de PMV/PPD do ambiente geral:

- assimetria radiante;
- diferença vertical de temperatura;
- temperatura do piso;
- risco de draft / movimento de ar local.

Esses parâmetros aparecem em ISO 7730 como critérios locais e exigem sensores adicionais ou medição especial.

---

## 5. Limitações do hardware atual documentado

O workspace não fornece evidência de que o MIQAI possui:

- sensor de temperatura radiante média;
- anemômetro ou sensor de velocidade do ar;
- sensor de piso;
- múltiplos sensores para diferença vertical ou assimetria;
- mecanismo de perfil de vestimenta ou atividade;
- integração de dados pessoais ou de ocupação.

Em consequência, a capacidade atual do MIQAI, a partir do que está documentado, é suficiente apenas para:

- observar temperatura e umidade;
- detectar desvios térmicos;
- manter a semântica UNKNOWN;
- produzir diagnóstico e evidência de desvio térmico.

Não é suficiente para uma avaliação formal de conforto térmico humano.

---

## 6. Impacto sobre uma futura implementação de thermalComfort

### Impacto alto

- temperatura radiante média
- velocidade do ar
- vestimenta
- atividade metabólica
- conforto local

### Impacto médio

- dados contextuais de ocupação
- configuração por domínio

### Impacto baixo

- temperatura do ar
- umidade relativa

A conclusão essencial é que a base mínima para uma implementação formal ainda não existe no core nem no hardware documentado.

---

## 7. Conclusão técnica de viabilidade

### O que o MIQAI já consegue viabilizar no estado atual

- observação de temperatura do ar;
- observação de umidade relativa;
- detecção de desvio térmico;
- diagnóstico e evidência de condição térmica potencialmente desfavorável;
- manutenção de thermalComfort em UNKNOWN quando o critério específico não está definido.

### O que não está viabilizado com o hardware/documentação atual

- PMV/PPD formal;
- conforto térmico humano completo;
- conforto térmico local completo;
- avaliação analítica com temperatura radiante, velocidade do ar e dados pessoais.

### Decisão prática

A implementação futura de thermalComfort não pode ser autorizada com base no hardware e arquitetura atuais, porque faltam parâmetros essenciais e, no mínimo, sensores ou entradas contextuais adicionais.
