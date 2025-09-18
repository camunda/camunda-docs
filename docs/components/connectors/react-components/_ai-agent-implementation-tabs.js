import React from "react";
import Tabs from "@theme/Tabs";

const AiAgentImplementationTabs = ({ children }) => {
  return (
    <Tabs
      groupId="ai-agent-implementation"
      defaultValue="process"
      queryString
      values={[
        { label: "AI Agent Process", value: "process" },
        { label: "AI Agent Task", value: "task" },
      ]}
    >
      {children}
    </Tabs>
  );
};

export default AiAgentImplementationTabs;
