import React from "react";

export const MarkerEventuallyConsistentExtension = () => {
  return (
    <p
      style={{
        marginBottom: "0",
      }}
    >
      <a href="../../orchestration-cluster-api-rest-data-fetching/#data-consistency">
        <span
          className={"badge badge--eventually-consistent"}
          title={
            "This endpoint accesses eventually consistent data storage. There may be a delay between when data is written and when it is available for reading. Click to learn more about endpoint data consistency."
          }
        >
          Eventually Consistent
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

export default MarkerEventuallyConsistentExtension;
