# CORE QAI v1.0.0 — FROZEN

## 1. Status de congelamento

- Versão: 1.0.0
- Finalidade do documento: registrar o comportamento real, oficial e congelado do CORE QAI v1.0.0, sem inventar responsabilidades ou interpretações fora do código e das validações executadas.
- Data do congelamento: 2026-09-04
- Status: FROZEN
- Resultado da validação global: 28 testes / 28 pass / 0 fail / 0 skipped / 0 todo

## 2. Objetivo e escopo do CORE

O CORE QAI v1.0.0 é um motor analítico para transformar leituras ambientais em contexto operacional, sem transformar observações em conformidade regulatória automática.

O CORE faz o seguinte:

- normaliza leituras recebidas;
- resolve domínio e perfil regulatório aplicável;
- valida parâmetros usando critérios previamente resolvidos pela regulatory layer;
- calcula métricas derivadas de valores validados;
- produz diagnóstico, evidências, hipóteses e mitigação a partir das condições observadas;
- descreve cenários ambientais e relações entre condições;
- resolve referências aplicáveis e constrói o JSON público final da análise.

O CORE não faz o seguinte:

- não converte observação em FAIL ou compliance failure;
- não cria limite universal de CO2 indoor;
- não transforma WHO guideline em compliance indoor automática;
- não inventa referência sem fundamento explícito;
- não criaHealth Risk no pipeline;
- não estima occupancy a partir de CO2;
- não expõe Engine internals nem HumanImpact como contrato público;
- não aplica regra de diagnóstico, hipótese, relacionamento ou mitigação sem base explícita no contexto atual.

## 3. Arquitetura e pipeline oficial

A sequência oficial do pipeline é esta:

normalize
→ domain
→ regulatory
→ validation
→ metrics
→ diagnostics
→ evidences
→ hypotheses
→ mitigations
→ environmentalScenario
→ relationships
→ impacts
→ references
→ response

Responsabilidade de cada etapa, conforme o código implementado:

- normalize: padroniza a leitura bruta em campos internos e preserva nulos e ausência; não interpreta, não valida e não calcula.
- domain: resolve o domínio e o perfil operacional do ambiente analisado.
- regulatory: resolve critérios, applicability, referenceIds, evaluationPeriod e flags como scoreEligible/historicalAssessmentRequired.
- validation: aplica os critérios resolvidos pela regulatory para produzir estado/avaliação operacional do parâmetro.
- metrics: calcula indicadores quantitativos e classificações padrão como thermalComfort, airQuality, particulateLoad, occupancy, dewPoint e co2Analysis.
- diagnostics: identifica a condição diagnóstica dominante a partir dos indicadores e avaliações.
- evidences: registra a evidência observada que sustenta a interpretação atual.
- hypotheses: formula hipóteses compatíveis com as evidências disponíveis, sem afirmar causalidade definitiva.
- mitigations: produz recomendações coerentes com as evidências e hipóteses registradas.
- environmentalScenario: contextualiza o cenário ambiental relevante para a análise atual.
- relationships: descreve relacionamento explícito entre componentes do cenário; não inventa causa nem cria hipóteses ou mitigação.
- impacts: representa impactos da condição observada; não cria diagnóstico, hipótese ou mitigação.
- references: resolve as referências aplicáveis a partir de IDs explícitos e do catálogo oficial; não inventa referência do zero.
- response: monta o JSON serializável final do CORE.

## 4. Contrato semântico fundamental

### PASS

PASS é um estado de aprovação dentro do critério observado; ele é utilizado quando o valor se encaixa dentro do limite aplicável e o critério foi realmente validado nesse contexto.

### FAIL

FAIL é um estado de reprovação da condição avaliada quando o critério aplicável indica não conformidade ou viola o limite do critério. O contrato atual não utiliza FAIL como sinônimo de observação.

### OBSERVATION

OBSERVATION é um estado de uso analítico complementar. O valor é preservado e disponibilizado para análise posterior sem ser automaticamente convertido em FAIL ou compliance failure.

Condição congelada do CORE:

- `state = "OBSERVATION"`
- `passed = null`
- `severity = "INFO"`
- `currentAssessment` pode existir quando houver referência técnica comparável
- `evaluationPeriod` e `historicalAssessmentRequired` são preservados
- `scoreEligible` continua vindo do Regulatory

OBSERVATION não significa FAIL. Esse ponto é central ao contrato do CORE e não pode ser reinterpreted como reprovação regulatória.

