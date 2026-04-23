import React from "react";

export const MarkerAddedInVersion = ({ version }) => {
  return (
    <span
      className={"badge badge--added-in-version"}
      title={`This endpoint was added in version ${version}.`}
    >
      Added in {version}
    </span>
  );
};

export default MarkerAddedInVersion;
