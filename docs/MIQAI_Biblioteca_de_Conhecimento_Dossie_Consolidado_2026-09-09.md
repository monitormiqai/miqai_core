# MIQAI — Biblioteca de Conhecimento
## Dossiê Consolidado de Evidências Técnicas, Normativas, Científicas e de Instrumentação

**Documento de consolidação para o MIQAI / CORE QAI**  
**Data de consolidação:** 08/09/2026  
**Status:** material de conhecimento pesquisado e estruturado para posterior validação/incorporação pelo gestor do CORE  
**Escopo:** cinco Domains oficiais — `corporate`, `healthcare`, `education`, `residential`, `datacenter`

---

## 1. Objetivo

Este documento consolida a pesquisa realizada para formar uma fonte robusta e auditável de conhecimento para o MIQAI / CORE QAI.

A Biblioteca de Conhecimento não é um catálogo genérico de normas. Seu objetivo é reunir evidências que possam sustentar, quando efetivamente aplicáveis:

- diagnósticos;
- hipóteses;
- evidências;
- interpretações;
- recomendações/mitigações;
- referências técnicas;
- critérios regulatórios, quando a fonte e o contexto realmente permitirem.

A regra de curadoria é:

> **PESQUISAR → VALIDAR → ESTRUTURAR → ENTREGAR**

Nenhum valor foi criado por inferência. Quando uma fonte não estabelece um critério aplicável ao MIQAI, o resultado deve permanecer como `NONE_FOUND`, `NO_SPECIFIC_CRITERION_FOUND`, `OBSERVATIONAL`, `REFERENCE_ONLY` ou equivalente, conforme a decisão posterior do CORE.

---

# 2. Princípios de interpretação

## 2.1 Fonte ≠ critério

Uma fonte pode fornecer:

- um valor;
- uma faixa;
- um método;
- uma obrigação;
- uma relação científica;
- uma recomendação;
- uma característica de sensor.

Essas informações não são intercambiáveis.

## 2.2 Critério ≠ observação

Uma leitura acima de uma referência temporal não significa automaticamente `FAIL`.

Especialmente:

> **PM2.5/PM10 de 24h não podem ser transformados em threshold instantâneo.**

## 2.3 Norma técnica ≠ lei

ABNT, ASHRAE e ISO podem ser referências técnicas sem constituírem, por si só, legislação brasileira.

## 2.4 Guideline ≠ regulamentação

Os WHO Global Air Quality Guidelines são referências baseadas em saúde. Não são limites legais brasileiros.

## 2.5 Fabricante ≠ norma de QAI

Sensirion pode validar:

- capacidade de medição;
- faixa;
- resolução;
- princípio de medição;
- comportamento do índice;
- limitações do sensor.

Isso não transforma o sensor em método normativo ou em critério de qualidade do ar.

## 2.6 Parâmetro medido ≠ parâmetro normatizado

O MIQAI mede VOC Index e NOx Index, por exemplo. Isso não significa que o CORE possa interpretar esses índices como concentração de VOC ou NO₂.

---

# 3. Domains oficiais

A Biblioteca deve trabalhar somente com:

1. `corporate`
2. `healthcare`
3. `education`
4. `residential`
5. `datacenter`

Domain representa **contexto de aplicação**, não tipo físico de sala.

Não são Domains:

- escritório;
- sala de aula;
- quarto;
- enfermaria;
- recepção;
- laboratório.

Esses elementos podem ser contexto ambiental dentro de um Domain.

---

# 4. Hierarquia das fontes

A prioridade de pesquisa adotada foi:

1. Brasil / QAI;
2. Internacional / QAI;
3. literatura científica/técnica;
4. fabricante/fornecedor.

Mas:

> **Aplicabilidade vem antes da prioridade.**

Uma fonte brasileira não deve ser aplicada fora de seu escopo.

Uma fonte internacional não substitui automaticamente uma referência brasileira.

Uma referência de fabricante não deve ser usada como norma de QAI.

---

# 5. Fontes brasileiras

## 5.1 ABNT NBR 17037:2023 — Versão Corrigida 2:2024

### Identificação

- **sourceId:** `BR-ABNT-NBR-17037`
- **Título:** Qualidade do ar interior em ambientes não residenciais climatizados artificialmente — Padrões referenciais
- **Código:** ABNT NBR 17037:2023
- **Versão:** Versão Corrigida 2
- **Data da versão corrigida:** 07/10/2024
- **Publisher:** ABNT
- **Jurisdição:** Brasil
- **sourceType:** `TECHNICAL_STANDARD`
- **nature:** `TECHNICAL_REFERENCE`
- **status:** versão corrigida identificada

### Escopo

A norma trata de ambientes **não residenciais climatizados artificialmente**, incluindo ambientes de uso restrito com requisitos especiais, como serviços de saúde.

Não aplicar à unidade residencial privada apenas por semelhança de parâmetro.

### Evidência documental

O texto detalhado foi verificado em cópia secundária da versão corrigida.

A publicação da Errata 2 em 07/10/2024 foi confirmada institucionalmente por ABNT/CB-055/ABRAVA.

**Limitação de proveniência:** o texto integral oficial da ABNT não foi obtido diretamente em acesso público; portanto, a verificação detalhada deve permanecer identificada como baseada em cópia secundária.

### Critérios encontrados

| Parâmetro | Valor | Unidade | Período | Natureza |
|---|---:|---|---|---|
| PM2.5 | 25 | µg/m³ | 24h | referência técnica |
| PM10 | 50 | µg/m³ | 24h | referência técnica |
| Temperatura | 21–26 | °C | condição ambiental | referência técnica |
| RH | 35–65 | % | condição ambiental | faixa recomendada |
| CO₂ | até 700 acima do exterior | ppm | diferencial | referência técnica |

### PM2.5

**Critério:**

`25 µg/m³ / média de 24h`

Uma leitura instantânea acima de 25 µg/m³ não representa automaticamente uma média de 24h acima de 25 µg/m³.

A fonte permite usar elevação instantânea como indicação para:

- novas medições;
- investigação de fonte;
- intervenção corretiva.

Não permite, isoladamente:

- declarar não conformidade legal;
- converter leitura instantânea em média de 24h;
- concluir risco individual à saúde.

