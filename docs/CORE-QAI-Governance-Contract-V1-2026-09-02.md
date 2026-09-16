============================================================
CORE QAI — GOVERNANCE CHECKPOINT V1
DATA: 02/09/2026
STATUS: GOVERNANÇA CONGELADA
ESCOPO: CONTRATO PÚBLICO / SEMÂNTICA / RASTREABILIDADE
MODO: READ-ONLY — NENHUM ARQUIVO ALTERADO
============================================================

1. STATUS DA RESPONSE
------------------------------------------------------------
metadata.status = "OK"

Semântica oficial:
"OK" significa exclusivamente que o processamento do CORE
foi concluído.

"OK" NÃO significa:
- ambiente saudável;
- ambiente conforme;
- análise completa;
- ausência de risco;
- ausência de desvios.

Completude analítica é conceito independente.

------------------------------------------------------------

2. MISSING / UNKNOWN
------------------------------------------------------------
MISSING e UNKNOWN não podem sustentar, por inferência:

- normalidade;
- conformidade;
- ausência de risco;
- confirmação diagnóstica;
- operação normal.

Ausência de cenário, relação ou impacto não pode ser
interpretada como evidência positiva de normalidade.

------------------------------------------------------------

3. CONFORMIDADE
------------------------------------------------------------
Conformidade somente pode ser comunicada quando:

- existe parâmetro disponível;
- o parâmetro é avaliável;
- existe critério aplicável;
- a avaliação efetivamente foi realizada.

MISSING, UNKNOWN e NOT_ASSESSED não equivalem a
WITHIN_REFERENCE.

------------------------------------------------------------

4. AMBIENTE × DOMÍNIO
------------------------------------------------------------
metadata.environment
    = representa a entrada solicitada.

domain.id
    = representa o domínio efetivamente selecionado pelo CORE.

Os dois campos possuem semânticas distintas e não devem
ser tratados como equivalentes.

Quando houver fallback de domínio, isso deve permanecer
rastreável.

------------------------------------------------------------

5. DIAGNOSIS × IMPACT
------------------------------------------------------------
Diagnosis e Impact possuem identidades semanticamente
distintas.

Um mesmo conceito textual não deve permitir que o consumidor
interprete:

Diagnosis = Impact
ou
Impact = confirmação diagnóstica.

Regra:

Diagnosis ≠ Impact

Impact POSSIBLE não confirma Diagnosis.

------------------------------------------------------------

6. PM — TEMPORALIDADE
------------------------------------------------------------
PM continua sujeito à limitação temporal:

evaluationPeriod = "24h_mean"

Quando aplicável:

historicalAssessmentRequired = true
scoreEligible = false
passed = null

Uma leitura instantânea não pode ser apresentada como
conformidade de média de 24 horas.

Essa limitação deve permanecer rastreável até a Response.

------------------------------------------------------------

7. TAXONOMIA DE REFERÊNCIAS
------------------------------------------------------------
Toda referência deverá possuir classificação estrutural
compatível com uma das categorias:

REGULATORY
STANDARD
GUIDELINE
TECHNICAL
MANUFACTURER
CONTEXTUAL

A classificação representa a natureza da referência e não
deve ser usada para inferir automaticamente conformidade.

------------------------------------------------------------

8. REFERÊNCIAS TÉCNICAS / FABRICANTE
------------------------------------------------------------
Referências TECHNICAL e MANUFACTURER não constituem,
por si mesmas, limite regulatório.

Referências relativas, como índices VOC/NOx, não devem ser
apresentadas como concentração absoluta ou limite legal.

A natureza regulatória deve ser explicitamente distinguível.

------------------------------------------------------------

9. HYPOTHESIS
------------------------------------------------------------
Hypothesis permanece:

- condicional;
- probabilística;
- não confirmatória.

Regra:

POSSIBLE ≠ CONFIRMED
HYPOTHESIS ≠ CAUSE CONFIRMED

Uma hipótese não pode ser promovida semanticamente a fato
pela Response ou por consumidores posteriores.

------------------------------------------------------------

10. MITIGATION
------------------------------------------------------------
Mitigation permanece condicional.

Uma recomendação:

- não confirma causa;
- não confirma diagnóstico;
- não constitui obrigação regulatória por si mesma;
- não deve ser interpretada como prova de falha de HVAC,
  ventilação ou outro mecanismo causal.

------------------------------------------------------------

11. CO₂
------------------------------------------------------------
CO₂ elevado permanece:

INDOOR_CONTEXTUAL_OBSERVATION

CO₂ contextual elevado:

- não constitui automaticamente não conformidade;
- não confirma ventilação insuficiente;
- não confirma causa;
- não confirma risco.

A coexistência:

warm_humid + CO₂ elevado

pode formar Relationship contextual conforme as regras V1,
mas não constitui causalidade ou diagnóstico confirmado.

------------------------------------------------------------

12. ENVIRONMENTAL SCENARIO
------------------------------------------------------------
EnvironmentalScenario permanece como:

COMBINAÇÃO DESCRITIVA DE ESTADOS OBSERVADOS.

Não pode:

- criar threshold;
- criar score;
- criar diagnóstico;
- criar causalidade;
- transformar hipótese em fato;
- alterar thermalComfort.

------------------------------------------------------------

