# MIQAI CORE — Regulatory RC1

This package replaces only `src/regulatory`.

Principles:
- Domain selects the environment profile.
- Regulatory supplies the applicable technical/regulatory knowledge.
- Validation applies the declared validation type.
- Regulatory does not diagnose, calculate metrics, infer causes or recommend mitigation.
- `OBSERVATION` is used when the current reading cannot legitimately be converted into a regulatory PASS/FAIL.
- PM2.5/PM10 criteria from ABNT NBR 17037 are 24-hour mean references; an instantaneous reading is not treated as a 24-hour compliance result.
- CO2 is handled as a contextual observation; no universal indoor maximum is introduced by this catalog.
- VOC Index and NOx Index have no artificial regulatory threshold.
- Every profile declares `referenceIds`, `criterionKind`, `evaluationPeriod`, and `applicability`.

Important:
The package assumes the existing References Library already contains:
`abnt_nbr_17037`, `ashrae55`, `ashrae62_1`, `sensirion_voc`, `sensirion_nox`, `who_aqg_2021`.

No Pipeline, Domain, Metrics, Evidence, Hypothesis or Mitigation files are included.


FINAL RC1 SEMANTIC RULE — CURRENT OBSERVATION VS PERIOD ASSESSMENT
-----------------------------------------------------------------
For parameters whose reference criterion has an evaluation period (e.g.
PM2.5/PM10 24h_mean), the Regulatory catalog distinguishes:
- current observation: the current reading may be flagged as above/below
  the reference value;
- period assessment: compliance/conformity for the reference period requires
  the corresponding observation history.

The CORE does not store historical data. Therefore it must never convert a
single current PM2.5/PM10 reading into a 24-hour compliance conclusion.
The downstream response may communicate that the current value is above the
reference and that persistence/24-hour assessment requires continued
observation.
