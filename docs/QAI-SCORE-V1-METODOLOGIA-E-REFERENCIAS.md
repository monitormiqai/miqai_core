# QAI SCORE V1

## Metodologia, Fundamentação Técnica e Rastreabilidade

**Projeto:** MIQAI / CORE QAI
**Componente:** QAI Score V1
**Status:** DOCUMENTO METODOLÓGICO
**Versão:** V1.0
**Data:** 15/09/2026
**Implementação principal:** `src/metrics/calculators/qaiScore.js`
**Conhecimento metodológico:** `src/metrics/config/qaiScoreKnowledge.js`
**Validação metodológica:** `src/metrics/validators/qaiScoreValidation.js`
**Utilitários matemáticos:** `src/metrics/utils/scoreNormalization.js`

---

# 1. Objetivo deste documento

Este documento estabelece a fundamentação metodológica, técnica e científica do **QAI Score V1**, índice utilizado pelo MIQAI / CORE QAI para produzir uma avaliação quantitativa da condição ambiental interna observada no momento da medição.

O objetivo principal é estabelecer, de forma rastreável:

* o que é o QAI Score V1;
* o que ele não representa;
* quais técnicas existentes fundamentam sua construção;
* quais referências técnicas e científicas sustentam os critérios de normalização;
* quais decisões metodológicas pertencem especificamente ao MIQAI;
* como cada componente do Score é transformado em uma escala de 0 a 100;
* como os componentes são agregados;
* como a metodologia é implementada no CORE;
* quais são as limitações de escopo;
* como evitar confusão entre Score, Regulatory e References;
* como futuras alterações da metodologia devem ser governadas.

Este documento deve ser considerado parte da documentação metodológica do CORE QAI e deve permanecer sincronizado com a implementação efetiva do `qaiScoreKnowledge.js` e do `qaiScore.js`.

---

# 2. Definição oficial

## 2.1. Definição

O **QAI Score V1** é um índice proprietário do MIQAI destinado a representar, em uma escala quantitativa de 0 a 100, a condição ambiental interna observada no instante da avaliação.

A metodologia utiliza técnicas existentes de normalização e agregação empregadas na literatura de avaliação de qualidade ambiental interna (Indoor Environmental Quality — IEQ), com especial referência ao framework **ATLAS: A performance-based index for integrated evaluation and benchmarking of indoor environmental quality**.

O MIQAI adapta essas técnicas à arquitetura própria do CORE QAI, utilizando quatro parâmetros obrigatórios na versão V1:

* temperatura;
* umidade relativa;
* PM2.5;
* PM10.

O QAI Score V1 não constitui uma norma técnica, não constitui um limite regulatório e não representa uma classificação oficial emitida por ABNT, WHO, ASHRAE, ISO, EN ou qualquer outra organização normativa.

---

# 3. Natureza metodológica do QAI Score V1

O QAI Score V1 possui duas dimensões distintas de origem:

## 3.1. Fundamentação metodológica existente

A metodologia utiliza conceitos e técnicas que já existem na literatura científica de avaliação de IEQ/IAQ, especialmente:

* normalização de variáveis ambientais;
* transformação de valores físicos em escala de desempenho;
* escala contínua de 0 a 100;
* interpolação linear por trechos;
* agregação de múltiplos indicadores ambientais;
* utilização de referências técnicas para estabelecer faixas de desempenho.

O framework ATLAS constitui a principal referência metodológica utilizada para a estrutura de normalização adotada no QAI Score V1.

---

## 3.2. Adaptação metodológica do MIQAI

O MIQAI não reproduz integralmente o índice ATLAS.

O QAI Score V1 constitui uma **adaptação metodológica própria**, na qual o MIQAI define:

* o conjunto de parâmetros utilizados;
* a aplicação simultânea dos quatro parâmetros;
* os pesos dos componentes;
* a técnica específica de agregação utilizada na versão V1;
* a regra de indisponibilidade quando um componente obrigatório está ausente;
* a identificação do `dominantFactor`;
* a classificação operacional do resultado;
* a aplicação da metodologia à arquitetura multidomínio do MIQAI;
* a integração do Score ao contrato de saída do CORE.

Portanto:

> **O ATLAS fornece a principal base metodológica para a normalização ambiental utilizada pelo QAI Score V1, enquanto a composição, agregação e regras operacionais do índice constituem uma adaptação específica do MIQAI.**

---

# 4. Linhagem metodológica

A linhagem conceitual do QAI Score V1 pode ser representada da seguinte forma:

```text
Literatura científica de IEQ / IAQ
            │
            ▼
Índices e subíndices ambientais
            │
            ├── normalização
            ├── escalas de desempenho
            ├── ponderação
            └── agregação
            │
            ▼
ATLAS IEQ
            │
            ├── escala contínua 0–100
            ├── normalização ambiental
            ├── interpolação linear por trechos
            └── critérios de desempenho
            │
            ▼
ADAPTAÇÃO METODOLÓGICA MIQAI
            │
            ├── Temperatura
            ├── Umidade
            ├── PM2.5
            └── PM10
            │
            ├── peso 25% cada
            ├── média geométrica ponderada
            ├── regra de disponibilidade
            └── dominantFactor
            │
            ▼
QAI SCORE V1
```

Essa representação é importante porque impede que o QAI Score V1 seja descrito incorretamente como sendo o próprio ATLAS.

---

# 5. Principal referência metodológica

## 5.1. ATLAS IEQ

A principal referência metodológica utilizada pelo QAI Score V1 é:

**Du, Crosby, Van Rooyen e Licina.**

