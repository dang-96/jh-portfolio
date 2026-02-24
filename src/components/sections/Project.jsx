function Project() {
  const projects = [
    {
      id: "pokemon",
      title: "Poke-Sensei",
      image: "/images/project-pokemon-image.png",
      imageAlt: "포켓몬 프로젝트 이미지",
      content: "포켓몬 도감을 보고 공부하여 퀴즈를 풀 수 있는 서비스",
      siteUrl: "/",
      notionUrl: "/",
    },
    {
      id: "moving",
      title: "Moving",
      image: "/images/project-moving-image.png",
      imageAlt: "무빙 프로젝트 이미지",
      content: "스트리밍 웹 사이트 느낌처럼 영화의 정보를 알 수 있는 서비스",
      siteUrl: "/",
      notionUrl: "/",
    },
    {
      id: "epigram",
      title: "Epigram",
      image: "/images/project-epigram-image.png",
      imageAlt: "에피그램 프로젝트 이미지",
      content: "감정상태에 따른 명언과 글귀들을 열람하고 공유하는 서비스",
      siteUrl: "/",
      notionUrl: "/",
    },
    {
      id: "linkbrary",
      title: "Linkbrary",
      image: "/images/project-linkbrary-image.png",
      imageAlt: "링크브러리 프로젝트 이미지",
      content: "나만의 링크를 모아두는 저장소 서비스",
      siteUrl: "/",
      notionUrl: "/",
    },
  ];

  return (
    <section
      id="project-section"
      className="min-h-screen py-[6rem] px-[3rem] mx-auto bg-[#fafafa]"
    >
      <div>
        <h2 className="text-[4rem] font-bold mb-[5rem]">PROJECT</h2>
        <ul className="flex flex-wrap justify-between gap-[2%]">
          {projects.map((item) => (
            <li
              key={item.id}
              className="block relative w-[48%] even:mt-[150px]"
            >
              <a
                href={item.siteUrl}
                className="relative w-full h-[400px] mb-6 rounded-[30px] overflow-hidden transition-shadow shadow-lg flex bg-black bg-cover bg-center group hover:shadow-xl block"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              <div className="flex items-center gap-4 mb-4">
                <h4 className="text-[2.4rem] font-bold">{item.title}</h4>
                <div className="flex items-center gap-4">
                  <a
                    href={item.siteUrl}
                    className="text-[1.4rem] py-0.5 px-6 border border-[#3e5f44] bg-white rounded-[1.5rem]"
                  >
                    WebSite
                  </a>
                  <a
                    href={item.notionUrl}
                    className="text-[1.4rem] py-0.5 px-6 border border-[#3e5f44] bg-white rounded-[1.5rem]"
                  >
                    Notion
                  </a>
                </div>
              </div>
              <p className="text-[1.8rem]">{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Project;
