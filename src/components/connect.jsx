import React, { useState, useEffect } from "react";
import "../style/connect.css";
import Footer from '../components/Footer';

export default function ConnectPage() {
  const [contactContent, setContactContent] = useState({
    titleText: "",
    mainText: "",
    footerText: "",
    contactImageSrc: "",
    logo: ""
  });

  useEffect(() => {
    const savedData = localStorage.getItem("contactContent");
    if (savedData) {
      setContactContent(JSON.parse(savedData));
    }
  }, []);

  return (
    <>
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-left">
            <h2>{contactContent.titleText}</h2>
            <p>{contactContent.mainText}</p>
            <form>
              <input type="text" placeholder="Enter your name"  className="fir"/>
              <input type="email" placeholder="Enter your email" />
              <textarea placeholder="Enter your message..." rows="5" />
              <div className="form-button-container">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>

          <div className="contact-right">
            <img src={contactContent.contactImageSrc} alt="Contact" />
          </div>
        </div>

        <div className="contact-footer">
          <img src={contactContent.logo} alt="Logo" className="contact-logo" />
          <p>{contactContent.footerText}</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
