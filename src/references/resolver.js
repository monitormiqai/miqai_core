/**
 * ======================================================================
 * CORE QAI
 * Reference Resolver
 * ----------------------------------------------------------------------
 * Arquivo   : resolver.js
 * Módulo    : References
 * Versão    : 1.0.0
 * Status    : RC3
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Resolver as referências técnicas e normativas relacionadas ao resultado
 * produzido pelo CORE QAI.
 *
 * O Resolver utiliza:
 *
 * - Domain
 * - Validation
 * - Diagnosis
 * - Evidence
 * - Hypotheses
 *
 * para identificar a referência e a seção mais adequada ao contexto
 * analisado.
 *
 * A seleção considera:
 *
 * - jurisdição do ambiente;
 * - aplicabilidade da referência;
 * - aplicabilidade da seção;
 * - correspondência temática;
 * - evidências;
 * - diagnóstico;
 * - hipótese;
 * - prioridade normativa da referência.
 *
 * No contexto brasileiro, referências brasileiras possuem precedência
 * sobre referências internacionais quando ambas forem aplicáveis ao
 * mesmo contexto.
 *
 * A ordem de referenceIds declarada pela Evidence é utilizada como
 * critério de desempate e não substitui a precedência normativa.
 *
 * Esta camada não executa validações.
 * Não produz diagnósticos.
 * Não produz hipóteses.
 * Não produz mitigações.
 * Não cria referências.
 *
 * Apenas resolve e organiza referências existentes no catálogo oficial.
 * ======================================================================
 */

import REFERENCE_CATALOG from "./index.js";

/* ======================================================================
 * HELPERS
 * ======================================================================
 */

/**
 * Normaliza um valor para comparação.
 */

function normalize(value) {

    if (typeof value !== "string") {

        return "";

    }

    return value
        .trim()
        .toLowerCase();

}

/**
 * Verifica se um array contém um valor normalizado.
 */

function includesNormalized(array, value) {

    if (!Array.isArray(array)) {

        return false;

    }

    const target = normalize(value);

    return array.some(

        item => normalize(item) === target

    );

}

/**
 * Verifica se uma seção é aplicável ao ambiente.
 */

function isSectionApplicable(section, environment) {

    /*
     * Se a seção não declarar applicability,
     * ela não deve ser considerada universal
     * automaticamente.
     */

    if (!Array.isArray(section?.applicability)) {

        return false;

    }

    return includesNormalized(

        section.applicability,

        environment

    );

}

/**
 * Verifica se uma referência é aplicável ao ambiente.
 */

function isReferenceApplicable(reference, environment) {

    if (!Array.isArray(reference?.applicability)) {

        return false;

    }

    return includesNormalized(

        reference.applicability,

        environment

    );

}

/**
 * Normaliza a jurisdição.
 */

function normalizeJurisdiction(value) {

    const jurisdiction = normalize(value);

    if (
        jurisdiction === "br" ||
        jurisdiction === "brazil" ||
        jurisdiction === "brasil"
    ) {

        return "BR";

    }

    if (
        jurisdiction === "us" ||
        jurisdiction === "usa" ||
        jurisdiction === "united states" ||
        jurisdiction === "estados unidos"
    ) {

        return "US";

    }

    if (
        jurisdiction === "int" ||
        jurisdiction === "international" ||
        jurisdiction === "internacional"
    ) {

        return "INT";

    }

    return jurisdiction
        ? jurisdiction.toUpperCase()
        : "BR";

}

/**
 * Obtém os tópicos de uma evidência.
 */

function getEvidenceTopics(evidence) {

    const topics = [];

    if (!evidence) {

        return topics;

    }

    if (typeof evidence.parameter === "string") {

        topics.push(
            evidence.parameter
        );

    }

    if (Array.isArray(evidence.parameters)) {

        topics.push(
            ...evidence.parameters
        );

    }

    return topics;

}

/**
 * Obtém os tópicos relacionados à validação.
 */

function getValidationTopics(validation) {

    if (!validation) {

        return [];

    }

    return Object.keys(validation);

}

/**
 * Verifica se existe correspondência entre os tópicos
 * fornecidos e os tópicos de uma seção.
 */

