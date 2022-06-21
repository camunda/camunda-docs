/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Head from "@docusaurus/Head";
import isInternalUrl from "@docusaurus/isInternalUrl";
import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import mixpanel from "mixpanel-browser";
import React from "react";
import IconExternalLink from "../IconExternalLink";
import styles from "./styles.module.css";

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
          <IconExternalLink />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

const FooterLogo = ({ url, alt }) => (
  <img className="footer__logo" alt={alt} src={url} />
);

function Footer() {
  const { footer } = useThemeConfig();
  const { copyright, links = [], logo = {} } = footer || {};
  const logoUrl = useBaseUrl(logo.src);

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx("footer", {
        "footer--dark": footer.style === "dark",
      })}
    >
      <div className="container">
        {links && links.length > 0 && (
          <div className="row footer__links">
            {links.map((linkItem, i) => (
              <div key={i} className="col footer__col">
                {linkItem.title != null ? (
                  <h4 className="footer__title">{linkItem.title}</h4>
                ) : null}
                {linkItem.items != null &&
                Array.isArray(linkItem.items) &&
                linkItem.items.length > 0 ? (
                  <ul className="footer__items">
                    {linkItem.items.map((item, key) =>
                      item.html ? (
                        <li
                          key={key}
                          className="footer__item" // Developer provided the HTML, so assume it's safe.
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: item.html,
                          }}
                        />
                      ) : (
                        <li key={item.href || item.to} className="footer__item">
                          <FooterLink {...item} />
                        </li>
                      )
                    )}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        )}
        {(logo || copyright) && (
          <div className="text--center">
            {logo && logo.src && (
              <div className="margin-bottom--sm">
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLogoLink}
                  >
                    <FooterLogo alt={logo.alt} url={logoUrl} />
                  </a>
                ) : (
                  <FooterLogo alt={logo.alt} url={logoUrl} />
                )}
              </div>
            )}

            <div // Developer provided the HTML, so assume it's safe.
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: copyright,
              }}
            />
          </div>
        )}
      </div>
      <Head>
        {/* Osano (Consent) */}
        <script src="https://cmp.osano.com/16CVvwSNKHi9t1grQ/2ce963c0-31c9-4b54-b052-d66a2a948ccc/osano.js"></script>
      </Head>
      <AnalyticsEvents></AnalyticsEvents>
    </footer>
  );
}

const AnalyticsEvents = () => {
  return (
    <BrowserOnly>
      {() => {
        const auth0Config = {
          domain: "weblogin.cloud.camunda.io",
          clientId: "xxpG51I1fjAVqkyiclS3IFntj9pC46lA",
          audience: "cloud.camunda.io",
          origin: window.location.origin,
        };
        return (
          <Auth0Provider
            domain={auth0Config.domain}
            clientId={auth0Config.clientId}
            audience={auth0Config.audience}
            redirectUri={auth0Config.origin}
          >
            <MixpanelElement></MixpanelElement>
          </Auth0Provider>
        );
      }}
    </BrowserOnly>
  );
};

let lastEventTs = 0;

const MixpanelElement = () => {
  return (
    <BrowserOnly>
      {() => {
        const osano = window.Osano;
        if (osano?.cm?.analytics) {
          const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
          // check if mixpanel is initiated
          const stage = "prod";
          let mixpanelInitiated = false;
          try {
            const loadedStage = mixpanel.get_property("stage");
            if (loadedStage === stage) {
              mixpanelInitiated = true;
            }
          } catch (_error) {
            // mixpanel is not initiated
          }
          if (!mixpanelInitiated) {
            getAccessTokenSilently()
              .then((_token) => {
                if (isAuthenticated) {
                  let orgId;
                  if (user["https://camunda.com/orgs"]?.length > 0) {
                    orgId = user["https://camunda.com/orgs"][0].id;
                  }
                  const userId = user.sub;
                  mixpanel.init("b4db7bd0787698f42fb2929d88a8a85f");
                  mixpanel.identify(userId);
                  const superProperties = { userId, stage };
                  if (orgId) {
                    superProperties["orgId"] = orgId;
                    superProperties["org_id"] = orgId;
                  }
                  mixpanel.register(superProperties);
                  sendMixpanelEvent("docs");
                }
              })
              .catch((_error) => {
                // failed to silently authenticate user
              });
          } else {
            // track event "docs"
            sendMixpanelEvent("docs");
          }
        } else {
          // Osano is not or analytics consent is not enabled
        }
        return <span></span>;
      }}
    </BrowserOnly>
  );
};

function sendMixpanelEvent(eventName) {
  // somehow the code is executed twice
  // that leads to the fact that events are sent twice
  // workaround: send events only once per second
  const now = Date.now();
  if (now - lastEventTs > 1000) {
    mixpanel.track(eventName);
    lastEventTs = now;
  }
}

export default Footer;
