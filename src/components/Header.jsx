import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useActiveSection } from "../hooks/useActiveSection";

const SECTION_IDS = [
  "about-section",
  "project-section",
  "works-section",
];

const NAV_LIST = [
  { href: "#about-section", id: "about-section", text: "ABOUT" },
  { href: "#project-section", id: "project-section", text: "PROJECT" },
  { href: "#works-section", id: "works-section", text: "WORKS" },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const mobileMenuOverlay = (
    <div
      className={clsx(
        "lg:hidden fixed left-0 right-0 bottom-0 top-[48px] md:top-[56px] z-[999] transition-opacity duration-300",
        "bg-gray-100/98 dark:bg-[#181e26]/98 backdrop-blur-xl border-t border-gray-200 dark:border-white/5",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
      aria-hidden={!isMenuOpen}
    >
      <nav className="flex flex-col items-center justify-center h-full gap-11">
        {NAV_LIST.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={closeMenu}
              className={clsx(
                "text-[18px] md:text-[20px] font-bold py-2 transition-colors",
                isActive ? "text-point" : "text-secondary hover:text-point",
              )}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-[1000] text-gray-900 dark:text-white transition-all duration-300",
        "px-4 py-0 md:px-8 lg:px-12",
        isScrolled
          ? "bg-white/75 dark:bg-[#181e26]/70 backdrop-blur-xl border-b border-gray-200/80 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent dark:border-transparent",
      )}
    >
      <div className="w-full max-w-[1920px] h-[48px] md:h-[56px] lg:h-[72px] mx-auto flex justify-between items-center select-none">
        <h1 className="flex items-center h-full py-2">
          <a
            href="/"
            className="text-point leading-[1.25] pb-4 pt-0.5 text-[20px] sm:text-[24px] lg:text-[28px] font-extrabold tracking-tight transition-colors hover:opacity-90 block"
            style={{ letterSpacing: "-0.5px" }}
          >
            JeoungHun Portfolio
          </a>
        </h1>

        <nav className="hidden lg:block">
          <ul className="flex gap-8 xl:gap-12">
            {NAV_LIST.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={clsx(
                      "text-[14px] xl:text-[16px] 2xl:text-[18px] font-bold relative focus:outline-none transition-colors duration-200",
                      "after:content-[''] after:block after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:origin-left after:transition-transform after:duration-300",
                      isActive
                        ? "text-point after:w-full after:scale-x-100 after:bg-[var(--point)]"
                        : "text-secondary hover:text-point after:w-full after:scale-x-0 after:bg-[var(--point)] hover:after:scale-x-100 focus:after:scale-x-100",
                    )}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
            type="button"
            aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
          className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span
            className={clsx(
              "block w-6 h-0.5 bg-gray-700 dark:bg-white rounded transition-transform duration-300",
              isMenuOpen && "rotate-45 translate-y-2",
            )}
          />
          <span
            className={clsx(
              "block w-6 h-0.5 bg-gray-700 dark:bg-white rounded transition-opacity duration-300",
              isMenuOpen && "opacity-0",
            )}
          />
          <span
            className={clsx(
              "block w-6 h-0.5 bg-gray-700 dark:bg-white rounded transition-transform duration-300",
              isMenuOpen && "-rotate-45 -translate-y-2",
            )}
          />
        </button>
      </div>

      {createPortal(mobileMenuOverlay, document.body)}
    </header>
  );
}

export default Header;