### MISSING

MISSING representa ausência de leitura ou valor indisponível. O valor permanece `null` e a camada não inventa zero, não assume normalidade e não destrói metadados regulatórios do parâmetro quando estes já existem.

### NOT_ASSESSED

NOT_ASSESSED indica que a leitura não foi submetida a uma comparação formal com critério ativo ou que o critério não se aplica ao caso atual. CO2 é o exemplo principal desse caso.

### currentAssessment

`currentAssessment` é a classificação atual da leitura frente ao critério aplicável. Estados esperados incluem:

- `ABOVE_REFERENCE`
- `BELOW_REFERENCE`
- `WITHIN_REFERENCE`
- `NOT_ASSESSED`
- `MISSING`

### passed

`passed` representa resultado do critério aplicável quando houver critério explícito e o valor puder ser avaliado. Para observações complementares, `passed` é `null`.

### scoreEligible

`scoreEligible` é um metadado vindo do Regulatory. Ele indica se o parâmetro pode participar do score ou se permanece como observação técnica complementar.

Quando o parâmetro é um indicador operacional ou complementar, o valor costuma ser `false` e o CORE não o empurra para score artificial.

## 5. Regulatory

A Regulatory layer resolve o critério de avaliação aplicável ao ambiente e ao parâmetro.

### Critérios regulatórios

Os critérios regulatórios do CORE são compostos por:

- `parameter`
- `criterionKind`
- `applicability`
- `evaluationPeriod`
- `referenceThreshold`
- `referenceIds`
- `historicalAssessmentRequired`
- `scoreEligible`
- `regulated`
- `regulatoryId`

### Technical references

Parâmetros como PM2.5, PM10, temperatura e umidade têm referências técnicas que suportam observação e avaliação contextual, sem necessariamente significar compliance instantâneo. Esses critérios podem ter `criterionKind = "TECHNICAL_REFERENCE"` e `applicability` corretas para ambiente indoor.

### Complementary parameters

Parâmetros complementares, como PM1, PM4, partículas por faixa (nc05, nc1, nc25, nc4, nc10), typicalParticleSize, VOC e NOx, têm semântica complementar e não devem ser tratados como critérios regulatórios universais.

Esses parâmetros têm o contrato de:

- `regulated = false`
- `type = OBSERVATION`
- `role = COMPLEMENTARY`
- `scoreEligible = false`
- `regulatoryId = null` ou referência técnica operacional
- `sourceType = MANUFACTURER`/técnico operacional

### Distinction entre COMPLEMENTARY e critérios

A distinção é estrutural e semântica:

- Critérios de referência técnica validam condição observada e podem ter `currentAssessment` comparável.
- Parâmetros complementares não são tratados como limites regulatórios de conformidade e não geram score artificial.

### applicability

`applicability` representa a condição em que a regra faz sentido. Exemplos observados no código:

- `indoor_air`
- `ambient_outdoor`
- `non_residential_artificially_conditioned`

A compatibilidade entre applicability do critério e contexto do ambiente é respeitada na validation layer.

### evaluationPeriod

`evaluationPeriod` preserva a temporalidade do critério. Exemplos observados:

- `24h_mean`
- `current_reading`
- `instantaneous_reading`

### criterionKind

`criterionKind` identifica a natureza do critério, por exemplo:

- `TECHNICAL_REFERENCE`
- `GUIDELINE`/referência contextual

Importante: guideline não significa limite regulatório.

### referenceThreshold

`referenceThreshold` é o valor de referência associado ao critério. Ele identifica o ponto técnico de comparação, não necessariamente um limite de conformidade. No código, PM2.5 e PM10 usam `referenceThreshold` e `evaluationPeriod = 24h_mean` para distinguir leitura instantânea de avaliação de 24h.

### referenceIds

`referenceIds` são identificadores explícitos do(s) referencial(is) aplicável(is) ao critério. A resolução de referências depende dessas IDs e não cria referência por inferência sem base.

### historicalAssessmentRequired

`historicalAssessmentRequired` indica se a condição exige análise histórica para interpretação. PM2.5 e PM10 têm esse valor em relação a 24h mean.

### scoreEligible

`scoreEligible` indica se o parâmetro pode participar do componente de score. O CORE usa essa flag para impedir que parâmetros observacionais e complementares entrem no score como componente artificial.

### threshold versus referenceThreshold

O código distingue:

- `threshold`: usado em validações de máximo/limite de avaliação
- `referenceThreshold`: usado como valor de referência do critério técnico para comparação e semântica de observação

