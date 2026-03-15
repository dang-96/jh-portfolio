import { useRef, useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORK_LIST = [
  {
    title: "달달영어 플랫폼",
    subTitle: "(주)언플러",
    desc: "퍼블리싱 (2025.09 ~ 2026.02)",
    contribution: "100%",
    tasks: ["메인·서브 페이지 퍼블리싱", "반응형 UI 구현", "컴포넌트 구조 설계"],
    image: "works/daldal-platform.png",
    imageAlt: "달달영어 플랫폼",
  },
  {
    title: "달달영어 기초지단테스트 튜토리얼",
    subTitle: "(주)언플러",
    desc: "퍼블리싱 (2025.09 ~ 2026.02)",
    contribution: "100%",
    tasks: ["튜토리얼 플로우 UI", "테스트 안내 화면 퍼블리싱"],
    image: "works/daldal-tutorial.png",
    imageAlt: "달달영어 기초지단테스트 튜토리얼",
  },
  {
    title: "달달영어 문항",
    subTitle: "(주)언플러",
    desc: "퍼블리싱 (2025.09 ~ 2026.02)",
    contribution: "100%",
    tasks: ["문항 노출·선택 UI", "진행 상태 표시 퍼블리싱"],
    image: "works/daldal-question.png",
    imageAlt: "달달영어 문항",
  },
  {
    title: "리얼인벤션 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 및 유지보수 (2022.01 ~ 2024.03)",
    contribution: "100%",
    tasks: [
      "입사 후 첫 주도 진행 프로젝트, 전체 페이지 퍼블리싱",
      "스와이프 라이브러리 도입 및 이후 프로젝트 활용",
      "디자이너와 협업·소통 및 일정 관리 경험",
    ],
    image: "works/realinvention.png",
    imageAlt: "리얼인벤션 홈페이지",
    url: "https://realinvention.co.kr/index.html",
  },
  {
    title: "고교학점제 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 및 유지보수 (2022.05 ~ 2023.07)",
    contribution: "100%",
    tasks: [
      "사용자용·관리자용 페이지 구성",
      "모바일 반응형 구현, 사이드 메뉴·탭 적용",
      "직관적인 화면 구성 및 UI 퍼블리싱",
    ],
    image: "works/credit.png",
    imageAlt: "고교학점제 홈페이지",
  },
  {
    title: "고입업무지원시스템 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 및 유지보수 (2022.10 ~ 2023.12)",
    contribution: "100%",
    tasks: [
      "사용자용·관리자용 페이지, 합격·불합격·중복 지원 구분 기능",
      "DataTable 라이브러리 최초 도입 및 테이블 데이터 처리",
      "테이블 형식 데이터가 많은 구조에 맞춘 UI 구현",
    ],
    image: "works/entrance.png",
    imageAlt: "고입업무지원시스템 홈페이지",
  },
  {
    title: "고입정보포털 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2022.03 ~ 2023.04)",
    contribution: "100%",
    tasks: [
      "메인 페이지 리뉴얼, 중학생·학부모 대상 입학 정보 제공",
      "PC·모바일 메뉴를 공통 코드로 통합, 유지보수성·일관성 향상",
      "동일 구조를 다른 프로젝트에도 적용",
    ],
    image: "works/portal.png",
    imageAlt: "고입정보포털 홈페이지",
  },
  {
    title: "Bio-PRIDE 공유대학홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2022.02 ~ 2023.03)",
    contribution: "100%",
    tasks: [
      "바이오·첨단산업 인재 양성 통합 교육 사이트",
      "이미지 최소화, 대부분 UI 하드코딩으로 구현",
      "SVG 지도 영역 클릭 인터랙션 제작",
    ],
    image: "works/biopride.png",
    imageAlt: "Bio-PRIDE 공유대학홈페이지",
  },
  {
    title: "한국학교컨설팅협회 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2023.04 ~ 2023.05)",
    contribution: "100%",
    tasks: [
      "컨설팅 서비스 소개·컨설턴트 정보 제공",
      "사용자용·관리자용 페이지 구성",
      "공통 코드 템플릿화 후 해당 템플릿 기반 효율적 개발",
    ],
    image: "works/consulting.png",
    imageAlt: "한국학교컨설팅협회 홈페이지",
    url: "https://schoolconsulting.net/",
  },
  {
    title: "한국학교컨설팅협회 성과관리 시스템 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2023.06 ~ 2023.07)",
    contribution: "100%",
    tasks: [
      "컨설팅 진행 상황·결과 관리 웹사이트",
      "한국학교컨설팅협회 사이트와 동일 템플릿 기반 개발",
      "체계적인 성과관리 화면 퍼블리싱",
    ],
    image: "works/performance.png",
    imageAlt: "한국학교컨설팅협회 성과관리 시스템 홈페이지",
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
    "bg-white border border-gray-200 rounded-3xl shadow-xl dark:bg-gradient-to-br dark:from-[#22272e] dark:to-[#232d28] dark:border-white/10 overflow-hidden";

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
          className="grid grid-cols-1 gap-4 md:gap-5"
        >
          {filteredList.map((item, index) => {
            const Wrapper = item.url ? "a" : "div";
            const wrapperProps = item.url
              ? {
                  href: item.url,
                  target: "_blank",
                  rel: "noreferrer",
                  className:
                    "block flex flex-col flex-1 min-h-full cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--point)] focus-visible:ring-inset focus-visible:outline-none",
                }
              : { className: "flex flex-col flex-1 min-h-full" };
            return (
              <li
                key={`${item.subTitle}-${item.title}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`group ${cardBg} flex flex-col transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-400/40 dark:hover:shadow-black/50 hover:ring-2 hover:ring-[var(--point)]/20`}
              >
                <Wrapper {...wrapperProps}>
                  <div className="flex flex-col p-4 sm:p-5">
                    <span className="text-subtitle text-[14px] md:text-[16px] font-medium block mb-1">
                      {item.subTitle}
                    </span>
                    <strong className="text-primary text-[14px] md:text-[16px] font-bold block mb-1 leading-snug">
                      {item.title}
                    </strong>
                    <p className="text-detail text-[14px] md:text-[16px] leading-relaxed">
                      {item.desc}
                    </p>
                    {item.contribution != null && (
                      <p className="text-secondary text-[12px] md:text-[13px] font-medium mt-1.5">
                        기여도 {item.contribution}
                      </p>
                    )}
                    {item.tasks && item.tasks.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200/80 dark:border-white/10">
                        <span className="text-primary text-[13px] md:text-[14px] font-semibold block mb-1.5">
                          담당 내용
                        </span>
                        <ul className="list-none space-y-1">
                          {item.tasks.map((task, i) => (
                            <li
                              key={i}
                              className="text-detail text-[13px] md:text-[14px] leading-relaxed flex gap-2"
                            >
                              <span className="text-point shrink-0" aria-hidden="true">
                                ·
                              </span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Works;
