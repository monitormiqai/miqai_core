Agora entramos na auditoria de validação do CORE, e não em uma nova construção.
Vamos verificar, nesta ordem:
1. Regulatory × parâmetros
   - cada parâmetro possui critério adequado;
   - fonte/órgão/entidade está corretamente identificado;
   - referência, unidade, aplicabilidade e período estão coerentes;
   - não existe referência tratada como norma quando é apenas guideline/literatura.
2. Leitura → resultado
   - fornecer uma leitura real/sintética;
   - acompanhar o parâmetro através de todo o CORE;
   - confirmar que ele entrega exatamente a semântica que congelamos:
     PASS / FAIL / OBSERVATION / MISSING / NOT_ASSESSED.
3. Pipeline completo
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
4. Referências
   - verificar se o resultado está realmente fundamentado em entidades, órgãos, normas, guidelines e literatura;
   - conferir se o Reference Resolver está entregando a referência correta;
   - garantir que não há inferência indevida.
5. JSON final
   - abrir o JSON real produzido;
   - verificar estrutura, conteúdo e semântica;
   - confirmar que não há perda de informação entre as etapas.
6. JSON → Dashboard
   Vamos então mapear objetivamente:
   JSON do CORE → seção do Dashboard
   e verificar se o dashboard consegue apresentar o resultado sem interpretar, recalcular ou inventar absolutamente nada.
Regra para esta etapa
Não vamos corrigir nada preventivamente.
Primeiro vamos auditar e registrar o que realmente existe.
Se encontrarmos uma divergência, classificaremos:
- 🔴 erro no CORE;
- 🟠 erro no contrato JSON;
- 🟡 referência/regra que precisa ser revisada;
- 🔵 apenas problema de apresentação do Dashboard;
- 🟢 comportamento correto.
Só depois decidiremos qualquer alteração.