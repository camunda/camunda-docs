import React from "react";

import "./stateContainer.css";

export default function StateContainer({
  current,
  desired,
  description,
  code,
}) {
  return (
    <div class="wrapper">
      <div class="aside left-1">
        <div>
          <h5>Current state</h5>
        </div>
        <div>{current}</div>
      </div>
      <div class="aside right-2">
        <div>
          <h5>Desired state</h5>
        </div>
        <div>{desired}</div>
      </div>
      <div class="below">
        <div>
          <h3>Description / Code</h3>
        </div>
        <div>
          {description}
          {code}
        </div>
      </div>
      <div class="below">
        <br></br>
      </div>
    </div>
  );
}
