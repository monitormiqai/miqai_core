# CORE QAI — Artifact Policy V1
Data: 2026-09-02
Status: FROZEN

Este documento define a política de preservação de artefatos de evidência para o FREEZE V1.

A. Artefatos oficiais de evidência V1

- `docs/json-real-v1.json`
- `tests/integration/json-real-output.json` quando explicitamente preservado como evidência histórica.

B. Princípio

Artefatos JSON reais são evidências de execução/contrato e não devem ser tratados como código-fonte.

C. Versionamento

Todo snapshot oficial deve possuir: data, versão/identificação V1, origem conhecida e relação clara com o contrato vigente.

D. Preservação histórica

Não sobrescrever silenciosamente um snapshot histórico. Quando houver mudança incompatível ou novo contrato, criar novo snapshot versionado/datado.

E. Integridade

Sempre que possível registrar: commit/tag de origem, data de geração, versão do contrato e checksum/hash (se o processo de repositório suportar).

F. Regra de alteração

Alteração de comportamento do CORE deve gerar novo artefato e novo registro histórico. Não substituir evidência histórica de V1 por resultado de V2.

G. Relação com testes

Arquivos gerados por testes podem ser fonte de artefato, mas a política distingue: output temporário vs snapshot oficial vs evidência histórica.

H. thermalComfort

Qualquer snapshot V1 deve preservar: `thermalComfort.level = UNKNOWN` e `thermalComfort.score = null`.

I. Invariantes críticos

Registrar: PM 24h, CO₂ contextual, ausência de inferência de MISSING/UNKNOWN, POSSIBLE ≠ CONFIRMED e taxonomy de References.

IMPORTANTE: este documento não cria commits, tags ou checksums por conta própria. Caso o repositório necessite de registro formal (tag, commit), isso deverá ser feito por operadores humanos segundo o processo aprovado.
