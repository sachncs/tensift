import { useEffect, useState } from 'react';

interface ScrollState {
  scrollY: number;
  direction: 'up' | 'down';
  atTop: boolean;
}

export function useScroll(threshold = 4): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    direction: 'up',
    atTop: true,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      const y = window.scrollY;
      const dir: 'up' | 'down' = y > lastY + threshold ? 'down' : y < lastY - threshold ? 'up' : 'down';
      setState({ scrollY: y, direction: dir, atTop: y < 12 });
      lastY = y;
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}