# Decisão arquitetural sobre a unidade thermalComfort

## Escopo

Este documento consolida a análise técnica das decisões registradas em:

- CONHECIMENTO_CONFORTO_TERMICO_ESPECIFICACAO.md
- DECISAO_CONFORTO_TERMICO.md
- PARAMETROS_CONFORTO_TERMICO.md
- VIABILIDADE_PARAMETROS_CONFORTO_TERMICO.md

Ele compara três estratégias sem alterar código, sensores, firmware, pipeline, contratos, testes ou dashboard.

---

## 1. Contexto técnico consolidado

A arquitetura atual do CORE já demonstra a seguinte semântica:

- thermalComfort existe como métrica formal do catálogo;
- o calculator atual mantém a métrica em UNKNOWN quando os critérios não estão definidos;
- o CORE já identifica desvio térmico com base em temperatura e umidade;
- as referências registradas em ASHRAE 55 e ISO 7730 exigem parâmetros adicionais para uma avaliação completa de conforto térmico humano;
- a referência formal mais adequada para cálculo analítico é ISO 7730;
- o projeto ainda não possui a base mínima de dados para PMV/PPD ou consenso formal de conforto humano;
- o sistema não documenta sensores para temperatura radiante, velocidade do ar, draft, radiação local, piso, vestimenta ou atividade.

Em resumo: o MIQAI, no estado atual, é uma plataforma de monitoramento ambiental e diagnóstico de desvios térmicos, não uma plataforma formal de conforto humano.

---

## 2. Estratégias comparadas

### Estratégia A — manter o MIQAI como monitor ambiental, com temperatura e umidade, mantendo thermalComfort UNKNOWN

Descrição:

- o sistema continua medindo temperatura e umidade;
- o CORE continua a produzir diagnóstico e evidência de desvio térmico;
- thermalComfort permanece UNKNOWN quando não há critério formal definido;
- o produto comunica com precisão que não está avaliando conforto humano.

### Estratégia B — implementar futuramente um indicador térmico ambiental, sem afirmar conforto humano e sem PMV/PPD

Descrição:

- o sistema define um indicador ambiental de risco térmico ou índice de severidade ambiental;
- ele usa temperatura e umidade, eventualmente com regras operacionais por domínio;
- o indicador não pretende ser conforto humano;
- não usa PMV/PPD nem regra de avaliação de ocupação humana.

### Estratégia C — transformar o MIQAI em plataforma capaz de avaliação formal de conforto térmico humano

Descrição:

- o sistema incorpora temperatura radiante média, velocidade do ar, roupa e atividade, além de condições de conforto local;
- o CORE passa a calcular PMV/PPD ou equivalente formal;
- a plataforma e o contrato JSON passam a suportar dados de ocupação e sensores especializados;
- a aplicação SaaS/dashboard passa a apresentar indicadores de conforto humano com maior criticidade e maior necessidade de rastreabilidade.

---

## 3. Comparação por critério

### 3.1. Aderência ao propósito original do MIQAI

#### A

Alta aderência. A arquitetura atual do MIQAI é compatível com monitoramento ambiental, diagnóstico de desvios e suporte operacional. Ela evita uma sobreinterpretação do que os sensores podem afirmar.

#### B

Média a alta aderência. É aceitável como evolução incremental do monitoramento, desde que o indicador seja explicitamente ambiental e não humano. Mantém a relação com o propósito original, mas exige uma linguagem clara de não-confiança em conforto humano.

#### C

Baixa aderência ao propósito original. Passa a exigir uma plataforma de medição ocupacional, sensorial e contextual muito mais complexa. É uma mudança de produto, e não apenas uma extensão do monitoramento atual.

### 3.2. Sensores necessários

#### A

- temperatura do ar;
- umidade relativa;
- sem necessidade de novos sensores para a semântica atual.

#### B

- temperatura do ar;
- umidade relativa;
- possivelmente sensores adicionais de observação ambiental;
- ainda sem necessidade de média radiante, anemômetro ou perfil ocupacional completo.

#### C

- temperatura do ar;
- umidade relativa;
- temperatura radiante média;
- velocidade do ar;
- sensores locais para conforto térmico (draft, radiação, piso, diferença vertical);
- dado de contexto operando em vestimenta e atividade.

