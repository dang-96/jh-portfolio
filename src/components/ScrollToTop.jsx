import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "../contexts/ThemeContext";

const SCROLL_THRESHOLD = 400;

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-6 z-[900] flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      {/* 다크/라이트 모드 토글 */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
        className={clsx(
          "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center",
          "bg-white dark:bg-[#22272e] border border-gray-200 dark:border-white/10",
          "text-gray-600 dark:text-white/80 hover:text-point",
          "shadow-lg hover:scale-110 transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-[var(--point)] focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#181e26]",
        )}
      >
        {theme === "dark" ? (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* 맨 위로 */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="맨 위로"
        className={clsx(
          "w-10 h-10 sm:w-11 sm:h-11 rounded-full",
          "flex items-center justify-center",
          "bg-point text-white",
          "shadow-lg hover:opacity-90 hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-[var(--point)] focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#181e26]",
          "transition-all duration-300 ease-out",
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}

export default ScrollToTop;
