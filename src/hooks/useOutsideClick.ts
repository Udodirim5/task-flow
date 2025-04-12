import { useEffect, useRef, RefObject } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  handler: () => void,
  listenCapturing: boolean = true
): RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
};