### PM10

**Critério:**

`50 µg/m³ / média de 24h`

Mesma ressalva temporal:

> leitura instantânea ≠ média de 24h.

### Temperatura

`21–26 °C`.

É referência para o contexto abrangido pela norma. Não deve ser convertida em faixa universal para Residential ou Datacenter.

### Umidade relativa

`35–65%`.

A fonte trata como faixa recomendada.

Não permite concluir, somente pela RH:

- presença de mofo;
- condensação;
- infiltração;
- dano construtivo;
- doença.

### CO₂

A referência utiliza:

> **CO₂ interno até 700 ppm acima do CO₂ externo.**

O MIQAI não mede CO₂ externo.

Portanto, o valor é conhecimento da fonte, mas o critério diferencial não é operacionalizável pelo hardware/contrato atual.

Não criar:

- `co2Outdoor`;
- diferencial externo no contrato;
- limite universal de 700 ppm;
- limite universal de 1000/1100 ppm;
- ocupação inferida por CO₂.

### Velocidade do ar

A NBR também apresenta referência de velocidade do ar de até aproximadamente `0,20 m/s`.

O MIQAI V1 não mede velocidade do ar.

Logo:

`NOT_OPERATIONAL / OBSERVATIONAL`

### Applicability

| Domain | Avaliação |
|---|---|
| Corporate | `APPLICABLE` quando dentro do escopo |
| Healthcare | `SCOPE_COMPATIBLE`, com requisitos específicos adicionais |
| Education | `APPLICABLE` quando dentro do escopo |
| Residential | `NOT_APPLICABLE` |
| Datacenter | `REVIEW`; não presumir |

### Proveniência

- source: ABNT NBR 17037:2023
- versão corrigida 2: 07/10/2024
- errata: Errata 2
- texto detalhado: cópia secundária
- confirmação de publicação: ABNT/CB-055/ABRAVA

---

## 5.2 Lei 13.589/2018 — PMOC

### Identificação

- **sourceId:** `BR-LEI-13589-2018`
- **Código:** Lei nº 13.589/2018
- **Data:** 04/01/2018
- **Publisher:** Presidência da República / Planalto
- **Jurisdição:** Brasil
- **sourceType:** `LAW`
- **nature:** `REGULATORY`
- **status:** vigente

### Conhecimento principal

A lei estabelece a obrigação relacionada ao:

> **Plano de Manutenção, Operação e Controle — PMOC**

para os ambientes abrangidos pela legislação de climatização.

A lei também relaciona parâmetros e procedimentos às normas e regulamentações aplicáveis.

### O que a fonte permite

- reconhecer PMOC como obrigação normativa;
- contextualizar manutenção, operação e controle de sistemas de climatização;
- relacionar QAI à gestão do sistema climatizado.

### O que não permite

Não permite transformar:

- uma leitura de PM2.5;
- uma leitura de PM10;
- uma leitura de CO₂;
- temperatura;
- RH

em prova automática de conformidade com PMOC.

O MIQAI não substitui PMOC.

### Applicability

| Domain | Avaliação |
|---|---|
| Corporate | `APPLICABLE` quando estabelecimento estiver abrangido |
| Healthcare | `APPLICABLE` conforme contexto |
| Education | `APPLICABLE` conforme contexto |
| Residential | `NOT_APPLICABLE` como regra geral para unidade privada |
| Datacenter | `REVIEW` |

### Natureza

`LEGAL_OBLIGATION / MANAGEMENT_MAINTENANCE`

Não é threshold de sensor.

---

## 5.3 Portaria MS 3.523/1998

Fonte brasileira relacionada à manutenção, operação e controle de sistemas de climatização e ao contexto do PMOC.

### Natureza

`REGULATORY / HVAC_MAINTENANCE`

### Uso na Biblioteca

Pode sustentar:

- manutenção;
- operação;
- controle;
- gestão de sistemas climatizados.

Não deve ser convertida em threshold de sensor quando a fonte não estabelecer tal critério.

---

## 5.4 NR-17

A NR-17 permanece vigente e possui requisitos relacionados às condições ambientais de trabalho.

A pesquisa identificou:

- temperatura;
- velocidade do ar;
- umidade;
- conforto térmico;
- requisitos relacionados ao sistema de climatização.

### Limitação MIQAI

O MIQAI não mede velocidade do ar.

Portanto, a NR-17 pode sustentar contexto técnico/ocupacional, mas não permite executar todos os requisitos de conforto térmico exclusivamente pelos sensores atuais.

### Natureza

`OCCUPATIONAL_TECHNICAL_REGULATION`

---

## 5.5 CONAMA 506/2024

### Identificação

- **sourceId:** `BR-CONAMA-506-2024`
- **Código:** Resolução CONAMA nº 506/2024
- **Data:** 05/07/2024
- **Publisher:** CONAMA
- **Jurisdição:** Brasil
- **sourceType:** `REGULATION`
- **nature:** `AMBIENT_AIR_REGULATION`
- **status:** vigente

### Escopo

A resolução estabelece padrões nacionais de **qualidade do ar atmosférico**.

### Valores pesquisados

Para PI-2:

| Parâmetro | Valor | Período |
|---|---:|---|
| PM2.5 | 50 µg/m³ | 24h |
| PM10 | 100 µg/m³ | 24h |

### Aplicabilidade MIQAI

Esses valores **não são critérios gerais de QAI interna**.

| Domain | Indoor QAI |
|---|---|
| Corporate | `NOT_APPLICABLE` |
| Healthcare | `NOT_APPLICABLE` |
| Education | `NOT_APPLICABLE` |
| Residential | `NOT_APPLICABLE` |
| Datacenter | `NOT_APPLICABLE` |

### Uso permitido

Pode permanecer como:

`REFERENCE_ONLY / AMBIENT_EXTERNAL`

Não deve alimentar critério indoor.

---

## 5.6 RE 9/2003

### Identificação

- **sourceId:** `BR-ANVISA-RE9-2003`
- **Código:** RE nº 9/2003
- **Publisher:** ANVISA
- **status:** **REVOGADA**

A RE 9/2003 foi revogada pela RDC 886/2024.

### Uso atual

Somente:

- histórico;
- proveniência;
- rastreabilidade normativa.

