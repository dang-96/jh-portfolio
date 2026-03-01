import { useTrail, animated } from "@react-spring/web";

// to/from 이 바뀌면 react-spring 내부에서 스택 오버플로우 발생 → 상수 config만 사용
const TRAIL_FROM = { opacity: 0, y: 54 };
const TRAIL_TO = { opacity: 1, y: 0 };
const TRAIL_CONFIG = { tension: 180, friction: 20 };

function AnimatedProjectList({ projects, cardBg }) {
  const trail = useTrail(projects.length, {
    from: TRAIL_FROM,
    to: TRAIL_TO,
    config: TRAIL_CONFIG,
    delay: 100,
  });

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
      {projects.map((item, idx) => (
        <animated.li
          key={item.id}
          style={{
            opacity: trail[idx].opacity,
            transform: trail[idx].y.to((v) => `translateY(${v}px)`),
          }}
          className={`
            w-full
            ${cardBg} rounded-3xl shadow-xl border border-white/10
            flex flex-col items-stretch transition-transform duration-200
            hover:scale-[1.02] hover:shadow-2xl
          `}
        >
          <a
            href={item.siteUrl}
            className="block w-full h-[280px] sm:h-[320px] md:h-[340px] rounded-t-3xl overflow-hidden relative group bg-black"
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
          >
            <img
              src={item.image}
              alt={item.imageAlt}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
              style={{
                filter:
                  "brightness(89%) drop-shadow(0 8px 32px rgba(113,216,225,.11))",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </a>
          <div className="flex flex-col gap-2 p-7 sm:p-8 pb-9 flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-[1.75rem] md:text-[2rem] font-bold text-[#7dd6ea]">
                {item.title}
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={item.siteUrl}
                  className="
                    text-[1.0625rem] md:text-[1.125rem] px-4 py-1 rounded-full font-semibold border border-[#67dbfe]/60
                    bg-white/80 text-[#212c24] shadow hover:bg-[#67dbfe]/60 hover:text-[#111b21] hover:border-[#67dbfe] transition-all
                  "
                  target="_blank"
                  rel="noreferrer"
                >
                  WebSite
                </a>
                <a
                  href={item.notionUrl}
                  className="
                    text-[1.0625rem] md:text-[1.125rem] px-4 py-1 rounded-full font-semibold border border-[#b8a3ee]/60
                    bg-white/80 text-[#5c5d7b] shadow hover:bg-[#b8a3ee]/80 hover:text-[#2b2636] hover:border-[#b8a3ee] transition-all
                  "
                  target="_blank"
                  rel="noreferrer"
                >
                  Notion
                </a>
              </div>
            </div>
            <p className="text-[1.25rem] md:text-[1.375rem] text-white/90 font-normal leading-relaxed mt-1">
              {item.content}
            </p>
          </div>
        </animated.li>
      ))}
    </ul>
  );
}

export default AnimatedProjectList;
