import React from "react";
import { activeVersionURLPath as linkBase } from "../Versions";

const Introduction = () => {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <h2>Self-Managed or SaaS?</h2>
      <p>
        The main difference between Camunda 8 Self-Managed and Camunda 8 SaaS
        is responsibility for infrastructure and operations.
      </p>

      <ul>
        <li>
          <p><b>Camunda 8 Self-Managed:</b> You are responsible for deploying,
          scaling, securing, maintaining, and updating the entire Camunda stack
          on your own Kubernetes clusters or cloud infrastructure.</p>
        </li>
        <li>
          <p><b>Camunda 8 SaaS:</b> Camunda manages the infrastructure,
          availability, security, and upgrades - so you can focus on modeling,
          deploying, and managing your business processes.</p>
        </li>
      </ul>
      <p>
        In summary: choose <b>Self-Managed</b> for maximum control and flexibility,
        and <b>SaaS</b> for speed and simplicity.
      </p>
    </div>
  );
};

export default Introduction;