**ATLAS: A performance-based index for integrated evaluation and benchmarking of indoor environmental quality.**

*Building and Environment.*

Volume 304, Part A, 2026, Article 114985.

DOI:

`10.1016/j.buildenv.2026.114985`

O trabalho apresenta um framework de avaliação de IEQ baseado em desempenho e utiliza uma escala contínua de 0 a 100, com normalização dos parâmetros ambientais e agregação dos resultados.

O ATLAS constitui, portanto, a principal referência para a estrutura metodológica de normalização adotada no QAI Score V1.

---

# 6. O que foi aproveitado do ATLAS

O QAI Score V1 utiliza, como base metodológica, os seguintes conceitos presentes no ATLAS:

## 6.1. Escala contínua de 0 a 100

Os parâmetros ambientais são transformados em uma escala comum:

```text
0   = pior condição dentro da curva definida
100 = condição ótima dentro da curva definida
```

Isso permite que grandezas físicas diferentes sejam comparadas e agregadas.

Por exemplo:

```text
Temperatura → °C
Umidade     → %
PM2.5       → µg/m³
PM10        → µg/m³
```

não podem ser agregados diretamente em suas unidades originais.

A normalização transforma todos os parâmetros em uma escala comum.

---

## 6.2. Normalização por interpolação linear por trechos

O QAI Score V1 utiliza a técnica de **piecewise linear interpolation**, implementada no CORE por:

```text
src/metrics/utils/scoreNormalization.js
```

A função principal é:

```text
normalizePiecewise(value, points)
```

A função recebe pontos de controle:

```text
valor físico → score
```

e determina o Score correspondente por interpolação linear entre os pontos adjacentes.

Exemplo:

```text
23.0 °C → 50
23.5 °C → 100
```

Uma temperatura intermediária de 23,25 °C será posicionada linearmente entre esses dois pontos.

---

# 7. Componentes do QAI Score V1

A versão V1 possui quatro componentes obrigatórios:

```text
Temperature Index
Humidity Index
PM2.5 Index
PM10 Index
```

Cada componente recebe peso:

```text
0.25
```

ou:

```text
25%
```

A soma dos pesos é:

```text
0.25 + 0.25 + 0.25 + 0.25 = 1.00
```

---

# 8. Temperatura

## 8.1. Curva utilizada

A curva atualmente aprovada é:

```text
22.0 °C → 0
23.0 °C → 50
23.5 °C → 100
25.5 °C → 100
26.0 °C → 50
27.0 °C → 0
```

Representação conceitual:

```text
Score
100 |        ┌───────────────┐
    |       /                 \
 50 |──────/                   \──────
    |     /                     \
  0 |────┘                       └────
       22  23 23.5        25.5 26 27 °C
```

## 8.2. Fundamentação

Os pontos utilizados são derivados da estrutura de normalização apresentada pelo ATLAS para condições térmicas em ambiente mecanicamente condicionado.

O ATLAS, por sua vez, utiliza referências técnicas relacionadas ao conforto térmico, incluindo EN 16798-1.

---

# 9. Umidade relativa

## 9.1. Curva utilizada

```text
20% → 0
25% → 50
30% → 100
50% → 100
60% → 50
70% → 0
```

Representação conceitual:

```text
Score
100 |          ┌──────────────┐
    |         /                \
 50 |────────/                  \────────
    |       /                    \
  0 |──────┘                      └──────
       20 25 30             50 60 70 %
```

## 9.2. Fundamentação

A curva segue a estrutura de normalização de umidade utilizada na metodologia ATLAS, relacionada a referências técnicas de condições ambientais internas.

---

# 10. PM2.5

## 10.1. Curva utilizada

```text
5 µg/m³  → 100
15 µg/m³ → 50
35 µg/m³ → 0
```

A normalização é monotonicamente decrescente.

Quanto maior a concentração de PM2.5 dentro da curva definida, menor o Score correspondente.

---

## 10.2. Fundamentação

Os pontos utilizados estão alinhados à metodologia de normalização apresentada pelo ATLAS.

As referências associadas incluem os valores de qualidade do ar da **WHO Air Quality Guidelines 2021**, particularmente para PM2.5.

É importante distinguir:

```text
WHO
  ↓
referência científica de qualidade do ar

ATLAS
  ↓
utilização de referências para construção da curva de desempenho

MIQAI
  ↓
utilização/adaptação dessa estrutura no QAI Score V1
```

A WHO não define o QAI Score V1.

---

# 11. PM10

## 11.1. Curva utilizada

```text
15 µg/m³ → 100
45 µg/m³ → 50
70 µg/m³ → 0
```

Assim como PM2.5, a normalização é monotonicamente decrescente.

---

## 11.2. Fundamentação

Os pontos utilizados são derivados da estrutura metodológica utilizada pelo ATLAS.

As referências associadas incluem a **WHO Air Quality Guidelines 2021** para PM10.

Novamente:

> A WHO fornece referências de qualidade do ar; ela não define a fórmula do QAI Score V1.

---

# 12. Matriz de origem metodológica

