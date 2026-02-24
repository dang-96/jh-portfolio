import { useEffect, useRef } from "react";

function Visual() {
  const line1Ref = useRef(null);
  const nameRef = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const pRef = useRef(null);

  useEffect(() => {
    // Trigger animations after mount
    const elements = [
      pRef.current,
      line1Ref.current,
      nameRef.current,
      line2Ref.current,
      line3Ref.current,
    ];
    elements.forEach((el, i) => {
      if (el) {
        el.classList.add("visual-fade-in");
        el.style.transitionDelay = `${0.2 + i * 0.12}s`;
      }
    });
    // Cleanup on unmount
    return () => {
      elements.forEach((el) => {
        if (el) {
          el.classList.remove("visual-fade-in");
          el.style.transitionDelay = "";
        }
      });
    };
  }, []);

  return (
    <section
      id="visual-section"
      className="min-h-screen py-[6rem] px-[3rem] mx-auto w-full flex justify-start items-end"
      style={{
        background: "linear-gradient(135deg, #3e5f44 0%, #232323 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          .visual-fade-target {
            opacity: 0;
            transform: translateY(36px);
            transition:
              opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1),
              transform 0.7s cubic-bezier(0.23,1,0.32,1);
          }
          .visual-fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>
      {/* Optional background decor */}
      <div
        style={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="w-full relative z-10">
        <div className="relative">
          <p
            ref={pRef}
            className="visual-fade-target absolute -top-24 left-0 text-[4.2rem] text-white"
            aria-label="웹퍼블리셔 염정훈 입니다."
          >
            <span ref={line1Ref}>웹퍼블리셔 </span>
            <strong
              ref={nameRef}
              className="text-[4.8rem] visual-fade-target"
              style={{ display: "inline-block", color: "#FFD700" }}
            >
              염정훈
            </strong>{" "}
            입니다.
          </p>
          <h2 className="text-[15rem] text-left leading-none text-white drop-shadow-lg">
            <span
              ref={line2Ref}
              className="visual-fade-target block"
              style={{ transitionDelay: "0.44s" }}
            >
              Welcome
            </span>
            <br />
            <span
              ref={line3Ref}
              className="visual-fade-target w-full inline-block text-right"
              style={{ transitionDelay: "0.56s" }}
            >
              My Portfolio
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Visual;
