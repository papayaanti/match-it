import { useMemo } from 'react';
import './PixelBackground.css';

const PIXEL_COUNT = 40;

function generatePixels(count) {
  return Array.from({ length: count }, (_, i) => {
    const size = [4, 6, 8, 10, 12][i % 5];
    const left = (i * 97 + 13) % 100;
    const duration = 8 + ((i * 37) % 14);
    const delay = -((i * 53) % Math.round(duration));
    const shade = 28 + (i % 7) * 8;
    const opacity = 0.18 + (i % 5) * 0.06;
    return { id: i, size, left, duration, delay, shade, opacity };
  });
}

export function PixelBackground() {
  const pixels = useMemo(() => generatePixels(PIXEL_COUNT), []);

  return (
    <>
      <div className="pixel-bg-gradient" />
      <div className="pixel-bg-canvas">
        {pixels.map(({ id, size, left, duration, delay, shade, opacity }) => (
          <div
            key={id}
            className="pixel-sq"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              backgroundColor: `rgb(${shade},${shade},${shade})`,
              opacity,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
