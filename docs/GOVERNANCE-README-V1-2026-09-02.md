# CORE QAI — Governance README V1
Data: 2026-09-02
Status: FROZEN

Este documento é uma camada documental do FREEZE V1. Ele não autoriza alterações no comportamento do CORE.

Principais declarações (V1):

- `metadata.status = "OK"` significa exclusivamente que o processamento do CORE foi concluído. `OK` NÃO significa ambiente saudável, conformidade, análise completa ou ausência de risco.
- `MISSING`, `UNKNOWN` e `NOT_ASSESSED` não sustentam normalidade nem conformidade.
- Conformidade exige: dado disponível e avaliável + critério aplicável + avaliação efetiva.
- `thermalComfort` permanece `UNKNOWN` e `thermalComfort.score = null`.
- Referências de conforto (ex.: ASHRAE 55, ISO 7730, NR-17) não autorizam, por si só, cálculo de conforto humano.
- Leitura instantânea de PM ≠ conformidade de 24 horas.
- `PM` mantém `evaluationPeriod = "24h_mean"` e `historicalAssessmentRequired = true` quando aplicável; `scoreEligible = false` quando não houver base histórica válida.
- CO₂ elevado permanece `INDOOR_CONTEXTUAL_OBSERVATION` e não confirma ventilação insuficiente nem não conformidade regulatória por si só.
- `Relationships` representam coexistência/contexto observado, NÃO causalidade.
- `Hypothesis` é condicional e probabilística; `Hypothesis` ≠ confirmação.
- `Mitigation` é recomendação condicional, não confirmação causal.
- `Impact.status = POSSIBLE` não significa `CONFIRMED`.
- `Diagnosis` e `Impact` possuem semânticas distintas e não devem ser confundidos.
- `referenceClass` (V1):
  - REGULATORY
  - STANDARD
  - GUIDELINE
  - TECHNICAL
  - MANUFACTURER
  - CONTEXTUAL
- `MANUFACTURER` e `TECHNICAL` não devem ser interpretados automaticamente como limites regulatórios.
- Sensirion VOC/NOx são classificadas como `MANUFACTURER` e não constituem limite regulatório.
- `Response` não cria fatos, critério, score, causalidade ou confirmação. O `Response` projeta o `Context` final apenas.
- `metadata.environment` representa a entrada solicitada; `domain.id` representa o domínio efetivamente resolvido.
- A cadeia de rastreabilidade deve ser preservada: Reading → Normalize → Domain → Regulatory → Validation → Metrics → Diagnostics → Evidences → Hypotheses → Mitigation (paralelo: Validation/Metrics → EnvironmentalScenario → Relationships → Impacts) → References → Response.

Este documento é um resumo público da governança V1 e deve acompanhar o contrato oficial e os snapshots de evidência V1.
