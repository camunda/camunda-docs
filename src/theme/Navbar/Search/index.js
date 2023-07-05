import React from "react";
import Search from "@theme-original/Navbar/Search";
import IconExternalLink from "@theme-original/Icon/ExternalLink";

export default function SearchWrapper(props) {
  return (
    <>
      <a
        className="create-account-btn"
        target="_blank"
        href="https://signup.camunda.com/accounts?_ga=2.124018762.1966193156.1686668003-663653735.1686668003"
      >
        Create account <IconExternalLink></IconExternalLink>
      </a>
      <Search {...props} />
    </>
  );
}