function sectionMatchesTopics(section, topics) {

    if (!Array.isArray(section?.topics)) {

        return false;

    }

    return topics.some(

        topic =>

            includesNormalized(
                section.topics,
                topic
            )

    );

}

/**
 * Calcula a qualidade da correspondência temática.
 *
 * Quanto maior o valor, melhor a correspondência.
 */

function calculateSectionMatchScore({

    reference,
    section,

    evidence,
    validation,
    diagnosis,
    hypothesis,
    regulatoryReferenceIds

}) {

    let score = 0;

    const isRegulatoryReference =
        Array.isArray(regulatoryReferenceIds) &&
        regulatoryReferenceIds.includes(reference?.id);

    const evidenceTopics =
        getEvidenceTopics(evidence);

    const validationTopics =
        getValidationTopics(validation);

    /*
     * Regulatory é a fonte primária da qualificação da leitura.
     * Quando a referência candidata pertence ao Regulatory e a seção
     * corresponde aos parâmetros validados, sua fundamentação recebe
     * precedência sobre sinais analíticos posteriores.
     */

    if (
        isRegulatoryReference &&
        sectionMatchesTopics(section, validationTopics)
    ) {

        score += 150;

    }

    /*
     * Evidência é o sinal mais específico para conhecimento complementar.
     */

    if (
        sectionMatchesTopics(
            section,
            evidenceTopics
        )
    ) {

        score += 100;

    }

    /*
     * Validação complementa a evidência.
     */

    if (
        sectionMatchesTopics(
            section,
            validationTopics
        )
    ) {

        score += 50;

    }

    /*
     * Diagnóstico é utilizado como sinal complementar.
     */

    const diagnosisId =
        normalize(
            diagnosis?.id ||
            diagnosis?.primary?.id
        );

    if (
        diagnosisId &&
        sectionMatchesTopics(
            section,
            [diagnosisId]
        )
    ) {

        score += 25;

    }

    /*
     * Hipótese é utilizada como refinamento.
     */

    const hypothesisId =
        normalize(
            hypothesis?.id ||
            hypothesis?.primary?.id
        );

    if (
        hypothesisId &&
        sectionMatchesTopics(
            section,
            [hypothesisId]
        )
    ) {

        score += 10;

    }

    return score;

}

/**
 * Localiza a seção mais adequada de uma referência.
 */

function resolveSection({

    reference,

    evidence,
    validation,
    diagnosis,
    hypothesis,
    environment,
    regulatoryReferenceIds

}) {

    const sections = Object.values(

        reference?.sections || {}

    );

    if (!sections.length) {

        return null;

    }

    const applicableSections =
        sections.filter(

            section =>

                isSectionApplicable(
                    section,
                    environment
                )

        );

    if (!applicableSections.length) {

        return null;

    }

    const rankedSections =
        applicableSections
            .map(section => ({

                section,

                score:
                    calculateSectionMatchScore({

                        reference,

                        section,

                        evidence,

                        validation,

                        diagnosis,

                        hypothesis,

                        regulatoryReferenceIds

                    })

            }))
            .filter(
                item => item.score > 0
            )
            .sort(

                (a, b) =>

                    b.score - a.score

            );

    if (!rankedSections.length) {

        return null;

    }

    const selectedSection =
        rankedSections[0].section;

    const selectedIsRegulatory =
        Array.isArray(regulatoryReferenceIds) &&
        regulatoryReferenceIds.includes(reference?.id) &&
        sectionMatchesTopics(
            selectedSection,
            getValidationTopics(validation)
        );

    const selectedHasEvidenceMatch =
        sectionMatchesTopics(
            selectedSection,
            getEvidenceTopics(evidence)
        );

    const selectedHasValidationMatch =
        sectionMatchesTopics(
            selectedSection,
            getValidationTopics(validation)
        );

    const selectedHasDiagnosisMatch =
        Boolean(diagnosis?.id || diagnosis?.primary?.id) &&
        sectionMatchesTopics(
            selectedSection,
            [normalize(diagnosis?.id || diagnosis?.primary?.id)]
        );

    const selectedHasHypothesisMatch =
        Boolean(hypothesis?.id || hypothesis?.primary?.id) &&
        sectionMatchesTopics(
            selectedSection,
            [normalize(hypothesis?.id || hypothesis?.primary?.id)]
        );

    let source = "validation";

    if (selectedIsRegulatory) {
        source = "regulatory";
    } else if (selectedHasEvidenceMatch) {
        source = "evidence";
    } else if (selectedHasValidationMatch) {
        source = "validation";
    } else if (selectedHasDiagnosisMatch) {
        source = "diagnosis";
    } else if (selectedHasHypothesisMatch) {
        source = "hypothesis";
    }

    return {

        section: selectedSection,

        score: rankedSections[0].score,

        source

    };

}