Essa distinção é importante para manter a semântica: não é qualquer threshold que vira compliance. O CORE preserva a diferença entre valor de comparação e resultado de conformidade.

## 6. Validation

A Validation layer aplica os critérios resolvidos pela Regulatory layer.

### threshold

Quando o critério fornece `threshold`, a validation usa esse valor para decidir se a leitura está dentro/fora do limite do critério.

### referenceThreshold

`referenceThreshold` é preservado como referência técnica e usado para `currentAssessment` comparável, sem ser forçado a compliance instantânea.

### applicability

A validation aplica compatibilidade de applicability e não força dados incompatíveis para entrar em critério errado.

### temporalidade

A temporalidade é preservada por `evaluationPeriod` e `historicalAssessmentRequired`.

Em PM2.5 e PM10, a leitura instantânea pode estar acima do valor de referência, mas isso não é automaticamente transformado em FAIL ou 24h compliance failure.

### currentAssessment

A avaliação atual é calculada por critério e contexto, sendo mapeada em:

- `ABOVE_REFERENCE`
- `BELOW_REFERENCE`
- `WITHIN_REFERENCE`
- `NOT_ASSESSED`
- `MISSING`

### MISSING

Quando o valor é nulo ou ausente, o estado continua `MISSING` e o valor permanece `null`. O CORE não inventa zero ou normalização automática.

### propagação dos metadados

A validation preserva e propaga metadados críticos para as etapas seguintes, incluindo:

- `parameter`
- `evaluationPeriod`
- `historicalAssessmentRequired`
- `scoreEligible`
- `criterionKind`
- `applicability`
- `referenceIds`
- `referenceThreshold`
- `currentAssessment`
- `state`
- `passed`

### scoreEligible vindo do Regulatory

`scoreEligible` não é inventado pela validation; ele vem do Regulatory e é propagado sem transformação.

## 7. Metrics

A Metrics layer transforma resultados de validação em indicadores calculados, sem decidir causalidade.

### QAI Score

O QAI Score é calculado em `calculateQaiScore` e usa apenas componentes oficiais do cálculo: thermalComfort, airQuality e particulateLoad.

Importante:

- Occupancy foi deliberadamente removido da composição do QAI Score.
- CO2 não participa do QAI Score.
- O score final retorna `score`, `level` e `dominantFactor`.
- Quando não há componente válido, o retorno é `score = null`, `level = "UNKNOWN"`.

### Thermal Comfort

Indicador de conforto térmico. Sem critério ativo relevante, permanece `UNKNOWN` e não deve inventar score.

### Air Quality

Indicador geral de qualidade do ar. Sem critério ativo, permanece `UNKNOWN` e não inventa score.

### Particulate Load

Indicador de carga particulada. Quando não houver critério ativo, o valor permanece `UNKNOWN`/`null`.

### Occupancy

Occupancy é um indicador operacional auxiliar. O contrato atual não o deriva de CO2. O CORE também não o usa para composição do QAI Score.

### Dew Point

Calcula ponto de orvalho e diferença entre ar e ponto de orvalho, sem transformar em risco ou diagnóstico.

### CO2 Analysis

CO2 Analysis é um cálculo contextual, não um limite universal. O contrato atual usa:

- `LOWER_RANGE`
- `ELEVATED_CONTEXT`
- `HIGH_CONTEXT`
- `available`
- `indoor`
- `basis`
- `level`
- `elevated`
- `persistence.required = true`
- `persistence.evaluated = false`

Indicadores sem critério ativo permanecem `UNKNOWN` e não devem inventar score.

## 8. CO2 — contrato congelado

CO2 é contextual.

Condições congeladas do CORE:

- CO2 interno é tratado como observação contextual de operação;
- não existe limite universal indoor introduzido pelo CORE;
- `LOWER_RANGE` é faixa operacional inferior e não representa limite regulatório;
- `HIGH_CONTEXT` é faixa elevada de contexto operacional;
- persistência depende de histórico disponível em camada temporal;
- não existe CO2 outdoor no contrato público do CORE;
- não existe diferencial de CO2;
- não existe `OUTDOOR_DIFFERENTIAL`;
- nenhuma lógica equivalente pode ser reintroduzida sem mudança controlada de versão.

CO2 não participa do QAI Score; não é componente de score; não é causalidade ambiental; não é diagnosis; não é relação causal definitiva.

## 9. Particulados PM2.5 / PM10