| Elemento                        | Origem principal             | Papel no QAI Score V1  |
| ------------------------------- | ---------------------------- | ---------------------- |
| Escala 0–100                    | ATLAS / literatura IEQ       | Normalização           |
| Interpolação linear por trechos | ATLAS                        | Cálculo do componente  |
| Temperatura                     | ATLAS / referências térmicas | Curva de normalização  |
| Umidade                         | ATLAS / referências térmicas | Curva de normalização  |
| PM2.5                           | ATLAS / WHO AQG              | Curva de normalização  |
| PM10                            | ATLAS / WHO AQG              | Curva de normalização  |
| Pesos de 25%                    | MIQAI                        | Composição V1          |
| Média geométrica ponderada      | MIQAI                        | Agregação V1           |
| Quatro parâmetros obrigatórios  | MIQAI                        | Definição V1           |
| `dominantFactor`                | MIQAI                        | Informação analítica   |
| Regra de Score indisponível     | MIQAI                        | Governança operacional |
| Classificação `GOOD` etc.       | MIQAI                        | Apresentação do índice |
| Aplicação aos Domains           | MIQAI                        | Arquitetura do produto |

---

# 13. Agregação dos componentes

Após a normalização, cada parâmetro possui um Score individual:

```text
S_temperature
S_humidity
S_pm25
S_pm10
```

Cada componente possui peso:

```text
w = 0.25
```

O QAI Score V1 utiliza uma **média geométrica ponderada**.

A forma geral é:

```text
QAI Score =
    exp(
        Σ wi × ln(Si)
    )
```

com:

```text
Σ wi = 1
```

Para quatro componentes com pesos iguais:

```text
QAI Score =
    (S_temperature ×
     S_humidity ×
     S_pm25 ×
     S_pm10)^(1/4)
```

A implementação trata explicitamente o caso de componente igual a zero.

Se qualquer componente obrigatório resultar em Score 0, a média geométrica resulta em:

```text
QAI Score = 0
```

---

# 14. Por que utilizar média geométrica

A média geométrica evita que um componente muito elevado compense excessivamente um componente muito baixo.

Por exemplo:

```text
Componente A = 100
Componente B = 100
Componente C = 100
Componente D = 10
```

Uma média aritmética produziria:

```text
77,5
```

A média geométrica produz um resultado significativamente menor, refletindo a presença de uma condição ambiental muito pior em um dos componentes.

Essa escolha representa uma decisão metodológica do MIQAI para a versão V1.

O uso dessa agregação deve, portanto, ser descrito como:

> **decisão metodológica específica do QAI Score V1**

e não como uma reprodução literal da fórmula do ATLAS.

---

# 15. Regra de disponibilidade

O QAI Score V1 exige os quatro componentes:

```text
temperature
humidity
pm25
pm10
```

Se qualquer um deles estiver ausente, inválido ou indisponível para o cálculo:

```text
QAI Score = UNKNOWN / unavailable
```

O MIQAI não realiza uma média parcial utilizando apenas os componentes disponíveis.

Essa decisão evita que um Score calculado com informação incompleta seja apresentado como equivalente a um Score calculado com o conjunto completo.

---

# 16A. Separação entre Validation, Regulatory e QAI Score

O CORE QAI possui camadas distintas de avaliação que atuam sobre os mesmos dados de sensores, mas possuem finalidades diferentes.

Essas camadas não representam fontes concorrentes de validação e não devem ser interpretadas como duas metodologias alternativas para produzir o mesmo resultado.

A arquitetura correta é:

```text
                    DADO DO SENSOR
                          │
                          ▼
                      VALIDATION
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
         REGULATORY               QAI SCORE
              │                       │
              │                       │
      referências aplicáveis      metodologia V1
      e avaliação técnica             │
              │                       │
              ▼                       ▼
       assessment técnico       score 0–100
```

---

## 16A.1. Validation

A camada `Validation` verifica a condição do dado e sua possibilidade de utilização pelas etapas subsequentes do CORE.

Entre suas funções estão:

* verificar presença do valor;
* verificar validade do parâmetro;
* identificar ausência (`MISSING`);
* determinar condições necessárias para avaliação;
* transportar informações necessárias para as camadas analíticas.

A Validation não define a metodologia do QAI Score.

---

## 16A.2. Regulatory

A camada Regulatory relaciona os parâmetros medidos às referências técnicas e critérios aplicáveis ao contexto analisado.

Pode utilizar referências como:

* ABNT;
* WHO;
* ASHRAE;
* outras fontes catalogadas no CORE.

A camada Regulatory pode produzir estados como:

```text
WITHIN_REFERENCE
ABOVE_REFERENCE
BELOW_REFERENCE
NOT_ASSESSED
OBSERVATION
```

e também determinar características como:

* período de avaliação;
* necessidade de histórico;
* referência aplicável;
* critério;
* aplicabilidade;
* natureza da avaliação.

Portanto:

> **Regulatory responde à pergunta: “Como o parâmetro observado se relaciona com uma referência técnica aplicável?”**

---

## 16A.3. QAI Score V1

O QAI Score V1 possui metodologia própria e independente da avaliação regulatória.

Depois que os dados necessários estão disponíveis e validados, o Score utiliza seu próprio Knowledge:

```text
src/metrics/config/qaiScoreKnowledge.js
```

Esse Knowledge define:

* parâmetros participantes;
* curvas de normalização;
* pontos de controle;
* pesos;
* período aplicável;
* referências metodológicas;
* status de aprovação.

O Calculator:

```text
src/metrics/calculators/qaiScore.js
```

utiliza essas informações para produzir os componentes normalizados e o Score agregado.

Portanto:

> **QAI Score responde à pergunta: “Qual pontuação a condição observada recebe segundo a metodologia do QAI Score V1?”**

---

## 16A.4. O papel específico do `qaiScoreValidation.js`

O arquivo:

```text
src/metrics/validators/qaiScoreValidation.js
```

não constitui uma segunda camada Regulatory.

Sua função é verificar se um parâmetro possui as condições metodológicas necessárias para participar do QAI Score.

