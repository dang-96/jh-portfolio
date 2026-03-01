import { useTrail, animated } from "@react-spring/web";

const VISUAL_FROM = { opacity: 0, y: 40 };
const VISUAL_TO = { opacity: 1, y: 0 };
const VISUAL_CONFIG = { tension: 170, friction: 20 };

function Visual() {
  const items = [
    "웹 퍼블리셔 · Web Publisher",
    "염정훈",
    "My Portfolio",
    "트렌디한 UI와 부드러운 인터랙션을 담은 포트폴리오를 소개합니다.",
  ];

  const trail = useTrail(items.length, {
    from: VISUAL_FROM,
    to: VISUAL_TO,
    config: VISUAL_CONFIG,
    delay: 100,
  });

  return (
    <section
      id="visual-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(120deg, #181e26 0%, #22272e 100%)",
      }}
    >
      {/* Subtle, smooth background gradient decoration */}
      <div
        className="pointer-events-none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(circle at 60% 28%,rgba(61,228,227,.08) 0%,transparent 80%)",
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
            "radial-gradient(circle at 30% 82%,rgba(113,59,253,.13) 0%,transparent 70%)",
        }}
      />

      {/* HERO TEXT CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 w-full max-w-5xl lg:max-w-6xl">
        {/* Badge */}
        <animated.div
          style={{
            opacity: trail[0].opacity,
            transform: trail[0].y.to((v) => `translateY(${v}px)`),
            backdropFilter: "blur(3px)",
          }}
          className="mb-10 sm:mb-12 inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-semibold uppercase text-base tracking-wider text-[#85e9c9] bg-white/5 border border-[#53dec0]/30"
        >
          {items[0]}
        </animated.div>

        {/* Name */}
        <animated.h1
          style={{
            opacity: trail[1].opacity,
            transform: trail[1].y.to((v) => `translateY(${v}px)`),
            background:
              "linear-gradient(94deg,#ffe980 20%,#67dbfe 60%,#6e6cff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 8px 36px rgba(61,228,227,0.09)",
          }}
          className="font-extrabold text-[clamp(3.5rem,11vw,8rem)] leading-tight tracking-tight mb-6 sm:mb-8"
        >
          {items[1]}
        </animated.h1>

        {/* Main Portfolio Title */}
        <animated.h2
          style={{
            opacity: trail[2].opacity,
            transform: trail[2].y.to((v) => `translateY(${v}px)`),
          }}
          className="font-bold text-white/90 text-[clamp(1.75rem,5.5vw,3.5rem)] mb-6 sm:mb-8"
        >
          {items[2]}
        </animated.h2>

        {/* Description */}
        <animated.p
          style={{
            opacity: trail[3].opacity,
            transform: trail[3].y.to((v) => `translateY(${v}px)`),
          }}
          className="max-w-3xl mx-auto text-xl sm:text-2xl text-white/60 font-normal leading-relaxed mb-14 sm:mb-16"
        >
          {items[3]}
        </animated.p>

        {/* CTA */}
        <div className="flex flex-wrap gap-6 sm:gap-8 justify-center mb-2">
          <a
            href="https://fair-verdict-78d.notion.site/1e3426fffa2b80d1ba1ae25added40d2"
            target="_blank"
            className="px-10 py-3.5 rounded-full bg-gradient-to-br from-[#67dbfe] to-[#b8a3ee] text-[#212530] font-bold text-lg shadow-lg hover:from-[#81ecd8] hover:to-[#67dbfe] hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-[#67dbfe] transition-all duration-150"
            rel="noreferrer"
          >
            이력서 바로보기
          </a>
          {/* <a
            href="mailto:jhyeom07@gmail.com"
            className="px-10 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-lg shadow hover:bg-white/10 hover:scale-105 focus:scale-105 transition-all duration-150"
          >
            연락하기
          </a> */}
        </div>

        {/* Socials */}
        <div className="flex gap-8 mt-10 sm:mt-12 justify-center">
          <a
            href="https://github.com/dang-96"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform text-white/70 hover:text-[#68ede3] duration-150"
            aria-label="GitHub"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              className="shrink-0"
            >
              <path
                fill="currentColor"
                d="M12 2c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.1 7 9.4.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.4-1-1-1.2-1-1.2-.8-.6.1-.6.1-.6.9.1 1.3.9 1.3.9.8 1.3 2.2 1 2.8.8.1-.6.3-1 .6-1.2-2.3-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.6 0 0 .8-.2 2.7 1a9.1 9.1 0 015 0c1.9-1.2 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.7 1 2.8 0 4-2.4 4.7-4.7 5 .3.2.6.8.6 1.6V21c0 .3.2.6.7.5C19.1 20.1 22 16.4 22 12c0-5.5-4.5-10-10-10z"
              />
            </svg>
          </a>
          {/* <a
            href="mailto:jhyeom07@gmail.com"
            className="hover:scale-110 transition-transform text-white/70 hover:text-[#ffd600] duration-150"
            aria-label="Email"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              className="shrink-0"
            >
              <path
                fill="currentColor"
                d="M20.5 4h-17A1.5 1.5 0 002 5.5v13A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0020.5 4zm-.4 2L12 13.25 3.9 6h16.2zm.4 12.5h-17V7.65l8 7.1c.4.35 1.05.35 1.4 0l8-7.1v8.85a.5.5 0 01-.5.5z"
              />
            </svg>
          </a> */}
        </div>
      </div>
    </section>
  );
}

export default Visual;
