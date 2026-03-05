import { useRef } from "react";
import { useTrail, animated } from "@react-spring/web";
import { useInViewOnce } from "../../hooks/useInViewOnce";

const CONTACT_ITEMS = [
  "함께 일할 웹 퍼블리셔를 찾고 계신가요?",
  "youm960225@gmail.com",
  "연락주시면 빠르게 답변 드리겠습니다.",
];

const TRAIL_FROM = { opacity: 0, y: 28 };
const TRAIL_TO = { opacity: 1, y: 0 };
const TRAIL_CONFIG = { tension: 120, friction: 26 };


const MAIL_HOVER =
  "transition-all duration-200 transform hover:scale-105 hover:shadow-[0_6px_28px_0_rgba(255,233,128,0.10)] cursor-pointer";
const MAIL_GLOW =
  "py-3 px-4 sm:px-4 rounded-xl shadow-xl border border-white/10 w-full max-w-full overflow-visible bg-white/5 hover:bg-white/10 transition-colors";
const CTA_BTN =
  "mt-8 px-5 py-2 rounded-full bg-point text-[#0f172a] font-bold text-[18px] shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-150 focus:ring-2 focus:ring-[var(--point)] focus:ring-offset-2 focus:ring-offset-[#22272e] focus:scale-105";

/** inView 시에만 마운트 → to 고정으로 스택 오버플로우 방지 */
function ContactAnimatedContent() {
  const trail = useTrail(CONTACT_ITEMS.length, {
    from: TRAIL_FROM,
    to: TRAIL_TO,
    config: TRAIL_CONFIG,
    delay: 160,
  });

  return (
    <div className="relative z-10 w-full max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center justify-center px-2 sm:px-4">
      <animated.p
        style={{
          opacity: trail[0].opacity,
          transform: trail[0].y.to((v) => `translateY(${v}px)`),
          letterSpacing: "-0.5px",
        }}
        className="text-point text-center text-[clamp(28px,5vw,56px)] font-extrabold mb-6 tracking-tight md:whitespace-nowrap"
      >
        {CONTACT_ITEMS[0]}
      </animated.p>

      <animated.a
        href="mailto:youm960225@gmail.com"
        style={{
          opacity: trail[1].opacity,
          transform: trail[1].y.to((v) => `translateY(${v}px)`),
          letterSpacing: "-0.5px",
        }}
        className={`text-point ${MAIL_GLOW} ${MAIL_HOVER} select-all text-[clamp(20px,4vw,40px)] sm:text-[clamp(26px,5vw,56px)] font-extrabold text-center tracking-tight flex items-center justify-center whitespace-nowrap box-border`}
        tabIndex={0}
        aria-label="이메일로 연락하기"
      >
        {CONTACT_ITEMS[1]}
      </animated.a>

      <animated.p
        style={{
          opacity: trail[2].opacity,
          transform: trail[2].y.to((v) => `translateY(${v}px)`),
        }}
        className="text-detail text-[clamp(16px,2.8vw,24px)] text-center mt-6 mb-2 md:whitespace-nowrap"
      >
        {CONTACT_ITEMS[2]}
      </animated.p>

      <animated.a
        style={{
          opacity: trail[2].opacity,
          transform: trail[2].y.to((v) => `translateY(${v + 16}px)`),
        }}
        href="mailto:youm960225@gmail.com"
        className={CTA_BTN}
      >
        이메일 보내기
      </animated.a>
    </div>
  );
}

function Contact() {
  const sectionRef = useRef(null);
  const inView = useInViewOnce(sectionRef);
  const sectionBg = "linear-gradient(120deg, #191c1f 0%, #22272e 100%)";

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
            "radial-gradient(circle at 70% 16%,rgba(113,216,225,.14) 0%,transparent 78%)",
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
            "radial-gradient(circle at 18% 82%,rgba(255,233,128,.11) 0%,transparent 70%)",
        }}
      />

      {inView ? (
        <ContactAnimatedContent />
      ) : (
        <div className="min-h-[400px]" aria-hidden="true" />
      )}
    </section>
  );
}

export default Contact;
