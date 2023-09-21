import { useEffect } from "react";

// 게임 진행 판단
export function useInterval(callback: () => void, delay: number | null) {
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const interval = setInterval(callback, delay);
    return () => clearInterval(interval);
  }, [delay, callback]);
}
