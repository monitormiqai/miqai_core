NOVO FLUXO DE CONSTRUÇÃO E VALIDAÇÃO DO MIQAI CORE
FASE 0
CONGELAR O ESTADO ATUAL
        ↓
FASE 1
DEFINIR A BIBLIOTECA DE OURO
        ↓
FASE 2
MAPEAR FONTES OFICIAIS
        ↓
FASE 3
PESQUISAR E VALIDAR CADA FONTE
        ↓
FASE 4
REGISTRAR GOVERNANÇA / PROVENIÊNCIA
        ↓
FASE 5
ESTRUTURAR REFERENCES
        ↓
FASE 6
ESTRUTURAR REGULATORY
        ↓
FASE 7
VALIDAR REGULATORY × FONTES
        ↓
FASE 8
VALIDAR MEDIÇÃO × CRITÉRIO
        ↓
FASE 9
VALIDAR PIPELINE
        ↓
FASE 10
VALIDAR JSON
        ↓
FASE 11
VALIDAR JSON × DASHBOARD
        ↓
FASE 12
TESTE END-TO-END
        ↓
FASE 13
CONGELAMENTO / VERSÃO
Agora vou detalhar o que faremos em cada uma.
FASE 0 — CONGELAR O ESTADO ATUAL
Objetivo: não perder o que já construímos.
Temos:
miqai_core
      ↑
      atual

miqai_core - Copia
      ↑
      original/histórico
E já temos o documento:
CORE-QAI-v1.0.0-FROZEN.md
Ação
Não alterar nada ainda.
Registrar:
- estado atual;
- estado original;
- testes atuais;
- decisões arquiteturais já tomadas.
Resultado: ponto de restauração conhecido.
FASE 1 — DEFINIR A BIBLIOTECA DE OURO QAI
Aqui congelamos o modelo de conhecimento.
A Biblioteca de Ouro será composta logicamente por:
REGULATORY
    +
REFERENCES
    +
GOVERNANÇA / KNOWLEDGE
Mas cada um possui função diferente.
Regulatory
Qual critério QAI o CORE pode aplicar?

References
Qual documento sustenta esse critério?

Knowledge
Como esse conhecimento foi pesquisado, validado, versionado e incorporado?

Knowledge não participa da decisão operacional.
Resultado
Documento:
MIQAI — Especificação da Biblioteca de Ouro QAI
Esse documento será nossa referência antes de mexer no código.
FASE 2 — MAPEAR AS FONTES
Agora começamos pela pergunta:
Quais fontes realmente precisamos para os 15 parâmetros do MIQAI?

Criamos uma matriz:
Parâmetro	Brasil/QAI	Internacional/QAI	Literatura	Fabricante
Temperatura	pesquisar	pesquisar	se necessário	—
Umidade	pesquisar	pesquisar	se necessário	—
CO₂	pesquisar	pesquisar	se necessário	—
PM1	pesquisar	pesquisar	se necessário	Sensirion
PM2.5	pesquisar	pesquisar	se necessário	Sensirion
PM4	pesquisar	pesquisar	se necessário	Sensirion
PM10	pesquisar	pesquisar	se necessário	Sensirion
NC0.5	pesquisar	pesquisar	se necessário	Sensirion
NC1	pesquisar	pesquisar	se necessário	Sensirion
NC2.5	pesquisar	pesquisar	se necessário	Sensirion
NC4	pesquisar	pesquisar	se necessário	Sensirion
NC10	pesquisar	pesquisar	se necessário	Sensirion
VOC Index	—	pesquisar	pesquisar	Sensirion
NOx Index	—	pesquisar	pesquisar	Sensirion
Typical Particle Size	—	pesquisar	se necessário	Sensirion


