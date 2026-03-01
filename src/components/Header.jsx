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
        "lg:hidden fixed left-0 right-0 bottom-0 top-[4.2rem] md:top-[5.5rem] z-[999] transition-opacity duration-300",
        "bg-[#181e26]/98 backdrop-blur-xl border-t border-white/5",
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
                "text-[1.625rem] md:text-[1.875rem] font-bold py-3 transition-colors",
                isActive ? "text-[#67dbfe]" : "text-white hover:text-[#7dd6ea]",
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
        "fixed top-0 left-0 w-full z-[1000] text-white transition-all duration-300",
        "px-4 py-0 md:px-8 lg:px-[3rem]",
        isScrolled
          ? "bg-[#181e26]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent",
      )}
      style={
        isScrolled
          ? {
              background:
                "linear-gradient(120deg, rgba(24,30,38,0.92) 0%, rgba(34,39,46,0.94) 100%)",
            }
          : undefined
      }
    >
      <div className="w-full max-w-[1920px] h-[4.2rem] md:h-[5.5rem] lg:h-[7.2rem] mx-auto flex justify-between items-center select-none">
        <h1 className="flex items-center h-full py-2">
          <a
            href="/"
            className="leading-[1.25] pb-4 pt-0.5 text-[2rem] sm:text-[2.25rem] lg:text-[2.5rem] font-extrabold tracking-tight transition-colors hover:opacity-90 block"
            style={{
              background:
                "linear-gradient(110deg, #ffe980 20%, #7dd6ea 65%, #6ee7b7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
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
                      "text-[1.25rem] xl:text-[1.375rem] 2xl:text-[1.5rem] font-bold relative focus:outline-none transition-colors duration-200",
                      "after:content-[''] after:block after:absolute after:left-0 after:-bottom-1 after:h-[2.5px] after:origin-left after:transition-transform after:duration-300",
                      isActive
                        ? "text-[#67dbfe] after:w-full after:scale-x-100 after:bg-[#67dbfe]"
                        : "text-white/80 hover:text-white after:w-full after:scale-x-0 after:bg-[#67dbfe] hover:after:scale-x-100 focus:after:scale-x-100",
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
          className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span
            className={clsx(
              "block w-6 h-0.5 bg-white rounded transition-transform duration-300",
              isMenuOpen && "rotate-45 translate-y-2",
            )}
          />
          <span
            className={clsx(
              "block w-6 h-0.5 bg-white rounded transition-opacity duration-300",
              isMenuOpen && "opacity-0",
            )}
          />
          <span
            className={clsx(
              "block w-6 h-0.5 bg-white rounded transition-transform duration-300",
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
