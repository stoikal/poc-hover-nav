"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface RouteChangeListenerProps {
  onRouteChange?: (pathname: string) => void;
}

export function RouteChangeListener({ onRouteChange }: RouteChangeListenerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (onRouteChange) {
      onRouteChange(pathname);
    }
  }, [pathname, onRouteChange]);

  return null; // This component doesn't render anything
}