Ele consulta:

```text
QAI_SCORE_KNOWLEDGE
```

e verifica, entre outros aspectos:

* se o parâmetro pertence ao universo oficial do Score;
* se o Knowledge está `APPROVED`;
* se existe método de normalização;
* se existe configuração de normalização;
* se existe peso válido;
* se existe valor validado;
* se houver requisito temporal no Knowledge, se a avaliação temporal necessária está disponível.

Assim:

```text
qaiScoreValidation
        ↓
"este parâmetro pode participar do Score?"
```

e não:

```text
qaiScoreValidation
        ↓
"este parâmetro está conforme uma norma?"
```

A segunda pergunta pertence ao Regulatory.

---

# 16A.5. Duas avaliações sobre o mesmo parâmetro

Um mesmo valor físico pode produzir resultados diferentes nas duas camadas sem existir contradição.

Exemplo:

```text
Temperatura = 23 °C
```

### Regulatory

```text
23 °C
   ↓
referência aplicável
   ↓
WITHIN_REFERENCE
```

### QAI Score

```text
23 °C
   ↓
curva do QAI Score V1
   ↓
Temperature Index = 50
```

Os resultados são diferentes porque as perguntas são diferentes.

O primeiro representa uma relação com uma referência técnica.

O segundo representa uma posição dentro da curva de desempenho do índice.

---

# 16A.6. Não existe equivalência entre Score e conformidade

O CORE não deve interpretar:

```text
Score alto
=
conformidade normativa
```

nem:

```text
Score baixo
=
não conformidade normativa
```

O Score não substitui a camada Regulatory.

Da mesma forma, o resultado Regulatory não deve ser utilizado automaticamente como Score.

---

# 16A.7. Referências também possuem funções diferentes

Uma referência pode aparecer em diferentes camadas do CORE com funções diferentes.

Por exemplo:

```text
ABNT NBR 17037
       ↓
Regulatory
       ↓
critério/referência aplicável
```

enquanto:

```text
ATLAS IEQ
       ↓
QAI Score Knowledge
       ↓
fundamentação metodológica da normalização
```

Portanto, a simples presença de uma referência no objeto de um parâmetro não significa que essa referência seja a fonte da fórmula do QAI Score.

---

# 16A.8. `references.primary` não representa necessariamente a referência do Score

O campo:

```text
references.primary
```

é produzido pelo mecanismo:

```text
src/references/resolver.js
```

Esse mecanismo resolve referências a partir das camadas pertinentes da análise, incluindo Regulatory, Evidence, Diagnosis e Hypothesis.

Consequentemente:

```text
references.primary
```

não deve ser interpretado automaticamente como:

```text
qaiScore.methodology.reference
```

São conceitos distintos.

O Score possui sua própria fundamentação metodológica no:

```text
QAI_SCORE_KNOWLEDGE
```

enquanto `references.primary` representa a referência principal resolvida para o contexto geral da análise.

---

# 16A.9. Exemplo de coexistência no JSON

Uma saída do CORE pode conter simultaneamente:

```json
{
  "metrics": {
    "qaiScore": {
      "score": 83
    }
  },

  "validation": {
    "temperature": {
      "value": 23
    }
  },

  "regulatory": {
    "temperature": {
      "regulatoryId": "abnt_nbr_17037",
      "currentAssessment": "WITHIN_REFERENCE"
    }
  },

  "references": {
    "primary": {
      "reference": {
        "id": "ashrae55"
      }
    }
  }
}
```

Esses campos não representam quatro fontes concorrentes para o Score.

Eles representam informações de camadas diferentes:

```text
validation
    → condição/validade do dado

regulatory
    → relação com referência técnica

qaiScore
    → resultado do índice

references
    → fundamentação referencial da análise
```

---

# 16A.10. Regra arquitetural

A regra oficial do CORE QAI é:

> **Validation valida a disponibilidade e as condições de uso dos dados; Regulatory avalia sua relação com referências aplicáveis; QAI Score normaliza e agrega os parâmetros segundo sua metodologia própria; References organiza a fundamentação referencial da análise.**

Nenhuma dessas camadas deve substituir outra.

---

# 16A.11. Regra de interpretação

Quando uma mesma variável aparecer em mais de uma camada, deve-se identificar primeiro a finalidade do campo.

Exemplo:

```text
temperature.value
```

representa o valor medido.

```text
temperature.regulatoryId
```

representa a referência utilizada pela avaliação Regulatory.

```text
qaiScore.components[].score
```

representa a pontuação normalizada do componente no QAI Score.

Esses campos não devem ser semanticamente fundidos.

---

# 16A.12. Princípio de independência metodológica

O QAI Score V1 deve permanecer metodologicamente independente da seleção da referência primária do mecanismo `References`.

Isso significa que uma alteração na referência primária de uma análise não deve, por si só, alterar o cálculo do Score.

Da mesma forma, uma alteração metodológica do Score não deve, por si só, alterar a resolução de `references.primary`.

A menos que uma alteração seja explicitamente projetada para afetar ambas as camadas, seus ciclos de evolução devem permanecer independentes.

---

# 16A.13. Modelo mental oficial

O modelo simplificado para manutenção futura do CORE é:

```text
DADO
 │
 ▼
VALIDATION
 │
 ├───────────────────────┐
 │                       │
 ▼                       ▼
REGULATORY            QAI SCORE
 │                       │
 │                       ├── Knowledge
 │                       ├── Normalização
 │                       └── Agregação
 │
 └── Referências
       │
       ▼
    REFERENCES
       │
       ▼
      JSON
```

