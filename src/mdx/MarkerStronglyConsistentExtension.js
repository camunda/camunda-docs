import React from "react";

export const MarkerStronglyConsistentExtension = () => {
  return (
    <p
      style={{
        marginBottom: "0",
      }}
    >
      <a href="../../orchestration-cluster-api-rest-data-fetching/#data-consistency">
        <span
          className={"badge badge--consistent"}
          title={
            "This endpoint accesses strongly consistent data storage. Responses are guaranteed to reflect all writes that occurred before the request. Click to learn more about endpoint data consistency."
          }
        >
          Strongly Consistent
        </span>
      </a>{" "}
      <a
        href="../../orchestration-cluster-api-rest-data-fetching/#data-consistency"
        style={{ fontSize: "90%", marginLeft: "8px" }}
      >
        About endpoint data consistency
      </a>
    </p>
  );
};

export default MarkerStronglyConsistentExtension;
