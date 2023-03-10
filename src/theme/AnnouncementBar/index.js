import React from "react";
import AnnouncementBar from "@theme-original/AnnouncementBar";

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function AnnouncementBarWrapper(props) {
  return (
    <>
      <AnnouncementBarWithAuth {...props} />
    </>
  );
}

const AnnouncementBarWithAuth = (props) => {
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
            <AnnouncementBarIfAuthenticated {...props} />
          </Auth0Provider>
        );
      }}
    </BrowserOnly>
  );
};

const AnnouncementBarIfAuthenticated = (props) => {
  return (
    <BrowserOnly>
      {() => {
        const { isAuthenticated } = useAuth0();
        if (isAuthenticated) {
          return <span></span>;
        }
        return <AnnouncementBar {...props} />;
      }}
    </BrowserOnly>
  );
};