O princípio fundamental permanece:

> **CORE produz inteligência. Cada camada produz o tipo de informação para o qual foi projetada. JSON transporta a resposta. Dashboard apresenta.**


# 17. Exemplo prático

Considere:

```text
Temperatura = 23 °C
Umidade     = 50%
PM2.5       = 6 µg/m³
PM10        = 12 µg/m³
```

A normalização produz aproximadamente:

```text
Temperatura → 50
Umidade     → 100
PM2.5       → 95
PM10        → 100
```

Com pesos iguais, a agregação produz aproximadamente:

```text
QAI Score = 83
```

O resultado é:

```text
Score = 83
```

com classificação:

```text
GOOD
```

e:

```text
dominantFactor = temperature
```

porque temperatura é o componente com menor Score individual.

---

# 18. O que o Score 83 significa

O valor:

```text
83
```

significa que, segundo a curva de normalização e a agregação definidas pelo QAI Score V1, a condição observada naquele instante recebeu uma pontuação quantitativa de 83/100.

Não significa:

```text
83% de conformidade
```

Não significa:

```text
83% de qualidade do ar
```

Não significa:

```text
83% de segurança
```

Não significa:

```text
83% de saúde
```

Não significa:

```text
83% de atendimento à ABNT
```

Também não significa que o ambiente esteja “83% dentro da norma”.

O Score é um **índice de desempenho ambiental normalizado**, não um índice de conformidade normativa.

---

# 19. Relação entre Score e conformidade

A seguinte equivalência é proibida:

```text
Score alto = conformidade normativa
```

Da mesma forma:

```text
Score baixo = não conformidade normativa
```

não é uma regra válida.

É possível existir:

```text
Score alto
+
critério regulatório específico não atendido
```

ou:

```text
Score baixo
+
nenhuma não conformidade normativa formal identificada
```

porque são avaliações diferentes.

---

# 20. Separação temporal

A separação temporal é especialmente importante para PM2.5 e PM10.

O Regulatory pode utilizar referência:

```text
24h_mean
```

enquanto o QAI Score V1 utiliza:

```text
instant
```

Portanto:

```text
PM2.5 atual = 30 µg/m³
```

pode produzir uma redução no componente PM2.5 do Score imediatamente.

Isso não significa automaticamente:

```text
PM2.5 24h_mean = 30 µg/m³
```

nem:

```text
falha regulatória de 24 horas
```

O histórico necessário para avaliação temporal permanece responsabilidade da camada Regulatory/Validation.

---

# 21. Temperatura e umidade também possuem duas perspectivas

Um valor pode estar dentro de uma referência técnica utilizada pelo Regulatory e, simultaneamente, receber uma pontuação inferior a 100 no QAI Score.

Exemplo:

```text
Temperatura = 23 °C
```

Pode estar:

```text
REGULATORY
→ dentro da referência aplicável
```

e:

```text
QAI SCORE
→ 50 pontos
```

Isso não é contradição.

As duas camadas respondem perguntas diferentes.

---

# 22. QAI Score não é um índice oficial de uma norma

O QAI Score V1 não deve ser apresentado como:

* “índice da ABNT”;
* “índice da WHO”;
* “índice da ASHRAE”;
* “índice da EN 16798-1”;
* “índice oficial ATLAS”.

A formulação correta é:

> **QAI Score V1 é um índice proprietário do MIQAI, construído mediante adaptação de técnicas de avaliação e normalização de qualidade ambiental interna descritas na literatura científica, tendo o framework ATLAS como principal referência metodológica para sua estrutura de normalização.**

---

# 23. Relação com ATLAS

O QAI Score V1 não deve ser descrito como uma implementação integral do ATLAS.

O ATLAS possui escopo e arquitetura próprios.

O MIQAI utiliza conceitos do ATLAS e os adapta ao seu modelo de produto e ao CORE QAI.

A relação correta é:

```text
ATLAS
= referência metodológica

QAI Score V1
= adaptação metodológica MIQAI
```

e não:

```text
ATLAS
= QAI Score V1
```

---

# 24. Escopo de aplicação

O QAI Score V1 está atualmente configurado no Knowledge para os seguintes Domains:

```text
corporate
healthcare
education
residential
datacenter
```

Entretanto, essa configuração representa uma decisão de arquitetura e produto do MIQAI.

Ela não deve ser interpretada como evidência de que o ATLAS publicou ou validou especificamente o mesmo Score para todos esses ambientes.

Particularmente, a documentação científica do ATLAS deve ser respeitada quanto ao seu próprio escopo e população de referência.

Assim:

> A aplicação multidomínio do QAI Score V1 constitui uma extensão controlada do MIQAI e não deve ser apresentada como validação externa do ATLAS para todos os Domains do MIQAI.

---

# 25. Conhecimento separado do cálculo

O CORE utiliza uma separação explícita entre conhecimento e cálculo.

## Knowledge

Arquivo:

```text
src/metrics/config/qaiScoreKnowledge.js
```

Responsável por definir:

* parâmetros;
* aplicabilidade;
* unidade;
* período;
* curvas;
* pontos;
* pesos;
* referências metodológicas;
* status de aprovação.

## Calculator

Arquivo:

```text
src/metrics/calculators/qaiScore.js
```

Responsável por:

* obter os valores validados;
* obter a curva do Knowledge;
* normalizar;
* agregar;
* identificar o fator dominante;
* retornar o resultado.

O calculator não deve conter números metodológicos hard-coded.

---

# 26. Rastreabilidade metodológica

Cada critério do QAI Score deve possuir rastreabilidade até sua origem.

