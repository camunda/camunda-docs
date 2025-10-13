import React from "react";

const PersonaBadge = ({
  persona,
  title = `This feature is likely to affect you as a ${persona}`,
}) => {
  return (
    <span className="badge badge--medium" title={title}>
      {persona}
    </span>
  );
};

export default PersonaBadge;
