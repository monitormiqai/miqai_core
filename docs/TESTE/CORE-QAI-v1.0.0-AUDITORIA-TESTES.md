# CORE QAI v1.0.0 — AUDITORIA E TESTES

## 1. Identificação
- Versão auditada:
- Data de início:
- Status:
- Documento-base:
- Resultado:

## 2. Objetivo da auditoria

Verificar se o CORE QAI v1.0.0:
- atende corretamente aos parâmetros definidos;
- utiliza referências e critérios fundamentados;
- executa corretamente o pipeline;
- entrega o resultado esperado para cada leitura;
- produz JSON coerente e completo;
- fornece dados suficientes para alimentar o Dashboard;
- mantém separação entre CORE e camada de apresentação.

## 3. Metodologia

### Fontes de verdade
1. Código do CORE
2. Fontes oficiais / órgãos / entidades
3. Literatura técnica
4. JSON real produzido
5. Contrato do Dashboard

### Regra
Nenhuma alteração no CORE durante a auditoria inicial.
Primeiro observar, executar, comparar e registrar.
Alterações somente após identificação e classificação da divergência.

---

# 4. AUDITORIA REGULATORY × PARÂMETROS

## 4.1 Temperatura
- Critério:
- Fonte:
- Referência:
- Unidade:
- Applicability:
- Evaluation period:
- Score eligible:
- Resultado da auditoria:
- Evidência:

## 4.2 Umidade
...

## 4.3 CO2
...

## 4.4 PM1
...

## 4.5 PM2.5
...

## 4.6 PM4
...

## 4.7 PM10
...

## 4.8 NC0.5
...

## 4.9 NC1
...

## 4.10 NC2.5
...

## 4.11 NC4
...

## 4.12 NC10
...

## 4.13 Typical Particle Size
...

## 4.14 VOC
...

## 4.15 NOx
...

---

# 5. AUDITORIA DA PIPELINE

## 5.1 Normalize
## 5.2 Domain
## 5.3 Regulatory
## 5.4 Validation
## 5.5 Metrics
## 5.6 Diagnostics
## 5.7 Evidence
## 5.8 Hypotheses
## 5.9 Mitigation
## 5.10 Environmental Scenario
## 5.11 Relationships
## 5.12 Impacts
## 5.13 References
## 5.14 Response

Para cada etapa:

- Entrada:
- Processamento observado:
- Saída:
- Esperado:
- Resultado:
- Divergência:
- Evidência:

---

# 6. TESTES POR LEITURA

## 6.1 Cenário normal
## 6.2 Temperatura elevada
## 6.3 Umidade elevada
## 6.4 CO2 elevado
## 6.5 PM2.5 acima da referência
## 6.6 PM2.5 abaixo da referência
## 6.7 PM10 acima da referência
## 6.8 VOC elevado
## 6.9 NOx
## 6.10 Parâmetros ausentes
## 6.11 Múltiplos parâmetros simultaneamente

Para cada cenário:

```text
INPUT
↓
NORMALIZE
↓
REGULATORY
↓
VALIDATION
↓
METRICS
↓
DIAGNOSIS
↓
EVIDENCE
↓
HYPOTHESIS
↓
MITIGATION
↓
SCENARIO
↓
RELATIONSHIPS
↓
IMPACTS
↓
REFERENCES
↓
FINAL JSON
7. AUDITORIA DO JSON
7.1 Estrutura
- metadata
- domain
- validation
- metrics
- diagnosis
- evidence
- hypotheses
- mitigation
- environmentalScenario
- relationships
- impacts
- references
7.2 Integridade
- JSON serializável
- sem undefined
- sem Engine internals
- sem HumanImpact
- referências fundamentadas
- estados preservados
- null preservado
- sem dados inventados
8. JSON × DASHBOARD
Seção Dashboard	Campo CORE	Existe?	Adequado?	Observação
QAI	metrics			
Readings	validation/metrics			
Diagnosis	diagnosis			
Evidence	evidence			
Hypotheses	hypotheses			
Mitigation	mitigation			
Scenario	environmentalScenario			
Relationships	relationships			
Impacts	impacts			
References	references			


9. CLASSIFICAÇÃO DAS DIVERGÊNCIAS
🟢 CORRETO
Comportamento corresponde ao contrato.
🔵 APRESENTAÇÃO
CORE correto; problema apenas no Dashboard.
🟡 REFERÊNCIA
Necessita revisão documental/normativa.
🟠 CONTRATO
JSON não entrega adequadamente o necessário.
🔴 CORE
Comportamento implementado diverge do contrato congelado.
10. RESULTADO FINAL
Regulatory
- Resultado:
Pipeline
- Resultado:
Parâmetros
- Resultado:
JSON
- Resultado:
Dashboard
- Resultado:
Divergências encontradas
- 
Alterações necessárias
- 
Conclusão
- 
11. DECISÃO
- CORE aprovado para integração com Dashboard
- CORE aprovado com correções pontuais
- Necessária revisão regulatória
- Necessária revisão do contrato JSON
- Necessária nova versão do CORE