function Footer() {
  return (
    <footer
      className="relative w-full py-6 md:py-8 px-4 md:px-8 lg:px-12 border-t border-white/5 overflow-hidden"
      style={{
        background: "linear-gradient(120deg, #191c1f 0%, #22272e 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(113,216,225,.06) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl xl:max-w-[1400px] mx-auto">
        <ul className="flex flex-wrap gap-8 md:gap-10 justify-center mb-6">
          <li>
            <a
              href="https://github.com/JeoungHun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 text-[13px] md:text-[18px] font-semibold hover:text-point transition-colors duration-200"
              aria-label="깃허브"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="shrink-0"
                aria-hidden="true"
              >
                <path d="M12 .296C5.371.296 0 5.752 0 12.362c0 5.315 3.438 9.828 8.207 11.419.599.11.793-.256.793-.566 0-.28-.011-1.021-.016-2.005-3.338.736-4.042-1.621-4.042-1.621-.545-1.374-1.332-1.74-1.332-1.74-1.089-.755.082-.74.082-.74 1.205.084 1.84 1.227 1.84 1.227 1.07 1.841 2.807 1.309 3.492 1.002.108-.782.418-1.31.76-1.611-2.665-.304-5.466-1.363-5.466-6.063 0-1.1.465-2.436 1.229-3.297-.123-.304-.534-1.527.117-3.183 0 0 1.006-.329 3.3 1.258.957-.263 1.984-.395 3.004-.4 1.019.005 2.047.137 3.006.4 2.292-1.587 3.297-1.258 3.297-1.258.653 1.656.242 2.879.12 3.183.765.861 1.227 1.957 1.227 3.297 0 4.711-2.804 5.755-5.476 6.054.43.376.813 1.12.813 2.258 0 1.632-.015 2.949-.015 3.352 0 .313.191.679.799.564C20.565 22.186 24 17.675 24 12.362 24 5.752 18.627.296 12 .296" />
              </svg>
              <span>깃허브</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.notion.so/1e3426fffa2b80d1ba1ae25added40d2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 text-[13px] md:text-[18px] font-semibold hover:text-point transition-colors duration-200"
              aria-label="노션 포트폴리오"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 32 32"
                className="shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M6.197 6.04c.813-1.115 2.003-1.261 3.107-1.37l12.947-1.036c2.342-.198 3.447 1.083 3.447 3.654v16.265c0 2.572-1.152 3.761-3.679 3.891l-12.190.624c-2.922.15-3.583-1.121-3.583-3.647V8.54c0-.963.384-1.709 1.106-2.5zm2.076 1.02c-.52.062-.792.355-.792.86v16.063c0 .465.207.795.975.758l11.008-.684c.641-.039 1.01-.316 1.01-1.01V7.047c0-.559-.207-.823-.763-.806L8.273 7.06z"
                  fill="currentColor"
                />
              </svg>
              <span>노션 포폴</span>
            </a>
          </li>
        </ul>
        <p
          className="text-[11px] md:text-[14px] font-normal"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          © 2024 jeoung-hun.com
        </p>
      </div>
    </footer>
  );
}

export default Footer;
