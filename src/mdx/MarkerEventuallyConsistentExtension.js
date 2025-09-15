import React from "react";

export const MarkerEventuallyConsistentExtension = () => {
  return (
    <p
      style={{
        marginBottom: "0",
      }}
    >
      <span
        className={"badge badge--eventually-consistent"}
        title={
          "This endpoint accesses eventually consistent data storage. There may be a delay between when data is written and when it is available for reading."
        }
      >
        Eventually Consistent
      </span>
    </p>
  );
};

export default MarkerEventuallyConsistentExtension;
