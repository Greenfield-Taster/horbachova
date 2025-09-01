import "./SkillsComponent.scss";

const SkillsComponent = () => {
  const skills = [
    "HTML",
    "CSS",
    "SCSS",
    "JavaScript",
    "React",
    "GSAP",
    "Material UI",
  ];

  return (
    <div className="skills-container">
      <div className="center-circle">
        <span className="center-text">Front-end</span>
      </div>

      {skills.map((skill, index) => {
        const angle = (index * 360) / skills.length;
        const radian = (angle * Math.PI) / 180;
        const radius = 180;
        const x = Math.cos(radian) * radius;
        const y = Math.sin(radian) * radius;

        return (
          <div
            key={skill}
            className="skill-item"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div className="skill-circle">
              <span
                className="skill-text"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                {skill}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsComponent;