Não utilizar seus valores como critérios atuais de Runtime.

---

## 5.7 RDC 886/2024

### Identificação

- **sourceId:** `BR-ANVISA-RDC886-2024`
- **Código:** RDC nº 886/2024
- **Publisher:** ANVISA
- **nature:** `REGULATORY_REVOCATION`

### Conhecimento principal

A RDC 886/2024 registra a revogação da RE 9/2003.

### Uso

- determinar status normativo;
- impedir uso da RE 9 como referência vigente;
- preservar proveniência histórica.

Não é critério de sensor.

---

# 6. Fontes internacionais

## 6.1 WHO Global Air Quality Guidelines — 2021

### Identificação

- **sourceId:** `INT-WHO-AQG-2021`
- **Título:** WHO global air quality guidelines
- **Ano:** 2021
- **Publisher:** World Health Organization
- **Jurisdição:** internacional
- **sourceType:** `GUIDELINE`
- **nature:** `HEALTH_BASED_GUIDELINE`

### Valores

| Parâmetro | Valor | Período |
|---|---:|---|
| PM2.5 | 15 µg/m³ | 24h |
| PM2.5 | 5 µg/m³ | anual |
| PM10 | 45 µg/m³ | 24h |
| PM10 | 15 µg/m³ | anual |
| NO₂ | 25 µg/m³ | 24h |
| NO₂ | 10 µg/m³ | anual |

### Regra fundamental

WHO AQG:

> **não é norma regulatória brasileira de QAI.**

Pode sustentar:

- referência baseada em saúde;
- comparação técnica de exposição;
- contexto científico;
- recomendações de redução de exposição.

Não pode sustentar automaticamente:

- não conformidade legal brasileira;
- limite interno brasileiro;
- risco individual.

### Aplicabilidade

Pode ser referência contextual nos cinco Domains, mas a natureza permanece `HEALTH_BASED_GUIDELINE`.

No Datacenter, a aplicação deve ser diferenciada entre:

- ocupantes;
- equipamento.

---

# 7. WHO — Dampness and Mould

## Natureza

`HEALTH_EVIDENCE`

### Conhecimento

A OMS relaciona:

- umidade persistente;
- crescimento microbiano;
- condições internas;
- sintomas respiratórios;
- alergias;
- asma.

### Regra importante

Não existe, para o MIQAI, um threshold universal de RH que permita declarar:

> “há mofo”.

A cadeia válida é contextual:

`RH elevada + persistência + temperatura/contexto → condição compatível com umidade → investigar condensação/infiltração/vazamento/fontes de vapor → cenário favorável a crescimento microbiano`

Isso é hipótese ambiental, não diagnóstico de saúde ou identificação direta de mofo.

---

# 8. WHO Housing and Health Guidelines — 2018

Fonte voltada à relação entre condições habitacionais e saúde.

### Temas relevantes

- temperatura interna;
- frio/calor;
- qualidade do ar;
- umidade;
- mofo;
- ventilação;
- condições habitacionais.

### Natureza

`HEALTH_EVIDENCE / TECHNICAL_REFERENCE`

Especialmente relevante para:

`residential`

Não fornece um único envelope universal de temperatura/RH para ser convertido automaticamente em threshold do MIQAI.

---

# 9. WHO — partículas ultrafinas / PNC

A pesquisa identificou material da OMS relacionado a partículas ultrafinas.

### Limitação crítica

A definição de UFP usada em contexto WHO é aproximadamente:

`≤ 0,1 µm`

O SPS30 começa aproximadamente na faixa de:

`0,3 µm`

Portanto:

> **SPS30 PNC não deve ser chamado de monitoramento equivalente de UFP segundo WHO.**

---

# 10. EPA — Indoor Air Quality

A EPA foi utilizada como fonte técnica para:

- PM;
- CO₂;
- VOC;
- combustão;
- ventilação;
- filtração;
- controle de fontes;
- umidade;
- ambientes residenciais.

## CO₂

CO₂ pode fornecer informação sobre ventilação, mas deve ser interpretado com contexto.

Não existe justificativa para converter isso em um limite universal de QAI.

## VOC

Não existe um padrão federal geral de VOC indoor que permita tratar TVOC/VOC Index como limite universal.

A redução de TVOC não garante segurança porque compostos individuais possuem toxicidades diferentes.

## PM

Fontes internas podem incluir:

- infiltração externa;
- combustão;
- cozimento;
- atividades;
- fontes biológicas;
- ocupação.

## Estratégias de melhoria

A EPA destaca:

1. controle de fontes;
2. ventilação;
3. filtração/limpeza do ar.

Não se deve recomendar “aumentar ventilação” indiscriminadamente sem considerar condições externas.

## RH

Para ambientes residenciais, a EPA utiliza como orientação:

- abaixo de 60%;
- idealmente 30–50%.

Isso é **orientação técnica**, não regulamentação brasileira.

---

# 11. EPA — fontes de combustão residencial

Fontes potenciais incluem:

- fogões a gás;
- aquecedores;
- lareiras;
- aparelhos a lenha;
- equipamentos mal ventilados;
- outros equipamentos de combustão.

Podem gerar:

- CO;
- NO₂;
- partículas;
- outros poluentes.

Isso sustenta hipóteses ambientais, não identificação direta da fonte pelo SGP41.

---

# 12. ASHRAE

## 12.1 ASHRAE 62.1

Padrão técnico de ventilação e qualidade aceitável do ar em espaços ocupados não residenciais.

Relevante para:

- Corporate;
- Education;
- Healthcare em contextos compatíveis;
- ambientes institucionais.

Não é legislação brasileira.

Não deve ser transformado em limite universal de CO₂.

---

## 12.2 ASHRAE 62.2

Padrão específico de ventilação residencial.

É referência técnica importante para:

`residential`

Não é lei brasileira e não estabelece um limite universal de CO₂.

---

## 12.3 ASHRAE 55

Referência para conforto térmico.

Pode sustentar contexto de:

- temperatura;
- umidade;
- condições térmicas.

Não deve ser confundida com critério regulatório brasileiro.

---

## 12.4 ASHRAE 170

Referência específica de ventilação em ambientes de saúde.

Relevante para Healthcare, porém muitos requisitos especializados não são mensuráveis pelo MIQAI V1.

