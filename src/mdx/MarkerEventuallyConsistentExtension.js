import React from "react";

export const MarkerEventuallyConsistentExtension = () => {
  return (
    <p>
      <span
        style={{
          backgroundColor: "var(--ifm-color-warning)",
          borderRadius: "7px",
          color: "#fff",
          padding: "0.2rem",
          marginRight: "0.5rem",
        }}
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
