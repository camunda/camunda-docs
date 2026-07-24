import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Heading from "@theme/Heading";
import releases from "@site/src/data/release-versions.json";
import styles from "./styles.module.css";

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

function formatMonth(isoDate) {
  const [year, month] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

function monthKey(isoDate) {
  return isoDate.slice(0, 7);
}

function monthId(isoDate) {
  return isoDate.slice(0, 7);
}

function minorVersion(saas) {
  const match = saas.match(/^(\d+\.\d+)/);
  return match ? match[1] : saas;
}

function VersionContent({ version }) {
  return (
    <>
      <p>
        <strong>SaaS:</strong> {version.saas}
        {version.helm && (
          <>
            {" "}
            &nbsp;&nbsp; <strong>Self-Managed:</strong> Helm chart{" "}
            {version.helm.replace(/^\d+\.\d+-/, "")}
          </>
        )}
      </p>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Component</th>
            <th style={{ textAlign: "left" }}>Version</th>
            <th style={{ textAlign: "left" }}>Changelog</th>
            <th style={{ textAlign: "left" }}>Docker Hub</th>
          </tr>
        </thead>
        <tbody>
          {[
            ...version.components.filter((c) => c.name === "Camunda Platform (Helm)"),
            ...version.components.filter((c) => c.name !== "Camunda Platform (Helm)"),
          ].map((component) => {
            const showLinks = component.name !== "Web Modeler";
            const githubLink = showLinks && component.links.find((l) => l.label === "GitHub changelog");
            const dockerLink = showLinks && component.links.find((l) => l.label === "Docker Hub");
            return (
            <tr key={component.name}>
              <td>
                {component.name}
                {component.subtext && (
                  <>
                    <br />
                    <span
                      style={{
                        fontSize: "0.85em",
                        color: "var(--ifm-color-emphasis-700)",
                      }}
                    >
                      ({component.subtext})
                    </span>
                  </>
                )}
              </td>
              <td>{component.version}</td>
              <td>
                {githubLink ? (
                  <a href={githubLink.url} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                ) : "-"}
              </td>
              <td>
                {dockerLink ? (
                  <a href={dockerLink.url} target="_blank" rel="noopener noreferrer">
                    Docker Hub
                  </a>
                ) : "-"}
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function ReleaseEntry({ release }) {
  const { versions } = release;
  const multiVersion = versions.length > 1;

  return (
    <section>
      <Heading
        as="h3"
        id={release.date}
        style={{
          marginTop:
            "calc(var(--ifm-h3-vertical-rhythm-top, 2) * var(--ifm-leading, 1.25rem))",
        }}
      >
        {formatDate(release.date)}
      </Heading>
      {multiVersion ? (
        <Tabs
          groupId="camunda-version"
          defaultValue={minorVersion(versions[0].saas)}
        >
          {versions.map((version) => {
            const minor = minorVersion(version.saas);
            const label = version.label ? `${minor} ${version.label}` : minor;
            return (
              <TabItem key={version.saas} value={minor} label={label}>
                <VersionContent version={version} />
              </TabItem>
            );
          })}
        </Tabs>
      ) : (
        <VersionContent version={versions[0]} />
      )}
    </section>
  );
}

function MonthGroup({ month, monthReleases, isLatest }) {
  const id = monthId(monthReleases[0].date);
  const topMargin =
    "calc(var(--ifm-h2-vertical-rhythm-top, 3) * var(--ifm-leading, 1.25rem))";
  const [open, setOpen] = React.useState(false);
  const content = monthReleases.map((release) => (
    <ReleaseEntry key={release.date} release={release} />
  ));

  if (isLatest) {
    return (
      <section style={{ overflow: "hidden" }}>
        <Heading as="h2" id={id} style={{ marginTop: topMargin }}>
          {month}
        </Heading>
        {content}
        <hr />
      </section>
    );
  }

  return (
    <details
      id={id}
      style={{ marginTop: topMargin }}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary style={{ listStyle: "none", cursor: "pointer" }}>
        <Heading as="h2" id={id} style={{ marginTop: 0 }}>
          <span
            style={{
              display: "inline-block",
              marginRight: "0.4em",
              fontSize: "0.7em",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            ▶
          </span>
          {month}
        </Heading>
      </summary>
      {content}
      <hr />
    </details>
  );
}

export default function ReleaseVersions() {
  const [filterVersion, setFilterVersion] = React.useState("all");

  const allVersions = [...new Set(
    releases.flatMap((r) => r.versions.map((v) => minorVersion(v.saas)))
  )].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

  const groups = [];
  const seen = new Map();

  for (const release of releases) {
    const filteredVersions =
      filterVersion === "all"
        ? release.versions
        : release.versions.filter((v) => minorVersion(v.saas) === filterVersion);

    if (filteredVersions.length === 0) continue;

    const key = monthKey(release.date);
    if (!seen.has(key)) {
      seen.set(key, []);
      groups.push({
        key,
        label: formatMonth(release.date),
        releases: seen.get(key),
      });
    }
    seen.get(key).push({ ...release, versions: filteredVersions });
  }

  return (
    <>
      <div className={styles.controls}>
        <label htmlFor="version-filter" className={styles.label}>
          Filter by version:
        </label>
        <select
          id="version-filter"
          className={styles.filterSelect}
          value={filterVersion}
          onChange={(e) => setFilterVersion(e.target.value)}
        >
          <option value="all">All versions</option>
          {allVersions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      {groups.map(({ key, label, releases: monthReleases }, i) => (
        <MonthGroup
          key={key}
          month={label}
          monthReleases={monthReleases}
          isLatest={i <= 1}
        />
      ))}
    </>
  );
}
