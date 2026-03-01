import { useRef } from "react";
import { useTrail, animated } from "@react-spring/web";
import { useInViewOnce } from "../../hooks/useInViewOnce";

/** 블록 3개. inView 시에만 마운트되어 useTrail 한 번만 실행되도록 함 */
const TRAIL_FROM = { opacity: 0, y: 44 };
const TRAIL_TO = { opacity: 1, y: 0 };
const TRAIL_CONFIG = { tension: 175, friction: 20 };

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

const NOTION_URL =
  "https://fair-verdict-78d.notion.site/1e3426fffa2b80d1ba1ae25added40d2";
const GITHUB_URL = "https://github.com/dang-96";

function GitHubIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.1 7 9.4.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.4-1-1-1.2-1-1.2-.8-.6.1-.6.1-.6.9.1 1.3.9 1.3.9.8 1.3 2.2 1 2.8.8.1-.6.3-1 .6-1.2-2.3-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.6 0 0 .8-.2 2.7 1a9.1 9.1 0 015 0c1.9-1.2 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.7 1 2.8 0 4-2.4 4.7-4.7 5 .3.2.6.8.6 1.6V21c0 .3.2.6.7.5C19.1 20.1 22 16.4 22 12c0-5.5-4.5-10-10-10z"
      />
    </svg>
  );
}