### Referência de 24h

PM2.5 e PM10 usam referência de 24h (`24h_mean`) conforme o critério técnico aplicado.

### currentAssessment

Quando há parâmetro acima do valor de referência técnico, `currentAssessment` pode ficar em `ABOVE_REFERENCE`.

### ABOVE_REFERENCE

`ABOVE_REFERENCE` indica o valor atual da leitura está acima da referência técnica comparável, mas o contrato não transforma isso em FAIL ou reprovação regulatória automática.

### OBSERVATION

A leitura continua em `state = "OBSERVATION"` e `passed = null`.

### historicalAssessmentRequired

Há exigência de avaliação histórica para a interpretação plena do critério de 24h.

### Diferença entre leitura instantânea e avaliação de 24h

O código explicitamente diferencia:

- leitura instantânea acima da referência;
- necessidade de série histórica para dado de 24h;
- ausência de PASS/FAIL instantâneo por comparação direta.

### ausência de PASS/FAIL instantâneo

PM2.5 e PM10 não devem entrar em compliance instantâneo como `PASS`/`FAIL` no fluxo atual. A semântica correta é observação técnica + diagnóstico + evidência + hipótese + mitigação.

### não entrada no QAI Score quando scoreEligible=false

Quando `scoreEligible = false`, o parâmetro não entra no score artificial. O CORE não usa PM2.5/PM10 como componente de score do QAI quando a regra ou o contrato assim determinam.

## 10. VOC e NOx

### VOC Index

VOC Index usa baseline técnico existente. O código trata o VOC como índice operacional e não como concentração regulatória direta.

Condição congelada:

- baseline técnico existe, mas não é limite regulatório;
- o CORE pode usar `currentAssessment = ABOVE_REFERENCE` para um baseline operacional;
- a leitura permanece em estado de observação quando aplicável;
- evidência e diagnóstico somente ocorrem quando previstos pelo código.

### NOx

NOx não possui baseline fixo operacional no contrato atual. O CORE não inventa `threshold` ou `baseline` para NOx no fluxo atual.

## 11. Diagnostics

A camada de diagnóstico identifica a condição diagnóstica dominante a partir dos indicadores e da validação atual.

Limites da camada:

- não valida leis;
- não resolve referências;
- não cria compliance;
- não estabelece causalidade final;
- apenas identifica condição diagnóstica compatível com os sinais observados.

## 12. Evidence

A camada de evidence registra evidência observável por parâmetro/condição.

Cadeia especialmente relevante:

- `elevated_particulate` → `outdoor_pollution`

A evidence é a camada de materialização do que foi observado. Ela pode sustentar hipóteses e recomendações, mas não substitui a lógica de referência nem cria compliance.

## 13. Hypotheses

A camada de hipóteses avalia explicações plausíveis para os sinais observados, com base em evidências e contexto.

Características do contrato atual:

- hipóteses são compatíveis com evidências disponíveis;
- hipóteses não são afirmações causais definitivas;
- hipóteses podem alimentar mitigação, mas não a substituem;
- hipóteses não criam referência nem compliance.

## 14. Mitigations

A camada de mitigação produz recomendações baseadas nas evidências e hipóteses disponíveis.

Regras de uso:

- recomendações são fundamentadas em evidência e hipótese registradas;
- mitigação não cria causalidade;
- mitigação não produz compliance;
- mitigação não reclassifica `OBSERVATION` em `FAIL`.

## 15. Environmental Scenario

A camada `environmentalScenario` contextualiza o cenário ambiental relevante para a análise atual.

Ela não cria diagnóstico nem hipótese por si só; ela responde ao contexto e organiza o quadro ambiental em que a interpretação do dado foi feita.

## 16. Relationships

A camada `relationships` descreve relacionamento explícito entre itens do cenário.

Limites:

- não cria hipótese;
- não cria mitigação;
- não cria causalidade por si só;
- não transforma observação em não conformidade.

## 17. Impacts

Impact é a única camada de impacto pública do contrato atual.

Regras definidas no código:

- `Impact` é a única camada de impacto;
- `HumanImpact` não faz parte do contrato público;
- Impact não cria diagnóstico;
- Impact não cria hipótese;
- Impact não cria mitigação;
- Impact não estabelece causalidade.

## 18. References / Reference Resolver

A camada de references resolve os objetos de referência que já existem no catálogo e que têm fundamento explícito no contexto.

Condições congeladas:

- referências precisam de fundamento explícito;
- nenhuma referência pode ser inventada por fallback;
- diagnosis/hypothesis/validation podem ajudar a selecionar a seção e a prioridade, mas não criam referência;
- referência órfã é rejeitada;
- WHO não pode virar automaticamente compliance indoor;
- nenhuma referência pode ser gerada sem `referenceIds` explícitos ou sem candidato válido no catálogo.

### Precedência real encontrada

A precedência implementada passa por:

1. Regulatory
2. Evidence
3. Validation
4. Diagnosis
5. Hypothesis

Em contexto brasileiro, a ordem também favorece a referência nacional quando há equivalentes.

### Rejeição de referência órfã

Quando o ID declarado não existe no catálogo, a referência é rejeitada e `matches` fica vazio.

## 19. Knowledge

O Knowledge layer existe para fornecer schemas e records estruturados para a interpretação e catalogação do conhecimento ambiental/regulatório.

O contrato atual de Knowledge:

- schemas são parte do protocolo e da validação estrutural;
- records são materiais de referência contextual;
- status PENDING, quando relevante;
- WHO AQG é guideline contextual e não critério de compliance indoor;
- `ambient_outdoor` e `GUIDELINE` são categorias distintas de critério de compliance;
- guideline não é limite regulatório;
- records PENDING não viram critérios operacionais indoor automaticamente.

## 20. Normalize

A normalize layer mapeia a entrada bruta para chaves oficiais do CORE. O mapeamento real implementado é:

- `pm1_0` → `pm1`
- `pm25` → `pm25`
- `pm4_0` → `pm4`
- `pm10` → `pm10`
- `nc0_5` → `nc05`
- `nc1_0` → `nc1`
- `nc2_5` → `nc25`
- `nc4_0` → `nc4`
- `nc10_0` → `nc10`
- `typicalSize` → `typicalParticleSize`

Outros aspectos fixos:

- `created_at` é preservado;
- ausência permanece `null`;
- ausência não vira zero;
- telemetria como battery, luminosity, noise, apiKey não faz parte do contrato analítico final.

## 21. JSON público

O JSON público atualmente produzido pela resposta final contém estes top-level:

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

Regras reais do JSON:

- serializável;
- sem `undefined`;
- Engine interno não é exposto;
- `HumanImpact` ausente do contrato público;
- `ctx.response` é o objeto final produzido por `buildResponse`.

## 22. Regras congeladas / NÃO reintroduzir

Lista explícita das regras que NÃO devem ser reintroduzidas no CORE v1.0.0 sem mudança controlada de versão:

- CO2 externo/differential;
- HumanImpact;
- Health Risk no pipeline;
- Occupancy derivada de CO2;
- thresholds artificiais;
- baseline artificial de NOx;
- PM2.5/PM10 24h tratados como compliance instantâneo;
- referências inferidas sem fundamento;
- transformação de OBSERVATION em FAIL;
- score artificial;
- inteligência adicional no dashboard.

## 23. Evidência de validação

As validações efetivamente realizadas na cadeia de etapas 30–36 e nos testes e cenários do CORE confirmaram:

- PM2.5 acima da referência mantém `currentAssessment = ABOVE_REFERENCE`, `state = OBSERVATION`, `passed = null` e não vira FAIL/compliance failure;
- PM2.5 abaixo da referência não gera `ABOVE_REFERENCE` nem `elevated_particulate` nem score artificial;
- PM10 acima da referência preserva semântica temporal e observacional;
- CO2 permanece contextual e não vira compliance universal;
- VOC usa baseline técnico sem transformar isso em limite regulatório;
- dados ausentes ficam em `MISSING` e preservam metadata quando existirem;
- sem fundamento explícito de referência, `references.primary = null` e `matches = []`.

## 24. Critério para futuras alterações

Qualquer alteração que mude:

- semântica de `passed`, `state`, `currentAssessment`, `criterionKind`;
- pipeline oficial;
- critérios de avaliação;
- score e composição de métricas;
- referências/catálogo;
- camada de impactos;
- knowledge ou regulatory;

deve ser tratada como mudança controlada de versão e exigir nova bateria de testes e validação formal.

## 25. Declaração final

CORE QAI v1.0.0 está funcionalmente congelado com base na suíte global de 28/28 testes aprovados.

Este documento técnico é a referência oficial para a execução, interpretação e manutenção do CORE QAI v1.0.0.

Qualquer mudança de comportamento ou contrato subsequente deve ser tratada como nova versão, não como continuação do contrato v1.0.0.
