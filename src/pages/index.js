import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "Guides",
    imageUrl: "img/guides.png",
    url: "/docs/guides",
    description: (
      <>
        Step-by-step content to strengthen your knowledge of Camunda Platform 8,
        its components, and its features.
      </>
    ),
  },
  {
    title: "Components",
    imageUrl: "img/components.png",
    url: "/docs/components/",
    description: (
      <>
        Conceptualize the cornerstones of Camunda Platform 8 and learn more
        about its supporting components.
      </>
    ),
  },
  {
    title: "APIs & Clients",
    imageUrl: "img/apisclients.png",
    url: "/docs/apis-tools/working-with-apis-tools/",
    description: <>Programmatically interact with your automated processes.</>,
  },
];

const features2 = [
  {
    title: "Self-Managed",
    imageUrl: "img/self-managed.png",
    url: "/docs/self-managed/about-self-managed/",
    description: (
      <>
        A self-hosted Camunda Platform 8 alternative, offering everything you
        need to download, configure, and work with each component.
      </>
    ),
  },
  {
    title: "Reference",
    imageUrl: "img/reference.png",
    url: "/docs/reference/",
    description: (
      <>
        Supporting material to strengthen your understanding of supported
        environments, releases, dependencies, and more.
      </>
    ),
  },
];

function Feature({ imageUrl, url, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4 component-block", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <a href={url}>
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          </a>
        </div>
      )}
      <h3 className="component-title">{title}</h3>
      <p className="component-desc">{description}</p>
    </div>
  );
}

function Feature2({ imageUrl, url, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div
      className={clsx(
        "col col--offset-1 col--4 component-block",
        styles.feature
      )}
    >
      {imgUrl && (
        <div className="text--center">
          <a href={url}>
            <img className={styles.featureImage} src={imgUrl} alt={title} />
          </a>
        </div>
      )}
      <h3 className="component-title">{title}</h3>
      <p className="component-desc">{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Documentation for all the components of Camunda Platform 8."
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className="row">
            <div className={clsx("col col--offset-4 col--2", styles.buttons)}>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started",
                  styles.getStarted
                )}
                to={useBaseUrl("docs/guides/")}
              >
                Get Started
              </Link>
            </div>
            <div className={clsx("col col--2", styles.buttons)}>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg sign-up",
                  styles.getStarted
                )}
                to={useBaseUrl(
                  "https://accounts.cloud.camunda.io/signup?utm_source=docs.camunda.io&utm_medium=referral"
                )}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        {features2 && features2.length > 0 && (
          <section className={styles.features2}>
            <div className="container">
              <div className="row">
                {features2.map((props, idx) => (
                  <Feature2 key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <div className={clsx("hero hero--secondary", styles.heroBanner)}>
          <div className="container">
            <h2 className="hero__title">Unsure where to begin?</h2>
            <p className="hero__subtitle">Try one of our use case guides</p>
            <div className={styles.buttons}>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started-use-case",
                  styles.getStarted
                )}
                to={useBaseUrl("docs/guides/orchestrate-microservices/")}
              >
                Microservice Orchestration
              </Link>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started-use-case get-started-use-case-2",
                  styles.getStarted
                )}
                to={useBaseUrl("docs/guides/orchestrate-human-tasks/")}
              >
                Human Task Orchestration
              </Link>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started-use-case get-started-use-case-2",
                  styles.getStarted
                )}
                to={useBaseUrl("docs/guides/orchestrate-api-endpoints/")}
              >
                API Endpoint Orchestration
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
