import About from "./sections/About";
import Contact from "./sections/Contact";
import Project from "./sections/Project";
import Visual from "./sections/Visual";
import Works from "./sections/Works";

function Main() {
  return (
    <main>
      <Visual />
      <About />
      <Project />
      <Works />
      <Contact />
    </main>
  );
}

export default Main;
