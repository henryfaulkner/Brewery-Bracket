import React from "react";

// https://transform.tools/
const ClosedEye = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.53 4.53a.75.75 0 00-1.06-1.06l-16 16a.75.75 0 101.06 1.06l2.847-2.847c1.367.644 2.94 1.067 4.623 1.067 2.684 0 5.09-1.077 6.82-2.405.867-.665 1.583-1.407 2.089-2.136.492-.709.841-1.486.841-2.209 0-.723-.35-1.5-.841-2.209-.506-.729-1.222-1.47-2.088-2.136-.263-.201-.54-.397-.832-.583L20.53 4.53zM16.9 8.161l-1.771 1.771a3.75 3.75 0 01-5.197 5.197l-1.417 1.416A9.25 9.25 0 0012 17.25c2.287 0 4.38-.923 5.907-2.095.762-.585 1.364-1.218 1.77-1.801.419-.604.573-1.077.573-1.354 0-.277-.154-.75-.573-1.354-.406-.583-1.008-1.216-1.77-1.801-.313-.24-.65-.47-1.008-.684zm-5.87 5.87a2.25 2.25 0 003-3l-3 3z"
        fill="#000"
      />
      <path
        d="M12 5.25c1.032 0 2.024.16 2.951.431a.243.243 0 01.1.407l-.824.825a.254.254 0 01-.237.067A8.872 8.872 0 0012 6.75c-2.287 0-4.38.923-5.907 2.095-.762.585-1.364 1.218-1.77 1.801-.419.604-.573 1.077-.573 1.354 0 .277.154.75.573 1.354.354.51.858 1.057 1.488 1.577.116.095.127.27.02.377l-.708.709a.246.246 0 01-.333.016 9.52 9.52 0 01-1.699-1.824C2.6 13.5 2.25 12.723 2.25 12c0-.723.35-1.5.841-2.209.506-.729 1.222-1.47 2.088-2.136C6.91 6.327 9.316 5.25 12 5.25z"
        fill="#000"
      />
      <path
        d="M12 8.25c.118 0 .236.005.351.016.197.019.268.254.129.394l-1.213 1.212a2.256 2.256 0 00-1.395 1.395L8.66 12.48c-.14.14-.375.068-.394-.129A3.75 3.75 0 0112 8.25z"
        fill="#000"
      />
    </svg>
  );
};

export default ClosedEye;
