'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProductDetail } from '@/lib/content';

export function ProductGallery({ images }: { images: ProductDetail['images'] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = images[selectedIndex] ?? images[0];

  return (
    <div className="product-gallery-wrap">
      <div className="product-gallery">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(max-width: 820px) 100vw, 46vw"
        />
        <span className="page-hero-stamp">65-INCH INTERACTIVE DISPLAY</span>
      </div>

      {images.length > 1 ? (
        <div className="product-thumbs" role="group" aria-label="Product gallery views">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`product-thumb${index === selectedIndex ? ' active' : ''}`}
              aria-pressed={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image.src}
                alt={`View ${index + 1}: ${image.alt}`}
                width={140}
                height={82}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
