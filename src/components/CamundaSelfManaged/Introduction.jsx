import React from "react";
import { activeVersionURLPath as linkBase } from "../Versions";

const Introduction = () => {
  return (
    <div>
      <p>
        Welcome to Camunda 8 Self-Managed the self-hosted alternative to{" "}
        <a href={`${linkBase()}/components`}>Camunda 8 SaaS</a>! This section
        provides everything you need to get started with deploying and managing
        Camunda in your own infrastructure.
      </p>
      <p>
        From quick start guides to infrastructure and deployment options, we'll
        help you build a robust process automation platform that meets your
        organization's specific needs.
      </p>

      <h2>Self-Managed vs. SaaS?</h2>
      <p>
        The primary difference between Camunda 8 Self-Managed and Camunda 8 SaaS
        is who is responsible for the infrastructure and operations.
      </p>
      <ul>
        <li>
          <b>Camunda 8 Self-Managed:</b> You are responsible for deploying, scaling, securing, maintaining, and updating the entire Camunda stack on your own Kubernetes clusters or cloud infrastructure.
        </li>
        <li>
          <b>Camunda 8 SaaS:</b> Camunda manages the infrastructure,
          availability, security, and upgrades - so you can focus on modeling,
          deploying, and managing your business processes.
        </li>
      </ul>
      <p>
        In short: <b>Self-Managed</b> offers maximum control and flexibility, while <b>SaaS</b> provides speed and simplicity.
      </p>
    </div>
  );
};

export default Introduction;
