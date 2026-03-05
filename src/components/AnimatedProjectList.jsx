import { useTrail, animated } from "@react-spring/web";

// to/from 이 바뀌면 react-spring 내부에서 스택 오버플로우 발생 → 상수 config만 사용
const TRAIL_FROM = { opacity: 0, y: 28 };
const TRAIL_TO = { opacity: 1, y: 0 };
const TRAIL_CONFIG = { tension: 100, friction: 26 };

function AnimatedProjectList({ projects, cardBg }) {
  const trail = useTrail(projects.length, {
    from: TRAIL_FROM,
    to: TRAIL_TO,
    config: TRAIL_CONFIG,
    delay: 80,
  });

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
      {projects.map((item, idx) => (
        <animated.li
          key={item.id}
          style={{
            opacity: trail[idx].opacity,
            transform: trail[idx].y.to((v) => `translateY(${v}px)`),
            willChange: "opacity, transform",
          }}
          className={`
            w-full
            ${cardBg} rounded-3xl shadow-md shadow-gray-300/60 dark:shadow-xl
            flex flex-col items-stretch
            transition-all duration-300 ease-out
            hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-400/50 dark:hover:shadow-2xl
          `}
        >
          <a
            href={item.siteUrl}
            className="block w-full h-[240px] sm:h-[280px] md:h-[300px] rounded-t-3xl overflow-hidden relative group bg-gray-100 dark:bg-black"
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
          >
            <img
              src={item.image}
              alt={item.imageAlt}
              className="project-card-img w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent dark:from-black/40 dark:to-transparent pointer-events-none" />
          </a>
          <div className="flex flex-col gap-2 p-4 sm:p-5 pb-4 flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-primary text-[18px] md:text-[22px] font-bold">
                {item.title}
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={item.siteUrl}
                  className="
                    text-[13px] md:text-[14px] px-4 py-1 rounded-full font-semibold border border-[var(--point)]/60
                    bg-white/80 dark:bg-white/10 text-[var(--text-primary)] shadow
                    hover:bg-[var(--point)]/20 hover:border-[var(--point)] hover:scale-105 hover:shadow-md
                    transition-all duration-200 ease-out active:scale-100
                  "
                  target="_blank"
                  rel="noreferrer"
                >
                  WebSite
                </a>
                <a
                  href={item.githubUrl}
                  className="
                    text-[13px] md:text-[14px] px-4 py-1 rounded-full font-semibold border border-[var(--point)]/60
                    bg-white/80 dark:bg-white/10 text-[var(--text-primary)] shadow
                    hover:bg-[var(--point)]/20 hover:border-[var(--point)] hover:scale-105 hover:shadow-md
                    transition-all duration-200 ease-out active:scale-100
                  "
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
            <p className="text-detail text-[14px] md:text-[16px] font-normal leading-relaxed mt-1">
              {item.content}
            </p>
          </div>
        </animated.li>
      ))}
    </ul>
  );
}

export default AnimatedProjectList;
