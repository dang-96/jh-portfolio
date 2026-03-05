import { useRef } from "react";
import { useInViewOnce } from "../../hooks/useInViewOnce";
import AnimatedProjectList from "../AnimatedProjectList";

const IN_VIEW_OPTIONS = { threshold: 0.1 };

function Project() {
  const sectionRef = useRef(null);
  const inView = useInViewOnce(sectionRef, IN_VIEW_OPTIONS);

  const publicUrl = process.env.PUBLIC_URL || "";
  const cardBg =
    "bg-white/80 dark:bg-[#22272e]/75 backdrop-blur-md border border-gray-200/90 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-none";
  const projects = [
    {
      id: "pokemon",
      title: "Poke-Sensei",
      image: `${publicUrl}/images/project-pokemon-image.png`,
      imageAlt: "포켓몬 프로젝트 이미지",
      content: "포켓몬 도감을 보고 공부하여 퀴즈를 풀 수 있는 서비스",
      siteUrl: "https://poke-sensei.vercel.app/",
      githubUrl: "https://github.com/dang-96/poke-sensei",
    },
    {
      id: "moving",
      title: "Moving",
      image: `${publicUrl}/images/project-moving-image.png`,
      imageAlt: "무빙 프로젝트 이미지",
      content: "스트리밍 웹 사이트 느낌처럼 영화의 정보를 알 수 있는 서비스",
      siteUrl: "https://ott-moving.vercel.app/",
      githubUrl: "https://github.com/dang-96/moving",
    },
    {
      id: "epigram",
      title: "Epigram",
      image: `${publicUrl}/images/project-epigram-image.png`,
      imageAlt: "에피그램 프로젝트 이미지",
      content: "감정상태에 따른 명언과 글귀들을 열람하고 공유하는 서비스",
      siteUrl: "https://epigram-share.vercel.app/",
      githubUrl: "https://github.com/dang-96/Epigram",
    },
    {
      id: "linkbrary",
      title: "Linkbrary",
      image: `${publicUrl}/images/project-linkbrary-image.png`,
      imageAlt: "링크브러리 프로젝트 이미지",
      content: "나만의 링크를 모아두는 저장소 서비스",
      siteUrl: "https://l1nkbrary.netlify.app/",
      githubUrl: "https://github.com/dang-96/Linkbrary",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="project-section"
      className="section-project relative min-h-screen py-16 px-4 sm:px-6 lg:px-10 overflow-hidden"
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
          className="text-primary font-extrabold text-[clamp(28px,5vw,52px)] leading-tight tracking-tighter text-center mb-10"
          style={{ letterSpacing: "-1px" }}
        >
          PROJECT
        </h2>
        {inView ? (
          <AnimatedProjectList
            projects={projects}
            cardBg={cardBg}
          />
        ) : (
          <div
            className="min-h-[260px]"
            aria-hidden="true"
          />
        )}
      </div>
    </section>
  );
}

export default Project;
