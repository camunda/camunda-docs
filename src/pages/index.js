import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import AlgoliaSearchBox from "@theme/SearchBar";

const features = [
  {
    title: "Get started",
    imageUrl: "img/home-get-started.png",
    url: "/docs/guides",
    description:
      "New to Camunda 8? Create an account and start modeling your first process.",
  },
  {
    title: "Using Camunda",
    imageUrl: "img/home-components.png",
    url: "/docs/components/",
    description:
      "Learn how to use Camunda 8 components, features, and integrations.",
  },
  {
    title: "Self-Managed",
    imageUrl: "img/home-self-managed.png",
    url: "/docs/self-managed/about-self-managed/",
    description:
      "Set up and host Camunda 8 yourself instead of using Camunda 8 SaaS.",
  },
  {
    title: "APIs & tools",
    imageUrl: "img/home-apis.png",
    url: "/docs/apis-tools/working-with-apis-tools/",
    description:
      "Explore Zeebe client libraries, Camunda component APIs, and SDKs.",
  },
  {
    title: "Best Practices",
    imageUrl: "img/home-bp.png",
    url: "/docs/components/best-practices/best-practices-overview/",
    description:
      "Level up your BPMN and DMN skills, including insights from consulting and the community.",
  },
  {
    title: "Reference",
    imageUrl: "img/home-reference.png",
    url: "/docs/reference/",
    description:
      "Release notes, announcements, supported environments, licenses, and more.",
  },
];

function Feature({ imageUrl, url, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div
      className={clsx(
        "col component-block",
        styles.features,
        styles.featuresSection
      )}
    >
      <Link
        to={useBaseUrl(url)}
        title={title}
        className={clsx(styles.featuresLink)}
      >
        {imgUrl && (
          <div className="text--center">
            <img className={styles.featuresImage} src={imgUrl} alt={title} />
          </div>
        )}
        <h3 className={clsx("text--center", styles.featuresTitle)}>{title}</h3>
        <p className={clsx("text--center", styles.featuresDescription)}>
          {description}
        </p>
      </Link>
    </div>
  );
}

const search_agentic_url =
  "/docs/components/agentic-orchestration/agentic-orchestration-overview/";
const search_agent_url = "/docs/guides/getting-started-agentic-orchestration/";
const search_idp_url = "/docs/components/modeler/web-modeler/idp/";
const release = "/docs/reference/announcements-release-notes/overview/";
const search_migrate_url = "/docs/guides/migrating-from-camunda-7/";
const search_feel_url = "/docs/components/modeler/feel/what-is-feel/";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Start orchestrating your processes with Camunda 8 SaaS or Self-Managed."
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className="homeSearch">
            <AlgoliaSearchBox />
          </div>
          <p className="popular" style={{ color: "#ccc" }}>
            <strong style={{ paddingRight: "20px" }}>Popular:</strong>{" "}
            <Link to={useBaseUrl(search_agentic_url)}>
              Agentic orchestration
            </Link>
            <Link to={useBaseUrl(search_agent_url)}>Build an AI agent</Link>
            <Link to={useBaseUrl(search_idp_url)}>IDP</Link>
            <Link to={useBaseUrl(release)}>Release notes</Link>
            <Link to={useBaseUrl(search_migrate_url)}>Camunda 7 migration</Link>
            <Link to={useBaseUrl(search_feel_url)}>What is FEEL</Link>
          </p>
          <div className={clsx("row", styles.buttonsWrapper)}>
            <div className={clsx("", styles.buttons)}>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started",
                  styles.getStarted
                )}
                to={useBaseUrl("docs/guides/")}
                title="Get started with Camunda 8"
              >
                Get started
              </Link>
            </div>
            <div className={clsx("", styles.buttons)}>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg sign-up",
                  styles.getStarted
                )}
                to={useBaseUrl(
                  "https://signup.camunda.com/accounts?utm_source=docs.camunda.io&utm_medium=referral"
                )}
                title="Sign up for Camunda 8 SaaS"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={(styles.features, styles.featuresBlock)}>
            <div className="container">
              <div className={styles.featuresGrid}>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <div className={clsx("hero hero--secondary", styles.heroBanner)}>
          <div className="container">
            <h2 className="hero__title">What's new</h2>
            <p className="hero__subtitle">
              Check out some of our latest features
            </p>
            <div className={styles.buttons}>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started-use-case",
                  styles.getStarted
                )}
                to={useBaseUrl("docs/components/agentic-orchestration/")}
              >
                Agentic Orchestration
              </Link>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started-use-case get-started-use-case-2",
                  styles.getStarted
                )}
                to={useBaseUrl(
                  "docs/reference/announcements-release-notes/880/whats-new-in-88/"
                )}
              >
                What's new in 8.8
              </Link>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started-use-case get-started-use-case-2",
                  styles.getStarted
                )}
                to={useBaseUrl(
                  "docs/reference/announcements-release-notes/880/880-release-notes/"
                )}
              >
                8.8 release notes
              </Link>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started-use-case get-started-use-case-2",
                  styles.getStarted
                )}
                to={useBaseUrl("docs/apis-tools/java-client/getting-started/")}
              >
                Java client
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
