import React , { useState } from "react"
import "./ResidentClubs.css"

const ResidentClubs = () => {
  const [selectedClub, setSelectedClub] = useState(null)

  const residentClubsData = {
    enabled: true,
    subtitle: "Сообщества, которые развивают ораторское мастерство и смежные навыки",
    clubs: [
      {
        id: 1,
        name: "Клуб ораторов",
        logo: "#",
        description:
          "Клуб ораторов - это сообщество людей, стремящихся развивать свои навыки публичных выступлений. Мы проводим регулярные встречи, мастер-классы и соревнования.",
        websiteUrl: "https://speakers-club.com",
        posterUrl: "#"
      }
    ]
  }

  if (!residentClubsData.enabled) {
    return null
  }

  const handleClubClick = (club) => {
    setSelectedClub(club)
  }

  return (
    <section className="resident-clubs-section">
      <div className="container">
        <h2 className="section-title">Клубы-резиденты</h2>
        <p className="section-subtitle">{residentClubsData.subtitle}</p>

        <div className="clubs-grid">
          {residentClubsData.clubs.map((club) => (
            <div key={club.id} className="club-card" onClick={() => handleClubClick(club)}>
              <div className="club-logo">
                <img src={club.logo}/>
              </div>
              <h3 className="club-name">{club.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {selectedClub && (
        <div className="modal-overlay" onClick={() => setSelectedClub(null)}>
          <div className="club-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedClub(null)}>
              &times;
            </button>

            <div className="club-modal-header">
              <div className="club-modal-logo">
                <img src={selectedClub.logo}/>
              </div>
              <h2 className="club-modal-title">{selectedClub.name}</h2>
            </div>

            <div className="club-modal-description">{selectedClub.description}</div>

            <div className="club-modal-actions">
              {selectedClub.websiteUrl && (
                <a
                  href={selectedClub.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="club-modal-action website"
                >
                  На сайт сообщества
                </a>
              )}

              {selectedClub.posterUrl && (
                <a
                  href={selectedClub.posterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="club-modal-action poster"
                >
                  Афиша сообщества
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ResidentClubs
