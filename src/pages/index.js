import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";

const features = [
  {
    title: (
      <Translate
        id="homepage.features.easy-to-use.title"
        description="Title of feature of Easy to use on the home page"
      >
        Easy to Use
      </Translate>
    ),
    imageUrl: "img/undraw_just_browsing.svg",
    description: (
      <Translate
        id="homepage.features.easy-to-use"
        description="Feature easy to use"
      >
        AWE framework is designed from the ground up to be easily installed and
        used to build your website up and running quickly.
      </Translate>
    ),
  },
  {
    title: (
      <Translate
        id="homepage.features.pluggable-extensible.title"
        description="Title of feature of pluggable and extensible on the home page"
      >
        Pluggable and Extensible
      </Translate>
    ),
    imageUrl: "img/undraw_switches.svg",
    description: (
      <Translate
        values={{ starters: <code>starters</code> }}
        id="homepage.features.pluggable-extensible"
        description="Feature Pluggable and Extensible"
      >
        {`Extend or customize all AWE features. The Spring Boot {starters} design lets you to enable the modules and features that you need.`}
      </Translate>
    ),
  },
  {
    title: (
      <Translate
        id="homepage.features.connect-information.title"
        description="Title of feature of Connect your information on the home page"
      >
        Connect your information
      </Translate>
    ),
    imageUrl: "img/undraw_online_connection.svg",
    description: (
      <Translate
        id="homepage.features.connect-information"
        description="Feature Connect your information"
      >
        Bind your data to web forms easily. AWE allows to connect to different
        data sources like SQL and NoSQL databases, Rest APIs, JavaBeans, etc.
      </Translate>
    ),
  },
  {
    title: (
      <Translate
        id="homepage.features.customize-easy.title"
        description="Title of feature of Customize easy on the home page"
      >
        Easy to customize
      </Translate>
    ),
    imageUrl: "img/undraw_add_color.svg",
    description: (
      <Translate
        id="homepage.features.customize-easy"
        description="Feature Customize easy"
      >
        AWE has multiple preconfigured themes and multi-language support. You
        can add custom CSS according to your needs.
      </Translate>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Orhestrate complex process flows, automate across people, systems, and devices, and transform your organization."
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className="row">
            <div className={clsx("col col--offset-3 col--3", styles.buttons)}>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg button--hero get-started",
                  styles.getStarted
                )}
                to={useBaseUrl("docs/guides/")}
              >
                What's Camunda 8?
              </Link>
            </div>
            <div className={clsx("col col--3", styles.buttons)}>
              <Link
                className={clsx(
                  "button button--outline button--secondary button--lg sign-up",
                  styles.getStarted
                )}
                to={useBaseUrl(
                  "https://signup.camunda.com/accounts?utm_source=docs.camunda.io&utm_medium=referral"
                )}
              >
                Sign up
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
        <div className={clsx("hero hero--secondary", styles.heroBanner)}>
          <div className="container">
            <div class="textbox">
              <h2 className="hero__title" class="hero-title-footer">
                Try out our new SDKs!
              </h2>
              <p className="hero__subtitle" class="hero-subtitle-footer">
                For both <a href="/docs/apis-tools/node-js-sdk.md">Node.js</a>{" "}
                and{" "}
                <a href="/docs/apis-tools/spring-zeebe-sdk/getting-started.md">
                  Spring Zeebe
                </a>
                ,<br></br>check out our latest software development kits.
              </p>
            </div>
            <div class="imagebox">
              <img
                src="https://www.freeiconspng.com/uploads/right-arrow-icon-114837-11.png"
                alt="arrow icon pointing right"
                height="200px"
                width="300px"
              ></img>
            </div>
            <div class="featurebox">
              <img
                src="https://www.freeiconspng.com/uploads/right-arrow-icon-114837-11.png"
                alt="arrow icon pointing right"
                height="200px"
                width="300px"
              ></img>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