Conclusão: A e B permanecem compatíveis com a base atual; C exige nova base de hardware e sensores.

### 3.3. Dados contextuais necessários

#### A

Baixos. O contexto principal é domínio e referência aplicável, sem inferência humana de conforto.

#### B

Médios. Exigem categorizações por domínio e evento operacional, mas ainda sem perfil pessoal.

#### C

Altos. Necessitam de:

- isolamento das vestimentas;
- taxa metabólica / atividade;
- perfil de ocupação;
- regras de domínio;
- referência operacional/analítica aplicável.

### 3.4. Complexidade de hardware

#### A

Baixa. O MIQAI continua como plataforma de monitoramento ambiental.

#### B

Baixa a média. Há um aumento pequeno em sensoriamento e lógica, mas sem hardware extremamente especializado.

#### C

Alta. Exige hardware de medição mais sofisticado e, em muitos casos, múltiplos pontos de medição e observações locais.

### 3.5. Complexidade de firmware

#### A

Baixa. O firmware continua trabalhando com leitura, validação, diagnóstico e evidência.

#### B

Média. O firmware precisa racionalizar um indicador ambiental e suas regras de severidade, mas ainda permanece bem controlado.

#### C

Alta. O firmware precisaria gerenciar múltiplos parâmetros, algoritmos analíticos, inferência contextual e boa rastreabilidade de entrada/saída.

### 3.6. Impacto no CORE

#### A

Baixo. O CORE já suporta a semântica atual e preserva a regra de segurança UNKNOWN.

#### B

Médio. Requer nova métrica ambiental, nova semântica de indicador e regras de domínio. O impacto é organizacional e conceitual, não destrutivo.

#### C

Alto. Exigiria nova estrutura de validation, métrica formal, contrato estendido, governança de pontuação e regra de interpretação. A mudança é arquitetural e não somente incremental.

### 3.7. Impacto no contrato JSON

#### A

Baixo. Mantém o contrato atual e a semântica existente.

#### B

Médio. Necessita de um novo campo ou classe de indicador ambiental, além de documentação clara de que não é conforto humano.

#### C

Alto. Exigiria ampliação substancial do contrato para receber todos os parâmetros de ambiente e pessoais, com risco de incompatibilidade incremental.

### 3.8. Impacto no SaaS/dashboard

#### A

Baixo. O dashboard continua a mostrar monitoramento e diagnóstico de desvio, sem conclusões de conforto humano.

#### B

Médio. O dashboard passa a exibir um indicador térmico ambiental, mas precisa escrever em linguagem cuidadosa para evitar confusão com conforto humano.

#### C

Alto. Dashboard, relatórios e UX precisariam explicitar PMV/PPD, score, status de conforto local, perfil e contexto ocupacional, aumentando complexidade de comunicação e risco de má interpretação.

### 3.9. Rastreabilidade normativa

#### A

Alta. A rastreabilidade fica clara e segura: o sistema não afirma o que não pode verificar.

#### B

Alta, se claramente rotulado como indicador ambiental operacional. A rastreabilidade é sustentável desde que se evite crossover semântico com conforto humano.

#### C

Média a alta, mas com custos elevados de justificativa e revisão. A plataforma precisaria demonstrar que cada indicador está alinhado com ISO 7730, ASHRAE 55 e regra de uso aplicável. Isso não é impossível, mas exige rigor técnico e documentação elevada.

### 3.10. Risco de interpretação indevida

#### A

Baixo. O sistema não se apresenta como conforto humano; está em terreno seguro de monitoramento e diagnóstico.

#### B

Médio. Existe risco de usuários ou clientes confundirem indicador ambiental com conforto humano. Isso exige linguagem cuidadosa e documentação clara.

#### C

Alto. O risco é muito maior: um score ou status de conforto humano sem os dados e interpretações completas pode ser entendido como decisão clínica ou de conformidade, quando na verdade depende de parâmetros e contexto adicionais.

### 3.11. Risco regulatório

#### A

Baixo. O sistema faz afirmações limitadas e tecnicamente defensáveis.

#### B

Médio. O risco aumenta se o indicador for interpretado como conforto humano ou como critério de conformidade legal.

#### C

