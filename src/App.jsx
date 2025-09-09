import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import "./App.scss";

function App() {
  return (
    <>
      <Navigation />
      <Hero />

      <About />

      <Experience />

      <Projects />

      <section
        id="contact"
        style={{
          minHeight: "100vh",
          background: "#122118",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "#fafcfb", fontSize: "2rem" }}>Contact Section</h2>
      </section>
    </>
  );
}

export default App;
