import react, { useState } from "react"
import "./Calendar.css"

const Calendar = () => {
  const [showAllEvents, setShowAllEvents] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const events = [
    {
      id: 1,
      type: "project",
      projectName: "Поэтический чемпионат",
      projectLogo: "",
      eventName: "Финал сезона",
      date: "2025-05-15",
      time: "18:00",
      isFree: true,
      description: "Финальное соревнование поэтов сезона 2025. Лучшие из лучших сразятся за звание чемпиона.",
      detailedDescription:
        "Финальное соревнование поэтов сезона 2025. Лучшие из лучших сразятся за звание чемпиона. Участники будут соревноваться в трех категориях: классическая поэзия, современная поэзия и импровизация.",
      organizers: [
        { id: 1, name: "Анна Петрова", avatar: "" },
        { id: 2, name: "Иван Сидоров", avatar: "" }
      ],
      trainers: [{ id: 3, name: "Мария Иванова", avatar: "" }],
      registeredCount: 45,
      websiteUrl: "https://poetry-championship.com/final-2025"
    },
    {
      id: 2,
      type: "community",
      communityName: "Клуб ораторов",
      communityLogo: "",
      eventName: "Мастер-класс по импровизации",
      date: "2025-05-25",
      time: "19:00",
      price: 1500,
      description: "Практический мастер-класс по развитию навыков импровизации в публичных выступлениях.",
      detailedDescription:
        "Практический мастер-класс по развитию навыков импровизации в публичных выступлениях. Участники научатся быстро реагировать на неожиданные ситуации, отвечать на сложные вопросы и поддерживать внимание аудитории.",
      organizers: [{ id: 7, name: "Екатерина Новикова", avatar: "" }],
      trainers: [],
      registeredCount: 18,
      websiteUrl: "https://speakers-club.com/improvisation-workshop",
      communityDescription:
        "Клуб ораторов - это сообщество людей, стремящихся развивать свои навыки публичных выступлений. Мы проводим регулярные встречи, мастер-классы и соревнования.",
      posterUrl: ""
    }
  ]

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate >= today
  })

  const sortedEvents = [...upcomingEvents].sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })

  const displayedEvents = showAllEvents ? sortedEvents : sortedEvents.slice(0, 7)

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" }
    return new Date(dateString).toLocaleDateString("ru-RU", options)
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleRegister = (eventId) => {
    alert(`Регистрация на мероприятие ID: ${eventId}`)
    setSelectedEvent(null)
  }

  return (
    <section className="calendar-section">
      <div className="container">
        <h2 className="section-title">Календарь</h2>
        <p className="section-subtitle">
          
        </p>

        <div className="events-list">
          {displayedEvents.map((event) => (
            <div
              key={event.id}
              className={`event-card ${event.type === "project" ? "project-event" : "community-event"}`}
            >
              <div className="event-header">
                <div
                  className="event-logo"
                >
                  <img
                    src={event.type === "project" ? event.projectLogo : event.communityLogo}
                  />
                </div>

                <div className="event-date">
                  <div className="date">{formatDate(event.date)}</div>
                  <div className="time">{event.time}</div>
                </div>
              </div>

              <div className="event-content">
                <h3 className="event-title" onClick={() => handleEventClick(event)}>
                  {event.type === "project" ? `${event.projectName}: ${event.eventName}` : event.eventName}
                </h3>

                <p className="event-description">{event.description}</p>

                <div className="event-footer">
                  {event.type === "project" ? (
                    <div className="event-price free">БЕСПЛАТНО</div>
                  ) : (
                    <div className="event-price">
                      {event.price === "free-to-pay" ? "Free-to-pay" : `${event.price} ₽`}
                    </div>
                  )}

                  <div className="event-actions">
                    <button className="event-action details" onClick={() => handleEventClick(event)}>
                      Подробнее
                    </button>
                    <button className="event-action register" onClick={() => handleRegister(event.id)}>
                      Зарегистрироваться
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedEvents.length > 7 && !showAllEvents && (
          <div className="show-all-container">
            <button className="show-all-button" onClick={() => setShowAllEvents(true)}>
              Показать весь календарь!
            </button>
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedEvent(null)}>
              &times;
            </button>

            <h2 className="modal-title">
              {selectedEvent.type === "project"
                ? `${selectedEvent.projectName}: ${selectedEvent.eventName}`
                : selectedEvent.eventName}
            </h2>

            <div className="modal-date">
              {formatDate(selectedEvent.date)}, {selectedEvent.time}
            </div>

            <div className="modal-description">{selectedEvent.detailedDescription}</div>

            {selectedEvent.organizers.length > 0 && (
              <div className="modal-people">
                <h3>Организовывают:</h3>
                <div className="people-list">
                  {selectedEvent.organizers.map((person) => (
                    <div key={person.id} className="person">
                      <img src={person.avatar} />
                      <span>{person.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedEvent.trainers.length > 0 && (
              <div className="modal-people">
                <h3>Содержание обеспечивают:</h3>
                <div className="people-list">
                  {selectedEvent.trainers.map((person) => (
                    <div key={person.id} className="person">
                      <img src={person.avatar}/>
                      <span>{person.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-registered">
              <h3>Хотят пойти:</h3>
              <div className="registered-count">
                <span className="icon">👤</span>
                <span>{selectedEvent.registeredCount}</span>
              </div>
            </div>

            <div className="modal-actions">
              {selectedEvent.websiteUrl && (
                <a
                  href={selectedEvent.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-action website"
                >
                  На сайт
                </a>
              )}

              <button className="modal-action register" onClick={() => handleRegister(selectedEvent.id)}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Calendar;
