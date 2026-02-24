import { useEffect, useState } from "react";
import clsx from "clsx";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navList = [
    {
      href: "#about-section",
      text: "ABOUT",
    },
    {
      href: "#project-section",
      text: "PROJECT",
    },
    {
      href: "#works-section",
      text: "WORKS",
    },
    {
      href: "#contact-section",
      text: "CONTACT",
    },
  ];

  useEffect(() => {
    const onScroll = () => {
      // 40px 이하만 visual 영역으로 판단, 비주얼 배경 대비 헤더 강조함
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full px-[3rem] py-0 z-[1000] text-white transition-all duration-300",
        isScrolled
          ? "bg-gradient-to-br from-[#3e5f44]/[0.94] to-[#232323]/[0.96] backdrop-blur-[12px] backdrop-brightness-105 shadow-[0_7px_16px_-2px_rgba(34,34,34,0.13),0_0.5px_0_#262626]"
          : "bg-transparent shadow-none",
      )}
    >
      <div
        className={clsx(
          "w-full max-w-[1920px] h-[100px] mx-auto flex justify-between items-center select-none",
        )}
      >
        <h1>
          <a
            href="/"
            className={clsx(
              "text-[3.6rem] font-bold text-[#FFD700]",
              "drop-shadow-[0_2px_10px_rgba(34,34,34,0.43)]",
            )}
            style={{
              textShadow: "0 2px 10px rgba(34,34,34,0.43),0 1px 0 #232323",
            }}
          >
            JeoungHun Portfolio
          </a>
        </h1>
        <nav>
          <ul className={clsx("flex gap-[30px]")}>
            {navList.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={clsx(
                    // 기본 스타일
                    "text-[1.8rem] font-bold text-white relative focus:outline-none",
                    // after 관련 효과
                    "after:content-[''] after:block after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#FFD700] after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
                    // 인터랙션 효과
                    "hover:after:scale-x-100 focus:after:scale-x-100",
                  )}
                  tabIndex={0}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
