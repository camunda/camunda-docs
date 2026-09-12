import React, { useEffect, useMemo, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

/**
 * LiveBenchBusinessFilter
 * Docusaurus-ready React component to filter/rank models from a CSV.
 * Place your CSV at: static/data/by_models.csv (served at /data/by_models.csv)
 */
export default function LiveBenchBusinessFilter() {
  const csvUrl = useBaseUrl("/data/by_models.csv");

  // ------------------------------- tiny CSV parser -------------------------------
  const parseCSV = (text) => {
    const firstLine = text.split(/\r?\n/)[0] ?? "";
    const delim =
      (firstLine.match(/,/g)?.length || 0) >=
      (firstLine.match(/;/g)?.length || 0)
        ? ","
        : ";";

    const rows = [];
    let cur = "";
    let inQuotes = false;
    let row = [];
    const pushCell = () => {
      row.push(cur);
      cur = "";
    };
    const pushRow = () => {
      rows.push(row);
      row = [];
    };

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === delim && !inQuotes) {
        pushCell();
      } else if ((c === "\n" || c === "\r") && !inQuotes) {
        if (c === "\r" && text[i + 1] === "\n") i++;
        pushCell();
        if (row.length > 1 || (row.length === 1 && row[0] !== "")) pushRow();
      } else {
        cur += c;
      }
    }
    if (cur.length || row.length) {
      pushCell();
      pushRow();
    }
    if (!rows.length) return { header: [], data: [] };

    // de-dupe header names (CSV may repeat some)
    const rawHeader = rows[0].map((h) => (h ?? "").trim());
    const header = [];
    const seen = {};
    rawHeader.forEach((h) => {
      const k = seen[h] ? `${h}__${seen[h] + 1}` : h;
      header.push(k);
      seen[h] = (seen[h] || 0) + 1;
    });

    const data = rows.slice(1).map((r) => {
      const obj = {};
      header.forEach((h, i) => {
        obj[h] = (r[i] ?? "").trim();
      });
      return obj;
    });
    return { header, data };
  };

  // ------------------------------- helpers -------------------------------
  const toNumber = function (v) {
    if (v === null || v === undefined || v === "") return NaN;
    if (typeof v === "number") return v;

    const s = String(v).trim().replace(/,/g, "");
    // e.g., "12.34", "12k", "1.2M"
    const m = /^([0-9]+\.?[0-9]*)\s*([kKmM])?$/.exec(s);
    if (m) {
      const n = parseFloat(m[1]);
      if (m[2] && m[2].toLowerCase() === "k") return n * 1000;
      if (m[2] && m[2].toLowerCase() === "m") return n * 1000000;
      return n;
    }
    const n2 = Number(s);
    return Number.isFinite(n2) ? n2 : NaN;
  };

  const normalize01 = (v) => {
    const n = toNumber(v);
    if (!Number.isFinite(n)) return NaN;
    if (n >= 0 && n <= 1) return n;
    if (n > 1 && n <= 100) return n / 100;
    return NaN;
  };

  const prettyMetric = (base) =>
    ({
      ifbench: "IFBench",
      gpqa: "GPQA",
      mmlu_pro: "MMLU-Pro",
      scicode: "SciCode",
      livecodebench: "LiveCodeBench",
      math_500: "Math-500",
      aime: "AIME",
      hle: "HLE",
      terminalbench_hard: "TerminalBench-Hard",
    })[base] || base;

  // ------------------------------- fixed column names from dataset -------------------------------
  const NAME_COL = "model";
  const CONTEXT_COL = "context_window_tokens"; // tokens
  const COST_1M_BLEND_COL = "price_1m_blended_3_to_1_usd"; // $ / 1M (blended 3:1) ← preferred
  const COST_1K_FALLBACK_COL = "usd_per_1k_output"; // fallback if needed
  const SPEED_COL = "speed_score_0_to_10_int"; // tokens / sec
  const LICENSE_COL = "license_type"; // open / proprietary (optional)

  // Map from metric base -> CSV column (eval__ prefix in file)
  const resolveMetricKey = function (base, cols) {
    const exact = "eval__" + base; // <-- double underscore
    if (cols.indexOf(exact) !== -1) return exact;

    // tolerant fallback: find any eval** column that contains the base
    const lowBase = String(base).toLowerCase();
    for (let i = 0; i < cols.length; i++) {
      const c = String(cols[i]);
      if (c.toLowerCase() === lowBase) return c;
      if (
        c.toLowerCase().startsWith("eval") &&
        c.toLowerCase().includes(lowBase)
      ) {
        return c;
      }
    }
    return null;
  };

  // --------------------------------------- data load ---------------------------------------
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    fetch(csvUrl, { cache: "no-store" })
      .then((r) => r.text())
      .then((t) => {
        if (!mounted) return;
        const { header, data } = parseCSV(t);
        setCols(header);
        setRows(data);
      })
      .catch((e) => mounted && setErr(String(e)));
    return () => {
      mounted = false;
    };
  }, [csvUrl]);

  // ------------------------------------ business presets ------------------------------------
  // Cost guidance: premium > $10 / 1M, cheap < $1 / 1M
  const PROFILES = useMemo(
    () => [
      {
        id: "banking",
        label: "Banking & Financial Operations",
        why: [
          "IFBench + GPQA → reliable, auditable approvals.",
          "Long docs (policies/statements) benefit from larger context.",
          "Comfortable with premium models for compliance-critical flows.",
          "Default budget: ≤ $15 / 1M (premium-ok).",
        ],
        metricBases: ["ifbench", "gpqa"],
        defaults: { minContext: 128_000, maxCost1M: 15, minSpeed: 5 },
      },
      {
        id: "healthcare",
        label: "Healthcare & Life Sciences",
        why: [
          "SciCode/HLE → scientific rigor & fewer hallucinations.",
          "MMLU-Pro → broad professional knowledge.",
          "Defaults allow premium models where safety matters.",
          "Default budget: ≤ $20 / 1M (premium-ok).",
        ],
        metricBases: ["scicode", "hle", "mmlu_pro"],
        defaults: { minContext: 256_000, maxCost1M: 20, minSpeed: 4 },
      },
      {
        id: "customer",
        label: "Customer Service / Contact Centers",
        why: [
          "GPQA/AIME → robust reasoning in dialog.",
          "High throughput → responsiveness at scale.",
          "Prioritize low cost at volume; prefer cheap models.",
          "Default budget: ≤ $2 / 1M (low-cost).",
        ],
        metricBases: ["gpqa", "aime", "ifbench"],
        defaults: { minContext: 64_000, maxCost1M: 2, minSpeed: 8 },
      },
      {
        id: "developer",
        label: "Developer & Automation Assistants",
        why: [
          "LiveCodeBench → code reliability.",
          "SciCode → tool/tech reasoning.",
          "Moderate spend for better tool-use precision.",
          "Default budget: ≤ $8 / 1M (mid-range).",
        ],
        metricBases: ["livecodebench", "scicode", "ifbench"],
        defaults: { minContext: 128_000, maxCost1M: 8, minSpeed: 7 },
      },
      {
        id: "legal",
        label: "Legal & Regulatory",
        why: [
          "IFBench/MMLU-Pro → precise, rule-bound reasoning.",
          "GPQA → factual rigor.",
          "Premium tolerated for correctness and traceability.",
          "Default budget: ≤ $12 / 1M (premium-leaning).",
        ],
        metricBases: ["ifbench", "mmlu_pro", "gpqa"],
        defaults: { minContext: 256_000, maxCost1M: 12, minSpeed: 4 },
      },
      {
        id: "scientific",
        label: "Scientific Research & Data Analysis",
        why: [
          "Math-500/AIME → math & logic.",
          "SciCode → scientific QA & reproducibility.",
          "Budget flex for complex analysis and long contexts.",
          "Default budget: ≤ $25 / 1M (premium-ok).",
        ],
        metricBases: ["math_500", "aime", "scicode"],
        defaults: { minContext: 512_000, maxCost1M: 25, minSpeed: 4 },
      },
      {
        id: "backoffice",
        label: "Back-Office BPMN Automation",
        why: [
          "TerminalBench-Hard/IFBench → tool execution & procedures.",
          "Math-500 → calculations in flows.",
          "Bias to economical models for scale.",
          "Default budget: ≤ $3 / 1M (low-cost).",
        ],
        metricBases: ["terminalbench_hard", "ifbench", "math_500"],
        defaults: { minContext: 64_000, maxCost1M: 3, minSpeed: 9 },
      },
    ],
    []
  );

  // curated metrics only (no raw eval__ chips exposed)
  const CORE_METRIC_BASES = [
    "ifbench",
    "gpqa",
    "mmlu_pro",
    "scicode",
    "livecodebench",
    "math_500",
    "aime",
    "hle",
    "terminalbench_hard",
  ];

  // start with NO profile
  const [activeId, setActiveId] = useState("none");
  const activeProfile = useMemo(
    () => PROFILES.find((p) => p.id === activeId) || null,
    [PROFILES, activeId]
  );

  // resolve metric columns present in CSV
  const resolvedCoreMetrics = useMemo(() => {
    const map = CORE_METRIC_BASES.map((base) => ({
      base,
      key: resolveMetricKey(base, cols),
    })).filter((m) => !!m.key);
    return map;
  }, [cols]);

  // selected metrics (chips)
  const [selectedBases, setSelectedBases] = useState([]);
  useEffect(() => {
    if (activeProfile)
      setSelectedBases(
        activeProfile.metricBases.filter((b) => resolveMetricKey(b, cols))
      );
    else setSelectedBases(resolvedCoreMetrics.map((m) => m.base));
  }, [activeId, activeProfile, resolvedCoreMetrics, cols]);

  // -------------------------------- license filter (optional) --------------------------------
  const [licenseFilter, setLicenseFilter] = useState("all"); // "all" | "open" | "proprietary"
  const hasLicenseCol = useMemo(() => cols.includes(LICENSE_COL), [cols]);
  const normalizeLicense = (v) => {
    const s = String(v || "").toLowerCase();
    if (s.includes("open")) return "open";
    if (s.includes("proprietary") || s.includes("closed")) return "proprietary";
    return "";
  };

  const CONTEXT_MAX = 1_000_000;
  const COST_CAP = 100; // slider max = 100; when at max, treat as "no cost filter"
  const SPEED_MAX = 10;

  const contextMinObserved = useMemo(() => {
    let min = Number.POSITIVE_INFINITY;
    rows.forEach((r) => {
      const n = toNumber(r[CONTEXT_COL] ?? r[`${CONTEXT_COL}__2`]);
      if (Number.isFinite(n) && n < min) min = n;
    });
    return Number.isFinite(min) ? min : 0;
  }, [rows]);

  const speedObservedMin = useMemo(() => {
    let min = Number.POSITIVE_INFINITY;
    rows.forEach((r) => {
      const v = toNumber(r[SPEED_COL]);
      if (Number.isFinite(v) && v < min) min = v;
    });
    return Number.isFinite(min) ? min : 0;
  }, [rows]);

  function SpeedIcons({ value }) {
    const vRaw = Number.isFinite(value) ? value : Number(value);
    const v = Math.max(0, Math.min(10, Math.round(vRaw || 0)));

    if (!Number.isFinite(vRaw)) {
      return React.createElement("span", null, "—");
    }

    return React.createElement(
      "span",
      {
        title: `${v}/10`,
        style: { whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" },
      },
      "⚡".repeat(v) || "—"
    );
  }

  const [minContext, setMinContext] = useState(0);
  const [maxCost1M, setMaxCost1M] = useState(COST_CAP); // default to "no filter" in no-profile mode
  const [minSpeed, setMinSpeed] = useState(0);

  useEffect(() => {
    if (activeProfile) {
      setMinContext(
        Math.max(contextMinObserved, activeProfile.defaults.minContext)
      );
      setMaxCost1M(
        Math.min(COST_CAP, Math.max(0, activeProfile.defaults.maxCost1M))
      );
      setMinSpeed(Math.max(0, activeProfile.defaults.minSpeed));
    } else {
      setMinContext(contextMinObserved);
      setMaxCost1M(COST_CAP); // no cost filter by default in "no profile"
      setMinSpeed(speedObservedMin);
    }
  }, [activeId, contextMinObserved, speedObservedMin, activeProfile]);

  // -------------------------------- filter + rank; remove missing metrics --------------------------------
  const metricKeysInUse = useMemo(
    () =>
      selectedBases
        .map((b) => ({ base: b, key: resolveMetricKey(b, cols) }))
        .filter((m) => !!m.key),
    [selectedBases, cols]
  );

  const top = useMemo(() => {
    if (!rows.length) return [];
    const out = [];
    const costFilterEnabled = maxCost1M < COST_CAP - 1e-9; // at cap → treat as no filter

    rows.forEach((r) => {
      // license
      if (licenseFilter !== "all" && hasLicenseCol) {
        const lic = normalizeLicense(r[LICENSE_COL]);
        if (lic !== licenseFilter) return;
      }

      // operational filters
      const ctx = toNumber(r[CONTEXT_COL] ?? r[`${CONTEXT_COL}__2`]);
      if (Number.isFinite(ctx) && ctx < minContext) return;

      // cost (prefer blended column; fallback to 1k if absent)
      let cost1m = toNumber(r[COST_1M_BLEND_COL]);
      if (!Number.isFinite(cost1m)) {
        const per1k = toNumber(r[COST_1K_FALLBACK_COL]);
        cost1m = Number.isFinite(per1k) ? per1k * 1000 : NaN;
      }
      if (costFilterEnabled && Number.isFinite(cost1m) && cost1m > maxCost1M)
        return;

      const spd = toNumber(r[SPEED_COL]);
      if (Number.isFinite(spd) && spd < minSpeed) return;

      // must have values for ALL selected metrics
      const vals = metricKeysInUse.map(({ key }) => normalize01(r[key]));
      if (vals.some((v) => !Number.isFinite(v))) return;

      const avg = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
      out.push({ row: r, avg });
    });

    out.sort((a, b) => b.avg - a.avg);
    return out.slice(0, 20);
  }, [
    rows,
    licenseFilter,
    hasLicenseCol,
    minContext,
    maxCost1M,
    minSpeed,
    metricKeysInUse,
  ]);

  // --------------------------------------------- UI ---------------------------------------------
  const Chip = ({ active, onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`button ${active ? "button--primary" : "button--secondary"}`}
      style={{ marginRight: 8, marginBottom: 8 }}
    >
      {children}
    </button>
  );

  const Slider = ({ id, label, value, onChange, min, max, step = 1 }) => (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={id} style={{ display: "block", fontWeight: 600 }}>
        {label}:{" "}
        <span style={{ fontWeight: 400 }}>
          {Number.isFinite(value) ? value : "—"}
        </span>
      </label>
      <input
        id={id}
        type="range"
        value={Number.isFinite(value) ? value : 0}
        min={Number.isFinite(min) ? min : 0}
        max={Number.isFinite(max) ? max : 100}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", marginTop: 6 }}
      />
    </div>
  );

  const profileWhy = activeProfile ? (
    <div className="alert alert--secondary" style={{ marginBottom: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>
        {activeProfile.label} — why these filters
      </div>
      <ul style={{ margin: 0 }}>
        {activeProfile.why.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>
    </div>
  ) : null;

  return (
    <div
      style={{
        border: "1px solid var(--ifm-color-emphasis-200)",
        borderRadius: 12,
        padding: 16,
        background: "var(--ifm-background-surface-color)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ margin: "4px 0 8px" }}>
        Filter and compare models on LiveBench
      </h3>
      <p style={{ marginTop: 0 }}>
        Starts with <b>no profile</b>. Use business presets, adjust sliders, and
        choose metrics. Models missing <b>any</b> selected benchmark value are
        removed. We show the <b>top 20</b>, ranked by the <b>average</b> of
        selected metrics (normalized 0–1).
      </p>

      {/* Presets */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}
      >
        <Chip active={activeId === "none"} onClick={() => setActiveId("none")}>
          No profile (show all)
        </Chip>
        {PROFILES.map((p) => (
          <Chip
            key={p.id}
            active={activeId === p.id}
            onClick={() => setActiveId(p.id)}
          >
            {p.label}
          </Chip>
        ))}
      </div>

      {/* Why this preset */}
      {profileWhy}

      {/* License filter */}
      {hasLicenseCol && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 600 }}>License:</div>
          <Chip
            active={licenseFilter === "all"}
            onClick={() => setLicenseFilter("all")}
          >
            All
          </Chip>
          <Chip
            active={licenseFilter === "open"}
            onClick={() => setLicenseFilter("open")}
          >
            Open-source
          </Chip>
          <Chip
            active={licenseFilter === "proprietary"}
            onClick={() => setLicenseFilter("proprietary")}
          >
            Proprietary
          </Chip>
        </div>
      )}

      {/* Operational sliders — fixed ranges */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 12,
        }}
      >
        <Slider
          id="ctx"
          label="Min context (tokens)"
          value={minContext}
          onChange={setMinContext}
          min={contextMinObserved}
          max={CONTEXT_MAX}
          step={1000}
        />
        <Slider
          id="cost1m"
          label="Max cost ($ / 1M blended 3:1)"
          value={maxCost1M}
          onChange={setMaxCost1M}
          min={0}
          max={COST_CAP}
          step={1}
        />
        <Slider
          id="spd"
          label="Min speed (0–10)"
          value={minSpeed}
          onChange={setMinSpeed}
          min={0}
          max={SPEED_MAX}
          step={1}
        />
      </div>

      {/* Metric chips (curated only; no raw eval__ names) */}
      <div style={{ marginTop: 8 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>
          Selected metrics for ranking
        </div>
        {resolvedCoreMetrics.length === 0 ? (
          <div style={{ fontSize: 12, color: "var(--ifm-color-emphasis-700)" }}>
            No known benchmark columns detected (check your CSV headers).
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {resolvedCoreMetrics.map(({ base }) => {
              const on = selectedBases.includes(base);
              return (
                <button
                  key={base}
                  type="button"
                  className={`button ${on ? "button--primary" : "button--secondary"}`}
                  onClick={() =>
                    setSelectedBases((prev) =>
                      on ? prev.filter((x) => x !== base) : [...prev, base]
                    )
                  }
                >
                  {prettyMetric(base)}
                </button>
              );
            })}
          </div>
        )}
        <div
          style={{
            fontSize: 12,
            color: "var(--ifm-color-emphasis-700)",
            marginTop: 6,
          }}
        >
          Tip: toggle which metrics are averaged for the ranking.
        </div>
      </div>

      {/* Data state */}
      {err && (
        <div className="alert alert--danger" style={{ marginTop: 8 }}>
          Failed to load CSV: {err}
        </div>
      )}
      {!err && !rows.length && (
        <div className="alert alert--info" style={{ marginTop: 8 }}>
          Loading dataset…
        </div>
      )}

      {/* Results (top 20), with ⭐ Avg as the second column and highlighted */}
      {!!top.length && (
        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              fontSize: 13,
              margin: "6px 0 8px",
              color: "var(--ifm-color-emphasis-700)",
            }}
          >
            Showing <b>{top.length}</b> of {rows.length} models (top 20). Ranked
            by:&nbsp;
            <code>
              {metricKeysInUse.map(({ base }) => prettyMetric(base)).join(", ")}
            </code>
          </div>
          <table className="table table--striped">
            <thead>
              <tr>
                <th>Model</th>
                <th style={{ whiteSpace: "nowrap" }}>⭐ Avg</th>
                <th>Context (tokens)</th>
                <th>Cost ($/1M blended)</th>
                <th>Speed (0–10)</th>
                {metricKeysInUse.map(({ base }) => (
                  <th key={base}>{prettyMetric(base)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {top.map(({ row, avg }, i) => {
                const modelName =
                  row[NAME_COL] ??
                  row.model ??
                  row.Model ??
                  row.model_name ??
                  "—";
                const ctx = toNumber(
                  row[CONTEXT_COL] ?? row[`${CONTEXT_COL}__2`]
                );
                let cost1m = toNumber(row[COST_1M_BLEND_COL]);
                if (!Number.isFinite(cost1m)) {
                  const per1k = toNumber(row[COST_1K_FALLBACK_COL]);
                  cost1m = Number.isFinite(per1k) ? per1k * 1000 : NaN;
                }

                return (
                  <tr key={modelName + ":" + i}>
                    <td>{modelName}</td>
                    <td
                      style={{
                        fontWeight: 800,
                        background: "rgba(255, 214, 51, 0.25)",
                        borderRadius: 6,
                      }}
                    >
                      {Number.isFinite(avg) ? avg.toFixed(3) : "—"}
                    </td>
                    <td>{Number.isFinite(ctx) ? ctx : "—"}</td>
                    <td>{Number.isFinite(cost1m) ? cost1m : "—"}</td>
                    <td>
                      <SpeedIcons value={row[SPEED_COL]} />
                    </td>
                    {metricKeysInUse.map(({ base, key }) => {
                      const v = normalize01(row[key]);
                      return (
                        <td key={base}>
                          {Number.isFinite(v) ? v.toFixed(3) : "—"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!err && rows.length > 0 && top.length === 0 && (
        <div className="alert alert--warning" style={{ marginTop: 8 }}>
          No rows matched. Try different metrics, relax sliders, or adjust the
          license filter.
        </div>
      )}
    </div>
  );
}
