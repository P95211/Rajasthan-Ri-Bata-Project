import { useEffect, useState } from 'react';
import { preloadResource } from '@/utils/performance';

interface PreloadResource {
  url: string;
  type: 'image' | 'script' | 'style';
  priority?: 'high' | 'low';
}

export const useResourcePreloader = (resources: PreloadResource[]) => {
  const [loadedResources, setLoadedResources] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      // Sort by priority
      const sortedResources = resources.sort((a, b) => {
        if (a.priority === 'high' && b.priority !== 'high') return -1;
        if (a.priority !== 'high' && b.priority === 'high') return 1;
        return 0;
      });

      const loadPromises = sortedResources.map(resource => {
        return new Promise<string>((resolve, reject) => {
          if (resource.type === 'image') {
            const img = new Image();
            img.onload = () => {
              setLoadedResources(prev => new Set([...prev, resource.url]));
              resolve(resource.url);
            };
            img.onerror = reject;
            img.src = resource.url;
          } else {
            preloadResource(resource.url, resource.type);
            // For scripts and styles, we'll assume they load quickly
            setTimeout(() => {
              setLoadedResources(prev => new Set([...prev, resource.url]));
              resolve(resource.url);
            }, 100);
          }
        });
      });

      try {
        await Promise.allSettled(loadPromises);
      } catch (error) {
        console.warn('Some resources failed to preload:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (resources.length > 0) {
      loadResources();
    } else {
      setIsLoading(false);
    }
  }, [resources]);

  return { loadedResources, isLoading };
};

// Hook for critical path loading
export const useCriticalPathLoader = (criticalImages: string[]) => {
  const [criticalLoaded, setCriticalLoaded] = useState(false);

  useEffect(() => {
    if (criticalImages.length === 0) {
      setCriticalLoaded(true);
      return;
    }

    const loadCriticalImages = async () => {
      const promises = criticalImages.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
      });

      try {
        await Promise.all(promises);
        setCriticalLoaded(true);
      } catch (error) {
        console.warn('Critical images failed to load:', error);
        setCriticalLoaded(true); // Continue anyway
      }
    };

    loadCriticalImages();
  }, [criticalImages]);

  return criticalLoaded;
};