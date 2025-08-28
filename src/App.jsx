import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import "./App.scss";

function App() {
  return (
    <>
      <Navigation />
      <Hero />

      <section
        id="about"
        style={{
          minHeight: "100vh",
          background: "#1c3123",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "#fafcfb", fontSize: "2rem" }}>About Section</h2>
      </section>

      <section
        id="experience"
        style={{
          minHeight: "100vh",
          background: "#122118",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "#fafcfb", fontSize: "2rem" }}>
          Experience Section
        </h2>
      </section>

      <section
        id="projects"
        style={{
          minHeight: "100vh",
          background: "#1c3123",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "#fafcfb", fontSize: "2rem" }}>Projects Section</h2>
      </section>

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