---

## 12.5 ASHRAE 90.4

Foco em eficiência energética de data centers.

Não é um critério geral de QAI.

---

## 12.6 ASHRAE TC 9.9

Fonte técnica para condições ambientais de equipamentos de processamento de dados.

### Datacenter

Deve ser mantida em eixo separado:

`EQUIPMENT_ENVIRONMENT`

Não misturar com:

`OCCUPANT_ENVIRONMENT`

Uma temperatura adequada ao equipamento não é automaticamente uma faixa de conforto humano.

---

# 13. ISO

## 13.1 ISO 16000-6:2021

Método para determinação de VOCs individuais em ar interno por:

- tubos adsorventes;
- dessorção térmica;
- GC-MS/FID.

### Limitação

Não é limite universal de VOC.

Também não valida o SGP41 como substituto do método laboratorial.

---

## 13.2 ISO 16000-42:2023

Trata de métodos/estratégias para concentração numérica total de partículas em ambientes internos.

### Método

Utiliza CPC e abrange aproximadamente:

`10 nm – 3 µm`

### Limitação MIQAI

SPS30 não é CPC.

Portanto:

`SPS30 PNC ≠ ISO 16000-42`

O conhecimento pode sustentar contexto metodológico, mas não equivalência de método.

---

# 14. Fontes do fabricante — Sensirion

## 14.1 SHT45

### Parâmetros

- temperatura;
- umidade relativa.

### Desempenho identificado

- RH típica: aproximadamente ±1,0%;
- temperatura típica: aproximadamente ±0,1 °C;
- RH: 0–100%;
- temperatura: aproximadamente −40 a 125 °C;
- calibração de fábrica.

### Natureza

`MANUFACTURER_TECHNICAL_DATA`

Isso valida capacidade do sensor.

Não estabelece limite de QAI.

---

# 15. SCD41

### Parâmetro

CO₂.

### Capacidade identificada

- faixa especificada: aproximadamente 400–5000 ppm;
- precisão dependente da variante, incluindo aproximadamente ±40 ppm + 5% da leitura;
- resposta na ordem de 60 s;
- princípio fotoacústico NDIR;
- calibração de fábrica.

### Interpretação

O SCD41 mede CO₂ interno.

Ele não fornece:

- CO₂ externo;
- diferencial externo automaticamente;
- ocupação;
- qualidade de ventilação como conclusão normativa isolada.

---

# 16. SPS30

### Parâmetros

- PM1;
- PM2.5;
- PM4;
- PM10;
- NC0.5;
- NC1;
- NC2.5;
- NC4;
- NC10;
- Typical Particle Size.

### Capacidades identificadas

- concentração de massa aproximadamente 0–1000 µg/m³;
- concentração numérica aproximadamente 0–3000 #/cm³;
- distribuição por tamanhos;
- amostragem na ordem de 1 s;
- PM2.5 calibrado com referências TSI específicas do fabricante;
- PM4/PM10 derivados da distribuição de partículas.

### Limitações

Não declarar:

- equivalência a laboratório;
- equivalência CPC;
- equivalência a métodos oficiais;
- UFP conforme WHO;
- composição química da partícula.

### Status dos parâmetros

| Parâmetro | Situação |
|---|---|
| PM2.5 | principal |
| PM10 | principal |
| PM1 | observacional |
| PM4 | observacional |
| NC0.5 | observacional |
| NC1 | observacional |
| NC2.5 | observacional |
| NC4 | observacional |
| NC10 | observacional |
| Typical Particle Size | observacional |

---

# 17. SGP41

### Parâmetros

- VOC Index;
- NOx Index.

### VOC Index

O algoritmo utiliza uma linha de base baseada no histórico recente.

`VOC Index = 100` representa aproximadamente a composição média recente utilizada pelo algoritmo.

Valores acima/abaixo representam alteração relativa em relação a essa referência histórica.

### NOx Index

Também é um índice relativo.

Não representa diretamente:

- ppm;
- µg/m³;
- NO₂.

### Regra absoluta

Não converter:

`VOC Index → ppm`

nem:

`NOx Index → NO₂`

### Natureza

`MANUFACTURER_TECHNICAL_REFERENCE / RELATIVE_INDEX`

---

# 18. MATRIZ MESTRE — SENSOR × PARÂMETRO × CONHECIMENTO

| Parâmetro | Sensor | Principal fonte | Tipo de conhecimento | Temporalidade | Observação |
|---|---|---|---|---|---|
| Temperatura | SHT45 | NBR 17037 / ASHRAE / WHO | referência técnica | condição atual/contextual | Domain-dependent |
| RH | SHT45 | NBR 17037 / EPA / WHO | referência/recomendação | condição + persistência | não prova mofo |
| CO₂ | SCD41 | NBR 17037 / EPA / ASHRAE | indicador contextual | tendência/persistência | sem CO₂ externo |
| PM2.5 | SPS30 | NBR 17037 / WHO | referência técnica + guideline | 24h / histórico | instantâneo ≠ 24h |
| PM10 | SPS30 | NBR 17037 / WHO | referência técnica + guideline | 24h / histórico | instantâneo ≠ 24h |
| PM1 | SPS30 | fabricante | observacional | atual/tendência | sem critério específico |
| PM4 | SPS30 | fabricante | observacional | atual/tendência | sem critério específico |
| PNC | SPS30 | ISO 16000-42 + fabricante | observacional/metodológico | tendência | não equivalente a CPC |
| Typical Particle Size | SPS30 | fabricante | observacional | tendência | sem critério |
| VOC Index | SGP41 | Sensirion / EPA / ISO | índice relativo | histórico | não é concentração |
| NOx Index | SGP41 | Sensirion / EPA / WHO | índice relativo | histórico | não é NO₂ |

---

# 19. MATRIZ DE CRITÉRIOS POR DOMAIN

## 19.1 Corporate

### Principais referências

- NBR 17037;
- Lei 13.589/2018;
- Portaria 3.523/1998;
- NR-17;
- ASHRAE 62.1;
- ASHRAE 55;
- WHO;
- EPA.

### Parâmetros mais diretamente sustentados

- PM2.5;
- PM10;
- temperatura;
- RH.

### CO₂