Alto. A plataforma passa a operar em um território sensível de saúde ocupacional, conforto e conformidade, exigindo regras legais, documentação, governança de decisão e validação forte.

### 3.12. Custo e complexidade do produto

#### A

Baixo. Produto alinhado ao monitoramento ambiental e diagnóstico de desvios.

#### B

Médio. Requer desenvolvimento de indicador, qualidade, regra de domínio e clareza de linguagem, mas permanece administrável.

#### C

Muito alto. Custos com hardware, firmware, testes, integração, dados contextuais e UX aumentam fortemente.

### 3.13. Possibilidade de evolução futura

#### A

Muito alta como base estratégica. Permite expandir sem corroer a semântica atual do sistema. A evolução natural é para B e, em etapas, para C, quando o projeto estiver pronto.

#### B

Alta. É uma ponte útil entre monitoramento e análise térmica mais formal, sem comprometer o produto atual.

#### C

Alta em teoria, mas somente viável com investimento técnico e produto específico. É uma evolução de larga escala, não uma pequena extensão.

---

## 4. Síntese comparativa

| Critério | A | B | C |
| --- | --- | --- | --- |
| Aderência ao produto original | Alta | Média/Alta | Baixa |
| Sensores necessários | Baixos | Baixos/Médios | Altos |
| Dados contextuais | Baixos | Médios | Altos |
| Complexidade de hardware | Baixa | Baixa/Média | Alta |
| Complexidade de firmware | Baixa | Média | Alta |
| Impacto no CORE | Baixo | Médio | Alto |
| Impacto no JSON | Baixo | Médio | Alto |
| Impacto no SaaS/dashboard | Baixo | Médio | Alto |
| Rastreabilidade normativa | Alta | Alta | Média/Alta com alto custo |
| Risco de interpretação indevida | Baixo | Médio | Alto |
| Risco regulatório | Baixo | Médio | Alto |
| Custo e complexidade do produto | Baixo | Médio | Muito alto |
| Evolução futura | Muito alta | Alta | Alta, porém exigente |

---

## 5. Recomendação arquitetural

### Estratégia recomendada: A

A decisão recomendada é manter o MIQAI como monitor ambiental, com temperatura e umidade, preservando thermalComfort em UNKNOWN.

### Justificativa técnica

1. O MIQAI já está corretamente alinhado ao seu propósito de observação ambiental e diagnóstico de desvios.
2. A semântica atual de UNKNOWN é uma proteção arquitetural importante e não um defeito. Ela evita que o sistema afirme algo que os dados e referências não autorizam.
3. As referências registradas em ASHRAE 55 e ISO 7730 mostram que conforto térmico humano depende de múltiplos parâmetros que não existem hoje no CORE nem no hardware documentado.
4. O CORE não possui base suficiente para PMV/PPD, e isso é um argumento técnico decisivo contra C no presente estado.
5. A estratégia A minimiza riscos de interpretação indevida e de responsabilidade regulatória.
6. A estratégia A mantém uma evolução natural para B, como etapa de indicador térmico ambiental, e eventualmente para C, se o produto vier a incorporar sensores e dados contextuais específicos.

### O que a decisão não proíbe

A decisão não proíbe a evolução futura. Ela apenas impede que o sistema avance para uma semântica de conforto humano sem cumprir a base tecnológica e documental mínima.

A evolução segura é:

1. manter A como base estável;
2. depois, avaliar B como indicador ambiental operacional, com linguagem explícita e sem PMV/PPD;
3. somente após isso, considerar C, quando houver sensores, contexto e governança formal suficientes.

---

## 6. Decisão final

O MIQAI deve continuar como plataforma de monitoramento ambiental e diagnóstico térmico, preservando thermalComfort em UNKNOWN.

Esta escolha é a mais defensável porque:

- está alinhada com o propósito original do produto;
- tem menor complexidade de hardware e firmware;
- reduz risco regulatório e interpretativo;
- preserva a rastreabilidade normativa;
- evita a criação de uma métrica que o projeto ainda não tem base técnica para sustentar;
- mantém a possibilidade de evolução futura em etapas controladas.

A implementação de qualquer indicador térmico maior deve ser tratada como desenvolvimento futuro, não como ação imediata do CORE atual.
