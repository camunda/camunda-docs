import React from "react";
import "./styles.css";
import { activeVersionURLPath as linkBase } from "../Versions";
import UserDevIcon from "./icons/user-developer.svg";
import UserOpsIcon from "./icons/user-administrator.svg";

const QuickStartCard = ({ link, title, icon: Icon, description }) => {
  return (
    <a href={`${linkBase()}${link}`} className="sm-card" title={title}>
      <div className="sm-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const QuickStart = () => {
  const quickStartItems = [
    {
      title: "Developers",
      icon: UserDevIcon,
      description:
        "Get started quickly with local development setup and basic configuration",
      link: "/self-managed/quickstart/developer-quickstart/",
    },
    {
      title: "Administrators",
      icon: UserOpsIcon,
      description:
        "Learn how to deploy and manage Camunda in production environments",
      link: "/self-managed/quickstart/administrator-quickstart/",
    },
  ];

  return (
    <div className="sm-quickstart">
      <h2>Quick Start</h2>
      <p>
        Whether you're a developer looking to get up and running quickly or an
        operations team planning a production deployment, you'll find the
        resources and guidance you need to successfully implement Camunda
        Self-Managed.
      </p>
      <div className="sm-grid-2">
        {quickStartItems.map((item, index) => (
          <QuickStartCard
            key={index}
            title={item.title}
            icon={item.icon}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickStart;
