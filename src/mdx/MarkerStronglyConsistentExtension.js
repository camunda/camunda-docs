import React from "react";

export const MarkerStronglyConsistentExtension = () => {
  return (
    <p
      style={{
        marginBottom: "0",
      }}
    >
      <span
        className={"badge badge--consistent"}
        title={
          "This endpoint accesses strongly consistent data storage. Responses are guaranteed to reflect all writes that occurred before the request. Click to learn more."
        }
      >
        Strongly Consistent
      </span>{" "}
      <a href="../../orchestration-cluster-api-rest-data-fetching/#data-consistency">
        Learn about consistency.
      </a>
    </p>
  );
};

export default MarkerStronglyConsistentExtension;
