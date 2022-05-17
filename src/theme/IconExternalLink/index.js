import React from "react";

import styles from "./styles.module.css";

function IconExternalLink({ width = 15, height = 15 }) {
  return (
    <svg
      width={width}
      height={height}
      // originally viewBox="0 0 512 512" but crop out the extra space for alignment ease
      viewBox="95.73 123.6 308.05 277.31"
      className={styles.iconExternalLink}
    >
      {/* title for accessibility purposes */}
      <title>(opens in a new window)</title>
      <g fill="currentColor">
        <polygon points="363.732 400.905 95.727 400.905 95.727 150.045 254.966 150.045 254.966 175.045 120.727 175.045 120.727 375.905 338.732 375.905 338.732 272.061 363.732 272.061 363.732 400.905" />
        <polygon points="403.772 123.595 265.259 123.595 310.881 169.773 217.215 263.439 263.036 309.261 356.425 215.871 403.772 263.795 403.772 123.595" />
      </g>
    </svg>
  );
}

export default IconExternalLink;
