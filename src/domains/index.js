/**
 * ======================================================================
 * CORE QAI
 * Domain Resolver
 * ----------------------------------------------------------------------
 * Arquivo   : index.js
 * Módulo    : Domains
 * Versão    : 1.0.0
 * Status    : RC1 - CONGELADO
 *
 * Objetivo
 * ----------------------------------------------------------------------
 * Resolver o Domain utilizado durante a execução do CORE QAI.
 *
 * O Pipeline informa apenas o ambiente solicitado.
 *
 * Este módulo converte esse ambiente no Domain correspondente.
 *
 * Nenhum outro módulo do CORE deve acessar diretamente os
 * arquivos de Domain.
 * ======================================================================
 */

import CORPORATE_DOMAIN from "./corporateDomain.js";
import HEALTHCARE_DOMAIN from "./healthcareDomain.js";
import EDUCATION_DOMAIN from "./educationDomain.js";
import RESIDENTIAL_DOMAIN from "./residentialDomain.js";
import DATACENTER_DOMAIN from "./datacenterDomain.js";


/* ======================================================================
 * DOMAIN CATALOG
 * ====================================================================== */

const DOMAINS = Object.freeze({

    corporate: CORPORATE_DOMAIN,

    healthcare: HEALTHCARE_DOMAIN,

    education: EDUCATION_DOMAIN,

    residential: RESIDENTIAL_DOMAIN,

    datacenter: DATACENTER_DOMAIN

});


/* ======================================================================
 * DOMAIN RESOLVER
 * ====================================================================== */

export function resolveDomain(ctx) {

    const environment =
        String(
            ctx.environment ??
            "corporate"
        ).toLowerCase();


    ctx.domain =
        DOMAINS[environment] ??
        CORPORATE_DOMAIN;

}


/* ======================================================================
 * EXPORTS
 * ====================================================================== */

export {

    CORPORATE_DOMAIN,

    HEALTHCARE_DOMAIN,

    EDUCATION_DOMAIN,

    RESIDENTIAL_DOMAIN,

    DATACENTER_DOMAIN

};

export default DOMAINS;