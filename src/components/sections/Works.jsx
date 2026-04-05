import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from "../Modal";

gsap.registerPlugin(ScrollTrigger);

/** public/media/daleng/... 경로 (영문 파일명, URL 안전) */
function dalengMediaUrl(...segments) {
  const base = process.env.PUBLIC_URL || "";
  const path = ["media", "daleng", ...segments]
    .map((s) => encodeURIComponent(s))
    .join("/");
  return `${base}/${path}`;
}

/** public/images/... 경로 */
function publicImagesUrl(...segments) {
  const base = process.env.PUBLIC_URL || "";
  const path = ["images", ...segments]
    .map((s) => encodeURIComponent(s))
    .join("/");
  return `${base}/${path}`;
}

/** 모달 전용: 주요 작업 등 */
function WorkModalSectionBlocks({ sections }) {
  if (!sections?.length) return null;
  return (
    <div className="space-y-6 mb-6">
      {sections.map((block) => (
        <div key={block.title}>
          <h3 className="text-primary text-[14px] font-bold mb-2">
            {block.title}
          </h3>
          <ul className="list-none space-y-1.5">
            {block.items.map((line, i) => (
              <li
                key={i}
                className="text-detail text-[13px] md:text-[14px] leading-relaxed flex gap-2"
              >
                <span
                  className="text-point shrink-0"
                  aria-hidden="true"
                >
                  ·
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * modalDemos: { type, src, caption?, poster?, mime?, group? }
 * — group: 같은 문자열이 연속된 항목은 한 덩어리로 묶어 세로 스택(그리드에서는 md:col-span-2)
 */
function clusterModalDemos(demos) {
  if (!demos?.length) return [];
  const out = [];
  let i = 0;
  while (i < demos.length) {
    const g = demos[i].group;
    if (g != null && g !== "") {
      const items = [];
      while (i < demos.length && demos[i].group === g) {
        items.push(demos[i]);
        i++;
      }
      if (items.length > 1) {
        out.push({ kind: "group", items });
      } else {
        out.push({ kind: "single", items });
      }
    } else {
      out.push({ kind: "single", items: [demos[i]] });
      i++;
    }
  }
  return out;
}

/**
 * modalDemos: { type: 'video' | 'gif' | 'image', src, caption?, poster?, mime?, group? }
 * — 영상 탭: type === 'video' / 이미지 탭: 'gif' | 'image' (img로 렌더)
 */
function DemoFigure({ demo, index, twoColumn, bareImage }) {
  if (bareImage && demo.type !== "video") {
    return (
      <img
        src={demo.src}
        alt={demo.caption || `미리보기 ${index + 1}`}
        className="block h-auto w-full max-w-full object-contain"
        loading="lazy"
      />
    );
  }

  const mediaBoxClass = twoColumn
    ? "aspect-video w-full min-h-0 bg-white dark:bg-black/50 max-h-[min(38vh,320px)] md:max-h-none"
    : "aspect-video w-full max-h-[min(52vh,560px)] bg-white dark:bg-black/50";
  return (
    <figure className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 shadow-inner">
      <div className={mediaBoxClass}>
        {demo.type === "video" ? (
          <video
            className="h-full w-full object-contain outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none"
            controls
            playsInline
            preload="metadata"
            poster={demo.poster}
          >
            <source
              src={demo.src}
              type={
                demo.mime ||
                (demo.src?.includes(".mp4") ? "video/mp4" : "video/webm")
              }
            />
          </video>
        ) : (
          <img
            src={demo.src}
            alt={demo.caption || `미리보기 ${index + 1}`}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        )}
      </div>
      {demo.caption ? (
        <figcaption className="border-t border-gray-200/80 px-3 py-2.5 text-detail text-[12px] leading-snug dark:border-white/10 md:text-[13px]">
          {demo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function WorkModalDemoMedia({ demos }) {
  const videoDemos = useMemo(
    () => demos?.filter((d) => d.type === "video") ?? [],
    [demos],
  );
  const imageDemos = useMemo(
    () =>
      demos?.filter((d) => d.type === "gif" || d.type === "image") ?? [],
    [demos],
  );

  const [demoTab, setDemoTab] = useState(
    () => (videoDemos.length > 0 ? "video" : "image"),
  );
  const listRef = useRef(null);

  const pauseVideosInPanel = useCallback(() => {
    listRef.current?.querySelectorAll("video").forEach((el) => {
      el.pause();
    });
  }, []);

  useEffect(() => {
    if (demoTab !== "video") pauseVideosInPanel();
  }, [demoTab, pauseVideosInPanel]);

  const activeList = demoTab === "video" ? videoDemos : imageDemos;

  const activeClusters = useMemo(
    () => clusterModalDemos(activeList),
    [activeList],
  );

  if (videoDemos.length === 0 && imageDemos.length === 0) return null;

  const showToggle = videoDemos.length > 0 && imageDemos.length > 0;

  return (
    <div className="work-modal-demos mb-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/80 pb-3 dark:border-white/10">
        <h3 className="text-primary text-[14px] font-bold">미리보기</h3>
        {showToggle ? (
          <div
            role="tablist"
            aria-label="미리보기 영상·이미지 전환"
            className="flex rounded-xl border border-gray-200 bg-gray-100/90 p-0.5 dark:border-white/15 dark:bg-white/5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={demoTab === "video"}
              className={`rounded-[10px] px-3 py-1.5 text-[12px] font-semibold transition-colors md:text-[13px] ${
                demoTab === "video"
                  ? "bg-white text-primary shadow-sm dark:bg-[#2d333b] dark:text-white"
                  : "text-secondary hover:text-primary"
              }`}
              onClick={() => setDemoTab("video")}
            >
              영상
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={demoTab === "image"}
              className={`rounded-[10px] px-3 py-1.5 text-[12px] font-semibold transition-colors md:text-[13px] ${
                demoTab === "image"
                  ? "bg-white text-primary shadow-sm dark:bg-[#2d333b] dark:text-white"
                  : "text-secondary hover:text-primary"
              }`}
              onClick={() => {
                pauseVideosInPanel();
                setDemoTab("image");
              }}
            >
              이미지
            </button>
          </div>
        ) : null}
      </div>

      <ul
        ref={listRef}
        className={
          demoTab === "image"
            ? "list-none grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
            : "list-none space-y-4"
        }
        key={demoTab}
      >
        {activeClusters.map((cluster, ci) => {
          const isImageTab = demoTab === "image";
          const isGroup = cluster.kind === "group";
          const liClass =
            isImageTab && isGroup
              ? "min-w-0 md:col-span-2"
              : isImageTab
                ? "min-w-0"
                : undefined;

          const baseKey = `${demoTab}-c${ci}-${cluster.items[0].src}`;

          if (isGroup) {
            return (
              <li key={baseKey} className={liClass}>
                <div className="flex flex-col gap-4 md:gap-5">
                  {cluster.items.map((demo, j) => {
                    const globalIndex =
                      activeClusters
                        .slice(0, ci)
                        .reduce((s, c) => s + c.items.length, 0) + j;
                    return (
                      <DemoFigure
                        key={`${demo.src}-${j}`}
                        demo={demo}
                        index={globalIndex}
                        twoColumn={isImageTab}
                        bareImage={isImageTab}
                      />
                    );
                  })}
                </div>
              </li>
            );
          }

          const demo = cluster.items[0];
          const globalIndex = activeClusters
            .slice(0, ci)
            .reduce((s, c) => s + c.items.length, 0);
          return (
            <li
              key={`${demoTab}-${globalIndex}-${demo.src}`}
              className={liClass}
            >
              <DemoFigure
                demo={demo}
                index={globalIndex}
                twoColumn={isImageTab}
                bareImage={isImageTab}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const WORK_LIST = [
  {
    title: "달달영어 플랫폼",
    subTitle: "(주)언플러",
    desc: "퍼블리싱 (2025.12)",
    contribution: "50%",
    tasks: [
      "메인·리포트(평가·AI·종합) 서브 화면 퍼블리싱",
      "학습·도전과제 등 연계 UI",
      "반응형·컴포넌트 구조",
    ],
    image: "works/daldal-platform.png",
    imageAlt: "달달영어 플랫폼",
    modalIntro:
      "미래엔 초코 플랫폼의 영어 학습 서비스 ‘달달영어’ 프론트엔드 프로젝트로,\n사용자 학습 흐름(진단 → 학습 → 리포트)에 따라 핵심 화면의 퍼블리싱과 일부 데이터 연동을 담당했습니다.\n기초진단 테스트, 문항 기반 학습, 리포트 등 주요 기능을 구현하며\n실제 사용자 데이터 상태에 따라 안정적으로 동작하는 UI를 구성했습니다.",
    modalSections: [
      {
        title: "주요 작업",
        items: [
          "메인 화면 퍼블리싱 및 API 데이터 연동",
          "달영 리포트 메뉴(평가 리포트·AI 리포트·종합 리포트) 서브 페이지 퍼블리싱",
          "리포트·학습·도전과제·질문 노트로 이어지는 메뉴·탐색 구조 구현",
          "출석·랭킹 등 팝업 퍼블리싱",
        ],
      },
    ],
    modalDemos: [
      {
        type: "video",
        src: dalengMediaUrl("main", "main.mp4"),
        mime: "video/mp4",
        caption: "메인 · 대시보드 및 학습 진입",
      },
      {
        type: "video",
        src: dalengMediaUrl("sub", "sub_ai_report.mp4"),
        mime: "video/mp4",
        caption: "AI 리포트 화면",
      },
      {
        type: "video",
        src: dalengMediaUrl("sub", "sub_evaluation_report.mp4"),
        mime: "video/mp4",
        caption: "평가 리포트 화면",
      },
      {
        type: "video",
        src: dalengMediaUrl("sub", "sub_comprehensive_report.mp4"),
        mime: "video/mp4",
        caption: "종합 리포트 화면",
      },
    ],
  },
  {
    title: "달달영어 기초지단테스트 튜토리얼",
    subTitle: "(주)언플러",
    desc: "퍼블리싱 (2025.09)",
    contribution: "100%",
    tasks: ["기초진단 튜토리얼·단계 안내 퍼블리싱", "테스트 진행 흐름 UI"],
    image: "works/daldal-tutorial.png",
    imageAlt: "달달영어 기초지단테스트 튜토리얼",
    modalIntro:
      "달달영어 기초진단 테스트 튜토리얼은\n사용자가 서비스에 처음 진입했을 때 제공되는 인트로 화면으로,\n서비스에 대한 전반적인 안내와 함께 간단한 퀴즈 형태의 체험을 통해\n학습 방식과 문항 유형을 미리 이해할 수 있도록 구성된 페이지입니다.\n\n사용자가 자연스럽게 테스트로 진입할 수 있도록\n안내 → 체험 → 시작으로 이어지는 흐름을 고려해 UI를 설계했습니다.",
    modalSections: [
      {
        title: "주요 작업",
        items: [
          "기초진단 테스트 튜토리얼 및 단계 안내 화면 구현",
          "사용자 흐름(인트로 → 안내 → 테스트 시작)을 고려한 화면 전환 구조 설계",
          "단계별 상태와 인터랙션을 분리해 진행 흐름이 끊기지 않도록 개선",
        ],
      },
    ],
    modalDemos: [
      {
        type: "video",
        src: dalengMediaUrl("basic", "basic.mp4"),
        mime: "video/mp4",
        caption: "기초진단 테스트 · 튜토리얼·진행 흐름",
      },
    ],
  },
  {
    title: "달달영어 문항",
    subTitle: "(주)언플러",
    desc: "퍼블리싱 (2025.10 ~ 2026.02)",
    contribution: "100%",
    tasks: [
      "문법·독해·어휘 유형 문항 UI",
      "유형별 학습 가이드 화면",
      "문항 이동·선택·진행 표시",
    ],
    image: "works/daldal-question.png",
    imageAlt: "달달영어 문항",
    url: "https://daldaleng.miraenchoco.com/v1/front/main/guest/experience?level=1&serviceType=choco",
    modalIntro:
      "독해, 어휘, 문법 카테고리로 구성된 영어 학습 문항 시스템에서\n객관식, 서술형, 선잇기, 드래그앤드롭, 지문 해석, 빈칸 채우기 등\n다양한 유형의 문항 UI를 퍼블리싱했습니다.\n문항 파일을 기반으로 HTML 구조를 설계하여 약 3,500여 개의 문항 페이지를 제작하고,\n이후 S3와 CMS에 등록해 운영 환경에서 관리될 수 있도록 구성했습니다.",
    modalSections: [
      {
        title: "주요 작업",
        items: [
          "독해·어휘·문법 유형별 문항 화면 퍼블리싱",
          "각 유형별 학습 가이드 팝업 구현",
          "객관식·서술형·선잇기·드래그앤드롭 등 문항 기능 퍼블리싱",
        ],
      },
    ],
    modalDemos: [
      {
        type: "video",
        src: dalengMediaUrl("question", "item_grammar.mp4"),
        mime: "video/mp4",
        caption: "문항 화면 · 문법 유형",
      },
      {
        type: "video",
        src: dalengMediaUrl("question", "item_reading.mp4"),
        mime: "video/mp4",
        caption: "문항 화면 · 독해 유형",
      },
      {
        type: "video",
        src: dalengMediaUrl("question", "item_vocabulary.mp4"),
        mime: "video/mp4",
        caption: "문항 화면 · 어휘 유형",
      },
      {
        type: "video",
        src: dalengMediaUrl("question", "guide_vocabulary.mp4"),
        mime: "video/mp4",
        caption: "학습 가이드 · 어휘",
      },
      {
        type: "video",
        src: dalengMediaUrl("question", "guide_grammar.mp4"),
        mime: "video/mp4",
        caption: "학습 가이드 · 문법",
      },
      {
        type: "video",
        src: dalengMediaUrl("question", "guide_reading.mp4"),
        mime: "video/mp4",
        caption: "학습 가이드 · 독해",
      },
    ],
  },
  {
    title: "리얼인벤션 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 및 유지보수 (2022.01 ~ 2024.03)",
    contribution: "100%",
    tasks: [
      "입사 후 첫 주도 진행 프로젝트, 전체 페이지 퍼블리싱",
      "스와이프 라이브러리 도입 및 이후 프로젝트 활용",
      "디자이너와 협업·소통 및 일정 관리 경험",
    ],
    image: "works/realinvention.png",
    imageAlt: "리얼인벤션 홈페이지",
    url: "https://realinvention.co.kr/index.html",
    modalIntro:
      "기업의 브랜드와 주요 정보를 전달하기 위한 소개형 웹사이트로,\n회사 연혁, 조직도, 사업 영역 등 기업 전반에 대한 내용을 담은 웹사이트입니다.\n사용자에게 기업 정보를 명확하게 전달할 수 있도록 콘텐츠 구조와 레이아웃을 구성했습니다.",
    modalSections: [
      {
        title: "주요 작업",
        items: [
          "메인/서브 페이지 퍼블리싱",
          "반응형 레이아웃 구현",
          "공통 UI 구조 설계",
        ],
      },
    ],
    modalDemos: [
      {
        type: "image",
        src: publicImagesUrl("ri", "realinvention.co.kr_index01.html.png"),
        caption: "메인",
      },
      {
        type: "image",
        src: publicImagesUrl("ri", "realinvention.co.kr_index02.html.png"),
        caption: "메인 · 섹션",
      },
      {
        type: "image",
        src: publicImagesUrl(
          "ri",
          "realinvention.co.kr_business_introduce.html.png",
        ),
        caption: "사업 소개",
      },
      {
        type: "image",
        src: publicImagesUrl(
          "ri",
          "realinvention.co.kr_company_company01.html.png",
        ),
        caption: "회사 소개 (1)",
        group: "ri-company",
      },
      {
        type: "image",
        src: publicImagesUrl(
          "ri",
          "realinvention.co.kr_company_company02.html.png",
        ),
        caption: "회사 소개 (2)",
        group: "ri-company",
      },
      {
        type: "image",
        src: publicImagesUrl(
          "ri",
          "realinvention.co.kr_company_company03.html.png",
        ),
        caption: "회사 소개 (3)",
        group: "ri-company",
      },
    ],
  },
  {
    title: "고교학점제 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 및 유지보수 (2022.05 ~ 2023.07)",
    contribution: "100%",
    tasks: [
      "사용자용·관리자용 페이지 구성",
      "모바일 반응형 구현, 사이드 메뉴·탭 적용",
      "직관적인 화면 구성 및 UI 퍼블리싱",
    ],
    image: "works/credit.png",
    imageAlt: "고교학점제 홈페이지",
    modalIntro:
      "고교학점제 제도에 대한 정보를 효과적으로 전달하기 위한 웹사이트 제작 프로젝트로,\n학생이 진로와 적성에 따라 과목을 선택하고 학점을 이수하는 교육 제도의 특징을\n사용자 관점에서 쉽게 이해할 수 있도록 UI를 구성했습니다.\n다양한 정책 정보와 학습 흐름을 직관적으로 탐색할 수 있도록 콘텐츠 구조와 인터랙션을 설계했습니다.",
    modalSections: [
      {
        title: "주요 작업",
        items: [
          "메인 및 서브 페이지 퍼블리싱",
          "반응형 레이아웃 및 메뉴 구현",
          "Swiper 기반 슬라이더 구현",
          "탭 인터랙션 및 팝업 제어",
        ],
      },
    ],
    modalDemos: [
      {
        type: "image",
        src: publicImagesUrl("high-school-credit", "01.png"),
        caption: "화면 1",
      },
      {
        type: "image",
        src: publicImagesUrl("high-school-credit", "02.png"),
        caption: "화면 2",
      },
      {
        type: "image",
        src: publicImagesUrl("high-school-credit", "03.png"),
        caption: "화면 3",
      },
      {
        type: "image",
        src: publicImagesUrl("high-school-credit", "04.png"),
        caption: "화면 4",
      },
      {
        type: "image",
        src: publicImagesUrl("high-school-credit", "05.png"),
        caption: "화면 5",
      },
      {
        type: "image",
        src: publicImagesUrl("high-school-credit", "06.png"),
        caption: "화면 6",
      },
    ],
  },
  {
    title: "고입업무지원시스템 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 및 유지보수 (2022.10 ~ 2023.12)",
    contribution: "100%",
    tasks: [
      "사용자용·관리자용 페이지, 합격·불합격·중복 지원 구분 기능",
      "DataTable 라이브러리 최초 도입 및 테이블 데이터 처리",
      "테이블 형식 데이터가 많은 구조에 맞춘 UI 구현",
    ],
    image: "works/entrance.png",
    imageAlt: "고입업무지원시스템 홈페이지",
    modalIntro:
      "자사고·외고·국제고 입시 지원 업무를 관리하기 위한 고입 업무 지원 시스템으로,\n교사가 학생별 지원 현황과 합격/불합격 결과를 등록하고 확인할 수 있는 웹 서비스입니다.\n분산되어 관리되던 입시 정보를 하나의 시스템에서 통합 관리할 수 있도록 구성했으며,\n사용자(교사) 기준의 업무 흐름에 맞춰 데이터 입력과 조회가 효율적으로 이루어지도록 UI를 설계했습니다.",
    modalSections: [
      {
        title: "주요 작업",
        items: [
          "정보 구조 설계 및 퍼블리싱",
          "컴포넌트 단위 UI 설계",
          "반응형 및 접근성 대응",
          "QA 및 브라우저 이슈 대응",
        ],
      },
    ],
    modalDemos: [
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "01.png"),
        caption: "화면 1",
      },
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "02.png"),
        caption: "화면 2",
      },
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "03.png"),
        caption: "화면 3",
      },
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "04.png"),
        caption: "화면 4",
      },
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "05.png"),
        caption: "화면 5",
      },
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "06.png"),
        caption: "화면 6",
      },
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "07.png"),
        caption: "화면 7",
      },
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "08.png"),
        caption: "화면 8",
      },
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "09.png"),
        caption: "화면 9",
      },
      {
        type: "image",
        src: publicImagesUrl("entrance-support", "10.png"),
        caption: "화면 10",
      },
    ],
  },
  {
    title: "Bio-PRIDE 공유대학홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2022.02 ~ 2023.03)",
    contribution: "100%",
    tasks: [
      "바이오·첨단산업 인재 양성 통합 교육 사이트",
      "이미지 최소화, 대부분 UI 하드코딩으로 구현",
      "SVG 지도 영역 클릭 인터랙션 제작",
    ],
    image: "works/biopride.png",
    imageAlt: "Bio-PRIDE 공유대학홈페이지",
    modalIntro:
      "Bio-PRIDE 공유대학은 충청북도 지역혁신 플랫폼 사업의 일환으로,\n대학 간 교육 인프라와 콘텐츠를 공유하여 바이오헬스 분야 인재를 양성하는 교육 플랫폼입니다.\n제약바이오, 정밀의료·의료기기, 화장품·천연물 등 3개 핵심 분야를 중심으로\n공동 교육과정을 운영하며, 지역 기업 수요에 맞는 인재를 양성하고 취업까지 연계하는 것을 목표로 합니다.\n해당 웹사이트는 이러한 교육 과정과 프로그램 정보를 사용자에게 효과적으로 전달하기 위해 구축되었습니다.",
    modalSections: [
      {
        title: "주요 작업",
        items: [
          "전체 페이지 퍼블리싱 (단독)",
          "공통 UI 구조 설계 (헤더/GNB/푸터)",
          "반응형 및 크로스 브라우징 대응",
          "인터랙션 구현",
        ],
      },
    ],
    modalDemos: [
      {
        type: "image",
        src: publicImagesUrl("shared-university", "01.png"),
        caption: "화면 1",
      },
      {
        type: "image",
        src: publicImagesUrl("shared-university", "02.png"),
        caption: "화면 2",
      },
      {
        type: "image",
        src: publicImagesUrl("shared-university", "03.png"),
        caption: "화면 3",
      },
      {
        type: "image",
        src: publicImagesUrl("shared-university", "04.png"),
        caption: "화면 4",
      },
      {
        type: "image",
        src: publicImagesUrl("shared-university", "05.png"),
        caption: "화면 5",
      },
      {
        type: "image",
        src: publicImagesUrl("shared-university", "06.png"),
        caption: "화면 6",
      },
    ],
  },
  {
    title: "한국학교컨설팅협회 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2023.04 ~ 2023.05)",
    contribution: "100%",
    tasks: [
      "컨설팅 서비스 소개·컨설턴트 정보 제공",
      "사용자용·관리자용 페이지 구성",
      "공통 코드 템플릿화 후 해당 템플릿 기반 효율적 개발",
    ],
    image: "works/consulting.png",
    imageAlt: "한국학교컨설팅협회 홈페이지",
    url: "https://schoolconsulting.net/",
    modalIntro:
      "한국학교컨설팅협회의 설립 목적과 주요 사업을 사용자에게 효과적으로 전달하기 위한 협회형 웹사이트 퍼블리싱 프로젝트로,\n학교컨설팅 관련 연구, 교육, 세미나 등 다양한 활동 정보를 구조화하여\n사용자가 필요한 정보를 쉽게 탐색할 수 있도록 UI를 구성했으며,\n컨설턴트 정보 조회 및 의뢰 기능을 통해 실제 서비스 이용까지 이어질 수 있도록 구현했습니다.",
    modalSections: [
      {
        title: "주요 작업",
        items: [
          "전체 페이지 퍼블리싱",
          "게시판 리스트 및 상세 UI 구현",
          "폼 UI 퍼블리싱",
          "반응형 웹 구현",
        ],
      },
    ],
    modalDemos: [
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "01.png"),
        caption: "화면 1",
      },
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "02.png"),
        caption: "화면 2",
      },
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "03.png"),
        caption: "화면 3",
      },
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "04.png"),
        caption: "화면 4",
      },
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "05.png"),
        caption: "화면 5",
      },
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "06.png"),
        caption: "화면 6",
      },
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "07.png"),
        caption: "화면 7",
      },
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "08.png"),
        caption: "화면 8",
      },
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "09.png"),
        caption: "화면 9",
      },
      {
        type: "image",
        src: publicImagesUrl("school-consulting", "10.png"),
        caption: "화면 10",
      },
    ],
  },
  {
    title: "한국학교컨설팅협회 성과관리 시스템 홈페이지",
    subTitle: "(주)리얼인벤션",
    desc: "퍼블리싱 (2023.06 ~ 2023.07)",
    contribution: "100%",
    tasks: [
      "컨설팅 진행 상황·결과 관리 웹사이트",
      "한국학교컨설팅협회 사이트와 동일 템플릿 기반 개발",
      "체계적인 성과관리 화면 퍼블리싱",
    ],
    image: "works/performance.png",
    imageAlt: "한국학교컨설팅협회 성과관리 시스템 홈페이지",
    modalIntro:
      "한국학교컨설팅협회에서 운영하는 성과관리 시스템 퍼블리싱 프로젝트로,\n컨설팅 및 교육 데이터를 통합 관리할 수 있는 내부 업무용 웹 서비스를 구현했습니다.\n회원 인증 및 로그인 기반으로 접근이 제한되며,\n사용자(운영자, 컨설턴트)가 데이터 등록·조회·관리 업무를 효율적으로 수행할 수 있도록 UI를 구성했습니다.",
    modalSections: [
      {
        title: "주요 작업",
        items: [
          "회원 인증 및 로그인 흐름 구현",
          "관리자/컨설턴트 권한 분리",
          "체크리스트 목록/상세/상태 관리 UI 구현",
          "공지사항 및 파일 관리 기능 구현",
        ],
      },
    ],
    modalDemos: [
      {
        type: "image",
        src: publicImagesUrl("performance-system", "01.png"),
        caption: "화면 1",
      },
      {
        type: "image",
        src: publicImagesUrl("performance-system", "02.png"),
        caption: "화면 2",
      },
      {
        type: "image",
        src: publicImagesUrl("performance-system", "03.png"),
        caption: "화면 3",
      },
      {
        type: "image",
        src: publicImagesUrl("performance-system", "04.png"),
        caption: "화면 4",
      },
    ],
  },
];

