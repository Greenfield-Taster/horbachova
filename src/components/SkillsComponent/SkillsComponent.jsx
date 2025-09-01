import "./SkillsComponent.scss";

const SkillsComponent = () => {
  const R = 120;
  const C = 2 * Math.PI * R;

  const frontendTools = [
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "SCSS",
    "Vue.js",
    "Webpack",
    "Vite",
    "Figma",
    "GSAP",
  ];
  const backendTools = [
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Express",
    "API",
    "REST API",
  ];

  const sep = " • ";
  const feText = frontendTools.join(sep) + sep;
  const beText = backendTools.join(sep) + sep;

  const pickFontSize = (text) => {
    const len = text.length;
    if (len > 160) return 12;
    if (len > 120) return 14;
    if (len > 90) return 16;
    return 18;
  };

  const feFont = pickFontSize(feText);
  const beFont = pickFontSize(beText);

  const makeCirclePathCW = (id) => (
    <path
      id={id}
      d={`M150,150 m 0,${R} a ${R},${R} 0 1 1 0,${-2 * R} a ${R},${R} 0 1 1 0,${
        2 * R
      }`}
    />
  );

  return (
    <div className="skills-component">
      <h1 className="component-title">
        I am <br /> working with
      </h1>
      <div className="circles-container">
        <div className="circle-wrapper frontend-wrapper">
          <div className="main-circle">
            <h2 className="circle-title">Front-end</h2>
          </div>
          <svg className="tools-circle" viewBox="0 0 300 300">
            <defs>{makeCirclePathCW("fe-circle")}</defs>
            <text className="tools-text" style={{ fontSize: `${feFont}px` }}>
              <textPath
                href="#fe-circle"
                startOffset="0"
                textLength={C * 0.96}
                lengthAdjust="spacingAndGlyphs"
              >
                {feText}
              </textPath>
            </text>
          </svg>
        </div>

        <div className="circle-wrapper backend-wrapper">
          <div className="main-circle">
            <h2 className="circle-title">Back-end</h2>
          </div>
          <svg className="tools-circle" viewBox="0 0 300 300">
            <defs>{makeCirclePathCW("be-circle")}</defs>
            <text className="tools-text" style={{ fontSize: `${beFont}px` }}>
              <textPath
                href="#be-circle"
                startOffset="0"
                textLength={C * 0.96}
                lengthAdjust="spacingAndGlyphs"
              >
                {beText}
              </textPath>
            </text>
          </svg>
        </div>
      </div>{" "}
    </div>
  );
};

export default SkillsComponent;
