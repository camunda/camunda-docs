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
          <p><strong>Camunda 8 Self-Managed:</strong> You are responsible for deploying,
          scaling, securing, maintaining, and updating the entire Camunda stack
          on your own Kubernetes clusters or cloud infrastructure.</p>
        </li>
        <li>
          <p><strong>Camunda 8 SaaS:</strong> Camunda manages the infrastructure,
          availability, security, and upgrades so you can focus on modeling,
          deploying, and managing your business processes.</p>
        </li>
      </ul>
      <p>
        In summary: choose <strong>Self-Managed</strong> for maximum control and flexibility,
        and <strong>SaaS</strong> for speed and simplicity.
      </p>
    </div>
  );
};

export default Introduction;
