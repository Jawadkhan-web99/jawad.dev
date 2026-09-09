import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'a3192439-b751-4f51-91b9-e2192cb54645',
          subject: 'New Message from Portfolio — Jawad Khan',
          from_name: 'Jawad Khan Portfolio',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFeedback({
          type: 'success',
          message: "Message sent! I'll get back to you soon. ✅",
        });
        setFormData({ name: '', email: '', message: '' });
        setValidated(false);
        setTimeout(() => setFeedback({ type: '', message: '' }), 6000);
      } else {
        setFeedback({
          type: 'error',
          message: data.message || 'Submission failed. Please try again.',
        });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setFeedback({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section section-padding" id="contact" aria-label="Contact section">
      <div className="container">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <span className="section-tag">Let's Connect</span>
          <h2 className="section-title">Contact <span className="gradient-text">Me</span></h2>
          <p className="section-subtitle">Have a project in mind? Let's work together!</p>
        </div>

        <div className="row g-5 justify-content-center">
          {/* Contact Info */}
          <div className="col-lg-4" data-aos="fade-right" data-aos-duration="800">
            <div className="contact-info d-flex flex-column gap-4">
              <div className="contact-card glass-card p-4 d-flex align-items-center gap-3">
                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                <div>
                  <div className="contact-label">Email</div>
                  <a href="mailto:jawadkhanahmad7@gmail.com" className="contact-value">
                    jawadkhanahmad7@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-card glass-card p-4 d-flex align-items-center gap-3">
                <div className="contact-icon"><i className="fab fa-github"></i></div>
                <div>
                  <div className="contact-label">GitHub</div>
                  <a
                    href="https://github.com/jawadkh92552417"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-value"
                  >
                    github.com/jawadkh92552417
                  </a>
                </div>
              </div>

              <div className="contact-card glass-card p-4 d-flex align-items-center gap-3">
                <div className="contact-icon"><i className="fab fa-linkedin-in"></i></div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <a
                    href="https://www.linkedin.com/in/jawad-khan-72622832a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-value"
                  >
                    linkedin.com/in/jawad-khan
                  </a>
                </div>
              </div>

              <div className="contact-card glass-card p-4 d-flex align-items-center gap-3">
                <div className="contact-icon"><i className="fa-brands fa-x-twitter"></i></div>
                <div>
                  <div className="contact-label">X (Twitter)</div>
                  <a
                    href="https://x.com/jawadkh92552417"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-value"
                  >
                    @jawadkh92552417
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7" data-aos="fade-left" data-aos-duration="800" data-aos-delay="150">
            <form
              className={`contact-form glass-card p-4 p-lg-5 ${validated ? 'was-validated' : ''}`}
              id="contactForm"
              noValidate
              onSubmit={handleSubmit}
              aria-label="Contact form"
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="contactName" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-custom"
                    id="contactName"
                    placeholder="User Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Please enter your name.</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="contactEmail" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-custom"
                    id="contactEmail"
                    placeholder="Email@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Please enter a valid email.</div>
                </div>

                <div className="col-12">
                  <label htmlFor="contactMessage" className="form-label">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="form-control form-control-custom"
                    id="contactMessage"
                    rows="5"
                    placeholder="Tell me about your project or just say hello..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <div className="invalid-feedback">Please enter a message.</div>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary-custom w-100"
                    id="sendBtn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>Send Message
                      </>
                    )}
                  </button>
                </div>

                {feedback.message && (
                  <div className="col-12">
                    <div
                      className={`form-feedback ${feedback.type === 'success' ? 'success' : 'error'}`}
                      role="alert"
                      style={{ display: 'block' }}
                    >
                      <i
                        className={`fas ${
                          feedback.type === 'success'
                            ? 'fa-check-circle'
                            : 'fa-exclamation-circle'
                        } me-2`}
                      ></i>
                      {feedback.message}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
