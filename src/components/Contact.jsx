import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css"; // Import the CSS file for styling

export default function Contact() {
  const formRef = useRef(); // Reference to the form element

  const sendEmail = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    emailjs
      .sendForm(
        "service_nofot72", // Replace with your EmailJS Service ID
        "template_am8jlyd", // Replace with your EmailJS Template ID
        formRef.current,
        "YVdxy7yMarjG_eSga" // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
       },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("There was an error sending your message. Please try again.");
        }
      );

    e.target.reset(); // Reset the form fields after submission
  };

  return (
    <section id="contact" className="contact-section">
      <h2 id="contact-title">
        Contact<span>Me</span>
      </h2>
      <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
        <div className="form-group">
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Email Subject"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <input
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Mobile number"
            required
          />
        </div>
        <textarea
          id="message"
          name="message"
          placeholder="Your Message"
          rows="10"
          required
        ></textarea>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>
    </section>
  );
}
