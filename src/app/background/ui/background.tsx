'use client';

type GridLight = {
  color: {
    set: (color: number) => void;
  };
  intensity: number;
};

type Grid = {
  setColors: (colors: number[]) => void;
  light1?: GridLight;
  light2?: GridLight;
  // plane?: {
  //   material: {
  //     color: {
  //       set: (color: number) => void;
  //     };
  //   };
  // };
};

type GridBackgroundInstance = {
  grid?: Grid;
};

import '@/styles/BackgroundPage.css';
import { useEffect, useRef } from 'react';
import Grid2Background from '@/lib/grid2.cdn.min.js';
import dynamic from 'next/dynamic';

export function Background() {
  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvaRef.current) return;

    const bg = Grid2Background(canvaRef.current) as GridBackgroundInstance;

    const onClick = () => {
      if (!bg.grid) return;

      bg.grid.setColors([
        0xffffff * Math.random(),
        0xffffff * Math.random(),
        0xffffff * Math.random()
      ]);

      if (bg.grid.light1) {
        bg.grid.light1.color.set(0xffffff * Math.random());
        bg.grid.light1.intensity = 500 + Math.random() * 1000;
      }

      if (bg.grid.light2) {
        bg.grid.light2.color.set(0xffffff * Math.random());
        bg.grid.light2.intensity = 250 + Math.random() * 250;
      }
    };

    document.body.addEventListener('click', onClick);

    return () => {
      document.body.removeEventListener('click', onClick);
    };
  }, []);

  return <canvas ref={canvaRef} id='webgl-canvas' />;
}

export const DynamicBackground = dynamic(async () => Background, { ssr: false });
