// Enhanced caching utilities for better performance
class CacheManager {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private memoryLimit = 50; // Maximum number of cache entries

  set(key: string, data: any, ttl: number = 300000) { // Default 5 minutes TTL
    // Clean up expired entries
    this.cleanup();
    
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.memoryLimit) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    // Move to end for LRU
    this.cache.delete(key);
    this.cache.set(key, entry);
    
    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key);
      }
    }
  }

  size(): number {
    return this.cache.size;
  }
}

export const cacheManager = new CacheManager();

// Service Worker registration for caching
export const registerSW = async () => {
  if ('serviceWorker' in navigator && 'caches' in window) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      return registration;
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  }
};

// Cache API utilities
export const cacheResource = async (url: string, response: Response) => {
  if ('caches' in window) {
    const cache = await caches.open('app-cache-v1');
    cache.put(url, response.clone());
  }
};

export const getCachedResource = async (url: string): Promise<Response | null> => {
  if ('caches' in window) {
    const cache = await caches.open('app-cache-v1');
    return await cache.match(url) || null;
  }
  return null;
};

// Image cache with compression
export const cacheImage = (url: string, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      cacheManager.set(`img_${url}`, compressedDataUrl, 600000); // 10 min cache
      
      resolve(compressedDataUrl);
    };
    
    img.onerror = reject;
    img.src = url;
  });
};