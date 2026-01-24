import { useState, useEffect } from 'react';

const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = timestamp - startTime;
      const elapsedTime = Math.min(progress, duration);
      const easedProgress = easeOutExpo(elapsedTime / duration);
      const currentCount = Math.floor(easedProgress * end);

      setCount(currentCount);

      if (elapsedTime < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure it ends on the exact number
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return count;
};

export default useCountUp;