/* ======================================================================
 * REFERENCE PRECEDENCE
 * ======================================================================
 */

/**
 * Define a precedência jurisdicional da referência.
 *
 * Regra para o Brasil:
 *
 * 1. Referência brasileira
 * 2. Referência internacional
 * 3. Referência técnica estrangeira
 *
 * A precedência não elimina referências secundárias.
 */

function getJurisdictionRank(reference, jurisdiction) {

    const referenceCountry =
        normalize(reference?.country);

    /*
     * Brasil.
     */

    if (jurisdiction === "BR") {

        if (
            referenceCountry === "brasil" ||
            referenceCountry === "brazil"
        ) {

            return 0;

        }

        if (
            referenceCountry === "internacional"
        ) {

            return 1;

        }

        return 2;

    }

    /*
     * Estados Unidos.
     */

    if (jurisdiction === "US") {

        if (
            referenceCountry === "estados unidos" ||
            referenceCountry === "united states"
        ) {

            return 0;

        }

        if (
            referenceCountry === "internacional"
        ) {

            return 1;

        }

        return 2;

    }

    /*
     * Jurisdição internacional.
     */

    if (jurisdiction === "INT") {

        if (
            referenceCountry === "internacional"
        ) {

            return 0;

        }

        return 1;

    }

    /*
     * Outras jurisdições:
     * referência local primeiro.
     */

    return referenceCountry ===
        jurisdiction.toLowerCase()

        ? 0

        : 1;

}

/**
 * Define a prioridade normativa/técnica.
 *
 * Quanto menor o número, maior a precedência.
 */

function getTypeRank(reference) {

    const type =
        normalize(reference?.type);

    if (
        type.includes("norma regulamentadora")
    ) {

        return 0;

    }

    if (
        type.includes("norma técnica")
    ) {

        return 1;

    }

    if (
        type.includes("norma internacional")
    ) {

        return 2;

    }

    if (
        type.includes("diretriz")
    ) {

        return 3;

    }

    if (
        type.includes("referência técnica")
    ) {

        return 4;

    }

    return 5;

}

/* ======================================================================
 * MATCH MESSAGE
 * ======================================================================
 */

function buildMatchMessage({

    reference,

    section,

    source

}) {

    if (!reference || !section) {

        return "";

    }

    if (source === "evidence") {

        return (

            `A referência ${reference.code} está relacionada ` +

            `à evidência ambiental identificada na seção ` +

            `"${section.title}".`

        );

    }

    if (source === "validation") {

        return (

            `A referência ${reference.code} está relacionada ` +

            `ao parâmetro avaliado na seção ` +

            `"${section.title}".`

        );

    }

    if (source === "diagnosis") {

        return (

            `A referência ${reference.code} apresenta ` +

            `fundamentação relacionada ao diagnóstico na seção ` +

            `"${section.title}".`

        );

    }

    if (source === "hypothesis") {

        return (

            `A referência ${reference.code} apresenta ` +

            `fundamentação técnica relacionada à hipótese ` +

            `na seção "${section.title}".`

        );

    }

    return (

        `A referência ${reference.code} possui ` +

        `aplicabilidade relacionada à seção ` +

        `"${section.title}".`

    );

}

/* ======================================================================
 * RESOLVER
 * ======================================================================
 */

