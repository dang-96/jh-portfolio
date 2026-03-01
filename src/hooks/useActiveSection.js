import { useEffect, useState } from "react";

const VIEWPORT_MARK = 0.25; // 화면 상단 25% 지점을 기준으로 현재 섹션 판단

/** 스크롤 위치 기준으로 해당 영역 메뉴 활성화용 section id 반환 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const check = () => {
      const mark = window.innerHeight * VIEWPORT_MARK;
      let current = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mark && rect.bottom > mark) {
          current = id;
          break;
        }
        if (rect.top <= mark) current = id;
      }

      setActiveId((prev) => (current !== prev ? current : prev));
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [sectionIds]);

  return activeId;
}
