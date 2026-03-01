import { useRef } from "react";
import { useInViewOnce } from "../../hooks/useInViewOnce";
import AnimatedProjectList from "../AnimatedProjectList";

function Project() {
  const sectionRef = useRef(null);
  const inView = useInViewOnce(sectionRef);

  const publicUrl = process.env.PUBLIC_URL || "";
  const sectionBg = "linear-gradient(120deg, #191c1f 0%, #212c23 100%)";
  const cardBg = "bg-gradient-to-br from-[#22272e] to-[#232d28] bg-opacity-90";
  const projects = [
    {
      id: "pokemon",
      title: "Poke-Sensei",
      image: `${publicUrl}/images/project-pokemon-image.png`,
      imageAlt: "포켓몬 프로젝트 이미지",
      content: "포켓몬 도감을 보고 공부하여 퀴즈를 풀 수 있는 서비스",
      siteUrl: "/",
      notionUrl: "/",
    },
    {
      id: "moving",
      title: "Moving",
      image: `${publicUrl}/images/project-moving-image.png`,
      imageAlt: "무빙 프로젝트 이미지",
      content: "스트리밍 웹 사이트 느낌처럼 영화의 정보를 알 수 있는 서비스",
      siteUrl: "/",
      notionUrl: "/",
    },
    {
      id: "epigram",
      title: "Epigram",
      image: `${publicUrl}/images/project-epigram-image.png`,
      imageAlt: "에피그램 프로젝트 이미지",
      content: "감정상태에 따른 명언과 글귀들을 열람하고 공유하는 서비스",
      siteUrl: "/",
      notionUrl: "/",
    },
    {
      id: "linkbrary",
      title: "Linkbrary",
      image: `${publicUrl}/images/project-linkbrary-image.png`,
      imageAlt: "링크브러리 프로젝트 이미지",
      content: "나만의 링크를 모아두는 저장소 서비스",
      siteUrl: "/",
      notionUrl: "/",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="project-section"
      className="relative min-h-screen py-[8rem] px-4 sm:px-6 lg:px-10 bg-[#181e26] overflow-hidden"
      style={{ background: sectionBg }}
    >
      {/* Subtle gradients - visual.jsx 스타일 */}
      <div
        className="pointer-events-none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(circle at 70% 20%,rgba(113,216,225,.08) 0%,transparent 75%)",
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
            "radial-gradient(circle at 25% 85%,rgba(113,59,253,.11) 0%,transparent 70%)",
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
          PROJECT
        </h2>
        {inView ? (
          <AnimatedProjectList projects={projects} cardBg={cardBg} />
        ) : (
          <div className="min-h-[420px]" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}

export default Project;
