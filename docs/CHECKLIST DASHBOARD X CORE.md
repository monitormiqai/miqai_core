CORE QAI — CHECKLIST MESTRE
Entrega do contrato oficial para o Dashboard

Projeto: MIQAI / CORE QAI
Objetivo: fazer o Dashboard consumir exclusivamente o CORE, sem criar, inferir, calcular ou produzir conteúdo técnico próprio.
Status atual: em execução
Baseline congelada: CORE QAI RC1 + Environmental Scenario V1
Princípio central: o CORE produz inteligência; o Dashboard apresenta.

0. REGRAS CONGELADAS
 Arquitetura do CORE definida e congelada.
 Pipeline oficial definido.
 Context como objeto central de processamento.
 Dashboard não deve executar inteligência ambiental.
 Dashboard não deve criar diagnósticos.
 Dashboard não deve criar hipóteses.
 Dashboard não deve calcular indicadores derivados.
 Dashboard não deve inferir impactos.
 Dashboard não deve produzir recomendações técnicas.
 Dashboard deve consumir o JSON oficial do CORE.
 Evoluções de conteúdo devem ocorrer no CORE.
 Environmental Scenario V1 implementado.
 Environmental Scenario V1 validado.
 Environmental Scenario V1 commitado.
 Environmental Scenario V1 congelado.
 Catálogo de Environmental Scenarios será enriquecido posteriormente.

Commit de referência atual:

4cba2f9
feat(core): add environmental scenario V1
1. CORE — CAMADAS JÁ EXISTENTES
Entrada / Engine
 analysis.js
 context.js
 pipeline.js
 responseBuilder.js
 constants.js
Processamento
 Normalize
 Domain
 Regulatory
 Validation
 Metrics
Inteligência
 Diagnostics
 Evidence
 Hypotheses
 Mitigation
 Environmental Scenarios
 References
2. ENVIRONMENTAL SCENARIO V1
Estrutura
 src/environmentalScenarios/index.js
 src/environmentalScenarios/catalog/index.js
 src/environmentalScenarios/catalog/warmHumid.js
Integração
 Context possui environmentalScenario.
 Pipeline executa Environmental Scenario.
 Response Builder entrega Environmental Scenario.
 warm_humid validado.
 cenário normal sem correspondência validado.
 git diff --check
 commit realizado.
Exemplo validado
temperature = 30
humidity    = 80

Resultado:

{
  "primary": {
    "id": "warm_humid",
    "name": "Ambiente quente e úmido",
    "priority": 80
  }
}
3. PRÓXIMO BLOCO — RELATIONSHIPS

STATUS: 🔴 NÃO IMPLEMENTADO

Objetivo:

Representar explicitamente relações técnicas entre parâmetros, diagnósticos, métricas e condições ambientais.

Criar
src/relationships/
├── index.js
└── catalog/
    ├── index.js
    └── ...
Implementar
 Context relationships
 Relationships Library
 Relationships Catalog
 primeira relação oficial
 prioridade
 condição when(ctx)
 título
 descrição
 parâmetros relacionados
 integração no pipeline
 integração no Response Builder
Validar
 relação ativada quando condição é verdadeira
 relação não ativada quando condição é falsa
 múltiplas relações ordenadas por prioridade
 nenhuma inferência criada pelo Dashboard
4. IMPACTS

STATUS: 🔴 NÃO IMPLEMENTADO

Objetivo:

Transformar relações/condições ambientais já sustentadas pelo CORE em impactos ambientais tecnicamente qualificados.

Criar
src/impacts/
├── index.js
└── catalog/
    ├── index.js
    └── ...
Implementar
 Context impacts
 Impacts Library
 Impacts Catalog
 classificação do impacto
 descrição
 base técnica
 parâmetros relacionados
 integração no pipeline
 integração no Response Builder
Regra

Nunca transformar:

condição compatível

em:

evento confirmado

