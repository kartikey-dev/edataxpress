'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BUSINESS_PROFILE, PRIMARY_NAV, SERVICE_NAV_ITEMS } from '@/lib/content';

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  function closeAllMenus() {
    setMenuOpen(false);
    setServicesOpen(false);
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
          onClick={() => setMenuOpen((prev) => !prev)}
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
                  className="nav-dropdown"
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className={`nav-dropdown-trigger${isServicesActive ? ' nav-link-active' : ''}`}
                    aria-expanded={servicesOpen}
                    aria-controls="services-submenu"
                    onClick={() => setServicesOpen((prev) => !prev)}
                  >
                    <span>Services</span>
                    <span aria-hidden="true">{servicesOpen ? '▴' : '▾'}</span>
                  </button>
                  {(servicesOpen || menuOpen) && (
                    <div id="services-submenu" className="nav-dropdown-panel">
                      <Link
                        href="/services"
                        aria-current={pathname === '/services' ? 'page' : undefined}
                        onClick={closeAllMenus}
                      >
                        All Services Overview
                      </Link>
                      <div className="nav-dropdown-divider" />
                      {SERVICE_NAV_ITEMS.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          aria-current={pathname === service.href ? 'page' : undefined}
                          onClick={closeAllMenus}
                        >
                          {service.label}
                        </Link>
                      ))}
                      <div className="nav-dropdown-divider" />
                      <Link
                        href="/products/interactive-flat-panel-65"
                        aria-current={
                          pathname === '/products/interactive-flat-panel-65' ? 'page' : undefined
                        }
                        onClick={closeAllMenus}
                      >
                        Interactive Flat Panel 65&quot;
                      </Link>
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
