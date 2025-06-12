import React from "react";

const FromVersionBadge = ({
  version,
  title = `This feature is available from ${version}`,
}) => {
  return (
    <span className="badge badge--medium" title={title}>
      {version}
    </span>
  );
};

export default FromVersionBadge;