A linguagem deverá respeitar o nível de evidência disponível.

5. HUMAN IMPACT

STATUS: 🔴 NÃO IMPLEMENTADO

Objetivo:

Entregar ao Dashboard os possíveis impactos/percepções humanas derivados das condições já processadas pelo CORE.

Criar
src/humanImpact/
├── index.js
└── catalog/
    ├── index.js
    └── ...
Implementar
 Context humanImpact
 Human Impact Library
 catálogo
 classificação
 título
 descrição
 base/evidências relacionadas
 parâmetros relacionados
 integração no pipeline
 integração no Response Builder
6. ACTION / MITIGATION — AUDITORIA

STATUS: 🟡 EXISTENTE — PRECISA AUDITORIA

O CORE já possui Mitigation.

Agora precisamos verificar se o Dashboard ainda está complementando o conteúdo.

 auditar estrutura de mitigation
 identificar todos os campos consumidos pelo Dashboard
 verificar se cada texto técnico existe no JSON
 verificar se alguma recomendação ainda é criada no frontend
 eliminar qualquer duplicação de regra
 garantir justificativa baseada no CORE
7. EVIDENCE — AUDITORIA

STATUS: 🟡 EXISTENTE — PRECISA AUDITORIA

 verificar estrutura real de evidence
 verificar campos usados pelo Dashboard
 verificar origem de cada evidência
 verificar referências associadas
 garantir que o Dashboard não monte evidência artificialmente
8. HYPOTHESES — AUDITORIA

STATUS: 🟡 EXISTENTE — PRECISA AUDITORIA

 verificar estrutura real
 verificar hipóteses utilizadas pelo Dashboard
 verificar nível de confiança/qualificação
 verificar base das hipóteses
 garantir linguagem não assertiva
 garantir que o Dashboard não formule hipóteses próprias
9. DIAGNOSIS — AUDITORIA

STATUS: 🟡 EXISTENTE — PRECISA AUDITORIA

 catalogar todos os diagnósticos existentes
 verificar campos necessários ao Dashboard
 verificar title
 verificar description
 verificar prioridade
 verificar condição de ativação
 verificar se há conteúdo esperado pelo Dashboard que não existe no CORE
 corrigir no CORE, nunca no frontend
10. METRICS — AUDITORIA

STATUS: 🟡 EXISTENTE — PRECISA AUDITORIA

Verificar especialmente:

 thermalComfort
 airQuality
 particulateLoad
 occupancy
 dewPoint
 qaiScore
 healthRisk

Para cada métrica:

Existe no CORE?
        ↓
É calculada pelo CORE?
        ↓
Tem estrutura estável?
        ↓
Dashboard apenas apresenta?
11. RESPONSE BUILDER — CONTRATO FINAL

Depois de concluir os blocos anteriores:

 revisar todos os campos de response
 padronizar nomenclatura
 verificar estruturas vazias
 verificar null
 verificar arrays
 verificar objetos
 eliminar campos redundantes
 garantir estabilidade do contrato
 congelar JSON Contract V1

Estrutura-alvo:

{
  "metadata": {},
  "domain": {},
  "validation": {},
  "metrics": {},
  "diagnosis": {},
  "evidence": {},
  "hypotheses": {},
  "mitigation": {},
  "environmentalScenario": {},
  "relationships": {},
  "impacts": {},
  "humanImpact": {},
  "references": {}
}
12. JSON REAL DO CORE

STATUS: 🟡 PREPARAÇÃO

O primeiro comando falhou apenas porque a pasta docs não existia.

Executar:

New-Item -ItemType Directory -Force .\docs

Depois gerar:

docs/CORE_QAI_JSON_REAL_V1.json

Esse arquivo será o artefato de verdade para a equipe do Dashboard.

Não será um JSON inventado ou documentação teórica.

Será:

entrada real
      ↓
CORE real
      ↓
pipeline real
      ↓
response real
      ↓