Importante: “pesquisar” não significa que necessariamente encontraremos um critério.
FASE 3 — PESQUISAR E VALIDAR CADA FONTE
Aqui entra o Web.
Mas não vamos fazer consultas aleatórias.
Para cada documento:
Fonte
↓
órgão
↓
versão
↓
vigência/status
↓
escopo
↓
aplicabilidade
↓
parâmetro
↓
valor
↓
unidade
↓
período
↓
seção/página
E, quando possível, usamos a fonte oficial.
Exemplo:
ABNT NBR 17037
       ↓
PM2.5
       ↓
25 µg/m³
       ↓
24h
       ↓
ambiente aplicável
       ↓
seção correspondente
E separadamente:
WHO AQG 2021
       ↓
PM2.5
       ↓
15 µg/m³
       ↓
24h
       ↓
GUIDELINE
       ↓
aplicabilidade correspondente
Nunca misturamos os dois valores.
FASE 4 — GOVERNANÇA / PROVENIÊNCIA
Agora usamos Knowledge.
Aqui armazenamos:
quem publicou
qual documento
qual versão
onde encontramos
qual seção
qual evidência
quando foi pesquisado
qual interpretação foi feita
status da validação
quem aprovou
hash/proveniência quando aplicável
Isso cria:
FONTE ORIGINAL
      ↓
EVIDÊNCIA
      ↓
CURADORIA
      ↓
CRITÉRIO APROVADO
Mas esse histórico não entra no caminho operacional da medição.
FASE 5 — ESTRUTURAR REFERENCES
Depois que a fonte foi confirmada:
References
representará o documento.
Exemplo:
ABNT NBR 17037:2023
com:
- identificação;
- organização;
- ano;
- status;
- jurisdição;
- natureza;
- escopo;
- seções;
- tópicos;
- provenance.
FASE 6 — ESTRUTURAR REGULATORY
Agora, e somente agora, transformamos a informação validada em critério operacional.
Exemplo:
PM2.5

criterionKind:
STANDARD

referenceThreshold:
25

referenceUnit:
µg/m³

evaluationPeriod:
24h_mean

applicability:
...

referenceIds:
[...]

historicalAssessmentRequired:
true
Aqui não existe mais:
“acho que deveria ser 25”.

Existe:
“25 porque a fonte X estabelece isso para a condição Y.”

FASE 7 — VALIDAR REGULATORY × FONTES
Essa será uma auditoria extremamente importante.
Para cada critério:
Regulatory
    ↓
referenceIds
    ↓
References
    ↓
documento
    ↓
seção
    ↓
fonte original
Perguntamos:
O código representa corretamente a fonte?
O valor está correto?
A unidade está correta?
O período está correto?
A aplicabilidade está correta?
A natureza da fonte está correta?
A fonte é vigente?
O CORE está chamando uma guideline de “norma”?
Está tratando referência técnica como limite legal?
Se alguma resposta for “não”, corrigimos antes de testar o pipeline.
FASE 8 — VALIDAR MEDIÇÃO × CRITÉRIO
Agora começamos a colocar medições reais/sintéticas.
Exemplo:
PM2.5 = 30 µg/m³
CORE consulta:
Regulatory
→ PM2.5
→ 25 µg/m³
→ 24h
→ ABNT NBR 17037
E precisa produzir algo semanticamente correto:
ABOVE_REFERENCE
OBSERVATION
Não:
FAIL
quando a natureza/período não permite isso.
FASE 9 — VALIDAR O PIPELINE
Só depois das normas estarem corretas:
normalize
   ↓
domain
   ↓
regulatory
   ↓
validation
   ↓
metrics
   ↓
diagnostics
   ↓
evidences
   ↓
hypotheses
   ↓
mitigations
   ↓
environmentalScenario
   ↓
relationships
   ↓
impacts
   ↓
references
   ↓
response
Testamos:
A informação correta entra e permanece correta até a saída?

Aqui vamos procurar distorção semântica.
FASE 10 — VALIDAR O JSON
Agora fazemos a pergunta:
O JSON realmente conta para o usuário o que aconteceu?

Por exemplo:
PM2.5:
30 µg/m³

