import { useRef, useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORK_LIST = [
  {
    title: "달달영어 플랫폼",
    subTitle: "(주)언플러",
    desc: "퍼블리싱 (2025.09 ~ 2026.02)",
  },
  {
    title: "달달영어 기초지단테스트 튜토리얼",
    subTitle: "(주)언플러",
    desc: "퍼블리싱 (2025.09 ~ 2026.02)",
  },
  {
    title: "달달영어 문항",
    subTitle: "(주)언플러",
    desc: "퍼블리싱 (2025.09 ~ 2026.02)",
  },
  {
    title: "리얼인벤션 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 및 유지보수 (2022.01 ~ 2024.03)",
  },
  {
    title: "고교학점제 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 및 유지보수 (2022.05 ~ 2023.07)",
  },
  {
    title: "고입업무지원시스템 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 및 유지보수 (2022.10 ~ 2023.12)",
  },
  {
    title: "고입정보포털 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2022.03 ~ 2023.04)",
  },
  {
    title: "Bio-PRIDE 공유대학홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2022.02 ~ 2023.03)",
  },
  {
    title: "한국학교컨설팅협회 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2023.04 ~ 2023.05)",
  },
  {
    title: "한국학교컨설팅협회 성과관리 시스템 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2023.06 ~ 2023.07)",
  },
];

const TAB_ALL = "전체";

function Works() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeTab, setActiveTab] = useState(TAB_ALL);

  const companies = useMemo(
    () => [...new Set(WORK_LIST.map((w) => w.subTitle))],
    [],
  );
  const tabs = useMemo(() => [TAB_ALL, ...companies], [companies]);
  const filteredList =
    activeTab === TAB_ALL
      ? WORK_LIST
      : WORK_LIST.filter((w) => w.subTitle === activeTab);

  // 제목 애니메이션: 마운트 시 한 번만
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // 카드 애니메이션: 탭 전환 시 해당 탭의 카드만
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [activeTab]);

  const cardBg =
    "bg-white border border-gray-200 rounded-3xl p-4 sm:p-5 shadow-xl dark:bg-gradient-to-br dark:from-[#22272e] dark:to-[#232d28] dark:border-white/10";

  return (
    <section
      ref={sectionRef}
      id="works-section"
      className="section-works relative min-h-screen py-16 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, rgba(113,216,225,.08) 0%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 25% 85%, rgba(113,59,253,.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl xl:max-w-[1400px] mx-auto">
        <h2
          ref={titleRef}
          className="text-primary font-extrabold text-[clamp(28px,5vw,52px)] leading-tight tracking-tighter text-center mb-4 md:mb-6"
          style={{ letterSpacing: "-1px" }}
        >
          WORKS
        </h2>

        <div
          role="tablist"
          aria-label="회사별 작업 목록"
          className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls="works-list"
              id={`tab-${tab === TAB_ALL ? "all" : tab.replace(/[^\w가-힣]/g, "-")}`}
              className={`min-w-[80px] py-2.5 px-4 rounded-xl text-[14px] font-semibold transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[var(--point)] focus-visible:ring-offset-2 focus-visible:outline-none ${
                activeTab === tab
                  ? "bg-point text-[#0f172a] shadow-md"
                  : "bg-white dark:bg-white/10 text-secondary border border-gray-200 dark:border-white/20 hover:border-[var(--point)]/50 hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <ul
          id="works-list"
          role="tabpanel"
          aria-labelledby={
            activeTab === TAB_ALL
              ? "tab-all"
              : `tab-${activeTab.replace(/[^\w가-힣]/g, "-")}`
          }
          className="flex flex-col gap-2 md:gap-3"
        >
          {filteredList.map((item, index) => (
            <li
              key={`${item.subTitle}-${item.title}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`${cardBg} transition-shadow hover:shadow-2xl`}
            >
              <span className="text-subtitle text-[14px] md:text-[16px] font-medium block mb-1">
                {item.subTitle}
              </span>
              <strong className="text-primary text-[14px] md:text-[16px] font-bold block mb-1 leading-snug">
                {item.title}
              </strong>
              <p className="text-detail text-[14px] md:text-[16px] leading-relaxed">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Works;
