Crie o arquivo:

docs/CORE-QAI-CHECKPOINT-CURADORIA-VALIDACAO-V1-2026-09-02.md

Objetivo:
Registrar formalmente o ponto atual do CORE QAI V1 e a transição da fase de construção/auditoria para a fase de Curadoria e Validação da Biblioteca de Ouro.

IMPORTANTE:
- Não alterar nenhum arquivo em src/
- Não alterar nenhum teste
- Não alterar o contrato existente
- Não alterar thermalComfort
- Não alterar o QAI Score
- Não implementar novas regras
- Criar somente o novo documento .md
- Não fazer commit ou tag

O documento deve conter:

# CORE QAI — Checkpoint V1
## Curadoria e Validação da Biblioteca de Ouro
Data: 2026-09-02

## 1. Estado atual

Registrar que o CORE QAI V1 encontra-se com:
- arquitetura estrutural congelada;
- contrato V1 congelado;
- semântica e invariantes congelados;
- Response sem criação de fatos novos;
- 23 testes PASS / 0 FAIL;
- nenhuma violação funcional encontrada na auditoria final;
- FREEZE V1 aprovado com riscos apenas documentais/operacionais residuais.

## 2. Invariantes congelados

Registrar explicitamente:
- metadata.status = OK significa somente processamento concluído;
- MISSING/UNKNOWN/NOT_ASSESSED não sustentam normalidade ou conformidade;
- conformidade exige dado avaliável + critério aplicável + avaliação válida;
- PM permanece sujeito a 24h_mean e histórico obrigatório;
- PM sem histórico válido permanece inelegível para score;
- CO2 permanece observação contextual;
- CO2 elevado não confirma ventilação insuficiente;
- Relationship não representa causalidade;
- Hypothesis/Mitigation permanecem condicionais;
- POSSIBLE != CONFIRMED;
- thermalComfort permanece UNKNOWN e score null;
- referências de conforto não autorizam cálculo automático;
- Diagnosis e Impact são semanticamente distintos;
- References possuem referenceClass estrutural;
- MANUFACTURER/TECHNICAL não equivalem automaticamente a REGULATORY;
- metadata.environment representa a entrada;
- domain.id representa o domínio efetivo;
- Response não recalcula score nem altera semântica.

## 3. O que o FREEZE V1 significa

Explicar claramente:

O FREEZE V1 congela a arquitetura, o contrato, a semântica, os invariantes e o comportamento estrutural do CORE.

O FREEZE NÃO congela o conhecimento.

O FREEZE NÃO impede:
- inclusão de novos conhecimentos validados;
- novas referências;
- novos parâmetros;
- expansão de catálogos;
- enriquecimento das bibliotecas.

Essas evoluções devem respeitar o contrato V1.

Mudanças estruturais de arquitetura ou semântica devem ser tratadas como evolução futura (V1.1/V2), e não incorporadas silenciosamente ao V1 congelado.

## 4. Nova fase: Curadoria e Validação

Registrar que a próxima fase do projeto é:

CONHECIMENTO TÉCNICO
↓
CURADORIA
↓
VALIDAÇÃO
↓
BIBLIOTECA DE OURO
↓
CATÁLOGOS / REGRAS / REFERÊNCIAS
↓
CORE QAI
↓
JSON CONTRATUAL
↓
MIQAI / SaaS

Explicar que conhecimento encontrado não deve ser incorporado diretamente ao código.

## 5. Processo de Curadoria

Para cada conhecimento/documento, identificar:
1. fonte;
2. natureza da fonte;
3. jurisdição;
4. domínio aplicável;
5. parâmetro relacionado;
6. afirmação suportada pela fonte;
7. critério, quando existir;
8. período temporal, quando existir;
9. limitações;
10. nível de evidência;
11. possibilidade de transformação em regra;
12. necessidade de referência adicional.

## 6. Separação entre conhecimento e regra

Registrar que:

FATO ≠ CRITÉRIO
REFERÊNCIA ≠ LIMITE
OBSERVAÇÃO ≠ DIAGNÓSTICO
DIAGNÓSTICO ≠ CAUSALIDADE
HIPÓTESE ≠ CONFIRMAÇÃO
POSSIBLE ≠ CONFIRMED
CONHECIMENTO ≠ REGRA EXECUTÁVEL

Uma informação somente poderá virar regra do CORE quando houver base suficiente, critério aplicável, escopo definido e rastreabilidade.

## 7. O que NÃO deve virar regra automaticamente

Registrar exemplos:
- informação contextual sem critério;
- referência técnica sem limite aplicável;
- recomendação de fabricante apresentada como norma;
- correlação apresentada como causalidade;
- leitura instantânea apresentada como média histórica;
- ausência de dado apresentada como normalidade;
- referência de conforto usada para calcular conforto sem metodologia autorizada;
- hipótese apresentada como diagnóstico confirmado.

## 8. Biblioteca de Ouro

Definir conceitualmente a Biblioteca de Ouro como a camada curada de conhecimento que alimentará o CORE QAI.

Ela deve preservar:
- origem;
- classificação;
- jurisdição;
- aplicabilidade;
- limitações;
- rastreabilidade;
- versão/data;
- relação com parâmetros e regras.

A Biblioteca de Ouro deve ser tratada como fonte controlada de conhecimento, não como depósito de informações não validadas.

## 9. Prioridade da próxima fase

Não reabrir a arquitetura V1.

A prioridade passa a ser:
1. inventariar conhecimento existente;
2. separar conhecimento validado de conhecimento pendente;
3. classificar referências;
4. identificar critérios efetivamente utilizáveis;
5. alimentar progressivamente as bibliotecas;
6. criar testes para novas regras quando necessário;
7. preservar rastreabilidade.

## 10. Regra de evolução

Registrar:

"Adicionar conhecimento validado não significa alterar a arquitetura."

E:

"Qualquer alteração de contrato, semântica, invariante ou arquitetura deve ser explicitamente classificada como evolução do CORE, e não como simples alimentação da Biblioteca de Ouro."

## 11. Estado do projeto em 02/09/2026

Classificação:

CORE QAI V1
ARQUITETURA: CONGELADA
GOVERNANÇA: CONGELADA
TESTES: 23/23 PASS
INVARIANTES: PRESERVADOS
THERMAL COMFORT: UNKNOWN / null
PM: 24h_mean / histórico obrigatório
CO2: CONTEXTUAL
REFERENCES: TAXONOMIA ESTRUTURAL
PRÓXIMA FASE: CURADORIA E VALIDAÇÃO DA BIBLIOTECA DE OURO

Finalizar deixando explícito que este documento é um checkpoint histórico e que a partir dele o trabalho deve avançar pela alimentação controlada do conhecimento, sem transformar cada nova descoberta em alteração da arquitetura do CORE QAI V1.