/** 블록 3개. useTrail(3) 한 번만 사용 → 스택 오버플로우 방지 */
function AboutAnimatedContent({ cardBg, pointColor }) {
  const trail = useTrail(3, {
    from: TRAIL_FROM,
    to: TRAIL_TO,
    config: TRAIL_CONFIG,
    delay: 100,
  });

  return (
    <div className="w-full flex flex-col items-stretch">
      {/* PROFILE: trail[0] */}
      <animated.div
        style={{
          opacity: trail[0].opacity,
          transform: trail[0].y.to((v) => `translateY(${v}px)`),
        }}
        className={`${cardBg} flex flex-col-reverse md:flex-row md:items-center justify-center rounded-3xl p-[2.6rem] md:p-[4.2rem] gap-[4.5rem] mb-[6.5rem] w-full`}
      >
        <div className="flex-1">
          <h3 className="font-bold text-[2rem] md:text-[2.25rem] mb-8 text-gray-900 dark:text-white/90 leading-[1.22]">
            염정훈{" "}
            <span className="text-gray-500 dark:text-white/50 text-[1.25rem] md:text-[1.375rem] ml-2">
              | 1996.02.25 | 웹 퍼블리셔
            </span>
          </h3>
          <p className="text-[1.375rem] md:text-[1.5rem] text-gray-700 dark:text-white/80 mb-6 leading-[2]">
            안녕하세요! 3년차 웹 퍼블리셔{" "}
            <span className="font-semibold">염정훈</span>입니다.
          </p>
          <p className="text-[1.25rem] md:text-[1.375rem] text-gray-700 dark:text-white/80 mb-6 leading-[2]">
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
          <p className="text-[1.25rem] md:text-[1.375rem] text-gray-700 dark:text-white/80 mb-6 leading-[2]">
              <strong className={pointColor}>SCSS, Tailwind</strong> 등 도구를
            활용해 유지보수성을 고려한 스타일 구조를 설계하고,
            <strong className={pointColor}> 디자이너와의 협업</strong>을 통해
            시각적 완성도를 높였습니다.
          </p>
          <p className="text-[1.25rem] md:text-[1.375rem] text-gray-700 dark:text-white/80 mb-10 leading-[2]">
              최근에는{" "}
            <strong className={`${pointColor}`}>
              React, TypeScript, Next.js
            </strong>
            를 학습하며 프론트엔드 개발 영역까지 확장하여, 더욱 폭넓은 UI/UX
            구현이 가능합니다.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a
              className={`inline-flex items-center gap-3 text-[1.25rem] md:text-[1.375rem] font-bold ${pointColor} relative group
                  hover:underline underline-offset-4 transition-all duration-150`}
              href={NOTION_URL}
              target="_blank"
              rel="noreferrer"
            >
              이력서 바로가기
              <i className="fa-solid fa-circle-chevron-right text-[1.1em]" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-white/80 hover:text-[#68ede3] transition-colors duration-150"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-7 h-7" />
              <span className="text-[1.125rem] md:text-[1.25rem] font-semibold">
                GitHub
              </span>
            </a>
          </div>
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

      {/* WORK EXPERIENCE & SKILL: trail[1] */}
      <animated.div
        style={{
          opacity: trail[1].opacity,
          transform: trail[1].y.to((v) => `translateY(${v}px)`),
        }}
        className="flex flex-col md:flex-row gap-[3.5rem] mb-[7rem] w-full"
      >
        {/* Work Experience */}
        <div
          className={`${cardBg} flex-1 rounded-3xl p-[2.8rem] md:p-[3.4rem] shadow-lg border border-gray-200 dark:border-white/10 flex flex-col`}
          >
            <h3 className="text-[1.75rem] md:text-[2rem] font-bold mb-10 text-[#0d9488] dark:text-[#81ecd8] tracking-wide">
              WORK EXPERIENCE
            </h3>
            <ul className="[&_li]:mb-7 [&_li:last-child]:mb-0">
              <li className="text-gray-800 dark:text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
              (주)언플러
              <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                (2025.09 ~ 2026.02) 웹 퍼블리셔(사원)
              </span>
            </li>
            <li className="text-gray-800 dark:text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
              (주)리얼인벤션
              <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                (2022.01 ~ 2024.04) 웹 퍼블리셔(대리)
              </span>
            </li>
          </ul>
        </div>
        {/* SKILL */}
        <div
          className={`${cardBg} flex-1 rounded-3xl p-[2.8rem] md:p-[3.4rem] shadow-lg border border-gray-200 dark:border-white/10 flex flex-col`}
          >
            <h3 className="text-[1.75rem] md:text-[2rem] font-bold mb-10 text-[#0d9488] dark:text-[#81ecd8] tracking-wide">
              SKILL
            </h3>
            <ul className="flex flex-wrap gap-4">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="text-[1.125rem] md:text-[1.25rem] py-2.5 px-6 rounded-full bg-gray-100 dark:bg-white/90 font-semibold tracking-wider text-[#0d9488] dark:text-[#227c66] shadow-[0_0_8px_1.5px_rgba(103,219,254,0.10)] transition-all hover:bg-[#67dbfe]/85 hover:text-[#182025] dark:hover:text-[#182025]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </animated.div>

      {/* EDUCATION & CERTIFICATION: trail[2] */}
      <animated.div
        style={{
          opacity: trail[2].opacity,
          transform: trail[2].y.to((v) => `translateY(${v}px)`),
        }}
        className="flex flex-col md:flex-row gap-[3.5rem] w-full"
      >
        {/* EDUCATION */}
        <div
          className={`${cardBg} flex-1 rounded-3xl p-[2.8rem] md:p-[3.4rem] shadow-lg border border-gray-200 dark:border-white/10 flex flex-col`}
          >
            <h3 className="text-[1.75rem] md:text-[2rem] font-bold mb-10 text-[#0d9488] dark:text-[#81ecd8] tracking-wide">
              EDUCATION
            </h3>
            <ul className="[&_li]:mb-7 [&_li:last-child]:mb-0">
              <li className="text-gray-800 dark:text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                코드잇 프론트엔드 스프린트 수료
              <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                (2024.06 ~ 2024.11)
              </span>
            </li>
              <li className="text-gray-800 dark:text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                라인컴퓨터아트학원 수료
              <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                (2021.06 ~ 2021.11)
              </span>
            </li>
              <li className="text-gray-800 dark:text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                신안산대학교 졸업
              <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                (2015.03 ~ 2020.02)
              </span>
            </li>
          </ul>
        </div>
        {/* Certificate */}
        <div
          className={`${cardBg} flex-1 rounded-3xl p-[2.8rem] md:p-[3.4rem] shadow-lg border border-gray-200 dark:border-white/10 flex flex-col`}
          >
            <h3 className="text-[1.75rem] md:text-[2rem] font-bold mb-10 text-[#0d9488] dark:text-[#81ecd8] tracking-wide">
              자격증
            </h3>
            <ul className="[&_li]:mb-7 [&_li:last-child]:mb-0">
              <li className="text-gray-800 dark:text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                웹디자인기능사
              <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                (2023.12)
              </span>
            </li>
              <li className="text-gray-800 dark:text-white/90 text-[1.375rem] md:text-[1.5rem] flex flex-col gap-1.5">
                컴퓨터활용능력 2급
              <span className="text-[1.125rem] md:text-[1.25rem] text-[#67dbfe]">
                (2020.08)
              </span>
            </li>
          </ul>
        </div>
      </animated.div>
    </div>
  );
}

const CARD_BG =
  "bg-white border border-gray-200 shadow-2xl dark:bg-gradient-to-br dark:from-[#22272e] dark:to-[#232d28] dark:bg-opacity-90 dark:border-white/10";

function About() {
  const sectionRef = useRef(null);
  const inView = useInViewOnce(sectionRef);
  const pointColor = "text-[#67dbfe]";

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="section-about relative min-h-screen flex flex-col items-center overflow-hidden py-[6vw] sm:py-[8vw] px-4 sm:px-6 lg:px-10"
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

      <div className="relative z-10 w-full max-w-7xl xl:max-w-[1400px] mx-auto flex flex-col items-center justify-center py-12 sm:py-16">
        {inView ? (
          <AboutAnimatedContent
            cardBg={CARD_BG}
            pointColor={pointColor}
          />
        ) : (
          <div
            className="min-h-[400px]"
            aria-hidden="true"
          />
        )}
      </div>
    </section>
  );
}

export default About;