A cadeia recomendada é:

```text
QAI Score
    ↓
parâmetro
    ↓
ponto da curva
    ↓
referência metodológica
    ↓
fonte primária
    ↓
seção / tabela / figura
    ↓
interpretação MIQAI
    ↓
decisão metodológica
    ↓
implementação no Knowledge
```

Essa rastreabilidade é requisito para futuras revisões.

---

# 27. Matriz de rastreabilidade atual

## Temperatura

```text
Parâmetro:
temperature

Curva:
22 → 0
23 → 50
23.5 → 100
25.5 → 100
26 → 50
27 → 0

Base metodológica:
ATLAS IEQ

Referência técnica associada:
EN 16798-1

Implementação:
qaiScoreKnowledge.temperature
```

---

## Umidade

```text
Parâmetro:
humidity

Curva:
20 → 0
25 → 50
30 → 100
50 → 100
60 → 50
70 → 0

Base metodológica:
ATLAS IEQ

Referência técnica associada:
EN 16798-1

Implementação:
qaiScoreKnowledge.humidity
```

---

## PM2.5

```text
Parâmetro:
pm25

Curva:
5 → 100
15 → 50
35 → 0

Base metodológica:
ATLAS IEQ

Referência de qualidade do ar:
WHO AQG 2021

Período do Regulatory:
24h_mean

Período do Score:
instant

Implementação:
qaiScoreKnowledge.pm25
```

---

## PM10

```text
Parâmetro:
pm10

Curva:
15 → 100
45 → 50
70 → 0

Base metodológica:
ATLAS IEQ

Referência de qualidade do ar:
WHO AQG 2021

Período do Regulatory:
24h_mean

Período do Score:
instant

Implementação:
qaiScoreKnowledge.pm10
```

---

# 28. O papel das referências no JSON

A saída do CORE pode conter simultaneamente:

```text
metrics.qaiScore
```

e:

```text
references.primary
```

Esses campos não possuem necessariamente a mesma finalidade.

`metrics.qaiScore` representa o resultado do cálculo do índice.

`references.primary` representa a referência principal resolvida pelo mecanismo de References para a análise do contexto.

Portanto, uma saída como:

```json
{
  "metrics": {
    "qaiScore": {
      "score": 83
    }
  },
  "references": {
    "primary": {
      "reference": {
        "id": "ashrae55"
      }
    }
  }
}
```

não significa que o Score 83 foi calculado pela ASHRAE 55.

Da mesma forma, se `abnt_nbr_17037` aparecer na camada Regulatory, isso não significa que a ABNT seja a fórmula do Score.

---

# 29. Governança da metodologia

Qualquer alteração em:

* pontos da curva;
* parâmetros;
* pesos;
* método de agregação;
* escala;
* classificação;
* disponibilidade;
* aplicabilidade;
* referências metodológicas;

deve ser tratada como alteração metodológica e não como simples alteração de código.

A alteração deve possuir:

1. justificativa;
2. fonte técnica ou científica;
3. análise de impacto;
4. atualização do Knowledge;
5. atualização desta documentação;
6. testes automatizados;
7. atualização de versão;
8. registro da decisão.

---

# 30. Regra de não alteração silenciosa

Não é permitido alterar números do Score diretamente no calculator.

Por exemplo, não deve existir:

```js
if (temperature < 23) {
    score = ...
}
```

dentro do cálculo para introduzir novos critérios.

Os parâmetros devem permanecer no Knowledge.

A arquitetura correta é:

```text
Knowledge
    ↓
Validation
    ↓
Calculator
```

e não:

```text
Calculator
    ↓
regras ocultas
```

---

# 31. Relação com a Biblioteca de Conhecimento

O QAI Score V1 deve permanecer conectado à estratégia CORE-first da Biblioteca de Conhecimento.

A cadeia é:

```text
CORE precisa calcular Score
        ↓
identifica o conhecimento necessário
        ↓
identifica a fonte técnica
        ↓
verifica escopo
        ↓
verifica aplicabilidade
        ↓
registra critério
        ↓
registra interpretação
        ↓
registra referência
        ↓
atualiza Knowledge
        ↓
testa
        ↓
utiliza no CORE
```

A Biblioteca não deve ser utilizada para inserir referências apenas por associação temática.

Cada referência deve possuir função explícita.

---

# 32. O que a ABNT NBR 17037 representa no sistema

A ABNT NBR 17037 pode participar da camada Regulatory do MIQAI para parâmetros como:

* temperatura;
* umidade;
* CO2;
* PM2.5;
* PM10.

Sua presença nessa camada não significa que ela seja a base matemática do QAI Score V1.

Exemplo:

```text
ABNT NBR 17037
      ↓
Regulatory
      ↓
currentAssessment
referenceIds
criterion
temporalAssessment
```

enquanto:

```text
ATLAS
      ↓
QAI Score Knowledge
      ↓
normalization points
      ↓
component score
```

---

# 33. O que a WHO representa

A WHO Air Quality Guidelines fornece referências científicas para qualidade do ar.

No QAI Score V1, suas referências são utilizadas como parte da fundamentação dos parâmetros particulados.

A WHO não define:

```text
QAI Score V1
```

nem:

```text
peso 25%
```

nem:

```text
dominantFactor
```

nem:

```text
classificação GOOD
```

nem:

```text
média geométrica ponderada do MIQAI
```

Esses elementos pertencem à metodologia MIQAI.

---

# 34. O que a EN 16798-1 representa

A EN 16798-1 fornece referências técnicas relacionadas ao ambiente térmico e às condições ambientais internas.

