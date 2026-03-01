import { useEffect, useState } from "react";

/** 섹션에 한 번이라도 진입하면 true로 유지. 스크롤 인 애니메이션 트리거용 */
export function useInViewOnce(ref, options = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;
    let didRun = false;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !didRun) {
          setInView(true);
          didRun = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2, ...options },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return inView;
}
