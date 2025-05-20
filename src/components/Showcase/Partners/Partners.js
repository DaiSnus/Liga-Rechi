import React from "react";
import "./Partners.css";

const Partners = () => {
  const partnersData = {
    enabled: true,
    partners: [
      {
        id: 1,
        name: "Городская библиотека",
        logo: "#",
        websiteUrl: "https://city-library.com",
      },
      {
        id: 2,
        name: "Центр развития молодежи",
        logo: "#",
        websiteUrl: "https://youth-center.com",
      }
    ]
  }

  if (!partnersData.enabled) {
    return null
  }

  return (
    <section className="partners-section">
      <div className="container">
        <h2 className="section-title">Партнёры</h2>

        <div className="partners-grid">
          {partnersData.partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-card"
            >
              <div className="partner-logo">
                <img src={partner.logo}/>
              </div>
              <h3 className="partner-name">{partner.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
