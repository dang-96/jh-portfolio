function About() {
  const pointColor = "text-[#3e5f44]";

  return (
    <section
      id="about-section"
      className="min-h-screen py-[6rem] px-[3rem] mx-auto"
    >
      <div>
        <h2 className="text-[4rem] font-bold mb-[5rem]">ABOUT</h2>

        <div className="flex justify-center w-[90%] mx-auto gap-[2%] mb-[6rem]">
          <div className="w-[48%] flex justify-center items-center">
            <div
              className="w-[350px] h-[350px] rounded-full bg-cover bg-center bg-no-repeat bg-[#eee]"
              style={{
                backgroundImage: "url(/images/my-image.png)",
              }}
            />
          </div>
          <div className="w-[48%]">
            <h3 className="text-[2.4rem] font-bold mb-8">
              염정훈 | 1996.02.25 | 웹 퍼블리셔
            </h3>
            <p className="text-[1.8rem] mb-4 leading-[1.7]">
              안녕하세요! 3년차 웹 퍼블리셔 염정훈 입니다.
            </p>
            <p className="text-[1.8rem] mb-4 leading-[1.7]">
              <strong className={pointColor}>
                HTML, CSS, JavaScript, JQuery
              </strong>
              를 활용해 정확하고 효율적인 UI 구현을 지향하며,{" "}
              <strong className={pointColor}>
                반응형 웹과 크로스 브라우징
              </strong>
              으로 다양한 디바이스에 일관된 경험을 제공합니다.
            </p>
            <p className="text-[1.8rem] mb-4 leading-[1.7]">
              <strong className={pointColor}>SCSS, Tailwind</strong> 등 도구를
              활용해 유지보수성을 고려한 스타일 구조를 설계하고,{" "}
              <strong className={pointColor}>디자이너와의 협업</strong>을 통해
              스타일 가이드 기반의 시각적 완성도를 높였습니다.
            </p>
            <p className="text-[1.8rem] mb-4 leading-[1.7]">
              최근에는{" "}
              <strong className={pointColor}>React, TypeScript, Next.js</strong>
              를 학습하며 프론트엔드 개발 영역까지 확장하여, 더욱 폭넓은 UI/UX
              구현이 가능합니다.
            </p>
            <a
              className={`relative text-[1.8rem] ${pointColor} mt-10 hover:opacity-70 transition-opacity after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#3e5f44] after:scale-x-0 after:origin-center after:transition-transform hover:after:scale-x-100`}
              href="https://www.notion.so/1e3426fffa2b80d1ba1ae25added40d2"
              target="_blank"
              rel="noreferrer"
            >
              자기소개 더보기
              <i className="fa-solid fa-circle-chevron-right" />
            </a>
          </div>
        </div>

        <div className="flex justify-center w-[90%] mx-auto gap-[2%] mb-[6rem]">
          <div className="w-[48%]">
            <h3 className="text-[2.8rem] font-bold mb-8">WORK EXPERIENCE</h3>
            <ul className="[&_li]:mb-4 [&_li:last-child]:mb-0 [&_li]:text-[1.8rem] [&_li]:leading-normal [&_li_span]:text-[#3e5f44]">
              <li>
                (주)리얼인벤션
                <span>(2022.01 ~ 2024.04) 웹 퍼블리셔(대리)</span>
              </li>
              <li>
                (주)언플러
                <span>(2025.09 ~ 2026.02) 웹 퍼블리셔(사원)</span>
              </li>
            </ul>
          </div>
          <div className="w-[48%]">
            <h3 className="text-[2.8rem] font-bold mb-8">SKILL</h3>
            <ul className="flex flex-wrap gap-[1.2rem]">
              {[
                "HTML5",
                "CSS3",
                "SCSS",
                "TAILWIND",
                "STYLED-COMPONENT",
                "JAVASCRIPT",
                "JQuery",
                "REACT",
                "TYPESCRIPT",
                "NEXT.JS",
                "TANSTACK-QUERY",
                "REACT-HOOK-FORM",
                "ZUSTAND",
              ].map((skill) => (
                <li
                  key={skill}
                  className="text-[1.6rem] py-2 px-4 rounded-[50px] bg-white text-[#3e5f44] shadow-[0_0_5px_2px_rgba(62,95,68,0.3)]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center w-[90%] mx-auto gap-[2%]">
          <div className="w-[48%]">
            <h3 className="text-[2.8rem] font-bold mb-8">EDUCATION</h3>
            <ul className="[&_li]:mb-4 [&_li:last-child]:mb-0 [&_li]:text-[1.8rem] [&_li]:leading-normal [&_li_span]:text-[#3e5f44]">
              <li>
                코드잇 프론트엔드 스프린트 수료
                <span>(2024.06 ~ 2024.11)</span>
              </li>
              <li>
                라인컴퓨터아트학원 수료 <span>(2021.06 ~ 2021.11)</span>
              </li>
              <li>
                신안산대학교 졸업 <span>(2015.03 ~ 2020.02)</span>
              </li>
            </ul>
          </div>
          <div className="w-[48%]">
            <h3 className="text-[2.8rem] font-bold mb-8">자격증</h3>
            <ul className="[&_li]:mb-4 [&_li:last-child]:mb-0 [&_li]:text-[1.8rem] [&_li]:leading-normal [&_li_span]:text-[#3e5f44]">
              <li>
                웹디자인기능사 <span>(2023.12)</span>
              </li>
              <li>
                컴퓨터활용능력 2급 <span>(2020.08)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
