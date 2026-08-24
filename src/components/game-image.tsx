'use client';

import Image from 'next/image';
import {useState} from 'react';

type GameImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export function GameImage({
  src,
  alt,
  width,
  height,
  className
}: GameImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} — image unavailable`}
        className={['game-image-fallback', className].filter(Boolean).join(' ')}
        style={{width, height}}
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
      width={width}
      height={height}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
