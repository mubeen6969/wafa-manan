import { Mail, Phone, MessageCircle } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { useState } from "react";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  return (
    <main className="contact-page">
      <ScrollReveal as="aside" className="contact-info-column">
        <h2 className="contact-side-title">CONTACT INFO</h2>
        <div className="contact-info-list">
          <article className="contact-info-item">
            <div className="contact-info-icon">
              <Mail size={22} />
            </div>
            <div>
              <p className="contact-info-label">MAIL US</p>
              <a className="contact-info-value" href="mailto:wafamanan94@gmail.com">
                wafamanan94@gmail.com
              </a>
            </div>
          </article>
          <article className="contact-info-item">
            <div className="contact-info-icon">
              <Phone size={22} />
            </div>
            <div>
              <p className="contact-info-label">CONTACT US</p>
              <a className="contact-info-value" href="tel:+923227780622">
                +92 322 7780622
              </a>
            </div>
          </article>
        </div>

        <h3 className="contact-side-title contact-social-title">SOCIAL INFO</h3>
        <div className="contact-social-row">
          <a href="https://www.behance.net/wafa29" target="_blank" rel="noopener noreferrer" className="contact-social-dot" aria-label="Behance">
            Bē
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-social-dot" aria-label="LinkedIn">
            in
          </a>
          <a href="https://wa.me/923227780622" target="_blank" rel="noopener noreferrer" className="contact-social-dot" aria-label="WhatsApp">
            <MessageCircle size={22} />
          </a>
        </div>
      </ScrollReveal>


      

<ScrollReveal as="section" className="card contact-form-card" delay={0.1}>
  <p className="contact-spark" aria-hidden="true">
    ✧
  </p>

  <h1 className="contact-title">
    Let&apos;s work <span>together.</span>
  </h1>

  <form
  className="contact-form"
  onSubmit={async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.append("access_key", "434b9021-7320-4f80-b817-f655c87526cc");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        event.target.reset();

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        alert("Message failed. Try again.");
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  }}
>
    <input
      type="hidden"
      name="access_key"
      value="434b9021-7320-4f80-b817-f655c87526cc"
    />

    <input
      type="text"
      name="name"
      placeholder="Name *"
      className="contact-input"
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Email *"
      className="contact-input"
      required
    />

    <input
      type="text"
      name="subject"
      placeholder="Your Subject *"
      className="contact-input"
      required
    />

    <textarea
      name="message"
      placeholder="Your Message *"
      className="contact-textarea"
      required
    />

    <button type="submit" className="contact-submit">
      Send Message
    </button>
    {success && (
  <p className="text-green-400 mt-4 text-center">
    Message sent successfully!
  </p>
)}
  </form>
</ScrollReveal>




    </main>
  );
}
