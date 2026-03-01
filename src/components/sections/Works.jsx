import { useRef, useEffect } from "react";
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

function Works() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

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

      cardRefs.current.forEach((el) => {
        if (!el) return;
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
  }, []);

  const sectionBg = "linear-gradient(120deg, #191c1f 0%, #212c23 100%)";
  const cardBg =
    "bg-gradient-to-br from-[#22272e] to-[#232d28] border border-white/10";

  return (
    <section
      ref={sectionRef}
      id="works-section"
      className="relative min-h-screen py-[8rem] px-4 sm:px-6 lg:px-10 overflow-hidden"
      style={{ background: sectionBg }}
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
          className="font-extrabold text-[clamp(3rem,7vw,5rem)] leading-tight tracking-tighter text-center mb-10 md:mb-14"
          style={{
            background:
              "linear-gradient(110deg, #ffe980 25%, #7dd6ea 65%, #6ee7b7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 6px 32px rgba(61,228,227,0.10)",
            letterSpacing: "-1px",
          }}
        >
          WORKS
        </h2>
        {/* <a
          href="https://www.notion.so/1e3426fffa2b80d1ba1ae25added40d2"
          target="_blank"
          rel="noreferrer"
          className="block text-center text-[1.35rem] font-bold py-3 px-8 rounded-full bg-gradient-to-r from-[#67dbfe] to-[#6ee7b7] text-[#182025] shadow-lg hover:opacity-90 transition-opacity w-fit mx-auto mb-14 md:mb-20"
        >
          경력기술서
        </a> */}

        <ul className="flex flex-col gap-6 md:gap-8">
          {WORK_LIST.map((item, index) => (
            <li
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`${cardBg} rounded-3xl p-6 sm:p-8 shadow-xl transition-shadow hover:shadow-2xl`}
            >
              <span className="text-[1.2rem] sm:text-[1.35rem] text-[#67dbfe] font-medium block mb-2">
                {item.subTitle}
              </span>
              <strong className="text-[1.5rem] sm:text-[1.85rem] font-bold text-white/95 block mb-2 leading-snug">
                {item.title}
              </strong>
              <p className="text-[1.1rem] sm:text-[1.2rem] text-white/75 leading-relaxed">
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
