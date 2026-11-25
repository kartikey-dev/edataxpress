'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type FocusEvent } from 'react';
import { BUSINESS_PROFILE, PRIMARY_NAV, SERVICES, PRODUCTS } from '@/lib/content';

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | undefined>(undefined);

  function clearCloseTimer() {
    if (closeTimerRef.current !== undefined) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        clearCloseTimer();
        setMenuOpen(false);
        setServicesOpen(false);
      }
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        clearCloseTimer();
        setServicesOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      clearCloseTimer();
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  function closeAllMenus() {
    clearCloseTimer();
    setMenuOpen(false);
    setServicesOpen(false);
  }

  function handleDropdownMouseEnter() {
    clearCloseTimer();
    if (!menuOpen) {
      setServicesOpen(true);
    }
  }

  function handleDropdownMouseLeave() {
    if (menuOpen) return;
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  }

  function handleDropdownBlur(event: FocusEvent<HTMLDivElement>) {
    if (
      dropdownRef.current &&
      event.relatedTarget instanceof Node &&
      !dropdownRef.current.contains(event.relatedTarget)
    ) {
      setServicesOpen(false);
    }
  }

  function handleMobileToggle() {
    setMenuOpen((prev) => {
      const next = !prev;
      setServicesOpen(next);
      return next;
    });
  }

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="brand" href="/" aria-label="eDataXpress home" onClick={closeAllMenus}>
          <Image
            className="brand-logo"
            src={BUSINESS_PROFILE.logo.src}
            alt={BUSINESS_PROFILE.logo.alt}
            width={BUSINESS_PROFILE.logo.width}
            height={BUSINESS_PROFILE.logo.height}
            priority
          />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={handleMobileToggle}
        >
          <span>Menu</span>
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

        <nav id="primary-nav" className={`nav${menuOpen ? ' open' : ''}`} aria-label="Primary">
          {PRIMARY_NAV.map((item) => {
            if (item.href === '/services') {
              const isServicesActive =
                pathname.startsWith('/services') || pathname.startsWith('/products');

              return (
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className="nav-dropdown"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                  onBlur={handleDropdownBlur}
                >
                  <button
                    type="button"
                    className={`nav-dropdown-trigger${isServicesActive ? ' nav-link-active' : ''}`}
                    aria-expanded={servicesOpen}
                    aria-controls="services-submenu"
                    onClick={() => {
                      clearCloseTimer();
                      setServicesOpen((prev) => !prev);
                    }}
                  >
                    <span>Services</span>
                    <span aria-hidden="true">{servicesOpen ? '▴' : '▾'}</span>
                  </button>
                  {servicesOpen && (
                    <div id="services-submenu" className="nav-dropdown-panel">
                      <Link
                        href="/services"
                        aria-current={pathname === '/services' ? 'page' : undefined}
                        onClick={closeAllMenus}
                      >
                        All Services Overview
                      </Link>
                      <div className="nav-dropdown-divider" />
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          aria-current={
                            pathname === `/services/${service.slug}` ? 'page' : undefined
                          }
                          onClick={closeAllMenus}
                        >
                          <span className="nav-dropdown-chapter">{service.chapter}</span>
                          <span>{service.title}</span>
                        </Link>
                      ))}
                      <div className="nav-dropdown-divider" />
                      {PRODUCTS.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          aria-current={
                            pathname === `/products/${product.slug}` ? 'page' : undefined
                          }
                          onClick={closeAllMenus}
                        >
                          <span className="nav-dropdown-chapter">IFP</span>
                          <span>{product.shortLabel}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (item.href === '/contact') {
              return (
                <Link
                  key={item.href}
                  className="nav-cta"
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={closeAllMenus}
                >
                  Discuss a project <span aria-hidden="true">↗</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                className="nav-link"
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={closeAllMenus}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