No QAI Score V1, ela aparece como referência associada às curvas de temperatura e umidade.

Ela não define o QAI Score V1.

---

# 35. O que pertence exclusivamente ao MIQAI

Os seguintes elementos devem ser considerados decisões metodológicas do MIQAI:

```text
QAI Score V1
```

```text
quatro componentes obrigatórios
```

```text
25% para cada componente
```

```text
média geométrica ponderada
```

```text
Score indisponível quando componente obrigatório falta
```

```text
dominantFactor
```

```text
classificação operacional do Score
```

```text
integração ao CORE QAI
```

```text
aplicação aos Domains do MIQAI
```

```text
contrato JSON
```

---

# 36. Limitações metodológicas

O QAI Score V1 deve ser interpretado dentro de suas limitações.

## 36.1. Não é diagnóstico médico

O Score não representa:

* risco individual à saúde;
* diagnóstico clínico;
* probabilidade de doença;
* avaliação médica.

---

## 36.2. Não é conformidade normativa

O Score não substitui:

* avaliação regulatória;
* avaliação técnica;
* inspeção;
* medição histórica;
* avaliação de conformidade.

---

## 36.3. É uma avaliação instantânea

A versão V1 utiliza os valores disponíveis no momento da avaliação.

Isso é especialmente relevante para PM2.5 e PM10, cujas referências regulatórias podem exigir avaliação temporal.

---

## 36.4. Não representa todos os aspectos de IEQ

A versão V1 não inclui:

* acústica;
* iluminação;
* percepção subjetiva dos ocupantes;
* VOC no Score;
* CO2 no Score;
* NOx no Score;
* ocupação;
* PM1;
* PM4;
* contagem de partículas;
* ponto de orvalho.

Esses parâmetros podem existir no CORE para outros objetivos analíticos.

---

# 37. Parâmetros explicitamente excluídos do Score V1

A exclusão não significa que esses parâmetros sejam irrelevantes para IAQ.

Significa apenas que não fazem parte da composição do índice V1.

```text
CO2
VOC
NOx
occupancy
PM1
PM4
NC0.5
NC1
NC2.5
NC4
NC10
Typical Particle Size
Dew Point
Health Risk
```

Esses parâmetros podem possuir:

* análise;
* diagnóstico;
* evidência;
* hipótese;
* referência;
* contexto;

em outras partes do CORE.

---

# 38. Evolução futura

O QAI Score V1 deve ser tratado como uma versão metodológica congelada.

Uma futura versão:

```text
QAI Score V2
```

não deve simplesmente substituir os critérios V1.

Ela deverá possuir:

* nova definição;
* nova documentação;
* novas referências;
* análise comparativa;
* testes;
* versionamento;
* decisão de governança.

A existência de V2 não deve alterar retroativamente a interpretação dos resultados produzidos pela V1.

---

# 39. Reprodutibilidade

Dado o mesmo conjunto de entradas válidas e o mesmo Knowledge versionado, o QAI Score deve produzir o mesmo resultado.

Exemplo:

```text
temperature = 23
humidity    = 50
pm25        = 6
pm10        = 12
```

deve produzir deterministicamente:

```text
QAI Score = 83
```

considerando o arredondamento definido pela implementação atual.

Isso permite:

* testes automatizados;
* auditoria;
* reprodução;
* comparação de versões;
* validação de regressões.

---

# 40. Relação com o Dashboard

O Dashboard não calcula o QAI Score.

O fluxo oficial é:

```text
Sensores
   ↓
ESP32
   ↓
API
   ↓
CORE QAI
   ↓
QAI Score
   ↓
JSON
   ↓
Server
   ↓
Dashboard
```

O Dashboard recebe:

```text
score
level
dominantFactor
components
```

e apenas apresenta essas informações.

O Dashboard não deve:

* recalcular Score;
* alterar pesos;
* interpretar referências;
* aplicar curvas próprias;
* criar classificação;
* criar diagnóstico.

---

# 41. Regra institucional

A definição institucional recomendada é:

> **O QAI Score V1 é um índice proprietário do MIQAI para normalização e agregação de condições ambientais internas. Sua metodologia é fundamentada em técnicas de avaliação contínua de qualidade ambiental interna descritas na literatura científica, tendo o framework ATLAS como principal referência metodológica para a normalização dos parâmetros. O MIQAI adapta essa metodologia ao seu conjunto de parâmetros, pesos, agregação e arquitetura multidomínio. O QAI Score não constitui uma avaliação de conformidade normativa e não substitui referências técnicas, regulamentares ou avaliações temporais específicas.**

---

# 42. Formulação curta para documentação técnica

Quando for necessário explicar o Score de forma resumida:

> **QAI Score V1 = normalização 0–100 de temperatura, umidade, PM2.5 e PM10, seguida de agregação geométrica ponderada, utilizando uma metodologia adaptada pelo MIQAI a partir de técnicas de avaliação de IEQ, com o ATLAS IEQ como principal referência metodológica e referências técnicas específicas para cada parâmetro.**

---

# 43. Formulação curta para interface pública

Para o usuário final:

> **O QAI Score V1 é uma pontuação de 0 a 100 que resume as condições ambientais observadas a partir de temperatura, umidade, PM2.5 e PM10. O cálculo utiliza uma metodologia de normalização e agregação desenvolvida pelo MIQAI com base em referências técnicas e científicas de avaliação da qualidade ambiental interna.**

---

# 44. Formulação para auditoria técnica

