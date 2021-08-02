import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Camunda Cloud',
    imageUrl: 'img/camunda-cloud-gradient.png',
    url: 'https://docs.camunda.io/docs/product-manuals/concepts/what-is-camunda-cloud',
    description: (
      <>A  scalable, on-demand process platform
      </>
    ),
  },
  {
    title: 'Zeebe',
    imageUrl: 'img/camunda-workflow-engine-gradient.png',
    url: 'https://docs.camunda.io/docs/product-manuals/zeebe/zeebe-overview',
    description: (
      <>
        A workflow engine for microservices orchestration
      </>
    ),
  },
  {
    title: 'Operate',
    imageUrl: 'img/camunda-operate-gradient.png',
    url: 'https://docs.camunda.io/docs/product-manuals/operate/index',
    description: (
      <>
        Visibility, Monitoring, and Management
      </>
    ),
  },
];

function Feature({imageUrl, url, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
      <div className={clsx('col col--4', styles.feature)}>
        {imgUrl && (
          <div className="text--center">
            <a href={url}>
              <img className={styles.featureImage} src={imgUrl} alt={title} />
            </a>
          </div>
        )}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Guides, product manuals and reference for the components of Camunda Cloud.">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg button--hero',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/guides/')}>
              Get Started
            </Link>
          </div>
          <div>
            <Link
              className={clsx('sign-up-link')}
              to="https://camunda.io">
              Or sign up!
            </Link>
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
      </main>
    </Layout>
  );
}

export default Home;
