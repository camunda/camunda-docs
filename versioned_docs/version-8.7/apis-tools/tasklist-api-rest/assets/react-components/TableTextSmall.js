import React from "react";

export default function TableTextSmall({ children }) {
  return (
    <p>
      <small style={{ color: "#6d6d6d" }}>{children}</small>
    </p>
  );
}
