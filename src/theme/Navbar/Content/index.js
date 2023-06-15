import React from "react";
import Content from "@theme-original/Navbar/Content";

export default function ContentWrapper(props) {
  return (
    <>
      <div className="navbar-top--info">
        <a
          target="_blank"
          href="https://signup.camunda.com/accounts?_ga=2.124018762.1966193156.1686668003-663653735.1686668003"
        >
          Create account
        </a>
        <a target="_blank" href="https://console.cloud.camunda.io/">
          Sign Up
        </a>
      </div>
      <Content {...props} />
    </>
  );
}
