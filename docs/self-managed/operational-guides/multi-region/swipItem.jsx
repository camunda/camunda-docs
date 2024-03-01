import React from 'react';

import './swipItem.css';

export default function SwipItem({ current, desired, description, code}) {
  return (
    <div class="wrapper">
        <div class="aside left-1">
            <div>
                <h4>Current State</h4>
            </div>
            <div>
                {current}
            </div>
        </div>
        <div class="aside right-2">
            <div>
                <h4>Desired State</h4>
            </div>
            <div>
                {desired}
            </div>
        </div>
        <div class="below">
            <div>
                <h4>Description / Code</h4>
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
};