CORE_QAI_JSON_REAL_V1.json
13. DASHBOARD — AUDITORIA FINAL

Somente depois que o JSON estiver fechado.

Para cada conteúdo que o Dashboard atualmente produz:

Conteúdo	CORE produz?	Dashboard pode produzir?
QAI Score	✅	❌
Diagnóstico	✅	❌
Evidência	✅	❌
Hipótese	✅	❌
Mitigação	✅	❌
Cenário ambiental	✅	❌
Relações	⏳	❌
Impactos	⏳	❌
Impactos humanos	⏳	❌
Texto técnico	⏳	❌
Referências	✅	❌
Layout/UI	❌	✅
Gráficos	❌	✅
Ícones	❌	✅
Animações	❌	✅
Organização visual	❌	✅

Regra final:

Se o conteúdo depende de interpretação ambiental, ele pertence ao CORE.

Se é apenas apresentação visual, pertence ao Dashboard.

14. TESTES
Teste estrutural
 node consegue importar analysis.js
 API pública encontrada:
AnalisarQualidadeAmbiental
default
Teste funcional
 cenário quente/úmido
 cenário normal
Testes a executar
 temperatura alta
 temperatura baixa
 umidade alta
 umidade baixa
 CO₂ alto
 PM2.5 alto
 VOC alto
 múltiplos diagnósticos
 múltiplas relações
 múltiplos impactos
 impacto humano
 ausência de leitura
 combinação de condições
 ambiente corporate
 healthcare
 education
 residential
 datacenter
15. VALIDAÇÃO GIT

Em cada bloco:

git diff --check

Depois:

git status

E somente após validação:

git add ...
git commit -m "..."

Após commit:

git status

Esperado:

working tree clean
16. CONGELAMENTO
CORE QAI V1 — ESTADO FINAL

Só marcar quando tudo estiver validado:

 Relationships V1
 Impacts V1
 Human Impact V1
 Mitigation auditada
 Evidence auditada
 Hypotheses auditadas
 Diagnosis auditada
 Metrics auditadas
 Response Builder auditado
 JSON Contract V1 fechado
 JSON Real V1 gerado
 Dashboard validado contra JSON
 nenhum conteúdo técnico criado pelo Dashboard
 testes completos
 git diff --check
 commit final
 tag/release de referência
17. BACKLOG PÓS-ESTABILIZAÇÃO

NÃO executar agora.

Depois que o CORE estiver rodando liso:

 enriquecer Environmental Scenarios
 ampliar Relationships Catalog
 ampliar Impacts Catalog
 ampliar Human Impact Catalog
 revisar hipóteses
 ampliar evidências
 ampliar mitigações
 ampliar referências
 aumentar cobertura de domínios
 aumentar cobertura regulatória
 ampliar casos compostos
 revisar linguagem técnica
 aumentar cobertura de testes
MARCADOR DE RETOMADA

Quando formos continuar em outra conversa, basta você colar:

CORE QAI — RETOMADA

Baseline:
Environmental Scenario V1 congelado.
Commit: 4cba2f9

Objetivo:
Entregar JSON oficial ao Dashboard para que ele não produza conteúdo técnico.

Último bloco concluído:
Environmental Scenario V1.

PRÓXIMO BLOCO:
RELATIONSHIPS V1.

Sequência obrigatória:
RELATIONSHIPS
→ IMPACTS
→ HUMAN IMPACT
→ AUDITORIAS
→ RESPONSE BUILDER
→ JSON CONTRACT V1
→ JSON REAL V1
→ AUDITORIA DASHBOARD
→ CONGELAMENTO

Regra:
CORE = inteligência/conteúdo técnico.
Dashboard = apresentação/UI.

Não alterar arquitetura congelada.
Não enriquecer catálogos antes da estabilização.

Esse passa a ser nosso mapa de execução. Não precisamos mais depender de recuperar dezenas de mensagens para saber onde estamos.