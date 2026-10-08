import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";
import AlgoliaSearchBox from "@theme/SearchBar";
import styles from "./styles.module.css";

export default function NotFoundContent({ className }) {
  const heroImage = useBaseUrl("/img/hero-404.png");

  return (
    <main className={clsx("container margin-vert--xl", className)}>
      <Heading as="h1">Page not found</Heading>
      <h3 className="subheading">
        We could not find the page you were looking for.
      </h3>

      <div className="double-column-container">
        <div
          className="double-column-left"
          style={{ flex: "1", marginRight: "30px" }}
        >
          <p>
            The page may have been moved or removed, or the link may be
            incorrect. Search the docs, or start from one of these pages.
          </p>

          <div className={styles.search}>
            <AlgoliaSearchBox />
          </div>

          <Link
            className="button button--outline button--secondary button--md button--hero--topic"
            to="/"
            style={{ marginBottom: "30px", marginTop: "20px" }}
          >
            Go to docs home page
          </Link>

          <ul>
            <li>
              <Link to="/docs/guides/">Get started</Link>
            </li>
            <li>
              <Link to="/docs/components/">Using Camunda</Link>
            </li>
          </ul>
        </div>
        <div className="double-column-right" style={{ flex: "1.6" }}>
          <img
            src={heroImage}
            alt="A BPMN diagram with an error start event labeled 404 leading to a task named Page not found."
            className={clsx("hero-topic", styles.heroImage)}
          />
        </div>
      </div>
    </main>
  );
}