Contextual, sem limite universal.

### VOC/NOx

Indicadores relativos/contextuais.

### PMOC

Obrigação de gestão/manutenção, não resultado de sensor.

---

# 20. Healthcare

## Escopo

O Domain Healthcare cobre ambientes de saúde compatíveis com os sensores atuais, incluindo:

- clínicas;
- clínicas odontológicas;
- consultórios;
- enfermarias comuns;
- quartos comuns de internação;
- recepção;
- espera;
- áreas administrativas;
- outros ambientes não críticos compatíveis.

Fora do escopo V1:

- UTI/ICU;
- CTI;
- centro cirúrgico;
- laboratórios.

### Referências

- NBR 17037;
- RDC 50/2002;
- materiais técnicos da Anvisa;
- ASHRAE 170;
- WHO;
- outras referências aplicáveis.

### Limitação

Não concluir:

- regularização sanitária;
- conformidade integral do estabelecimento;
- substituição de PMOC;
- substituição de avaliação técnica obrigatória;
- substituição de ensaio laboratorial.

### NBR 17037

Healthcare é `SCOPE_COMPATIBLE`, não uma autorização para ignorar requisitos específicos de saúde.

---

# 21. Education

## Escopo

Um único Domain Education cobre:

- creches;
- pré-escolas;
- escolas;
- cursos técnicos;
- universidades;
- centros de formação;
- salas de aula;
- bibliotecas;
- laboratórios educacionais;
- áreas administrativas;
- áreas comuns.

### Principais referências

- NBR 17037;
- ASHRAE 62.1;
- referências educacionais técnicas;
- WHO;
- EPA;
- materiais FNDE/MEC quando aplicáveis.

### Conhecimento relevante

PM2.5, PM10, temperatura, RH e CO₂ contextual.

A literatura sobre crianças pode sustentar importância sanitária, mas não deve virar `Health Risk` individual.

---

# 22. Residential

Residential é um Domain independente.

## Principais referências

- NBR 15575-1:2025;
- NBR 15575-6:2021;
- NBR 13103:2020;
- NBR 16655-1:2018;
- ASHRAE 62.2;
- WHO Housing and Health;
- WHO Dampness and Mould;
- WHO AQG;
- EPA Residential IAQ;
- MME Anexo 86.

### PM2.5

WHO:

`15 µg/m³ / 24h`

como guideline de saúde.

Não há critério brasileiro residencial geral identificado equivalente à NBR 17037.

### PM10

WHO:

`45 µg/m³ / 24h`

como guideline de saúde.

### CO₂

NBR 15575 reconhece CO₂ como poluente interno, mas não foi identificado um limite geral de QAI residencial.

NBR 15575-6 contém `5000 ppm` em contexto específico de equipamentos a gás/contaminação, não como limite geral residencial de CO₂.

### Temperatura

Referências técnicas e de saúde existem, mas não foi identificado um envelope universal residencial para virar PASS/FAIL contínuo.

### RH

- NBR 15575 reconhece importância de temperatura/umidade;
- EPA: <60%, ideal 30–50%;
- WHO: evitar umidade persistente/mofo.

Não declarar mofo pela RH isoladamente.

### VOC / NOx

Indicadores relativos.

Combustão é hipótese contextual quando padrões de NOx + PM + contexto forem compatíveis.

---

# 23. Datacenter

Datacenter permanece um Domain próprio.

## Dois eixos independentes

### EQUIPMENT_ENVIRONMENT

Condições para equipamentos.

### OCCUPANT_ENVIRONMENT

Condições ambientais para pessoas.

Não misturar os dois.

## Referências

- NBR 17207:2025;
- NBR 16665:2019;
- ISO/IEC 22237-4:2021;
- ASHRAE TC 9.9;
- ASHRAE 90.4;
- referências de QAI para ocupantes quando aplicáveis.

### Temperatura

Referências de equipamento não devem ser usadas como conforto humano.

### RH

Mesmo princípio.

### PM

Pode ser relevante para ocupantes, mas controle de partículas do equipamento não deve ser convertido automaticamente em limite de saúde.

### VOC/NOx

Pode haver relevância ambiental para equipamentos, inclusive em contextos de corrosão, mas SGP41 não é analisador de corrosividade.

---

# 24. Diagnósticos e hipóteses sustentados pela pesquisa

Estas cadeias são **ambientais/contextuais**, não diagnósticos médicos.

## 24.1 Partículas

`PM2.5/PM10 elevados + persistência`

→ carga particulada elevada  
→ investigar fontes internas/externas  
→ avaliar ventilação, filtração e controle de fontes.

---

## 24.2 CO₂

`CO₂ interno elevado + persistência + contexto`

→ possível condição de ventilação/renovação inadequada  
→ investigar renovação, ventilação, ocupação declarada/contextual e fontes.

Não inferir ocupação automaticamente.

---

## 24.3 Umidade

`RH elevada + persistência + temperatura/contexto`

→ condição compatível com retenção de umidade  
→ investigar condensação, infiltração, vazamento, fontes de vapor e ventilação  
→ cenário potencialmente favorável ao crescimento microbiano.

Não afirmar “mofo”.

---

## 24.4 VOC

`VOC Index elevado`

→ alteração relativa da composição gasosa recente  
→ investigar eventos/fontes.

Não converter para concentração.

---

## 24.5 NOx

`NOx Index elevado`

→ evento relativo de gases oxidantes  
→ investigar combustão ou outras fontes compatíveis.

Não converter para NO₂.

---

## 24.6 PM + NOx

`PM elevado + NOx Index elevado + contexto de combustão`

→ cenário compatível com evento de combustão  
→ investigar fonte de combustão, exaustão e ventilação.

Não declarar causalidade.

---

## 24.7 CO₂ + VOC

`CO₂ elevado + VOC Index elevado`

→ cenário compatível com ventilação insuficiente e/ou evento de fonte  
→ investigar ventilação e fontes.

---

## 24.8 RH + PM

`RH elevada + PM elevada`

→ investigar simultaneamente condições de umidade e fontes de partículas.

Não concluir mofo.

---

## 24.9 RH + PM + VOC

Pode sustentar:

> cenário ambiental composto com hipóteses concorrentes.

Não sustenta causalidade única.

---

