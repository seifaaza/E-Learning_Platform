import { useState, useEffect, useCallback } from "react";

type ScrollDirection = "up" | "down";

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  scrollDirection: ScrollDirection;
}

const useScroll = (): ScrollPosition => {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollX, setScrollX] = useState<number>(0);
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("down");

  const listener = useCallback(() => {
    const currentOffset = document.body.getBoundingClientRect();
    const currentScrollY = -currentOffset.top;
    const currentScrollX = currentOffset.left;

    setScrollY(currentScrollY);
    setScrollX(currentScrollX);

    // Check if the current scroll position is within the top 100 pixels
    if (currentScrollY <= 300) {
      setScrollDirection("down");
    } else {
      setScrollDirection(lastScrollTop > currentScrollY ? "down" : "up");
    }

    setLastScrollTop(currentScrollY);
  }, [lastScrollTop]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(listener);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [listener]);

  return {
    scrollY,
    scrollX,
    scrollDirection,
  };
};

export default useScroll;
