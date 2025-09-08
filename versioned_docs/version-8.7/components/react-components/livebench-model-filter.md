import React, {useMemo, useState} from "react";

/** Top-level code in MDX must be import/export only **/

export const METRICS = [
{ key: "reasoning", label: "Reasoning" },
{ key: "math", label: "Math" },
{ key: "coding", label: "Coding" },
{ key: "data_analysis", label: "Data analysis" },
{ key: "instruction_following", label: "Instruction following" },
{ key: "language", label: "Language" },
{ key: "agentic_coding", label: "Agentic coding (developer agents)" },
];

export function Slider({ id, label, value, setValue, min = 0, max = 100, step = 5, help }) {
return (
<div className="lb-field" style={{ marginBottom: 12 }}>
<label htmlFor={id} style={{ display: "block", fontWeight: 600 }}>
{label}: <span style={{ fontWeight: 400 }}>{value}</span>
</label>
{help ? (
<div style={{ fontSize: 12, color: "var(--ifm-color-emphasis-700)", marginTop: 2 }}>
{help}
</div>
) : null}
<input
id={id}
type="range"
min={min}
max={max}
step={step}
value={value}
onChange={(e) => setValue(Number(e.target.value))}
style={{ width: "100%", marginTop: 6 }}
/>
</div>
);
}

export function Toggle({ id, label, checked, setChecked, help }) {
return (
<div className="lb-field" style={{ marginBottom: 10 }}>
<label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
<input
id={id}
type="checkbox"
checked={checked}
onChange={(e) => setChecked(e.target.checked)}
/>
<span style={{ fontWeight: 600 }}>{label}</span>
</label>
{help ? (
<div style={{ fontSize: 12, color: "var(--ifm-color-emphasis-700)", marginLeft: 26 }}>
{help}
</div>
) : null}
</div>
);
}

export function Pill({ children }) {
return (
<span
style={{
        display: "inline-block",
        fontSize: 12,
        padding: "2px 8px",
        borderRadius: 999,
        border: "1px solid var(--ifm-color-emphasis-300)",
        marginRight: 6,
        marginBottom: 6,
      }} >
{children}
</span>
);
}

