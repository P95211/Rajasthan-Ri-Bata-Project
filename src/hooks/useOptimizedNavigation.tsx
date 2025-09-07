import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useOptimizedNavigation = () => {
  const navigate = useNavigate();

  const navigateWithPreload = useCallback((to: string) => {
    // Preload the route component
    import(`../pages/${to.charAt(1).toUpperCase() + to.slice(2)}.tsx`).catch(() => {
      // Fallback for routes that don't match the pattern
    });
    
    navigate(to);
  }, [navigate]);

  return { navigateWithPreload };
};