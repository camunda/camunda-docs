import React from "react";

export const MarkerEventuallyConsistentExtension = () => {
  return (
    <p>
      <span
        style={{
          // Use theme success color so it adapts to light/dark themes
          backgroundColor: "var(--ifm-color-success)",
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
