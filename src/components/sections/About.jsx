import { useRef } from "react";
import { useTrail, animated } from "@react-spring/web";
import { useInViewOnce } from "../../hooks/useInViewOnce";

const ABOUT_FROM = { opacity: 0, y: 54 };
const ABOUT_TO = { opacity: 1, y: 0 };
const ABOUT_CONFIG = { tension: 180, friction: 20 };

const SKILLS = [
  "HTML5",
  "CSS3",
  "SCSS",
  "TAILWIND",
  "STYLED-COMPONENT",
  "JAVASCRIPT",
  "JQuery",
  "REACT",
  "TYPESCRIPT",
  "NEXT.JS",
  "TANSTACK-QUERY",
  "REACT-HOOK-FORM",
  "ZUSTAND",
];

/** 스크롤로 영역 진입 시에만 마운트 → useTrail이 그때 한 번만 실행됨 */
function AboutAnimatedBlocks({ cardBg, pointColor }) {
  const trail = useTrail(3, {
    from: ABOUT_FROM,
    to: ABOUT_TO,
    config: ABOUT_CONFIG,
    delay: 100,
  });

  return (
    <>
      {/* PROFILE */}
      <animated.div
        style={{
          opacity: trail[0].opacity,
          transform: trail[0].y.to((v) => `translateY(${v}px)`),
        }}
        className={`${cardBg} flex flex-col-reverse md:flex-row md:items-center justify-center rounded-3xl p-[2.6rem] md:p-[4.2rem] gap-[4.5rem] mb-[6.5rem] shadow-2xl border border-white/10`}
      >
          <div className="flex-1">
            <h3 className="font-bold text-[2rem] md:text-[2.25rem] mb-8 text-white/90 leading-[1.22]">
              염정훈{" "}
              <span className="text-white/50 text-[1.25rem] md:text-[1.375rem] ml-2">
                | 1996.02.25 | 웹 퍼블리셔
              </span>
            </h3>
            <p className="text-[1.375rem] md:text-[1.5rem] text-white/80 mb-6 leading-[2]">
              안녕하세요! 3년차 웹 퍼블리셔{" "}
              <span className="font-semibold">염정훈</span>입니다.
            </p>
            <p className="text-[1.25rem] md:text-[1.375rem] text-white/80 mb-6 leading-[2]">
              <strong className={`${pointColor}`}>
                HTML, CSS, JavaScript, JQuery
              </strong>
              를 활용해 정확하고 효율적인 UI 구현을 지향하며,
              <br />
              <strong className={`${pointColor}`}>
                반응형 웹과 크로스 브라우징
              </strong>
              으로 다양한 디바이스에 일관된 경험을 제공합니다.
            </p>
            <p className="text-[1.25rem] md:text-[1.375rem] text-white/80 mb-6 leading-[2]">
              <strong className={pointColor}>SCSS, Tailwind</strong> 등 도구를
              활용해 유지보수성을 고려한 스타일 구조를 설계하고,
              <strong className={pointColor}> 디자이너와의 협업</strong>을 통해
              시각적 완성도를 높였습니다.
            </p>
            <p className="text-[1.25rem] md:text-[1.375rem] text-white/80 mb-10 leading-[2]">
              최근에는{" "}
              <strong className={`${pointColor}`}>
                React, TypeScript, Next.js
              </strong>
              를 학습하며 프론트엔드 개발 영역까지 확장하여, 더욱 폭넓은 UI/UX
              구현이 가능합니다.
            </p>
            <a
              className={`inline-flex items-center gap-3 mt-4 text-[1.25rem] md:text-[1.375rem] font-bold ${pointColor} relative group
                hover:underline underline-offset-4 transition-all duration-150`}
              href="https://www.notion.so/1e3426fffa2b80d1ba1ae25added40d2"
              target="_blank"
              rel="noreferrer"
            >
              자기소개 더보기
              <i className="fa-solid fa-circle-chevron-right text-[1.1em]" />
            </a>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div
              className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full shadow-lg bg-[#eee] border-4 border-[#88e3e1]/10 bg-cover bg-center bg-no-repeat relative
              after:content-[''] after:absolute after:inset-0 after:rounded-full after:ring-2 after:ring-[#67dbfe]/30"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/my-image.png)`,
                boxShadow: "0 8px 36px 0 rgba(113,216,225,.13)",
              }}
            ></div>
          </div>
        </animated.div>

        {/* WORK EXPERIENCE & SKILL */}
        <animated.div
          style={{
            opacity: trail[1].opacity,
            transform: trail[1].y.to((v) => `translateY(${v}px)`),
          }}
          className={`flex flex-col md:flex-row gap-[3.5rem] mb-[7rem]`}
        >
          {/* Work Experience */}
          <div
            className={`${cardBg} flex-1 rounded-3xl p-[2.8rem] md:p-[3.4rem] shadow-lg border border-white/10 flex flex-col`}
          >
            <h3 className="text-[1.75rem] md:text-[2rem] font-bold mb-10 text-[#81ecd8] tracking-wide">
              WORK EXPERIENCE
            </h3>
            <ul className="[&_li]:mb-7 [&_li:last-child]:mb-0">
              <li className="text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                (주)리얼인벤션
                <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                  (2022.01 ~ 2024.04) 웹 퍼블리셔(대리)
                </span>
              </li>
              <li className="text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                (주)언플러
                <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                  (2025.09 ~ 2026.02) 웹 퍼블리셔(사원)
                </span>
              </li>
            </ul>
          </div>
          {/* SKILL */}
          <div
            className={`${cardBg} flex-1 rounded-3xl p-[2.8rem] md:p-[3.4rem] shadow-lg border border-white/10 flex flex-col`}
          >
            <h3 className="text-[1.75rem] md:text-[2rem] font-bold mb-10 text-[#81ecd8] tracking-wide">
              SKILL
            </h3>
            <ul className="flex flex-wrap gap-4">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="text-[1.125rem] md:text-[1.25rem] py-2.5 px-6 rounded-full bg-white/90 font-semibold tracking-wider text-[#227c66] shadow-[0_0_8px_1.5px_rgba(103,219,254,0.10)] transition-all hover:bg-[#67dbfe]/85 hover:text-[#182025]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </animated.div>

        {/* EDUCATION & CERTIFICATION */}
        <animated.div
          style={{
            opacity: trail[2].opacity,
            transform: trail[2].y.to((v) => `translateY(${v}px)`),
          }}
          className="flex flex-col md:flex-row gap-[3.5rem]"
        >
          {/* EDUCATION */}
          <div
            className={`${cardBg} flex-1 rounded-3xl p-[2.8rem] md:p-[3.4rem] shadow-lg border border-white/10 flex flex-col`}
          >
            <h3 className="text-[1.75rem] md:text-[2rem] font-bold mb-10 text-[#81ecd8] tracking-wide">
              EDUCATION
            </h3>
            <ul className="[&_li]:mb-7 [&_li:last-child]:mb-0">
              <li className="text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                코드잇 프론트엔드 스프린트 수료
                <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                  (2024.06 ~ 2024.11)
                </span>
              </li>
              <li className="text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                라인컴퓨터아트학원 수료
                <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                  (2021.06 ~ 2021.11)
                </span>
              </li>
              <li className="text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                신안산대학교 졸업
                <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                  (2015.03 ~ 2020.02)
                </span>
              </li>
            </ul>
          </div>
          {/* Certificate */}
          <div
            className={`${cardBg} flex-1 rounded-3xl p-[2.8rem] md:p-[3.4rem] shadow-lg border border-white/10 flex flex-col`}
          >
            <h3 className="text-[1.75rem] md:text-[2rem] font-bold mb-10 text-[#81ecd8] tracking-wide">
              자격증
            </h3>
            <ul className="[&_li]:mb-7 [&_li:last-child]:mb-0">
              <li className="text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                웹디자인기능사
                <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">(2023.12)</span>
              </li>
              <li className="text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                컴퓨터활용능력 2급
                <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">(2020.08)</span>
              </li>
            </ul>
          </div>
        </animated.div>
    </>
  );
}

