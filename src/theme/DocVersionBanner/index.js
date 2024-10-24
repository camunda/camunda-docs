// Why is this swizzled?
//   To override the message displayed by `LatestVersionSuggestionLabel`. The built-in version
//    of this component can only link to another internal version, and the message includes a version
//     defined in this app. In an archived version of our documentation, neither of those pre-requisites are met.
//   In the `main` branch of these docs, this component exists in an `archive/` folder, so that it is
//    ignored by docusaurus. In an archived branch of these docs, the component is moved outside of the `archive/`
//    folder, so that it is recognized by docusaurus.
//   This is a very simplified version of the built-in DocVersionBanner file, not intended to support
//    all use cases. It's only intended to meet the needs of an archived version of the docs.
// Swizzled from version 2.3.1.

import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDocsVersion } from "@docusaurus/theme-common/internal";

function UnmaintainedVersionLabel({ siteTitle, versionMetadata }) {
  return (
    <Translate
      id="theme.docs.versions.unmaintainedVersionLabels"
      description="The label used to tell the user that they're browsing an unmaintained doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}
    >
      {
        "This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."
      }
    </Translate>
  );
}

function BannerLabel(props) {
  return <UnmaintainedVersionLabel {...props} />;
}

function LatestVersionSuggestionLabel({ versionLabel }) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{
        versionLabel,
        latestVersionLink: (
          <b>
            <Link to="https://docs.camunda.io">
              <Translate
                id="theme.docs.versions.latestVersionLinkLabel"
                description="The label used for the latest version suggestion link label"
              >
                latest version
              </Translate>
            </Link>
          </b>
        ),
      }}
    >
      {"For up-to-date documentation, see the {latestVersionLink}."}
    </Translate>
  );
}

function DocVersionBannerEnabled({ className, versionMetadata }) {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  return (
    <div
      className={clsx(
        className,
        ThemeClassNames.docs.docVersionBanner,
        "alert alert--warning margin-bottom--md"
      )}
      role="alert"
    >
      <div>
        <BannerLabel siteTitle={siteTitle} versionMetadata={versionMetadata} />
      </div>
      <div className="margin-top--md">
        <LatestVersionSuggestionLabel />
      </div>
    </div>
  );
}

export default function DocVersionBanner({ className }) {
  const versionMetadata = useDocsVersion();
  if (versionMetadata.banner) {
    return (
      <DocVersionBannerEnabled
        className={className}
        versionMetadata={versionMetadata}
      />
    );
  }
  return null;
}
