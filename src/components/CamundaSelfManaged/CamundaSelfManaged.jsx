import React from "react";
import QuickStart from "./QuickStart";
import Installation from "./Installation";
import Infrastructure from "./Infrastructure";
import Components from "./Components";
import ReferenceArchitecture from "./ReferenceArchitecture";

const Intro = () => {
  return (
    <div>
      <h2>Overview</h2>
      <p>
        Welcome to Camunda 8 Self-Managed the self-hosted alternative of{" "}
        <a href="/docs/components">Camunda 8 SaaS</a>! This section provides
        everything you need to get started with deploying and managing Camunda
        in your own infrastructure.
      </p>
      <p>
        From quick start guides to infrastructure and deployment options, we'll
        help you build a robust process automation platform that meets your
        organization's specific requirements.
      </p>

      <h2>Self-Managed or SaaS?</h2>
      <p>
        In Camunda 8, the key difference between Self-Managed and SaaS lies in
        user responsibility.
      </p>
      <ul>
        <li>
          <b>Camunda 8 Self-Managed:</b> Users are fully responsible for
          deploying, scaling, securing, maintaining, and updating the entire
          Camunda stack across Kubernetes clusters or/and cloud infrastructure.
        </li>
        <li>
          <b>Camunda 8 SaaS:</b> Camunda handles the infrastructure, uptime,
          security, and updates, allowing users to focus solely on modeling,
          deploying, and managing their business processes.
        </li>
      </ul>
      <p>
        Essentially, Self-Managed gives you control and customizability; SaaS
        gives you speed and simplicity.
      </p>
    </div>
  );
};

const CamundaSelfManaged = () => {
  return (
    <div className="camunda-self-managed">
      <Intro />
      <QuickStart />
      <Installation />
      <Infrastructure />
      <ReferenceArchitecture />
      <Components />
    </div>
  );
};

export default CamundaSelfManaged;
