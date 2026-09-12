import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Work from "./sections/Work";
import Research from "./sections/Research";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Research />
      </main>
      <Contact />
    </>
  );
}
