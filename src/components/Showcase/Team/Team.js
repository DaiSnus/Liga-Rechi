import React, { useState } from "react"
import "./Team.css"

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null)

  const teamMembers = [
    {
      id: 1,
      firstName: "Павел",
      lastName: "Пинженин",
      avatar: "#",
      level: 5,
      levelName: "Лидер",
      merits: 42,
      statuses: 8,
      regalia: 15,
      experience: 2500,
      shortBio: "Основатель Лиги Речи, тренер по ораторскому мастерству",
      networking: {
        show: true,
        useful: "Тренинги по ораторскому мастерству, подготовка к публичным выступлениям",
        lookingFor: "Партнеров для организации мероприятий, спикеров",
        wantToLearn: "Новые методики обучения, психология публичных выступлений",
      },
      contacts: {
        vk: "#",
        telegram: "#",
        instagram: "#",
        showOnSite: true,
      },
      regaliaTitles: {
        sponsor: {
          level: 3,
          items: [{ name: "Спонсор III", description: "За общую помощь проекту в размере от 10.000 рублей" }],
        },
        organizer: {
          level: 5,
          items: [
            {
              name: "Главный организатор",
              event: "Ораторфест: Май 2023",
              description: "За организацию крупного фестиваля",
            },
            { name: "Организатор", event: "Поэтический чемпионат 2022", description: "За организацию чемпионата" },
          ],
        },
        winner: {
          level: 4,
          items: [
            {
              name: "Чемпион",
              event: "Поэтический чемпионат им. Маяковского 2023",
              description: "За победу в чемпионате",
            },
            { name: "Гран-при", event: "Ораториада: Турнир импровизаторов 2022", description: "За лучшее выступление" },
          ],
        },
        trainer: {
          level: 6,
          items: [
            { name: "Тренер", event: "Конкиста 2023", description: "За проведение тренингов", count: 5 },
            { name: "Наставник", event: "Речевой марафон 2022", description: "За наставничество участников" },
          ],
        },
        master: {
          level: 3,
          items: [
            {
              name: "Лучший импровизатор",
              event: "Ораториада: Турнир импровизаторов 2023",
              description: "За мастерство импровизации",
              count: 3,
            },
          ],
        },
      },
      skills: [
        { name: "Ораторское мастерство", experience: 1200, awards: 8, rank: 1208 },
        { name: "Импровизация", experience: 800, awards: 5, rank: 805 },
        { name: "Лидерство", experience: 500, awards: 2, rank: 502 },
      ],
      trainingSkills: [
        { name: "Ораторское мастерство", level: "профессионалов" },
        { name: "Импровизация", level: "опытных" },
        { name: "Стихосложение", level: "начинающих" },
      ],
      reviews: [
        {
          id: 1,
          author: "Мария Иванова",
          text: "Отличный тренер! Благодаря Никите я преодолела страх публичных выступлений и научилась структурировать свою речь.",
          date: "2023-09-15",
          event: "Речевой марафон 2023",
        },
        {
          id: 2,
          author: "Анонимно",
          text: "Профессионал своего дела. Тренинги проходят интересно и с пользой.",
          date: "2023-07-20",
          event: "Мастер-класс по импровизации",
        },
      ],
      ratings: {
        total: 87,
        best: 72,
        subscriptions: 45,
        sympathy: 92,
      },
      resume: "#",
    },
    {
      id: 2,
      firstName: "Мария",
      lastName: "Петрова",
      avatar: "#",
      level: 4,
      levelName: "Куратор",
      merits: 35,
      statuses: 6,
      regalia: 12,
      experience: 2100,
      shortBio: "Куратор литературного клуба, тренер по писательскому мастерству",
      networking: {
        show: true,
        useful: "Редактирование текстов, обучение писательскому мастерству",
        lookingFor: "Начинающих авторов, литературных критиков",
        wantToLearn: "Современные литературные тенденции, издательское дело",
      },
      contacts: {
        vk:"#",
        telegram: "#",
        showOnSite: true,
      },
      regaliaTitles: {
        sponsor: {
          level: 2,
          items: [{ name: "Спонсор II", description: "За общую помощь проекту в размере от 5.000 рублей" }],
        },
        organizer: {
          level: 4,
          items: [
            { name: "Организатор", event: "Литературные вечера 2023", description: "За организацию серии мероприятий" },
          ],
        },
        winner: {
          level: 3,
          items: [{ name: "Победитель", event: "Конкурс рассказов 2022", description: "За лучший рассказ" }],
        },
        trainer: {
          level: 5,
          items: [
            { name: "Тренер", event: "Писательский интенсив 2023", description: "За проведение тренингов", count: 4 },
          ],
        },
        master: {
          level: 2,
          items: [
            {
              name: "Мастер слова",
              event: "Литературный фестиваль 2022",
              description: "За мастерство владения словом",
            },
          ],
        },
      },
      skills: [
        { name: "Писательское мастерство", experience: 1000, awards: 7, rank: 1007 },
        { name: "Редактирование", experience: 700, awards: 3, rank: 703 },
        { name: "Стихосложение", experience: 400, awards: 2, rank: 402 },
      ],
      trainingSkills: [
        { name: "Писательское мастерство", level: "опытных" },
        { name: "Стихосложение", level: "начинающих" },
      ],
      reviews: [
        {
          id: 3,
          author: "Алексей Смирнов",
          text: "Мария помогла мне структурировать мои идеи и превратить их в полноценный рассказ. Очень благодарен за ее советы и поддержку.",
          date: "2023-08-10",
          event: "Писательский интенсив 2023",
        },
      ],
      ratings: {
        total: 65,
        best: 52,
        subscriptions: 38,
        sympathy: 88,
      },
      resume: "#",
    }      
  ]

  const sortedMembers = [...teamMembers].sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level
    }
    return b.merits - a.merits
  })

  const handleMemberClick = (member) => {
    setSelectedMember(member)
  }

  return (
    <section className="team-section">
      <div className="container">
        <h2 className="section-title">Команда</h2>

        <div className="team-grid">
          {sortedMembers.map((member) => (
            <div key={member.id} className="member-card" onClick={() => handleMemberClick(member)}>
              <div className="member-avatar">
                <img src={member.avatar} />
              </div>

              <div className="member-info">
                <h3 className="member-name">
                  {member.firstName} {member.lastName}
                </h3>

                <div className="member-stats">
                  <div className="stat">
                    <span className="stat-label">Заслуги</span>
                    <span className="stat-value">{member.merits}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Статусы</span>
                    <span className="stat-value">{member.statuses}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Регалии</span>
                    <span className="stat-value">{member.regalia}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Опыт</span>
                    <span className="stat-value">{member.experience}</span>
                  </div>
                </div>

                <div className="member-level">
                  <span className={`level-badge level-${member.level}`}>{member.levelName}</span>
                </div>

                {member.level >= 3 && member.shortBio && <p className="member-bio">{member.shortBio}</p>}

                {member.networking && member.networking.show && (
                  <div className="member-networking">
                    <div className="networking-item">
                      <span className="networking-label">Чем полезен:</span>
                      <span className="networking-value">{member.networking.useful}</span>
                    </div>
                    <div className="networking-item">
                      <span className="networking-label">Кого ищу:</span>
                      <span className="networking-value">{member.networking.lookingFor}</span>
                    </div>
                    <div className="networking-item">
                      <span className="networking-label">Хочу научиться:</span>
                      <span className="networking-value">{member.networking.wantToLearn}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="member-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedMember(null)}>
              &times;
            </button>

            <div className="modal-header">
              <div className="modal-avatar">
                <img src={selectedMember.avatar}/>
              </div>

              <div className="modal-header-info">
                <h2 className="modal-name">
                  {selectedMember.firstName} {selectedMember.lastName}
                </h2>

                <div className="modal-level">
                  <span className={`level-badge level-${selectedMember.level}`}>{selectedMember.levelName}</span>
                </div>

                <div className="modal-stats">
                  <div className="stat">
                    <span className="stat-label">Заслуги</span>
                    <span className="stat-value">{selectedMember.merits}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Статусы</span>
                    <span className="stat-value">{selectedMember.statuses}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Регалии</span>
                    <span className="stat-value">{selectedMember.regalia}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Опыт</span>
                    <span className="stat-value">{selectedMember.experience}</span>
                  </div>
                </div>

                {selectedMember.contacts && selectedMember.contacts.showOnSite && (
                  <div className="modal-contacts">
                    {selectedMember.contacts.vk && (
                      <a
                        href={selectedMember.contacts.vk}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link vk"
                      >
                        ВКонтакте
                      </a>
                    )}
                    {selectedMember.contacts.telegram && (
                      <a
                        href={selectedMember.contacts.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link telegram"
                      >
                        Telegram
                      </a>
                    )}
                    {selectedMember.contacts.instagram && (
                      <a
                        href={selectedMember.contacts.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link instagram"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selectedMember.networking && selectedMember.networking.show && (
              <div className="modal-section">
                <h3 className="section-title">Нетворкинг</h3>
                <div className="networking-grid">
                  <div className="networking-item">
                    <span className="networking-label">Чем полезен:</span>
                    <span className="networking-value">{selectedMember.networking.useful}</span>
                  </div>
                  <div className="networking-item">
                    <span className="networking-label">Кого ищу:</span>
                    <span className="networking-value">{selectedMember.networking.lookingFor}</span>
                  </div>
                  <div className="networking-item">
                    <span className="networking-label">Хочу научиться:</span>
                    <span className="networking-value">{selectedMember.networking.wantToLearn}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-section">
              <h3 className="section-title">Регалии</h3>

              {selectedMember.regaliaTitles.sponsor.level > 0 && (
                <div className="regalia-category">
                  <h4 className="category-title" onClick={() => {}}>
                    Благотворитель (уровень {selectedMember.regaliaTitles.sponsor.level})
                  </h4>
                  <div className="regalia-list">
                    {selectedMember.regaliaTitles.sponsor.items.map((item, index) => (
                      <div key={index} className="regalia-item" title={item.description}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMember.regaliaTitles.organizer.level > 0 && (
                <div className="regalia-category">
                  <h4 className="category-title" onClick={() => {}}>
                    Организатор (уровень {selectedMember.regaliaTitles.organizer.level})
                  </h4>
                  <div className="regalia-list">
                    {selectedMember.regaliaTitles.organizer.items.map((item, index) => (
                      <div key={index} className="regalia-item" title={item.description}>
                        {item.name} ({item.event})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMember.regaliaTitles.winner.level > 0 && (
                <div className="regalia-category">
                  <h4 className="category-title" onClick={() => {}}>
                    Победитель высочайшего полёта (уровень {selectedMember.regaliaTitles.winner.level})
                  </h4>
                  <div className="regalia-list">
                    {selectedMember.regaliaTitles.winner.items.map((item, index) => (
                      <div key={index} className="regalia-item" title={item.description}>
                        {item.name} ({item.event})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMember.regaliaTitles.trainer.level > 0 && (
                <div className="regalia-category">
                  <h4 className="category-title" onClick={() => {}}>
                    Тренер (уровень {selectedMember.regaliaTitles.trainer.level})
                  </h4>
                  <div className="regalia-list">
                    {selectedMember.regaliaTitles.trainer.items.map((item, index) => (
                      <div key={index} className="regalia-item" title={item.description}>
                        {item.name} ({item.event}){item.count ? ` - награждён ${item.count} раз` : ""}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMember.regaliaTitles.master.level > 0 && (
                <div className="regalia-category">
                  <h4 className="category-title" onClick={() => {}}>
                    Мастер высокого класса (уровень {selectedMember.regaliaTitles.master.level})
                  </h4>
                  <div className="regalia-list">
                    {selectedMember.regaliaTitles.master.items.map((item, index) => (
                      <div key={index} className="regalia-item" title={item.description}>
                        {item.name} ({item.event}){item.count ? ` - награждён ${item.count} раз` : ""}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-section">
              <h3 className="section-title">Гибкие навыки</h3>
              <table className="skills-table">
                <thead>
                  <tr>
                    <th>Навык</th>
                    <th>Опыт</th>
                    <th>Награды</th>
                    <th>Ранг</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMember.skills.map((skill, index) => (
                    <tr key={index}>
                      <td title={`Описание навыка ${skill.name}`}>{skill.name}</td>
                      <td>{skill.experience}</td>
                      <td>{skill.awards}</td>
                      <td>{skill.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedMember.level >= 3 && (
              <>
                {selectedMember.resume && (
                  <div className="modal-section">
                    <a href={selectedMember.resume} target="_blank" rel="noopener noreferrer" className="resume-button">
                      Скачать резюме
                    </a>
                  </div>
                )}

                {selectedMember.shortBio && (
                  <div className="modal-section">
                    <p className="member-bio">{selectedMember.shortBio}</p>
                  </div>
                )}

                {selectedMember.trainingSkills.length > 0 && (
                  <div className="modal-section">
                    <h3 className="section-title">Тренирую гибкие навыки</h3>
                    <table className="training-table">
                      <thead>
                        <tr>
                          <th>Обучаю гибким навыкам:</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedMember.trainingSkills.map((skill, index) => (
                          <tr key={index}>
                            <td title={`Описание навыка ${skill.name}`}>{skill.name}</td>
                            <td title="Описание уровня">тренирую {skill.level}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {selectedMember.reviews.length > 0 && (
                  <div className="modal-section">
                    <h3 className="section-title">Отзывы ({selectedMember.reviews.length})</h3>
                    <div className="reviews-container">
                      {selectedMember.reviews.map((review, index) => (
                        <div key={review.id} className="review">
                          <div className="review-header">
                            <span className="review-author">{review.author}</span>
                            <span className="review-date">{new Date(review.date).toLocaleDateString("ru-RU")}</span>
                          </div>
                          <p className="review-text">{review.text}</p>
                          <div className="review-event">{review.event}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-section">
                  <h3 className="section-title">Оценки тренера</h3>
                  <div className="ratings-grid">
                    <div className="rating-item">
                      <span className="rating-label">Получил оценок:</span>
                      <span className="rating-value">{selectedMember.ratings.total}</span>
                    </div>
                    <div
                      className="rating-item"
                      title="Столько высших оценок получили тренинги этого тренера. Оценивали анонимно участники тренингов."
                    >
                      <span className="rating-label">оценок ЛУЧШИЙ:</span>
                      <span className="rating-value">{selectedMember.ratings.best}</span>
                    </div>
                    <div
                      className="rating-item"
                      title="Столько человек подписались на тренера и хотят получать информацию о мероприятиях, где он проводит тренинги."
                    >
                      <span className="rating-label">подписок ЛЮБИМЫЙ:</span>
                      <span className="rating-value">{selectedMember.ratings.subscriptions}</span>
                    </div>
                    <div
                      className="rating-item"
                      title="Показывает, как последние 50 участников в среднем оценили свои впечатления от тренера по шкале: начинающий/опытный/лучший"
                    >
                      <span className="rating-label">рейтинг симпатий:</span>
                      <span className="rating-value">{selectedMember.ratings.sympathy}%</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Team
