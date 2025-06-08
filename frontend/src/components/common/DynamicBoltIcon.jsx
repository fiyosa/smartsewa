import React from 'react';

const DynamicBoltIcon = ({ level = 1 }) => {
  const clampedLevel = Math.max(0, Math.min(1, level));
  const viewHeight = 64;
  const fillHeight = viewHeight * clampedLevel;

  return (
    <svg width="100" height="100" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="boltClip">
          <rect x="0" y={64 - fillHeight} width="64" height={fillHeight} />
        </clipPath>
      </defs>

      {/* Isi putih penuh dengan sudut minimalis rounded */}
      <path
        d="M26 6 Q30.5 5, 25 6 L12 34 Q10.5 35.5, 13 36 H28 L20 60 Q19 61, 21 62.5 Q22 63.5, 23 62 L50 28 Q50.5 26.5, 49 25 H34 L42 6 Q42.5 5, 41 6 Z"
        fill="#FFFFFF"
      />

      {/* Fill kuning proporsional dengan clip */}
      <path
        d="M26 6 Q30.5 5, 25 6 L12 34 Q10.5 35.5, 13 36 H28 L20 60 Q19.5 61, 21 62.5 Q22 63.5, 23 62 L50 28 Q50.5 26.5, 49 25 H34 L42 6 Q42.5 5, 41 6 Z"
        fill="#F0EB01"
        clipPath="url(#boltClip)"
      />
    </svg>
  );
};

export default DynamicBoltIcon;
