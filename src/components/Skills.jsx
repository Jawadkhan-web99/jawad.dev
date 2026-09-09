import React, { useEffect, useRef, useState } from 'react';

const SKILLS_DATA = [
  { name: 'HTML5', percent: 95, icon: 'fab fa-html5', iconClass: 'skill-html', delay: 0 },
  { name: 'CSS3', percent: 90, icon: 'fab fa-css3-alt', iconClass: 'skill-css', delay: 50 },
  {
    name: 'Tailwind CSS',
    percent: 88,
    iconClass: 'skill-tailwind',
    delay: 100,
    svg: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    )
  },
  { name: 'Bootstrap', percent: 90, icon: 'fab fa-bootstrap', iconClass: 'skill-bootstrap', delay: 150 },
  { name: 'JavaScript', percent: 85, icon: 'fab fa-js-square', iconClass: 'skill-js', delay: 200 },
  {
    name: 'TypeScript',
    percent: 82,
    iconClass: 'skill-ts',
    delay: 250,
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    )
  },
  { name: 'React.js', percent: 80, icon: 'fab fa-react', iconClass: 'skill-react', delay: 300 },
  { name: 'Node.js', percent: 75, icon: 'fab fa-node-js', iconClass: 'skill-node', delay: 350 },
  { name: 'Express.js', percent: 75, icon: 'fas fa-server', iconClass: 'skill-express', delay: 400 },
  { name: 'MongoDB', percent: 70, icon: 'fas fa-database', iconClass: 'skill-mongo', delay: 450 },
  { name: 'Git & GitHub', percent: 85, icon: 'fab fa-git-alt', iconClass: 'skill-git', delay: 500 },
  { name: 'Responsive Design', percent: 92, icon: 'fas fa-mobile-screen-button', iconClass: 'skill-responsive', delay: 550 },
];

export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section section-padding" id="skills" aria-label="Skills section" ref={sectionRef}>
      <div className="container">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <span className="section-tag">What I Know</span>
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle">Technologies and tools I work with</p>
        </div>

        <div className="row g-4">
          {SKILLS_DATA.map((skill) => (
            <div
              key={skill.name}
              className="col-6 col-md-4 col-lg-3"
              data-aos="zoom-in"
              data-aos-delay={skill.delay}
            >
              <div className="skill-card glass-card text-center p-4">
                <div className={`skill-icon ${skill.iconClass}`}>
                  {skill.svg ? skill.svg : <i className={skill.icon}></i>}
                </div>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{ width: animated ? `${skill.percent}%` : '0%' }}
                  ></div>
                </div>
                <div className="skill-percent">{skill.percent}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
