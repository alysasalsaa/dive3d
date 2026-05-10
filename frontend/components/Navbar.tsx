'use client';

import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useSpring } from 'framer-motion';

const navLinks = [
  { href: '/',          label: 'Beranda' },
  { href: '/tutorial',  label: 'Tutorial' },
  { href: '/gallery',   label: 'Galeri' },
  { href: '/akademi',   label: 'Akademi' },
  { href: '/dashboard', label: 'Dashboard' },
];

interface NavbarLinksProps {
  isDark: boolean;
  /** Extra class names forwarded to the outer wrapper (e.g. tour-nav, pointer-events-auto) */
  className?: string;
  /** Called when any nav link is clicked (e.g. to open login modal) */
  onLinkClick?: (href: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavbarLinks({ isDark, className = '', onLinkClick }: NavbarLinksProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // ------- sliding pill state -------
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getActiveIdx = useCallback(() => {
    return navLinks.findIndex(({ href }) =>
      href === '/' ? pathname === '/' : pathname.startsWith(href)
    );
  }, [pathname]);

  // Snap pill to a given item element
  const snapPillToEl = useCallback((el: HTMLElement | null) => {
    if (!el || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, []);

  // On mount + pathname change: snap to active tab
  useLayoutEffect(() => {
    const idx = getActiveIdx();
    if (idx !== -1) snapPillToEl(itemRefs.current[idx]);
  }, [pathname, getActiveIdx, snapPillToEl]);

  // ------- magnetic / drag effect -------
  const springConfig = { stiffness: 400, damping: 30 };
  const pillX = useSpring(pillStyle.left, springConfig);
  const pillW = useSpring(pillStyle.width, springConfig);

  // Update springs when pillStyle changes
  React.useEffect(() => { pillX.set(pillStyle.left); }, [pillStyle.left]);
  React.useEffect(() => { pillW.set(pillStyle.width); }, [pillStyle.width]);

  // Track which tab is being pressed for the magnetic drag
  const [pressedIdx, setPressedIdx] = useState<number | null>(null);
  const dragOriginX = useRef(0);

  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    snapPillToEl(itemRefs.current[idx]);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    const activeIdx = getActiveIdx();
    if (pressedIdx === null && activeIdx !== -1) {
      snapPillToEl(itemRefs.current[activeIdx]);
    }
  };

  const handleMouseDown = (idx: number, e: React.MouseEvent) => {
    setPressedIdx(idx);
    dragOriginX.current = e.clientX;
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (pressedIdx === null) return;
    const el = itemRefs.current[pressedIdx];
    if (!el || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const drag = (e.clientX - dragOriginX.current) * 0.35; // dampen drag
    const newLeft = elRect.left - containerRect.left + drag;
    pillX.set(Math.max(0, Math.min(newLeft, containerRect.width - elRect.width)));
  }, [pressedIdx, pillX]);

  const handleMouseUp = useCallback(() => {
    setPressedIdx(null);
    const idx = hoveredIdx ?? getActiveIdx();
    if (idx !== -1) snapPillToEl(itemRefs.current[idx]);
  }, [hoveredIdx, getActiveIdx, snapPillToEl]);

  React.useEffect(() => {
    if (pressedIdx !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [pressedIdx, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`
        relative hidden md:flex items-center gap-0
        backdrop-blur-2xl p-1.5 rounded-full border shadow-2xl transition-colors
        ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200 shadow-sm'}
        ${className}
      `}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated sliding pill */}
      <motion.div
        className={`
          absolute top-1.5 h-[calc(100%-12px)] rounded-full pointer-events-none z-0
          ${isDark
            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30'
            : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20'
          }
        `}
        style={{
          left: pillX,
          width: pillW,
          opacity: pillStyle.opacity,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />

      {navLinks.map(({ href, label }, idx) => {
        const isActive =
          href === '/' ? pathname === '/' : pathname.startsWith(href);
        const isHovered = hoveredIdx === idx;

        return (
          <Link
            key={href}
            href={href}
            ref={(el) => { itemRefs.current[idx] = el; }}
            onClick={(e) => onLinkClick?.(href, e)}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseDown={(e) => handleMouseDown(idx, e)}
            className={`
              relative z-10 px-5 py-2 rounded-full text-sm font-semibold
              transition-colors duration-150 select-none
              ${(isActive || isHovered)
                ? 'text-white'
                : isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-blue-700'
              }
            `}
            style={{ cursor: pressedIdx === idx ? 'grabbing' : 'pointer' }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              {label}
            </motion.span>
          </Link>
        );
      })}
    </div>
  );
}
