'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { flushSync } from 'react-dom';

const ROUTE_TIMEOUT_MS = 8000;

export function PageTurnTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const [turning, setTurning] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const turningRef = useRef(false);
  const targetPathRef = useRef<string | null>(null);
  const targetHrefRef = useRef<string | null>(null);
  const routeReadyRef = useRef(false);
  const flipCompleteRef = useRef(false);
  const routeTimer = useRef<number | undefined>(undefined);
  const fallbackTimer = useRef<number | undefined>(undefined);
  const revealTimer = useRef<number | undefined>(undefined);

  const finishWhenReady = useCallback(() => {
    if (!routeReadyRef.current || !flipCompleteRef.current || !turningRef.current) return;
    setRevealing(true);
    revealTimer.current = window.setTimeout(() => {
      if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
      turningRef.current = false;
      targetPathRef.current = null;
      targetHrefRef.current = null;
      setTurning(false);
      setRevealing(false);
    }, 260);
  }, []);

  useEffect(() => {
    if (!turning || !targetPathRef.current || pathname !== targetPathRef.current) return;
    routeReadyRef.current = true;
    finishWhenReady();
  }, [pathname, turning, finishWhenReady]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (turningRef.current || url.origin !== window.location.origin || url.pathname === pathnameRef.current || url.hash) return;

      event.preventDefault();
      if (routeTimer.current) window.clearTimeout(routeTimer.current);
      if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
      turningRef.current = true;
      targetPathRef.current = url.pathname;
      targetHrefRef.current = url.pathname + url.search;
      routeReadyRef.current = false;
      flipCompleteRef.current = false;
      flushSync(() => {
        setRevealing(false);
        setTurning(true);
      });

      routeTimer.current = window.setTimeout(() => router.push(targetHrefRef.current ?? url.pathname + url.search), 620);
      fallbackTimer.current = window.setTimeout(() => {
        const targetHref = targetHrefRef.current;
        if (targetHref) window.location.assign(targetHref);
      }, ROUTE_TIMEOUT_MS);
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      if (routeTimer.current) window.clearTimeout(routeTimer.current);
      if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
    };
  }, [router]);

  useEffect(() => () => {
    if (routeTimer.current) window.clearTimeout(routeTimer.current);
    if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
    if (revealTimer.current) window.clearTimeout(revealTimer.current);
  }, []);

  return <div className={`page-turn${turning ? ' page-turn-active' : ''}${revealing ? ' page-turn-revealing' : ''}`} aria-hidden="true">
    <div className="page-turn-leaf" onAnimationEnd={(event) => {
      if (event.target !== event.currentTarget || event.animationName !== 'route-page-flip') return;
      flipCompleteRef.current = true;
      finishWhenReady();
    }}>
      <div className="turn-leaf-front"><span>e.</span><strong>A new chapter<br/>begins here.</strong><small>PUBLISH · PRINT · GROW</small></div>
      <div className="turn-leaf-back"/>
    </div>
  </div>;
}