const TAB_ALL = "전체";
const REALIN_SUBTITLE = "(주)리얼인벤션";

function parseStartKey(desc) {
  // 예: "퍼블리싱 (2022.01 ~ 2024.03)" => 202201
  const match = desc?.match(/(\d{4})\.(\d{2})\s*~\s*/);
  if (!match) return 0;
  const year = Number(match[1]);
  const month = Number(match[2]);
  return year * 100 + month;
}

function parseEndKey(desc) {
  // 예: "퍼블리싱 (2022.01 ~ 2024.03)" => 202403
  const match = desc?.match(/~\s*(\d{4})\.(\d{2})/);
  if (!match) return 0;
  const year = Number(match[1]);
  const month = Number(match[2]);
  return year * 100 + month;
}

function Works() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeTab, setActiveTab] = useState(TAB_ALL);
  const [selectedWork, setSelectedWork] = useState(null);

  const companies = useMemo(
    () => [...new Set(WORK_LIST.map((w) => w.subTitle))],
    [],
  );
  const tabs = useMemo(() => [TAB_ALL, ...companies], [companies]);
  const filteredListBase =
    activeTab === TAB_ALL
      ? WORK_LIST
      : WORK_LIST.filter((w) => w.subTitle === activeTab);

  const sortRealinByDesc = (list) =>
    list
      .map((item, idx) => ({
        item,
        idx,
        endKey: parseEndKey(item.desc),
        startKey: parseStartKey(item.desc),
      }))
      .sort((a, b) => {
        // "최신 날짜" = desc의 끝 날짜 기준
        if (b.endKey !== a.endKey) return b.endKey - a.endKey;
        // 끝 날짜가 같으면 시작 날짜가 더 늦은 항목 우선
        if (b.startKey !== a.startKey) return b.startKey - a.startKey;
        return a.idx - b.idx;
      })
      .map(({ item }) => item);

  let filteredList = filteredListBase;
  if (activeTab === REALIN_SUBTITLE) {
    filteredList = sortRealinByDesc(filteredListBase);
  } else if (activeTab === TAB_ALL) {
    const realinSorted = sortRealinByDesc(
      filteredListBase.filter((w) => w.subTitle === REALIN_SUBTITLE),
    );
    let cursor = 0;
    filteredList = filteredListBase.map((item) => {
      if (item.subTitle !== REALIN_SUBTITLE) return item;
      const next = realinSorted[cursor];
      cursor += 1;
      return next || item;
    });
  }

  // 제목 애니메이션: 마운트 시 한 번만
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
    }, section);

    return () => ctx.revert();
  }, []);

  // 카드 애니메이션: 탭 전환 시 해당 탭의 카드만
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((el) => {
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
  }, [activeTab]);

  const cardBg =
    "bg-white border border-gray-200 rounded-3xl shadow-xl dark:bg-gradient-to-br dark:from-[#22272e] dark:to-[#232d28] dark:border-white/10 overflow-hidden";

  return (
    <>
      <section
        ref={sectionRef}
        id="works-section"
        className="section-works relative min-h-screen py-16 px-4 sm:px-6 lg:px-10 overflow-hidden"
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
            className="text-primary font-extrabold text-[clamp(28px,5vw,52px)] leading-tight tracking-tighter text-center mb-4 md:mb-6"
            style={{ letterSpacing: "-1px" }}
          >
            WORKS
          </h2>

          <div
            role="tablist"
            aria-label="회사별 작업 목록"
            className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls="works-list"
                id={`tab-${tab === TAB_ALL ? "all" : tab.replace(/[^\w가-힣]/g, "-")}`}
                className={`min-w-[80px] py-2.5 px-4 rounded-xl text-[14px] font-semibold transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[var(--point)] focus-visible:ring-offset-2 focus-visible:outline-none ${
                  activeTab === tab
                    ? "bg-point text-white shadow-md dark:text-[#0f172a]"
                    : "bg-slate-800 text-gray-100 border border-slate-600 hover:bg-slate-700 hover:text-white hover:border-[var(--point)]/50 dark:bg-white/10 dark:text-secondary dark:border-white/20 dark:hover:border-[var(--point)]/50 dark:hover:text-primary"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <ul
            id="works-list"
            role="tabpanel"
            aria-labelledby={
              activeTab === TAB_ALL
                ? "tab-all"
                : `tab-${activeTab.replace(/[^\w가-힣]/g, "-")}`
            }
            className="grid grid-cols-1 gap-4 md:gap-5"
          >
            {filteredList.map((item, index) => (
              <li
                key={`${item.subTitle}-${item.title}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`group ${cardBg} flex flex-col transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-400/40 dark:hover:shadow-black/50 hover:ring-2 hover:ring-[var(--point)]/20`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedWork(item)}
                  className="flex flex-col flex-1 min-h-full w-full text-left rounded-3xl cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--point)] focus-visible:ring-inset focus-visible:outline-none bg-transparent border-0 p-0"
                >
                  <div className="flex flex-col p-4 sm:p-5">
                    <span className="text-subtitle text-[14px] md:text-[16px] font-medium block mb-1">
                      {item.subTitle}
                    </span>
                    <strong className="text-primary text-[14px] md:text-[16px] font-bold block mb-1 leading-snug">
                      {item.title}
                    </strong>
                    <p className="text-detail text-[14px] md:text-[16px] leading-relaxed">
                      {item.desc}
                    </p>
                    {item.contribution != null && (
                      <p className="text-secondary text-[12px] md:text-[13px] font-medium mt-1.5">
                        기여도 {item.contribution}
                      </p>
                    )}
                    {item.tasks && item.tasks.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200/80 dark:border-white/10">
                        <span className="text-primary text-[13px] md:text-[14px] font-semibold block mb-1.5">
                          담당 내용
                        </span>
                        <ul className="list-none space-y-1">
                          {item.tasks.map((task, i) => (
                            <li
                              key={i}
                              className="text-detail text-[13px] md:text-[14px] leading-relaxed flex gap-2"
                            >
                              <span
                                className="text-point shrink-0"
                                aria-hidden="true"
                              >
                                ·
                              </span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <span className="text-point text-[12px] font-semibold mt-3">
                      자세히 보기
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Modal
        open={selectedWork != null}
        onClose={() => setSelectedWork(null)}
        title={selectedWork?.title}
        className="w-full sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl"
      >
        {selectedWork && (
          <>
            <p className="text-subtitle text-[14px] md:text-[15px] font-medium mb-4">
              {selectedWork.subTitle}
            </p>
            <p className="text-detail text-[14px] md:text-[16px] leading-relaxed mb-3">
              {selectedWork.desc}
            </p>
            {selectedWork.contribution != null && (
              <p className="text-secondary text-[13px] font-medium mb-5">
                기여도 {selectedWork.contribution}
              </p>
            )}

            {selectedWork.modalIntro && (
              <div className="mb-5">
                <h3 className="text-primary text-[14px] font-bold mb-2">
                  프로젝트 소개
                </h3>
                <p className="text-detail text-[13px] md:text-[14px] leading-relaxed whitespace-pre-line">
                  {selectedWork.modalIntro}
                </p>
              </div>
            )}

            {selectedWork.modalSections?.length > 0 ? (
              <WorkModalSectionBlocks sections={selectedWork.modalSections} />
            ) : (
              selectedWork.tasks &&
              selectedWork.tasks.length > 0 && (
                <div className="mb-6">
                  <span className="text-primary text-[14px] font-semibold block mb-2">
                    담당 내용
                  </span>
                  <ul className="list-none space-y-1">
                    {selectedWork.tasks.map((task, i) => (
                      <li
                        key={i}
                        className="text-detail text-[13px] md:text-[14px] leading-relaxed flex gap-2"
                      >
                        <span
                          className="text-point shrink-0"
                          aria-hidden="true"
                        >
                          ·
                        </span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}

            {selectedWork.url && (
              <a
                href={selectedWork.url}
                target="_blank"
                rel="noreferrer"
                className="mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold bg-point text-white dark:text-[#0f172a] hover:opacity-90 transition-opacity"
              >
                사이트 바로가기
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}

            <WorkModalDemoMedia
              key={`${selectedWork.subTitle}-${selectedWork.title}-demos`}
              demos={selectedWork.modalDemos}
            />
          </>
        )}
      </Modal>
    </>
  );
}

export default Works;