13. RELATIONSHIPS
------------------------------------------------------------
Relationships representa coexistência/combinação de sinais.

Relationship:

≠ causalidade
≠ diagnóstico
≠ hipótese
≠ risco confirmado.

Uma Relationship pode alimentar um Impact conforme as regras
V1, desde que o Impact permaneça explicitamente condicional.

------------------------------------------------------------

14. IMPACTS
------------------------------------------------------------
Impact permanece condicional.

Status V1:

POSSIBLE

Regra:

POSSIBLE ≠ OBSERVED
POSSIBLE ≠ POTENTIAL CONFIRMED
POSSIBLE ≠ CONFIRMED

Impact não constitui:

- dano confirmado;
- risco confirmado;
- presença confirmada de agente;
- causa confirmada;
- diagnóstico.

Persistência temporal não pode ser presumida apenas porque
a descrição textual menciona permanência.

------------------------------------------------------------

15. THERMAL COMFORT
------------------------------------------------------------
thermalComfort permanece permanentemente congelado em:

UNKNOWN

até que exista governança explícita autorizando sua evolução.

Referências como:

- ASHRAE 55;
- ISO 7730;
- NR-17;

não autorizam, por sua simples presença, cálculo de conforto
humano.

Temperatura + umidade também não constituem cálculo de
thermalComfort.

------------------------------------------------------------

16. SCORE
------------------------------------------------------------
Nenhuma camada posterior pode:

- recalcular QAI Score;
- alterar pesos;
- transformar score null em zero;
- incluir thermalComfort sem autorização;
- incluir PM de 24 h como componente elegível;
- transformar referência técnica em componente regulatório.

Score continua sujeito ao contrato já estabelecido.

------------------------------------------------------------

17. RASTREABILIDADE
------------------------------------------------------------
Qualquer evolução futura deverá preservar a cadeia:

Reading
→ Normalize
→ Domain
→ Regulatory
→ Validation
→ Metrics
→ Diagnostics
→ Evidences
→ Hypotheses
→ Mitigation

e, em paralelo:

Validation / Metrics
→ EnvironmentalScenario
→ Relationships
→ Impacts

com:

References
→ fundamentação técnica/regulatória rastreável

e:

Response
→ projeção pública sem criação de novos fatos.

Nenhuma camada posterior deve apagar a natureza ou
limitação de uma informação originada anteriormente.

------------------------------------------------------------

18. PRINCÍPIO DE NÃO INFERÊNCIA
------------------------------------------------------------
O CORE QAI não deve transformar:

ausência de evidência
→ evidência de normalidade

coexistência
→ causalidade

possibilidade
→ confirmação

referência técnica
→ conformidade regulatória

leitura instantânea
→ média histórica

CO₂ elevado
→ ventilação insuficiente confirmada

temperatura + umidade
→ conforto humano calculado

MISSING / UNKNOWN
→ normalidade

------------------------------------------------------------

19. POLÍTICA DE ALTERAÇÃO
------------------------------------------------------------
Nenhuma alteração estrutural deverá ser realizada somente
para "melhorar" a saída sem antes verificar impacto sobre:

- contrato JSON;
- estados semânticos;
- rastreabilidade;
- score;
- referências;
- jurisdição;
- temporalidade;
- separação entre camadas;
- thermalComfort.

Alterações futuras devem ser:

1. propostas;
2. auditadas;
3. testadas;
4. comparadas com os invariantes;
5. somente então incorporadas.

------------------------------------------------------------

20. ESTADO DO CHECKPOINT
------------------------------------------------------------
DATA: 02/09/2026

GOVERNANÇA V1:
CONGELADA

ARQUIVOS:
NENHUM ALTERADO NESTE CHECKPOINT

TESTES:
NENHUM EXECUTADO NESTE CHECKPOINT

THERMAL COMFORT:
UNKNOWN — CONGELADO

SCORE:
PRESERVADO

PM TEMPORAL:
PRESERVADO

CO₂ CONTEXTUAL:
PRESERVADO

IMPACT:
POSSIBLE — CONDICIONAL

REFERENCES:
CLASSIFICAÇÃO SEMÂNTICA DEFINIDA

RASTREABILIDADE:
INVARIANTE

PRÓXIMO PASSO:
SOMENTE APÓS ESTE CHECKPOINT, iniciar auditoria/
implementação das mudanças necessárias, preservando
todos os invariantes acima.
============================================================

============================================================
CORE QAI — GOVERNANCE CORRECTION V1
DATA: 02/09/2026
============================================================

Correções controladas autorizadas após a auditoria transversal:

1. `normal_environment` passou a exigir pelo menos uma avaliação
   concluída com `passed === true` e
   `currentAssessment === "WITHIN_REFERENCE"`. A ausência de
   dados, por si só, não sustenta normalidade, conformidade,
   `normal_operation` ou `maintain_current_operation`.

2. Os nove registros do catálogo de References receberam o campo
   estrutural `referenceClass`, preservando os metadados existentes.
   Sensirion VOC e NOx permanecem referências de fabricante,
   com `regulatoryStatus: "not_regulatory_limit"`.

Invariantes preservados:

- `thermalComfort = UNKNOWN` e `thermalComfort.score = null`;
- PM com `24h_mean`, exigência histórica e fora do score;
- CO₂ contextual;
- `POSSIBLE ≠ CONFIRMED`.