export default function LiveBenchModelFilter() {
const [selected, setSelected] = useState(() => new Set(["reasoning", "instruction_following"]));

const [accuracy, setAccuracy] = useState(80);
const [speed, setSpeed] = useState(50);
const [cost, setCost] = useState(50);
const [context, setContext] = useState(50);
const [openOnly, setOpenOnly] = useState(false);
const [onPrem, setOnPrem] = useState(false);

const toggleMetric = (key) => {
setSelected((prev) => {
const next = new Set(prev);
next.has(key) ? next.delete(key) : next.add(key);
return next;
});
};

const metricsParam = useMemo(() => Array.from(selected).join(","), [selected]);

const prefsParam = useMemo(() => {
const prefs = [];
prefs.push(`accuracy=${accuracy}`);
prefs.push(`speed=${speed}`);
prefs.push(`cost=${cost}`);
prefs.push(`context=${context}`);
if (openOnly) prefs.push("open_source=true");
if (onPrem) prefs.push("on_prem=true");
return prefs.join("&");
}, [accuracy, speed, cost, context, openOnly, onPrem]);

const livebenchUrl = useMemo(() => {
const base = "https://livebench.ai/#/";
const query = [];
if (metricsParam) query.push(`metrics=${encodeURIComponent(metricsParam)}`);
if (prefsParam) query.push(prefsParam);
return `${base}?${query.join("&")}`;
}, [metricsParam, prefsParam]);

const showLiveCodeBench = selected.has("coding");
const showLiveSWEBench = selected.has("agentic_coding");

const liveCodeBenchUrl = "https://livecodebench.github.io/leaderboard.html";
const liveSWEBenchUrl = "https://liveswebench.ai/";

const resetAll = () => {
setSelected(new Set(["reasoning", "instruction_following"]));
setAccuracy(80);
setSpeed(50);
setCost(50);
setContext(50);
setOpenOnly(false);
setOnPrem(false);
};

return (
<div
className="lb-card"
style={{
        border: "1px solid var(--ifm-color-emphasis-200)",
        borderRadius: 12,
        padding: 16,
        background: "var(--ifm-background-surface-color)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        marginTop: 8,
        marginBottom: 16,
      }} >
<h3 style={{ marginTop: 0, marginBottom: 8 }}>LiveBench link builder</h3>
<div style={{ fontSize: 14, marginBottom: 12 }}>
Select the metrics that matter for your use case, then tune operational preferences.
Click the generated link to open the public leaderboard with your selections encoded.
</div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Focus metrics</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {METRICS.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => toggleMetric(m.key)}
              style={{
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: 999,
                border: selected.has(m.key)
                  ? "2px solid var(--ifm-color-primary)"
                  : "1px solid var(--ifm-color-emphasis-300)",
                background: selected.has(m.key)
                  ? "var(--ifm-color-primary-contrast-background)"
                  : "transparent",
                fontWeight: 600,
                fontSize: 13,
              }}
              aria-pressed={selected.has(m.key)}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 8 }}>
          {Array.from(selected).map((k) => {
            const label = METRICS.find((m) => m.key === k)?.label ?? k;
            return <Pill key={k}>{label}</Pill>;
          })}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 12,
        }}
      >
        <div>
          <Slider
            id="acc"
            label="Accuracy emphasis"
            value={accuracy}
            setValue={setAccuracy}
            help="Higher means you prioritize top scores on selected metrics."
          />
          <Slider
            id="spd"
            label="Speed emphasis"
            value={speed}
            setValue={setSpeed}
            help="Higher means you prefer lower latency (often smaller models)."
          />
        </div>
        <div>
          <Slider
            id="cst"
            label="Cost sensitivity"
            value={cost}
            setValue={setCost}
            help="Higher means you prefer lower $/token or cheaper self-hosted options."
          />
          <Slider
            id="ctx"
            label="Context length need"
            value={context}
            setValue={setContext}
            help="Higher means you expect long prompts/tool outputs/history."
          />
        </div>
        <div>
          <Toggle
            id="open"
            label="Open-source only"
            checked={openOnly}
            setChecked={setOpenOnly}
            help="Prefer models you can self-host or fine-tune."
          />
          <Toggle
            id="onprem"
            label="On-prem required"
            checked={onPrem}
            setChecked={setOnPrem}
            help="Flag that you need private deployment (encoded into the link)."
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: 16,
        }}
      >
        <a
          href={livebenchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button button--primary"
          style={{ textDecoration: "none" }}
        >
          Open LiveBench with selections
        </a>
        <button type="button" className="button button--secondary" onClick={resetAll}>
          Reset
        </button>
        <code style={{ fontSize: 12, padding: "4px 6px", borderRadius: 6, background: "var(--ifm-color-emphasis-100)" }}>
          {livebenchUrl}
        </code>
      </div>

      {(showLiveCodeBench || showLiveSWEBench) && (
        <div style={{ marginTop: 12, fontSize: 14 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Helpful adjacent leaderboards</div>
          {showLiveCodeBench && (
            <div>
              • Coding (LiveCodeBench):{" "}
              <a href="https://livecodebench.github.io/leaderboard.html" target="_blank" rel="noopener noreferrer">
                https://livecodebench.github.io/leaderboard.html
              </a>
            </div>
          )}
          {showLiveSWEBench && (
            <div>
              • Agentic coding / SWE agents (LiveSWEBench):{" "}
              <a href="https://liveswebench.ai/" target="_blank" rel="noopener noreferrer">
                https://liveswebench.ai/
              </a>
            </div>
          )}
          <div style={{ fontSize: 12, color: "var(--ifm-color-emphasis-700)", marginTop: 6 }}>
            These links can complement LiveBench when your focus is heavy coding or autonomous developer agents.
          </div>
        </div>
      )}
    </div>

);
}
