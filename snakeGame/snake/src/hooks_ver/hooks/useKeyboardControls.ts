import type React from "react";
import { useEffect } from "react";
import { directionMap } from "../../config.ts";

// keyboard 감지

export function useKeyboardControls(
  directionReference: React.MutableRefObject<number>
) {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const direction = directionReference.current;
      const newDirection = directionMap[event.key];
      if (
        newDirection &&
        newDirection !== direction &&
        newDirection !== -direction
      ) {
        directionReference.current = newDirection;
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [directionReference]);
}
