import React from "react";
import Components from "./Components";
import Infrastructure from "./Infrastructure";
import Installation from "./Installation";
import Introduction from "./Introduction";
import QuickStart from "./QuickStart";
import ReferenceArchitecture from "./ReferenceArchitecture";
import Components2 from "./Components2";

const CamundaSelfManaged = () => {
  return (
    <div className="camunda-self-managed">
      <Introduction />
      <QuickStart />
      <Installation />
      <Infrastructure />
      <ReferenceArchitecture />
      <Components />
      <Components2 />
    </div>
  );
};

export default CamundaSelfManaged;