> **O QAI Score V1 não é uma escala normativa. É um índice quantitativo proprietário cuja normalização é baseada em metodologia de avaliação contínua de IEQ, especialmente no framework ATLAS, enquanto sua composição, pesos, agregação e regras operacionais constituem uma adaptação metodológica do MIQAI. As avaliações regulatórias são mantidas em camada independente e não são utilizadas como substitutas da metodologia do Score.**

---

# 45. Referências metodológicas mínimas

## 45.1. ATLAS

Du, Crosby, Van Rooyen e Licina.

**ATLAS: A performance-based index for integrated evaluation and benchmarking of indoor environmental quality.**

*Building and Environment*, Volume 304, Part A, 2026, Article 114985.

DOI:

`10.1016/j.buildenv.2026.114985`

Papel:

```text
principal referência metodológica
```

---

## 45.2. WHO Air Quality Guidelines

World Health Organization.

**WHO global air quality guidelines: particulate matter (PM2.5 and PM10), ozone, nitrogen dioxide, sulfur dioxide and carbon monoxide.**

2021.

Papel:

```text
referência científica para qualidade do ar
```

especialmente:

```text
PM2.5
PM10
```

---

## 45.3. EN 16798-1

**EN 16798-1 — Energy performance of buildings — Ventilation for buildings — Indoor environmental input parameters for design and assessment of energy performance of buildings addressing indoor air quality, thermal environment, lighting and acoustics.**

Papel:

```text
referência técnica associada a condições ambientais internas,
especialmente ambiente térmico.
```

---

# 46. Distinção final entre as fontes

A arquitetura metodológica pode ser resumida assim:

```text
                 QAI SCORE V1
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
BASE METODOLÓGICA              REFERÊNCIAS
        │                           │
        ▼                           ▼
     ATLAS                  EN 16798-1 / WHO
        │
        ▼
ADAPTAÇÃO MIQAI
        │
        ├── parâmetros
        ├── pesos
        ├── agregação
        ├── disponibilidade
        └── classificação
```

Enquanto:

```text
              REGULATORY
                   │
          ┌────────┼────────┐
          ▼        ▼        ▼
        ABNT      WHO     outras
          │
          ▼
 avaliação de referência
```

Os dois fluxos podem coexistir no mesmo resultado do CORE sem que uma referência seja confundida com a outra.

---

# 47. Princípio de governança

O princípio definitivo é:

> **Uma referência técnica só deve ser associada ao QAI Score quando possuir função metodológica explícita no cálculo ou na fundamentação de um de seus critérios.**

A simples presença de uma norma no catálogo Regulatory não autoriza sua associação automática ao Score.

Da mesma forma:

> **Uma referência utilizada pelo QAI Score não deve ser interpretada automaticamente como critério regulatório.**

---

# 48. Estado da metodologia em 15/09/2026

A metodologia QAI Score V1 encontra-se estruturada com:

```text
Parâmetros:
4

Temperatura:
sim

Umidade:
sim

PM2.5:
sim

PM10:
sim

Normalização:
piecewise linear

Escala:
0–100

Pesos:
25% cada

Agregação:
weighted geometric mean

Componente ausente:
Score indisponível

Dominant factor:
sim

CO2:
fora do Score

VOC:
fora do Score

NOx:
fora do Score

Dew Point:
fora do Score

Health Risk:
fora do Score
```

A implementação deve permanecer alinhada a este documento.

---

# 49. Regra de sincronização código ↔ documentação

Sempre que houver alteração em:

```text
src/metrics/config/qaiScoreKnowledge.js
```

deve ser verificado se esta documentação continua correta.

Sempre que houver alteração em:

```text
src/metrics/calculators/qaiScore.js
```

deve ser verificado se:

* a fórmula permanece a mesma;
* a regra de disponibilidade permanece a mesma;
* os componentes permanecem os mesmos;
* a identificação do `dominantFactor` permanece compatível;
* a descrição metodológica continua válida.

Qualquer divergência deve ser tratada como inconsistência de documentação ou alteração metodológica.

---

# 50. Conclusão metodológica

O QAI Score V1 possui fundamentação em técnicas existentes de avaliação quantitativa de qualidade ambiental interna.

Sua principal base metodológica é o framework ATLAS, especialmente no que diz respeito à:

* normalização contínua;
* escala 0–100;
* interpolação linear por trechos;
* utilização de critérios ambientais para produzir índices comparáveis.

Entretanto, o QAI Score V1 não é o ATLAS.

O MIQAI realizou uma adaptação metodológica específica, definindo:

* quatro parâmetros;
* pesos iguais;
* agregação geométrica ponderada;
* regras de disponibilidade;
* identificação do fator dominante;
* classificação operacional;
* integração ao CORE QAI;
* aplicação multidomínio.

Consequentemente, a descrição tecnicamente correta é:

> **QAI Score V1 é um índice proprietário do MIQAI, fundamentado em técnicas científicas de avaliação de IEQ e adaptado a partir do framework ATLAS, com critérios ambientais apoiados por referências técnicas e científicas específicas.**

O Score deve permanecer conceitualmente separado das camadas:

```text
Regulatory
References
Diagnostics
Evidence
Hypotheses
Mitigation
```

e deve continuar sendo produzido exclusivamente pelo CORE QAI.

---

# 51. Regra final

```text
CORE produz inteligência.
Knowledge fundamenta a metodologia.
QAI Score normaliza e agrega.
Regulatory avalia referências aplicáveis.
References documenta fundamentações.
JSON transporta a resposta.
Dashboard apresenta.
```

Essa separação constitui parte da arquitetura metodológica oficial do MIQAI.
