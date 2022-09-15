// Why is this swizzled?
//   To fire Mixpanel events for logged-in users when the component renders.
// Swizzled from version 2.0.0-rc.1.

import React from "react";
import Footer from "@theme-original/Footer";

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Head from "@docusaurus/Head";
import mixpanel from "mixpanel-browser";

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <Head>
        {/* Osano (Consent) */}
        <script src="https://cmp.osano.com/16CVvwSNKHi9t1grQ/2ce963c0-31c9-4b54-b052-d66a2a948ccc/osano.js"></script>
      </Head>
      <AnalyticsEvents></AnalyticsEvents>
    </>
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
            // TODO: remove this logging after figuring out why mixpanel is broken
            console.log("mixpanel is not initiated...", _error);
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
                // TODO: remove this logging after figuring out why mixpanel is broken
                console.log("failed to authenticate user...", _error);
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

let lastEventTs = 0;

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
