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
      <div className="double-column-container">
        <div
          className="double-column-left"
          style={{ flex: "1.5", marginRight: "30px" }}
        >
          <Heading as="h1">Page not found</Heading>
          <h3 className="subheading">
            We could not find the page you were looking for.
          </h3>

          <p>
            The page may have been moved or removed, or the link may be
            incorrect. Search the docs or go back to the home page.
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
        </div>
        <div className="double-column-right" style={{ flex: "1.5" }}>
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