Referência:
25 µg/m³

Período:
24h

Fonte:
ABNT NBR 17037

Avaliação:
ABOVE_REFERENCE

Estado:
OBSERVATION

Necessita:
avaliação histórica/diagnóstica
E também:
Referência complementar:
WHO AQG 2021
15 µg/m³ / 24h
sem misturar as duas coisas.
FASE 11 — JSON × DASHBOARD
Só aqui entramos no aplicativo.
A regra continua congelada:
Dashboard não interpreta.

Ele recebe:
CORE JSON
      ↓
componentes visuais
Por exemplo:
COMPONENT_QAI
COMPONENT_READINGS
DIAGNOSIS
HUMAN
PARTICULATE
MITIGATION
CONCLUSION
O aplicativo apenas apresenta o que o CORE determinou.
Se faltar informação:
corrigimos o CORE/contrato JSON, não inventamos no dashboard.
FASE 12 — TESTE END-TO-END
Agora fazemos cenários completos.
Por exemplo:
Cenário 1
PM2.5 acima da referência.
Cenário 2
PM2.5 abaixo.
Cenário 3
PM10 acima.
Cenário 4
CO₂ elevado.
Cenário 5
VOC Index elevado.
Cenário 6
sensor sem leitura.
Cenário 7
sem referência aplicável.
Cenário 8
duas referências de naturezas diferentes.
Cenário 9
referência brasileira + guideline internacional.
Cenário 10
parâmetro medido sem critério normativo.
Esse último é particularmente importante:
O CORE precisa saber dizer “não existe critério aplicável” sem inventar um.

FASE 13 — CONGELAMENTO
Quando tudo estiver aprovado:
Biblioteca de Ouro
        +
CORE
        +
JSON
        +
Dashboard
formam uma versão.
Por exemplo:
MIQAI CORE QAI v1.1.0
E então documentamos:
Fontes utilizadas
Critérios
Aplicabilidade
Semântica
Pipeline
JSON
Testes
Limitações
Governança
A partir daí:
qualquer alteração relevante gera nova versão.

E o mais importante: ordem das ferramentas
Vamos usar cada ferramenta para o que ela faz melhor.
WEB
↓
fontes oficiais / normas / literatura

KNOWLEDGE
↓
governança / curadoria / proveniência

VS CODE + AGENTE
↓
inspeção e alteração controlada do código

NODE.JS
↓
execução dos testes

CORE
↓
decisão

JSON
↓
contrato

DASHBOARD
↓
apresentação
Isso evita usar o agente para “pesquisar conhecimento” e evita usar o Web para ficar repetindo a mesma pesquisa toda vez que formos testar o CORE.
E eu acrescentaria uma regra ao projeto
REGRA DE OURO DA BIBLIOTECA
Nenhum critério entra no Regulatory simplesmente porque parece tecnicamente razoável.

Ele precisa ter:
FONTE
+
APLICABILIDADE
+
NATUREZA
+
VALOR (quando existir)
+
UNIDADE
+
PERÍODO (quando aplicável)
+
RASTREABILIDADE
E quando não houver um critério válido:
SEM CRITÉRIO
é uma resposta perfeitamente válida.
Isso protege o MIQAI de um dos maiores riscos que encontramos nesses últimos dias: transformar capacidade de medição em falsa autoridade normativa.
Portanto, nosso próximo trabalho
Não é mais mexer no código.
É começar a FASE 1 + FASE 2: especificar a Biblioteca de Ouro e construir a Lista-Mestra das fontes QAI.
Eu sugiro que façamos primeiro Brasil / QAI, parâmetro por parâmetro. Depois passamos para Internacional, Literatura e Fabricantes.
A partir daí, o CORE deixa de ser uma coleção de regras que estamos tentando validar e passa a ser aquilo que você originalmente imaginou:
um motor de decisão cuja inteligência é alimentada por uma Biblioteca de Ouro QAI rastreável, verificável e governada.