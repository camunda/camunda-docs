import React from "react";
import Search from "@theme-original/Navbar/Search";
import IconExternalLink from "@theme-original/Icon/ExternalLink";

export default function SearchWrapper(props) {
  return (
    <>
      <a
        className="create-account-btn"
        target="_blank"
        href="https://signup.camunda.com/accounts?utm_source=docs.camunda.io&utm_medium=referral"
      >
        Create account <IconExternalLink></IconExternalLink>
      </a>
      <Search {...props} />
    </>
  );
}