function About() {
  const sectionRef = useRef(null);
  const inView = useInViewOnce(sectionRef);
  const sectionBg = "linear-gradient(120deg, #191c1f 0%, #212c23 100%)";
  const cardBg = "bg-gradient-to-br from-[#22272e] to-[#232d28] bg-opacity-90";
  const pointColor = "text-[#67dbfe]";

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-[9vw] px-4 sm:px-6 lg:px-10"
      style={{ background: sectionBg }}
    >
      <div
        className="pointer-events-none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(circle at 70% 27%,rgba(113,216,225,.08) 0%,transparent 78%)",
        }}
      />
      <div
        className="pointer-events-none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(circle at 23% 86%,rgba(113,59,253,.10) 0%,transparent 62%)",
        }}
      />
      <div className="relative z-10 w-full max-w-7xl xl:max-w-[1400px] mx-auto">
        <h2
          className="font-extrabold text-[clamp(3rem,7vw,5rem)] leading-tight tracking-tighter text-center mb-20"
          style={{
            background:
              "linear-gradient(110deg,#ffe980 25%,#7dd6ea 65%,#6ee7b7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 6px 32px rgba(61,228,227,0.10)",
            letterSpacing: "-1px",
          }}
        >
          ABOUT
        </h2>
        {inView ? (
          <AboutAnimatedBlocks cardBg={cardBg} pointColor={pointColor} />
        ) : (
          <div className="min-h-[500px]" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}

export default About;
