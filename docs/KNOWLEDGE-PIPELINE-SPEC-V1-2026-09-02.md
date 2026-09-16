# CORE QAI — KNOWLEDGE PIPELINE SPEC V1
Data: 2026-09-02
Status: SPECIFICATION (READ-ONLY, NO IMPLEMENTATION)

Objetivo
--------
Especificar a Esteira do Conhecimento V1 para futura implantação. Este documento é apenas arquitetural: NÃO cria arquivos runtime, NÃO altera código, NÃO altera testes e NÃO migra referências.

Escopo
------
Fonte → Captura → Curadoria → Normalização → Validação → Classificação → Aprovação → Versionamento → Biblioteca → Consumo CORE → Rastreabilidade

Estados do conhecimento
- RAW: captura bruta da fonte (texto, PDF, catálogo do fabricante)
- CURATED: metadados preenchidos, notas de curadoria
- NORMALIZED: transformado para o schema canônico (`Reference`, `Criteria`, `ParameterDefinition`)
- VALIDATED: validado por curador e (quando aplicável) por autoridade legal
- APPROVED: aceito para produção e versionado
- DEPRECATED: substituído por versão posterior

Entidades centrais (modelo conceitual)
- Reference
  - id, code, title, organization, country, year, status, url, referenceClass
  - applicability (domains), sections (mapa de tópicos), rawSource (link/hash)
- Criteria
  - id, parameterId, referenceId, referenceSection, threshold, unit, evaluationPeriod, methodNote, applicability, temporalGuidance
- ParameterDefinition
  - id, name, displayName, unit, description, measurementMethod, typicalRange
- Provenance
  - sourceUrl, sourceHash, ingestDate, curatorId, ingestOperator, originCommit (optional/manual), notes
- Curation
  - curatorId, curationDate, curationNotes, confidenceScore, curationStatus (PENDING/COMPLETED)
- Validation
  - validatorId, validationDate, validationStatus (PASSED/FAILED/PENDING), evidenceReferences, legalReviewFlag
- Approval
  - approverId, approvalDate, approvalScope, versionId

referenceClass (V1 taxonomy)
- REGULATORY
- STANDARD
- GUIDELINE
- TECHNICAL
- MANUFACTURER
- CONTEXTUAL

Versionamento e rastreabilidade
- Cada approved item recebe `versionId` (ex: v1.0.0-YYYYMMDD) e manifesto de versão contendo `provenance` e `curation`.
- A biblioteca mantém um `manifest.json` com entradas imutáveis para cada versão.
- Registro obrigatório por versão: `sourceUrl`, `sourceHash`, `ingestDate`, `curatorId`, `validationStatus`.

Regras para impedir consumo de conhecimento não validado
- O CORE só pode ler registros com `validationStatus = PASSED` e `approval` definido.
- Leitura condicional: loaders devem rejeitar (`fail-fast`) records com status `PENDING` ou `FAILED` para critérios que afetam scoring/decisão normativa.
- Exceptions: records classificados como `MANUFACTURER` ou `CONTEXTUAL` podem ser disponibilizados em modo `observational` mas nunca como `criteria` para `score` sem aprovação explícita.

MVP inicial (conteúdo alvo, V1)
- Objetivo: entregar o menor conjunto que valide arquitetura sem alterar comportamento do CORE.
- Itens mínimos a curar e versionar:
  1) `abnt_nbr_16401` — classificar como `STANDARD` (jurisdição: BR). Curar seções aplicáveis (thermal comfort, ventilation, IAQ), registrar link/PDF, gerar `Reference` e ao menos 1 `Criteria` ligado (thermal comfort topics, NOT a thermalComfort algorithm). Status: PRONTO PARA CURADORIA → NECESSITA VALIDAÇÃO LEGAL.
  2) `who_aqg_2021` — classificar como `GUIDELINE` (jurisdição: GLOBAL). Curar PM2.5 24h threshold (25 µg/m³), registrar `Criteria: pm25_24h_who_abnt` com `evaluationPeriod = "24h_mean"`. Status: PRONTO PARA CURADORIA → NECESSITA VALIDAÇÃO (vigência/versão).

Testes futuros (contratos e invariantes)
- Contract tests: loader returns only `APPROVED` + `VALIDATED` items for use in `validationEngine`.
- Invariant tests: thermalComfort remains UNKNOWN/null after integrating loader (no ingestion will change behavior until explicit mapping).
- Round-trip tests: ingest Reference → curate → approve → load by CORE → ensure `provenance` present in Response when used.
- Governance tests: requirement that manufacturer records require flag `useAsCriteria=false` unless approved.

Requisitos de validação (checklist por item)
- Verificar fonte primária (PDF/URL)
- Confirmar vigência (year/status)
- Mapear jurisdição e aplicabilidade
- Confirmar unidade e método de cálculo (ex.: 24h mean method)
- Detectar conflitos com referências locais/regulatórias
- Registrar curatorId e validationStatus

Curadoria: papéis e responsabilidades
- Ingest Operator: captura raw and records provenance
- Curator (technical): preenche metadata, normaliza fields
- Validator (legal/standards): valida vigência e autoridade; determina `referenceClass = REGULATORY` se aplicável
- Approver: assina versão para produção

Governança e regras pré-implementação
- Definir autoridade de aprovação para REGULATORY (legal + technical). Sem essa aprovação, não publicar como `Criteria`.
- Policy: MANUFACTURER data only observational by default.
- Policy: todos os items que impactem Score ou Diagnosis devem ter `validationStatus = PASSED` e `approverId`.

Riscos
- Ingestão automática de manufacturer indices sem validação → falso critério.
- Conflitos jurisdicionais (local vs international) sem prioridade definida.
- Falta de provenance → perda de auditoria.

Roadmap (incremental)
1. Design de schema JSON para `Reference`, `Criteria`, `ParameterDefinition`, `Provenance` (0.5 sprint)
2. Implementar manifest + read-only loader (sandbox) sem integrar ao CORE (0.5 sprint)
3. Curadoria de MVP (ABNT NBR 16401 + WHO AQG PM2.5) — ingest manual, curation notes, validation (1 sprint)
4. Tests (contract + invariants) and review (0.5 sprint)
5. Approval & versioning of MVP records (1 sprint)
6. Controlled integration with CORE as read-only (feature flag) and run contract tests (1 sprint)

Decisões de governança pendentes (para aprovar antes de ingestion)
- Autoridade para classificar REGULATORY vs STANDARD
- Processo de priorização jurisdição
- Política de retenção/versionamento de snapshots
- Definição de `confidenceScore` mínimo para autopublicação

Observações finais
- Esta especificação NÃO cria a biblioteca nem altera o CORE QAI V1. O FREEZE V1 permanece inalterado; qualquer migração futura deve seguir autorização, curadoria, validação e testes estabelecidos aqui.

---
Documento gerado: KNOWLEDGE-PIPELINE-SPEC-V1-2026-09-02.md
