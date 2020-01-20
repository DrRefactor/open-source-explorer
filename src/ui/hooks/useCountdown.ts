import { useState, useRef, useCallback } from 'react';

export function useCountdown(seconds: number): [number, () => void] {
  const [timer, setTimer] = useState<number>(0);

  const intervalId = useRef<number>();
  const start = useCallback(() => {
    clearInterval(intervalId.current);
    setTimer(seconds);

    intervalId.current = setInterval(() => {
        setTimer(timer => {
          if (timer === 0) {
            clearInterval(intervalId.current);
            return 0;
          }
          return timer - 1;
      });
    }, 1000);
  }, [seconds]);

  return [timer, start];
}