# 25. Parâmetros sem critério específico identificado

Os seguintes parâmetros não possuem, na pesquisa consolidada, critério indoor específico que possa ser promovido como limite universal:

- PM1;
- PM4;
- NC0.5;
- NC1;
- NC2.5;
- NC4;
- NC10;
- Typical Particle Size;
- VOC Index;
- NOx Index.

Isso não significa que sejam inúteis.

Eles podem sustentar:

- observações;
- tendências;
- detecção de eventos;
- hipóteses;
- investigação de fontes.

---

# 26. Limitações metodológicas do MIQAI V1

O hardware atual não mede diretamente:

- CO₂ externo;
- velocidade do ar;
- microbiologia;
- composição química de partículas;
- concentração individual de VOC;
- concentração de NO₂;
- ACH diretamente;
- pressão diferencial;
- eficiência HEPA;
- parâmetros laboratoriais específicos.

Consequentemente, referências que dependam desses parâmetros devem permanecer:

- contextuais;
- metodológicas;
- não operacionais;
- ou `PENDING`.

---

# 27. Regras de inferência proibidas

O conhecimento consolidado não autoriza:

### CO₂

- limite universal de 700 ppm;
- limite universal de 1000 ppm;
- limite universal de 1100 ppm;
- CO₂ externo no contrato;
- ocupação inferida por CO₂.

### PM

- instantâneo = 24h;
- PM2.5 acima de 25 instantaneamente = FAIL de 24h;
- PM10 acima de 50 instantaneamente = FAIL de 24h.

### WHO

- guideline = lei;
- guideline = regulamentação brasileira;
- guideline = diagnóstico individual.

### CONAMA

- ar externo = ar interno.

### Sensor

- fabricante = norma;
- SPS30 = CPC;
- SPS30 = laboratório;
- SGP41 NOx Index = NO₂;
- SGP41 VOC Index = ppm.

### Umidade

- RH alta = mofo comprovado;
- RH alta = doença;
- RH alta = condensação comprovada.

### Healthcare

- medição MIQAI = regularização sanitária;
- medição MIQAI = substituição de avaliação obrigatória.

### Datacenter

- condição de equipamento = conforto humano;
- condição de conforto humano = envelope de equipamento.

---

# 28. Status de evidência recomendado para a curadoria

A pesquisa consolidada utiliza as seguintes distinções:

- `VALIDATED`
- `VALIDATED_REFERENCE`
- `CANDIDATE`
- `REVIEW`
- `NOT_APPLICABLE`
- `HISTORICAL`
- `NO_SPECIFIC_CRITERION_FOUND`
- `PENDING`
- `REFERENCE_ONLY`
- `TECHNICAL_REFERENCE`
- `NON_OPERATIONAL`
- `OBSERVATIONAL`

A promoção definitiva ao Runtime não é decidida neste documento.

---

# 29. Matriz de candidatos a Runtime

| Conhecimento | Recomendação |
|---|---|
| NBR PM2.5 25 / 24h | `RUNTIME_CANDIDATE` |
| NBR PM10 50 / 24h | `RUNTIME_CANDIDATE` |
| NBR T 21–26°C | `RUNTIME_CANDIDATE` |
| NBR RH 35–65% | `RUNTIME_CANDIDATE` contextual |
| NBR CO₂ +700 externo | `NOT_RECOMMENDED` atualmente |
| WHO PM2.5 15 / 24h | `RUNTIME_CANDIDATE` como referência de saúde |
| WHO PM10 45 / 24h | `RUNTIME_CANDIDATE` como referência de saúde |
| WHO PM2.5 5 / anual | `NOT_RECOMMENDED` para operação V1 |
| WHO PM10 15 / anual | `NOT_RECOMMENDED` para operação V1 |
| Lei 13.589 PMOC | `RUNTIME_CANDIDATE` como contexto normativo |
| CONAMA 506 | `NOT_RECOMMENDED` para indoor |
| RE9/2003 | `NOT_RECOMMENDED` — revogada |
| RDC886/2024 | `REFERENCE_ONLY` / status normativo |
| VOC Index | `RUNTIME_CANDIDATE` como indicador relativo |
| NOx Index | `RUNTIME_CANDIDATE` como indicador relativo |
| PM1/PM4/PNC/TPS | `RUNTIME_CANDIDATE` apenas observacional/contextual |

---

# 30. Itens que devem permanecer fora do Runtime

1. CONAMA 506 como critério indoor.
2. RE9/2003 como critério vigente.
3. Valores históricos da RE9 como threshold atual.
4. CO₂ externo como dependência do contrato.
5. Diferencial de CO₂ como critério executável sem CO₂ externo.
6. Qualquer limite universal de CO₂ inventado.
7. Ocupação derivada de CO₂.
8. PM2.5/PM10 instantâneo tratado como média de 24h.
9. WHO como regulamentação brasileira.
10. WHO anual sem mecanismo de avaliação histórica compatível.
11. SPS30 tratado como CPC/laboratório.
12. VOC Index convertido em concentração.
13. NOx Index convertido em NO₂.
14. RH interpretada como prova de mofo.
15. Condições de equipamento de Datacenter usadas como conforto humano.
16. Condições de conforto humano usadas como limite de equipamento.
17. Requisitos microbiológicos não medidos pelo MIQAI.
18. Velocidade do ar como parâmetro medido.
19. Pressão diferencial como parâmetro medido.
20. Eficiência HEPA como parâmetro medido.

---

# 31. Proveniência consolidada

## Fontes brasileiras

- ABNT NBR 17037:2023 — Versão Corrigida 2:2024
- Lei 13.589/2018
- Portaria MS 3.523/1998
- NR-17
- RDC 50/2002
- NBR 15575-1:2025
- NBR 15575-6:2021
- NBR 13103:2020
- NBR 16655-1:2018
- NBR 16401-3:2024
- NBR 17207:2025
- NBR 16665:2019
- CONAMA 506/2024
- RE 9/2003
- RDC 886/2024
- MME Anexo 86

## Fontes internacionais

