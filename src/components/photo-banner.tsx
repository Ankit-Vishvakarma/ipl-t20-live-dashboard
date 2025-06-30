'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/uiComponents/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/uiComponents/card';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface PhotoBannerProps {
  title?: string;
  photos: { url: string; alt?: string }[];
}

export function PhotoBanner({ title = 'Photo Highlights', photos }: PhotoBannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-b dark:border-gray-600">
        <CardTitle className="flex items-center dark:text-white">
          <ImageIcon className="w-5 h-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <Button
              variant="outline"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 dark:bg-gray-800/95 shadow-lg"
              onClick={scrollLeft}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 dark:bg-gray-800/95 shadow-lg"
              onClick={scrollRight}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}

          {/* Photo Scroll */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide p-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-4" style={{ width: 'max-content' }}>
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="w-80 h-52 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt || 'Photo'}
                    width={320}
                    height={208}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {photos.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-3" />
            <p className="text-lg font-medium">No photos available</p>
            <p className="text-sm">Check back later for photo updates</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
