'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function BookOpeningScreen() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, [visible]);

  useEffect(() => {
    if (document.documentElement.dataset.bookIntro !== 'show') {
      setVisible(false);
      return;
    }
    const closeTimer = window.setTimeout(() => setClosing(true), 3950);
    const removeTimer = window.setTimeout(() => {
      document.documentElement.dataset.bookIntro = 'done';
      setVisible(false);
    }, 4550);
    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return <div className={`book-intro${closing ? ' book-intro-closing' : ''}`} role="status" aria-live="polite" aria-label="Opening the eDataXpress book world">
    <div className="intro-brand"><Image src="/assets/edataxpress-logo-wide.png" alt="eDataXpress" width={200} height={84} priority/></div>
    <div className="intro-stage" aria-hidden="true">
      <div className="intro-glow"/>
      <div className="intro-book-growth">
        <div className="intro-book-position">
          <div className="intro-open-pages">
            <div className="intro-page intro-page-left"><Image className="intro-page-logo" src="/assets/edataxpress-logo-wide.png" alt="" width={240} height={100} priority/></div>
            <div className="intro-page intro-page-right"/>
          </div>
          <div className="intro-closed-volume"/>
          <div className="intro-cover">
            <div className="intro-cover-front"><Image className="intro-cover-logo" src="/assets/edataxpress-logo-wide.png" alt="" width={300} height={126} priority/><strong>A WORLD<br/>OF BOOKS</strong><small>PUBLISH · PRINT · GROW</small></div>
            <div className="intro-cover-back">EVERY BOOK<br/>OPENS A WORLD</div>
          </div>
        </div>
      </div>
    </div>
    <p className="intro-caption">Every great book opens a new world.</p>
    <button className="intro-skip" type="button" onClick={() => { setClosing(true); window.setTimeout(() => { document.documentElement.dataset.bookIntro = 'done'; setVisible(false); }, 420); }}>Skip intro <span>↗</span></button>
  </div>;
}