function resolveReferences(ctx = {}) {

    /*
     * ================================================================
     * CONTEXT
     * ================================================================
     */

    const environment =
        ctx.domain?.id ||
        ctx.environment ||
        null;

    /*
     * O CORE QAI opera atualmente no contexto brasileiro.
     *
     * A jurisdição pode ser explicitamente informada pelo contexto.
     * Caso não seja, BR é utilizada como padrão.
     */

    const jurisdiction =
        normalizeJurisdiction(

            ctx.jurisdiction ||

            ctx.domain?.jurisdiction ||

            "BR"

        );

    const relevantRegulatoryReferenceIds = [];

    for (const [parameter, validation] of Object.entries(ctx.validation || {})) {

        const currentAssessment =
            validation?.currentAssessment;

        const isRelevantCurrentCondition =
            currentAssessment === "ABOVE_REFERENCE" ||
            currentAssessment === "BELOW_REFERENCE";

        if (!isRelevantCurrentCondition) {

            continue;

        }

        const regulatory =
            ctx.regulatory?.[parameter];

        if (!Array.isArray(regulatory?.referenceIds)) {

            continue;

        }

        regulatory.referenceIds.forEach(id => {

            if (!relevantRegulatoryReferenceIds.includes(id)) {

                relevantRegulatoryReferenceIds.push(id);

            }

        });

    }

    const evidencePrimary =
        ctx.evidence?.primary ||
        null;

    const evidenceRecords =
        Array.isArray(ctx.evidence?.records)

            ? ctx.evidence.records

            : [];

    const diagnosisPrimary =
        ctx.diagnosis?.primary ||
        null;

    const hypothesisPrimary =
        ctx.hypotheses?.primary ||
        null;

    /*
     * ================================================================
     * REFERENCE IDS
     * ================================================================
     *
     * Mantemos a ordem original dos IDs declarados pelas evidências.
     *
     * Essa ordem NÃO define a precedência normativa.
     * Ela será utilizada apenas como critério de desempate.
     */

    const referenceIds = [];

    const regulatoryReferenceIds = [];

    const evidenceReferenceIds = [];

    function addReferenceId(id, target = referenceIds) {

        if (
            typeof id !== "string" ||
            !id.trim()
        ) {

            return;

        }

        if (!target.includes(id)) {

            target.push(id);

        }

        if (!referenceIds.includes(id)) {

            referenceIds.push(id);

        }

    }

    for (const id of relevantRegulatoryReferenceIds) {

        addReferenceId(id, regulatoryReferenceIds);

    }

    if (Array.isArray(evidencePrimary?.referenceIds)) {

        evidencePrimary.referenceIds.forEach(id =>

            addReferenceId(id, evidenceReferenceIds)

        );

    }

    for (const evidence of evidenceRecords) {

        if (!Array.isArray(evidence?.referenceIds)) {

            continue;

        }

        evidence.referenceIds.forEach(id =>

            addReferenceId(id, evidenceReferenceIds)

        );

    }

    /*
     * ================================================================
     * CANDIDATE REFERENCES
     * ================================================================
     *
     * Somente referências existentes no catálogo oficial podem
     * participar da resolução.
     */

    let candidates = [];

    /*
     * ---------------------------------------------------------------
     * EVIDENCE-DECLARED REFERENCES
     * ---------------------------------------------------------------
     */

    if (referenceIds.length > 0) {

        candidates = referenceIds

            .map(

                referenceId =>

                    REFERENCE_CATALOG.find(

                        reference =>

                            reference.id ===
                            referenceId

                    )

            )

            .filter(Boolean)

            .filter(

                reference =>

                    !environment ||

                    isReferenceApplicable(

                        reference,

                        environment

                    )

            );

    }

  
    /*
     * ================================================================
     * RESOLVE MATCHES
     * ================================================================
     */

    const matches = [];

    for (const reference of candidates) {

        const resolved = resolveSection({

            reference,

            evidence:
                evidencePrimary,

            validation:
                ctx.validation,

            diagnosis:
                diagnosisPrimary,

            hypothesis:
                hypothesisPrimary,

            environment,

            regulatoryReferenceIds: relevantRegulatoryReferenceIds

        });

        /*
         * Se a referência possui sections mas nenhuma seção
         * aplicável foi encontrada, ela não participa do resultado.
         */

        if (!resolved) {

            continue;

        }

        matches.push({

            reference,

            section:
                resolved.section,

            match: {

                source:
                    resolved.source,

                topic:
                    resolved.section.topics?.[0] ||
                    null,

                applicability:
                    environment,

                jurisdiction,

                message:
                    buildMatchMessage({

                        reference,

                        section:
                            resolved.section,

                        source:
                            resolved.source

                    })

            },

            /*
             * Metadados internos utilizados para ranking.
             */

            _ranking: {

                jurisdiction:
                    getJurisdictionRank(
                        reference,
                        jurisdiction
                    ),

                type:
                    getTypeRank(
                        reference
                    ),

                sectionScore:
                    resolved.score,

                sourceRank:
                    resolved.source === "regulatory"
                        ? 0
                        : resolved.source === "evidence"
                            ? 1
                            : resolved.source === "validation"
                                ? 2
                                : resolved.source === "diagnosis"
                                    ? 3
                                    : 4,

                regulatoryOrder:
                    regulatoryReferenceIds.indexOf(
                        reference.id
                    ),

                evidenceOrder:
                    evidenceReferenceIds.indexOf(
                        reference.id
                    )

            }

        });

    }

    /*
     * ================================================================
     * RANK
     * ================================================================
     *
     * Ordem de decisão:
     *
     * 1. Origem da fundamentação: Regulatory antes de camadas analíticas
     * 2. Jurisdição
     * 3. Tipo da referência
     * 4. Correspondência da seção
     * 5. Ordem declarada pela Evidence
     *
     * Portanto, no Brasil:
     *
     * ABNT / referência brasileira
     *        ↓
     * referência internacional
     *        ↓
     * referência técnica estrangeira
     *
     * A Evidence continua podendo fornecer referências secundárias.
     */

    matches.sort(

        (a, b) => {

            if (
                a._ranking.sourceRank !==
                b._ranking.sourceRank
            ) {

                return (
                    a._ranking.sourceRank -
                    b._ranking.sourceRank
                );

            }

            if (
                a._ranking.jurisdiction !==
                b._ranking.jurisdiction
            ) {

                return (
                    a._ranking.jurisdiction -
                    b._ranking.jurisdiction
                );

            }

            if (
                a._ranking.type !==
                b._ranking.type
            ) {

                return (
                    a._ranking.type -
                    b._ranking.type
                );

            }

            if (
                a._ranking.sectionScore !==
                b._ranking.sectionScore
            ) {

                return (

                    b._ranking.sectionScore -
                    a._ranking.sectionScore

                );

            }

            const aRegulatoryOrder =
                a._ranking.regulatoryOrder === -1
                    ? Number.MAX_SAFE_INTEGER
                    : a._ranking.regulatoryOrder;

            const bRegulatoryOrder =
                b._ranking.regulatoryOrder === -1
                    ? Number.MAX_SAFE_INTEGER
                    : b._ranking.regulatoryOrder;

            if (aRegulatoryOrder !== bRegulatoryOrder) {

                return aRegulatoryOrder - bRegulatoryOrder;

            }

            const aEvidenceOrder =
                a._ranking.evidenceOrder === -1
                    ? Number.MAX_SAFE_INTEGER
                    : a._ranking.evidenceOrder;

            const bEvidenceOrder =
                b._ranking.evidenceOrder === -1
                    ? Number.MAX_SAFE_INTEGER
                    : b._ranking.evidenceOrder;

            return aEvidenceOrder - bEvidenceOrder;

        }

    );

    /*
     * ================================================================
     * REMOVE METADADOS INTERNOS
     * ================================================================
     */

    for (const match of matches) {

        delete match._ranking;

    }

    /*
     * ================================================================
     * RESULT
     * ================================================================
     */

    const primary =
        matches.length > 0

            ? matches[0]

            : null;

    const secondary =
        matches.length > 1

            ? matches.slice(1)

            : [];

    return {

        primary,

        secondary,

        matches

    };

}

/* ======================================================================
 * EXPORT
 * ======================================================================
 */

export default resolveReferences;