- WHO Global Air Quality Guidelines — 2021
- WHO Dampness and Mould — 2009
- WHO Housing and Health Guidelines — 2018
- WHO materiais sobre UFP/PNC e IAQ
- EPA Indoor Air Quality
- EPA Residential IAQ
- EPA materiais de combustão
- ASHRAE 62.1
- ASHRAE 62.2
- ASHRAE 55
- ASHRAE 170
- ASHRAE 90.4
- ASHRAE TC 9.9
- ISO 16000-6:2021
- ISO 16000-42:2023

## Fabricante

- Sensirion SHT45
- Sensirion SCD41
- Sensirion SPS30
- Sensirion SGP41
- Sensirion Gas Index Algorithm

---

# 32. Estado de verificação

## Verificado com maior robustez

- Lei 13.589/2018;
- CONAMA 506/2024;
- RE9/2003 / revogação;
- WHO AQG 2021;
- capacidades dos sensores Sensirion;
- princípios de interpretação dos índices VOC/NOx;
- distinção metodológica ISO/CPC/SPS30;
- principais referências ASHRAE/WHO/EPA.

## Verificação da NBR 17037

**Parcialmente primária.**

- existência/Errata 2: confirmada institucionalmente;
- texto detalhado: verificado em cópia secundária;
- valores e temporalidade: registrados conforme a versão corrigida pesquisada;
- acesso direto ao texto integral oficial ABNT: não realizado.

Essa limitação deve permanecer na proveniência.

## Itens que dependem de validação posterior

- confirmação documental primária de todos os metadados bibliográficos;
- localização documental exata de alguns trechos das fontes secundárias;
- harmonização dos registros com os schemas efetivos do CORE;
- decisão final de promoção ao Runtime.

---

# 33. Síntese técnica para o CORE

A pesquisa consolidada produz quatro grandes classes de conhecimento.

## Classe A — Critérios técnicos diretamente mensuráveis

- PM2.5 — NBR 17037 — 25 µg/m³ / 24h
- PM10 — NBR 17037 — 50 µg/m³ / 24h
- temperatura — NBR 17037 — 21–26°C
- RH — NBR 17037 — 35–65% recomendado

Sempre preservando escopo e temporalidade.

## Classe B — Referências de saúde

- WHO PM2.5;
- WHO PM10;
- WHO housing;
- WHO dampness/mould;
- EPA IAQ.

Servem para interpretação e mitigação, não para criar automaticamente conformidade brasileira.

## Classe C — Indicadores relativos

- CO₂;
- VOC Index;
- NOx Index;
- PNC;
- PM1;
- PM4;
- Typical Particle Size.

Servem principalmente para:

- contexto;
- tendência;
- eventos;
- hipóteses;
- investigação.

## Classe D — Contexto regulatório/gestão

- PMOC;
- manutenção HVAC;
- requisitos ocupacionais;
- infraestrutura de saúde;
- infraestrutura de datacenter;
- status de revogação normativa.

Não devem ser convertidos artificialmente em thresholds de sensor.

---

# 34. Conclusão

A pesquisa demonstra que o MIQAI V1 possui uma base técnica suficiente para sustentar uma Biblioteca de Conhecimento robusta sem ampliar sensores, Domains ou arquitetura.

Os pontos mais importantes a preservar são:

1. **NBR 17037 é referência central para ambientes não residenciais climatizados.**
2. **PM2.5 = 25 µg/m³ / 24h.**
3. **PM10 = 50 µg/m³ / 24h.**
4. **Temperatura = 21–26°C.**
5. **RH = 35–65% recomendada.**
6. **CO₂ da NBR utiliza diferencial com exterior, mas isso não é operacionalizável pelo hardware atual.**
7. **WHO PM2.5/PM10 é guideline de saúde, não regulamentação brasileira.**
8. **CONAMA 506/2024 pertence ao domínio de ar atmosférico externo e não deve virar critério indoor.**
9. **RE9/2003 é histórica/revogada.**
10. **Lei 13.589/2018 sustenta PMOC como obrigação de gestão, não threshold de sensor.**
11. **VOC/NOx do SGP41 são índices relativos, não concentrações.**
12. **SPS30 não deve ser tratado como CPC ou método laboratorial.**
13. **Residential permanece independente de Corporate.**
14. **Datacenter possui eixo de equipamento separado do eixo de ocupante.**
15. **Nenhuma fonte autoriza diagnóstico médico individual.**
16. **Nenhuma leitura instantânea deve ser promovida artificialmente a média temporal.**

A Biblioteca resultante deve permitir rastrear cada conhecimento até:

**fonte → versão → natureza → escopo → parâmetro → critério → período → aplicabilidade → método → interpretação → inferência permitida/proibida → proveniência → validação → candidatura a Runtime.**

---

## 35. Referências oficiais / pontos de acesso

- ABNT — https://www.abnt.org.br/
- Planalto — Lei 13.589/2018 — https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13589.htm
- CONAMA — https://conama.mma.gov.br/
- WHO — Global Air Quality Guidelines — https://www.who.int/publications/i/item/9789240034228
- ANVISA — legislação sanitária — https://www.gov.br/anvisa/
- EPA — Indoor Air Quality — https://www.epa.gov/indoor-air-quality-iaq
- ASHRAE — https://www.ashrae.org/
- ISO — https://www.iso.org/
- Sensirion — https://sensirion.com/

---

# 36. Status deste documento

**DOCUMENTO DE CONHECIMENTO — NÃO É ALTERAÇÃO DO CORE**

Este documento consolida a pesquisa e as evidências disponíveis para posterior incorporação.

Ele não:

- altera o CORE;
- altera Regulatory;
- altera References;
- altera Domains;
- cria Runtime;
- cria novos critérios;
- cria novos sensores;
- cria novos Domains;
- cria Health Risk;
- cria HumanImpact;
- introduz CO₂ externo;
- infere ocupação.

**Próxima etapa autorizada:** reconciliação deste conhecimento consolidado com a implementação real do `knowledge/`, `src/references/`, `src/regulatory/`, Domains e testes, seguida de aprovação pelo gestor do CORE antes de qualquer promoção operacional.



# Consolidação complementar — ABNT NBR 16401-3:2024

## Status da consolidação

A ABNT NBR 16401-3:2024 foi consolidada como fonte normativa específica para a Biblioteca de Conhecimento do MIQAI. Esta consolidação não altera o CORE, o Regulatory, o Runtime ou qualquer contrato de execução.

