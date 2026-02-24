function Works() {
  const workList = [
    {
      title: "달달영어 플랫폼",
      subTitle: "(주)언플러",
      desc: "퍼블리싱 (2025.09 ~ 2026.02)",
    },
    {
      title: "리얼인벤션 홈페이지",
      subTitle: "(주)리얼인벤션",
      desc: "퍼블리싱 및 유지보수 (2022.01 ~2024.03)",
    },
    {
      title: "고교학점제 홈페이지",
      subTitle: "(주)리얼인벤션",
      desc: "퍼블리싱 및 유지보수 (2022.05 ~ 2023.07)",
    },
    {
      title: "고입업무지원시스템 홈페이지",
      subTitle: "(주)리얼인벤션",
      desc: "퍼블리싱 및 유지보수 (2022.10 ~ 2023.12)",
    },
    {
      title: "고입정보포털 홈페이지",
      subTitle: "(주)리얼인벤션",
      desc: "퍼블리싱 (2022.03 ~ 2023.04)",
    },
    {
      title: "Bio-PRIDE 공유대학홈페이지",
      subTitle: "(주)리얼인벤션",
      desc: "퍼블리싱 (2022.02 ~ 2023.03)",
    },
    {
      title: "한국학교컨설팅협회 홈페이지",
      subTitle: "(주)리얼인벤션",
      desc: "퍼블리싱 (2023.04 ~ 2023.05)",
    },
    {
      title: "한국학교컨설팅협회 성과관리 시스템 홈페이지",
      subTitle: "(주)리얼인벤션",
      desc: "퍼블리싱 (2023.06 ~ 2023.07)",
    },
  ];

  return (
    <section
      id="works-section"
      className="min-h-screen py-[6rem] px-[3rem] mx-auto bg-[#232323] text-white"
    >
      <div className="relative flex justify-center w-full gap-[2%]">
        <div className="flex flex-col justify-center items-center sticky top-0 w-[48%] h-screen">
          <h2 className="text-center text-[4rem] font-bold mb-4">WORKS</h2>
          <a
            href="/"
            className="inline-block w-[120px] text-center text-[1.8rem] py-2 rounded-[1.5rem] bg-white text-black"
          >
            경력기술서
          </a>
        </div>
        <ul className="flex flex-col justify-center w-[48%]">
          {workList.map((item, index) => (
            <li
              key={index}
              className="text-[1.8rem] my-[12rem]"
            >
              <span className="text-[1.6rem]">{item.subTitle}</span>
              <strong className="text-[2.4rem] font-bold mb-4 block">
                {item.title}
              </strong>
              {item.desc}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Works;
