'use client';

import React, { useState, useEffect } from 'react';
import { Joyride, Step, EventData, STATUS } from 'react-joyride';

interface OnboardingTourProps {
  steps: Step[];
  tourKey: string;
  forceRun?: boolean;
  onFinish?: () => void;
}

export default function OnboardingTour({ steps, tourKey, forceRun = false, onFinish }: OnboardingTourProps) {
  const [run, setRun] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const userEmail = (localStorage.getItem('user_email') || 'guest').toLowerCase();

    if (forceRun) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 100);
      return () => clearTimeout(timer);
    }

    const hasCompletedTour = localStorage.getItem(`tour_${userEmail}_${tourKey}`);
    if (!hasCompletedTour) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [tourKey, forceRun, isMounted]);

  const handleEvent = (data: EventData) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      const userEmail = (localStorage.getItem('user_email') || 'guest').toLowerCase();
      localStorage.setItem(`tour_${userEmail}_${tourKey}`, 'completed');
      if (onFinish) onFinish();
    }
  };

  if (!isMounted) return null;

  return (
    <Joyride
      key={`${tourKey}-${forceRun}-${run}`}
      onEvent={handleEvent}
      continuous
      run={run}
      scrollToFirstStep
      steps={steps}
      locale={{
        back: 'Kembali',
        close: 'Tutup',
        last: 'Selesai',
        next: 'Lanjut',
        skip: 'Lewati Tour',
      }}

      options={{
        primaryColor: '#06b6d4',
        overlayColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 10000,
        backgroundColor: '#000814',
        textColor: '#e5e7eb',
        showProgress: true,
        buttons: ['back', 'primary', 'skip'],
        skipBeacon: true,
        scrollOffset: 150,
      }}
      floatingOptions={{
        autoUpdate: {
          ancestorScroll: true,
          elementResize: true,
        },
        flipOptions: {
          padding: 20,
        },
        shiftOptions: {
          padding: 10,
        }
      }}
      styles={{
        buttonPrimary: {
          backgroundColor: '#06b6d4',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 20px',
        },
        buttonBack: {
          color: '#9ca3af',
          marginRight: '10px',
          fontWeight: 'bold',
        },
        buttonSkip: {
          color: '#9ca3af',
          fontWeight: 'bold',
        },
        tooltip: {
          borderRadius: '16px',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          boxShadow: '0 0 30px -10px rgba(6, 182, 212, 0.2)',
          padding: '20px',
          backgroundColor: '#000814',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          fontWeight: '900',
          fontSize: '18px',
          color: '#fff',
          marginBottom: '10px',
        },
        tooltipContent: {
          color: '#d1d5db',
          fontSize: '14px',
          lineHeight: '1.5',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    />
  );
}
