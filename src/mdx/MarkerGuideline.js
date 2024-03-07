import React from "react";

export const Invalid = () => {
  return (
    <svg
      className="guideline-mark"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm2.7 10.5L8 8.8l-2.7 2.7-.8-.8L7.2 8 4.5 5.3l.8-.8L8 7.2l2.7-2.7.8.8L8.8 8l2.7 2.7-.8.8z"
        fill="#DA1E28"
      ></path>
    </svg>
  );
};

export const Valid = () => {
  return (
    <svg
      className="guideline-mark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path
        fill="green"
        d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM14,21.5908l-5-5L10.5906,15,14,18.4092,21.41,11l1.5957,1.5859Z"
      />
      <polygon
        fill="white"
        points="14 21.591 9 16.591 10.591 15 14 18.409 21.41 11 23.005 12.585 14 21.591"
      />
    </svg>
  );
};

export const Info = () => {
  return (
    <svg
      className="guideline-mark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path
        fill="white"
        d="M16 8a1.5 1.5 0 11-1.5 1.5A1.5 1.5 0 0116 8zm4 13.875h-2.875v-8H13v2.25h1.875v5.75H12v2.25h8z"
      />
      <path
        fill="#4589ff"
        d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 6a1.5 1.5 0 11-1.5 1.5A1.5 1.5 0 0116 8zm4 16.125h-8v-2.25h2.875v-5.75H13v-2.25h4.125v8H20z"
      />
    </svg>
  );
};

export default {
  Valid,
  Invalid,
  Info,
};
