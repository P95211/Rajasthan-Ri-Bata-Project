import { useState, useEffect, useCallback, useRef } from 'react';
import { throttle } from '@/utils/performance';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = (
  callback: () => void,
  hasMore: boolean = true,
  options: UseInfiniteScrollOptions = {}
) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const { threshold = 1.0, rootMargin = '100px' } = options;

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetching) {
        setIsFetching(true);
        callback();
      }
    },
    [callback, hasMore, isFetching]
  );

  useEffect(() => {
    if (elementRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  const setElementRef = useCallback((node: HTMLDivElement | null) => {
    elementRef.current = node;
  }, []);

  const resetFetching = useCallback(() => {
    setIsFetching(false);
  }, []);

  return { isFetching, setElementRef, resetFetching };
};