/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import googletagmanager from "./gtm";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";

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
      {label}
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
        {/* Global site tag (gtm.js) - Google Analytics */}
        {/* <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-KQGNSTS"
        ></script>
        {googletagmanager()} */}
      </Head>
      <Auth0Provider
        domain="weblogin.cloud.camunda.io"
        clientId="xxpG51I1fjAVqkyiclS3IFntj9pC46lA"
        audience="cloud.camunda.io"
        redirectUri={window.location.origin}
      >
        <MixpanelElement></MixpanelElement>
        {/* <MixpanelElement2></MixpanelElement2> */}
        <LoginButton></LoginButton>
      </Auth0Provider>
    </footer>
  );
}

const MixpanelElement = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const osano = window.Osano;
  if (osano?.cm?.analytics) {
    console.log(`osano consent available for analytics`);
    const stage = "prod";
    let mixpanelLoaded = false;
    try {
      const loadedStage = mixpanel.get_property("stage");
      if (loadedStage === stage) {
        mixpanelLoaded = true;
      }
    } catch (_error) {
      console.log("mixpanel not loaded...");
    }
    if (!mixpanelLoaded) {
      getAccessTokenSilently()
        .then((_token) => {
          console.log(_token);
          if (isAuthenticated) {
            console.log(user);
            const userId = user.sub;
            mixpanel.init("1104cabe553c23b7e67d56b1976437aa");
            mixpanel.identify(userId);
            mixpanel.register({
              userId,
              stage,
            });
            mixpanel.track("docs");
          }
        })
        .catch((_error) => {
          console.log(`failed silent login`);
          console.log(_error);
        });
    } else {
      console.log(`tracking mixpanel event`);
      mixpanel.track("docs");
    }
  } else {
    console.log(`sorry, no osano analytics consent`);
  }
  return <div>silent login</div>;
};

// const MixpanelElement = () => {
//   const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
//   const osano = window.Osano;
//   if (osano?.cm?.analytics) {
//     console.log(`osano consent available for analytics`);
//     getAccessTokenSilently()
//       .then((_token) => {
//         console.log(_token);
//         if (isAuthenticated) {
//           console.log(user);
//           const userId = user.sub;
//           let mixpanelLoaded = false;
//           try {
//             const loadedUserId = mixpanel.get_property("userId");
//             if (loadedUserId === userId) {
//               mixpanelLoaded = true;
//             }
//           } catch (_error) {
//             console.log("mixpanel not loaded...");
//           }
//           if (!mixpanelLoaded) {
//             mixpanel.init("1104cabe553c23b7e67d56b1976437aa");
//             mixpanel.identify(userId);
//             mixpanel.register({
//               userId,
//               stage: "prod",
//             });
//           }
//           mixpanel.track("docs");
//         }
//       })
//       .catch((_error) => {
//         console.log(`failed silent login`);
//         console.log(_error);
//       });
//   } else {
//     console.log(`sorry, no osano analytics consent`);
//   }
//   return <div>silent login</div>;
// };

// const MixpanelElement2 = () => {
//   const { user, isAuthenticated } = useAuth0();
//   if (isAuthenticated) {
//     // const mixpanel = new Mixpanel("1104cabe553c23b7e67d56b1976437aa");
//     const userId = user.sub;
//     let mixpanelLoaded = false;
//     try {
//       const loadedUserId = mixpanel.get_property("userId");
//       if (loadedUserId === userId) {
//         mixpanelLoaded = true;
//       }
//     } catch (_error) {
//       console.log("mixpanel not loaded...");
//     }
//     if (!mixpanelLoaded) {
//       mixpanel.init("1104cabe553c23b7e67d56b1976437aa");
//       mixpanel.identify(userId);
//       mixpanel.register({
//         userId,
//         stage: "docs",
//       });
//     }
//     mixpanel.track("docusaurus:init");
//   }
//   return <div>mixpanel</div>;
// };

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default Footer;
