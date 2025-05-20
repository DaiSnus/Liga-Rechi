import React from "react"
import "./Partnership.css"

const Partnership = () => {
  const partnershipData = {
    title: "Будем партнёрами",
    sections: [
      {
        title: "Делаете крутое бесплатное мероприятие?",
        content:
          "Добро пожаловать! Наш клуб организаторов будет рад принять вас в свои ряды!",
        image: "#"
      }
    ]
  }

  return (
    <section className="partnership-section">
      <div className="container">
        <h2 className="section-title">{partnershipData.title}</h2>

        <div className="partnership-content">
          {partnershipData.sections.map((section, index) => (
            <div key={index} className="partnership-card">
              {section.image && (
                <div className="partnership-image">
                  <img src={section.image}/>
                </div>
              )}

              <div className="partnership-text">
                <h3 className="partnership-card-title">{section.title}</h3>
                <p className="partnership-card-content">{section.content}</p>

                {section.contactName && (
                  <div className="partnership-contact">
                    <p className="contact-name">{section.contactName}</p>
                    <p className="contact-phone">{section.contactPhone}</p>
                    <p className="contact-email">{section.contactEmail}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partnership
