import React, { useState, useEffect, useMemo } from 'react';
import { debounce } from '@/utils/performance';

interface VirtualizedGridProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  cols: number;
  gap?: number;
}

export const VirtualizedGrid: React.FC<VirtualizedGridProps> = ({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  cols,
  gap = 16
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const itemsPerRow = cols;
  const totalRows = Math.ceil(items.length / itemsPerRow);
  const rowHeight = itemHeight + gap;

  const startIndex = Math.floor(scrollTop / rowHeight) * itemsPerRow;
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / rowHeight) * itemsPerRow + itemsPerRow,
    items.length
  );

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  const handleScroll = debounce((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, 16);

  useEffect(() => {
    const updateWidth = debounce(() => {
      setContainerWidth(window.innerWidth);
    }, 100);

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalRows * rowHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${Math.floor(startIndex / itemsPerRow) * rowHeight}px)`,
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: `${gap}px`,
          }}
        >
          {visibleItems.map((item, index) => (
            <div key={startIndex + index}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};