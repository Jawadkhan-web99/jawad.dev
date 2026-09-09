import React from 'react';

export default function About() {
  return (
    <section className="about-section section-padding" id="about" aria-label="About section">
      <div className="container">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <span className="section-tag">Get To Know Me</span>
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-subtitle">Passionate developer building digital experiences</p>
        </div>

        <div className="row align-items-center g-5">
          {/* About Image / Code Card */}
          <div className="col-lg-5" data-aos="fade-right" data-aos-duration="800">
            <div className="about-code-card glass-card">
              <div className="code-header">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
                <span className="code-filename ms-2">about-jawad.js</span>
              </div>
              <div className="code-body">
                <pre><code><span className="code-keyword">const</span> <span className="code-var">jawad</span> = &#123;{'\n'}
  <span className="code-prop">name</span>: <span className="code-str">"Jawad Khan"</span>,{'\n'}
  <span className="code-prop">role</span>: <span className="code-str">"MERN Stack Developer"</span>,{'\n'}
  <span className="code-prop">location</span>: <span className="code-str">"Pakistan 🇵🇰"</span>,{'\n'}
  <span className="code-prop">skills</span>: [{'\n'}
    <span className="code-str">"React"</span>, <span className="code-str">"Node.js"</span>,{'\n'}
    <span className="code-str">"MongoDB"</span>, <span className="code-str">"Express"</span>{'\n'}
  ],{'\n'}
  <span className="code-prop">email</span>: <span className="code-str">"jawadkhanahmad7@gmail.com"</span>,{'\n'}
  <span className="code-prop">github</span>: <span className="code-str">"jawadkh92552417"</span>,{'\n'}
  <span className="code-prop">available</span>: <span className="code-bool">true</span>,{'\n'}
  <span className="code-prop">hire</span>: () <span className="code-keyword">=&gt;</span> &#123;{'\n'}
    <span className="code-keyword">return</span> <span className="code-str">"Let's build something great!"</span>{'\n'}
  &#125;{'\n'}
&#125;;</code></pre>
              </div>
            </div>
          </div>

          {/* About Text */}
          <div className="col-lg-7" data-aos="fade-left" data-aos-duration="800" data-aos-delay="150">
            <h3 className="about-heading">I'm a <span className="gradient-text">Web Developer</span> who ships real, working products.</h3>
            <p className="about-text">
              Hi, I'm Jawad Khan — a MERN Stack Developer based in Pakistan. I build complete web
              applications, from pixel-precise frontends in React to secure REST APIs in Node.js
              and Express, backed by MongoDB.
            </p>
            <p className="about-text">
              I'm self-taught, consistently learning, and I take pride in writing code that's
              clean, readable, and maintainable. My goal is always the same: deliver a product
              that works well, looks great, and solves a real problem.
            </p>

            <div className="about-stats row g-3 mt-3">
              <div className="col-4">
                <div className="stat-card glass-card text-center p-3">
                  <div className="stat-number gradient-text">10+</div>
                  <div className="stat-label">Projects Built</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card glass-card text-center p-3">
                  <div className="stat-number gradient-text">2+</div>
                  <div className="stat-label">Years Coding</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-card glass-card text-center p-3">
                  <div className="stat-number gradient-text">10+</div>
                  <div className="stat-label">Technologies</div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <a href="#projects" className="btn btn-primary-custom">
                <i className="fas fa-folder-open me-2"></i>See My Work
              </a>
              <a href="mailto:jawadkhanahmad7@gmail.com?subject=CV%20Request%20—%20Jawad%20Khan" className="btn btn-outline-custom">
                <i className="fas fa-file-alt me-2"></i>Request CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
