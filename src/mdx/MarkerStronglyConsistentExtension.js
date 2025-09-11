import React from "react";

export const MarkerStronglyConsistentExtension = () => {
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
          "This endpoint accesses strongly consistent data storage. Responses are guaranteed to reflect all writes that occurred before the request."
        }
      >
        Strongly Consistent
      </span>
    </p>
  );
};

export default MarkerStronglyConsistentExtension;
