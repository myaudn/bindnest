import React from 'react';

interface BindnestLogoProps {
  className?: string;
  size?: number | string;
}

/**
 * Simplified Bindnest Logo: Capital 'B' formed as a leather-bound book with fanned top pages.
 * Matches Image 2 (bindnest-logo-simplified.png) with crisp scalable SVG geometry.
 */
export const BindnestLogoSimplified: React.FC<BindnestLogoProps> = ({
  className = 'h-9 w-auto',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 100 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { height: size, width: 'auto' } : undefined}
      aria-label="Bindnest Simplified Logo"
    >
      {/* Three fanned book pages at the top */}
      <path
        d="M 57 1 L 55 12 C 45 6 25 10 13 18 L 10 24 C 20 18 36 12 55 12 L 57 1 Z"
        fill="#934520"
      />
      <path
        d="M 67 6 L 65 17 C 55 11 38 14 26 23 L 23 27 C 35 20 50 16 65 17 L 67 6 Z"
        fill="#934520"
      />
      <path
        d="M 76 16 L 73 26 C 60 21 42 24 33 30 L 30 33 C 43 27 58 24 73 26 L 76 16 Z"
        fill="#934520"
      />

      {/* Main Book-B Body */}
      <path
        d="M 12 24
           C 25 18 52 24 74 27
           C 87 29 93 42 93 54
           C 93 66 84 75 72 79
           C 90 84 100 98 100 114
           C 100 133 83 148 60 148
           C 35 148 16 145 2 135
           C 1 120 1 35 12 24 Z
           M 26 43
           L 26 73
           C 40 73 68 74 68 58
           C 68 44 42 43 26 43 Z
           M 26 91
           L 26 129
           C 42 129 74 130 74 110
           C 74 92 42 91 26 91 Z"
        fill="#934520"
        fillRule="evenodd"
        clipRule="evenodd"
      />

      {/* Subtle spine highlight & inner page boundary crease */}
      <path
        d="M 78 102 C 83 110 82 125 74 132 C 78 123 79 110 78 102 Z"
        fill="#ffffff"
        opacity="0.25"
      />
      <path
        d="M 13 25 C 2 36 2 120 3 134 C 4 118 4 36 13 25 Z"
        fill="#733214"
        opacity="0.3"
      />
    </svg>
  );
};

interface BindnestWordmarkProps {
  className?: string;
  height?: number | string;
}

/**
 * Full Bindnest Wordmark: The Book-B + "indnest" with the sinuous sage green cord.
 * Matches Image 1 (bindnest-logo.png).
 */
export const BindnestWordmark: React.FC<BindnestWordmarkProps> = ({
  className = 'h-8 w-auto',
  height,
}) => {
  return (
    <div
      className={`inline-flex items-center relative select-none ${className}`}
      style={height ? { height } : undefined}
    >
      <svg
        viewBox="0 0 540 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto overflow-visible"
        aria-label="Bindnest"
      >
        <defs>
          <style>
            {`
              .bn-font {
                font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
                font-weight: 800;
                font-size: 130px;
                letter-spacing: -3px;
                fill: #934520;
              }
            `}
          </style>
        </defs>

        {/* --- Sinuous Sage Green Thread (Back Layer) --- */}
        <path
          d="M 28 42
             C -15 35 -10 125 15 150
             C 45 180 130 145 185 110
             C 245 70 290 120 315 140
             C 325 148 335 142 332 125
             C 328 108 308 105 306 122
             C 304 142 325 156 360 145
             C 410 130 460 90 540 38"
          stroke="#5a7153"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* --- Capital 'B' (Book shape) --- */}
        <g transform="translate(25, 2)">
          {/* Top 3 pages */}
          <path
            d="M 44 2 L 42 12 C 34 7 19 10 10 17 L 8 22 C 16 17 28 12 42 12 L 44 2 Z"
            fill="#934520"
          />
          <path
            d="M 52 7 L 50 16 C 42 11 29 14 20 21 L 18 25 C 27 19 39 15 50 16 L 52 7 Z"
            fill="#934520"
          />
          <path
            d="M 59 14 L 56 23 C 46 19 32 21 25 26 L 23 29 C 33 24 45 21 56 23 L 59 14 Z"
            fill="#934520"
          />

          {/* Book-B outline & counter spaces */}
          <path
            d="M 9 20
               C 19 15 40 20 58 23
               C 68 25 73 35 73 45
               C 73 55 66 62 56 66
               C 70 70 78 82 78 95
               C 78 111 65 123 47 123
               C 27 123 12 121 1 113
               C 0 101 0 29 9 20 Z
               M 20 36
               L 20 61
               C 31 61 53 62 53 49
               C 53 37 32 36 20 36 Z
               M 20 76
               L 20 107
               C 33 107 58 108 58 92
               C 58 77 33 76 20 76 Z"
            fill="#934520"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          {/* Inner bottom book page crease curve */}
          <path
            d="M 61 85 C 65 92 64 104 58 110 C 61 103 62 92 61 85 Z"
            fill="#ffffff"
            opacity="0.35"
          />
        </g>

        {/* --- Letters: "indnest" in heavy rounded typography --- */}
        <text x="105" y="125" className="bn-font">
          indnest
        </text>

        {/* --- Sinuous Green Thread (Front Highlights over letters) --- */}
        {/* Twine crossing over the 'n' loop and the final swoop across 's' & 't' */}
        <path
          d="M 150 128 C 175 115 195 105 210 98"
          stroke="#5a7153"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 306 122 C 304 142 325 156 360 145 C 410 130 460 90 540 38"
          stroke="#5a7153"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
