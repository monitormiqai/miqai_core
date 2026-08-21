/**
 * ======================================================================
 * CORE QAI
 * Score Level Resolver
 * ======================================================================
 */

import SCORE_LEVELS from "../config/levels.js";

export function resolveScoreLevel(score) {

    if (score === null || score === undefined) {

        return "UNKNOWN";

    }

    if (score >= SCORE_LEVELS.EXCELLENT) {

        return "EXCELLENT";

    }

    if (score >= SCORE_LEVELS.GOOD) {

        return "GOOD";

    }

    if (score >= SCORE_LEVELS.MODERATE) {

        return "MODERATE";

    }

    return "POOR";

}