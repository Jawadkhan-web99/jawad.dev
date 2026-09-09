import React from 'react';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/923109743377"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      id="whatsappFloat"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
      <span className="whatsapp-tooltip">Chat on WhatsApp</span>
    </a>
  );
}
