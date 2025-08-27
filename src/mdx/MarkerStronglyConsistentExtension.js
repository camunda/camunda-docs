import React from "react";

export const MarkerStronglyConsistentExtension = () => {
  return (
    <p>
      <span
        style={{
          backgroundColor: "#FC5D0D",
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
