'use client';

import Image from 'next/image';
import {useState} from 'react';

type GameImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
  fillContainer?: boolean;
  loading?: 'eager' | 'lazy';
  className?: string;
};

export function GameImage({
  src,
  alt,
  width,
  height,
  intrinsicWidth = width,
  intrinsicHeight = height,
  fillContainer = false,
  loading,
  className
}: GameImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} — image unavailable`}
        className={['game-image-fallback', className].filter(Boolean).join(' ')}
        style={{
          width: fillContainer ? '100%' : width,
          height: fillContainer ? '100%' : height
        }}
      >
        <span aria-hidden="true" className="game-image-fallback__diamond" />
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={intrinsicWidth}
      height={intrinsicHeight}
      className={className}
      loading={loading}
      style={{
        width: fillContainer ? '100%' : width,
        height: fillContainer ? '100%' : height
      }}
      onError={() => setFailed(true)}
    />
  );
}
