'use client';

import React from 'react';

interface TornEdgeDividerProps {
  fillColor?: string; // color of the section below
  flip?: boolean;
}

export default function TornEdgeDivider({ fillColor = "#E3D9C2", flip = false }: TornEdgeDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
        flip ? 'rotate-180 -mt-1' : '-mb-1'
      }`}
      aria-hidden="true"
    >
      <svg
        className="relative block w-full h-8 sm:h-12 md:h-16"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L0,40 L45,25 L90,55 L145,20 L210,65 L270,35 L330,70 L395,25 L460,60 L520,30 L590,75 L650,20 L720,65 L780,25 L845,70 L910,35 L975,80 L1040,30 L1110,65 L1160,20 L1200,50 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
