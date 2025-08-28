import './Navigation.scss';

const Navigation = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navigation">
      <ul className="navigation__menu">
        <li>
          <button onClick={() => scrollToSection('about')}>About</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('experience')}>Experience</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('projects')}>Projects</button>
        </li>
        <li>
          <button onClick={() => scrollToSection('contact')}>Contact</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
