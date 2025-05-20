import React from "react"
import "./Footer.css"

const Footer = () => {
  const footerData = {
    contactPerson: "Павел Пинженин",
    phone: "+7 (123) 456-78-90",
    city: "Екатеринбург",
    socials: [
      { name: "ВКонтакте", url: "https://vk.com/ligarechi" },
      { name: "Instagram", url: "https://instagram.com/ligarechi" },
      { name: "Telegram", url: "https://t.me/ligarechi" },
      { name: "WhatsApp", url: "https://wa.me/71234567890" }
    ]
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/img/logo.png" alt="Логотип Лиги Речи" />
            <div className="footer-title">
              <h3>Лига Речи</h3>
              <p>{footerData.city}</p>
            </div>
          </div>

          <div className="footer-contact">
            <p className="contact-name">{footerData.contactPerson}</p>
            <p className="contact-phone">{footerData.phone}</p>
          </div>

          <div className="footer-socials">
            {footerData.socials.map((social, index) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link">
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Лига Речи. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
