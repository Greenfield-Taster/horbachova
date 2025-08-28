import lampImage from "../../assets/lamp-green.png";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__lamp-container">
          <img src={lampImage} alt="Lamp" className="hero__lamp" />
          {/* <div className="hero__light-beam"></div> */}
          <div className="hero__light-glow"></div>
          <div className="hero__light-soft"></div>
          <div className="hero__light-ambient"></div>
        </div>
        <div className="hero__content">
          <h1 className="hero__title">HORBACHOVA</h1>
          <div className="hero__subtitle">
            <span>Full-stack developer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