A norma deve ser tratada separadamente das demais referências e não deve ser usada para importar automaticamente critérios de outras normas.

### Escopo e aplicabilidade

A NBR 16401-3:2024 trata de sistemas de condicionamento de ar que atendem ambientes não residenciais. Para o MIQAI:

- Corporate: escopo compatível.
- Education: escopo compatível quando aplicável a ambiente não residencial climatizado.
- Healthcare: potencialmente aplicável a ambientes não residenciais compatíveis com seu escopo, respeitando requisitos específicos do ambiente de saúde.
- Residential: não deve ser tratado como aplicação direta da Parte 3; sistemas residenciais devem ser analisados segundo a série normativa residencial aplicável.
- Datacenter: não deve ser automaticamente classificado como aplicável apenas pela existência de requisitos de HVAC; a aplicação depende do escopo concreto da instalação.

## Matriz paramétrica

| Sensor MIQAI | Parâmetro | Evidência consolidada | Valor/unidade/período | Condição relevante | Relação com MIQAI | Limitações | Status |
|---|---|---|---|---|---|---|---|
| SCD41 | CO₂ | Sim; referência para avaliação/dimensionamento da renovação de ar | Diferenciais de 500 ppm e 700 ppm em contexto de avaliação/cálculo | Depende de CO₂ externo, vazão de ar exterior, sistema, ocupação e tempo | Mede CO₂ interno | Não mede CO₂ externo, vazão, ACH ou ocupação; não demonstra conformidade isoladamente | VALIDATED_REFERENCE / NON_OPERATIONAL para conformidade direta |
| SPS30 | PM2.5 | Sim | 25 µg/m³; média de 24 h | Referência temporal de 24 h | Correspondência direta de parâmetro/unidade | Leitura instantânea não é média normativa | VALIDATED_REFERENCE |
| SPS30 | PM10 | Sim | 50 µg/m³; média de 24 h | Referência temporal de 24 h | Correspondência direta de parâmetro/unidade | Leitura instantânea não é média normativa | VALIDATED_REFERENCE |
| SHT45 | Temperatura | Sim, como parâmetro de monitoramento/visualização | Sem novo threshold específico consolidado da Parte 3 | Depende do contexto do sistema e ambiente | Mede temperatura diretamente | Não importar automaticamente limites de outra norma | VALIDATED_REFERENCE |
| SHT45 | Umidade relativa | Sim, como parâmetro de monitoramento/visualização | Sem novo threshold específico consolidado da Parte 3 | Depende do contexto do sistema e ambiente | Mede UR diretamente | Não importar automaticamente 35–65% de outra fonte | VALIDATED_REFERENCE |
| SGP41 | VOC Index | Não foi encontrado critério equivalente ao índice | — | COV/COVT não equivale a VOC Index | Fornece índice relativo, não concentração | Não converter em µg/m³/ppm nem aplicar critério de COVT | NO_SPECIFIC_CRITERION_FOUND |
| SGP41 | NOx Index | Não foi encontrado critério equivalente ao índice | — | NO₂/concentração não equivale a NOx Index | Fornece índice relativo, não concentração | Não converter em concentração nem aplicar critério de NO₂ | NO_SPECIFIC_CRITERION_FOUND |

## Regras de interpretação

### CO₂

Os diferenciais de 500 ppm e 700 ppm não devem ser registrados como limite universal de concentração interna. A aplicação depende de condições de ventilação/renovação e da concentração externa. O SCD41 fornece somente CO₂ interno.

### PM2.5 e PM10

As referências são temporais: PM2.5 = 25 µg/m³ / 24 h e PM10 = 50 µg/m³ / 24 h. Leituras instantâneas do SPS30 podem indicar elevação ambiental, mas não constituem PASS/FAIL de uma referência de 24 h sem a série temporal e o cálculo correspondente.

### Temperatura e umidade relativa

A norma reconhece ambos como parâmetros de interesse/visualização, mas esta consolidação não identificou novo limite universal da Parte 3 que substitua critérios de outras fontes. Valores de outras normas não devem ser copiados para este registro.

### VOC Index e NOx Index

Não há equivalência normativa explícita entre VOC Index e COV/COVT, nem entre NOx Index e NO₂. Os critérios de concentração não podem ser aplicados diretamente aos índices do SGP41.

## Registros Knowledge recomendados

Sem qualquer promoção automática para Runtime:

1. `abnt_nbr_16401_3_2024_co2`
2. `abnt_nbr_16401_3_2024_pm25_24h`
3. `abnt_nbr_16401_3_2024_pm10_24h`
4. `abnt_nbr_16401_3_2024_temperature`
5. `abnt_nbr_16401_3_2024_relative_humidity`
6. `abnt_nbr_16401_3_2024_voc_index`
7. `abnt_nbr_16401_3_2024_nox_index`

## Auditoria do catálogo legado `abnt_nbr_16401.js`

O catálogo legado deve ser preservado como material de proveniência até sua reconciliação, mas não deve ser copiado diretamente para Knowledge.

**Confirmado:** a associação temática com HVAC, IAQ, ventilação, conforto térmico, CO₂, PM2.5 e PM10 é coerente com a Parte 3.

**Desatualizado ou insuficiente:** identificação genérica da família ABNT NBR 16401; versão/ano antigos; status de atualidade; aplicação direta a Residential; ausência de granularidade paramétrica; ausência de distinção adequada entre concentração, índice, referência de projeto e período de avaliação.

**Não sustentado:** equivalência VOC Index↔COV/COVT; equivalência NOx Index↔NO₂; CO₂ interno isolado como conformidade universal; PM2.5/PM10 instantâneos como conformidade de 24 h.

## Conclusão

A NBR 16401-3:2024 está consolidada em nível paramétrico para os sete parâmetros avaliados. PM2.5 e PM10 possuem referências de 24 h; CO₂ possui referência contextual ligada à renovação de ar; temperatura e umidade relativa são parâmetros de monitoramento/visualização sem novo threshold universal consolidado nesta etapa; VOC Index e NOx Index não possuem critério equivalente.

Nenhum resultado constitui autorização automática de Runtime. A materialização dos registros em `knowledge/` deve ocorrer somente em etapa posterior, mediante autorização explícita.
