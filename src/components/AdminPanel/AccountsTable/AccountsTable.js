import React,{ useState, useEffect } from "react"
import "./AccountsTable.css"

const getRoleName = (level) => {
  switch (level) {
    case 1:
      return "Гость"
    case 2:
      return "Активист"
    case 3:
      return "Тренер"
    case 4:
      return "Куратор"
    case 5:
      return "Лидер"
    default:
      return "Неизвестно"
  }
}

const formatDate = (date) => {
  if (!date) return "Не указана"
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

const mockAccounts = [
  {
    id: 1,
    firstName: "Павел",
    lastName: "Пинженин",
    level: 1,
    status: "active",
    statusChangedAt: "2023-10-15",
    registeredAt: "2022-01-10",
    managedCommunities: ["Сообщество разработчиков", "Клуб ораторов"],
    managedProjects: ["Проект 'Речевой марафон'", "Проект 'Мастер слова'"],
    honoraryStatuses: ["Лучший оратор 2022", "Наставник года"],
    ratings: [
      { id: 1, value: 5, date: "2023-09-10", raterName: "Мария Иванова" },
      { id: 2, value: 4, date: "2023-08-15", raterName: "Алексей Иванов" },
      { id: 3, value: 5, date: "2023-07-20", raterName: "Ольга Смирнова" },
    ],
  },
  {
    id: 2,
    firstName: "Мария",
    lastName: "Петрова",
    level: 4,
    status: "active",
    statusChangedAt: "2023-05-20",
    registeredAt: "2022-03-15",
    managedCommunities: ["Клуб молодых лидеров"],
    managedProjects: ["Проект 'Голос города'"],
    honoraryStatuses: ["Активист месяца"],
    ratings: [
      { id: 4, value: 5, date: "2023-09-05", raterName: "Иван Иванов" },
      { id: 5, value: 4, date: "2023-08-10", raterName: "Анна Сидорова" },
    ],
  },
  {
    id: 3,
    firstName: "Анна",
    lastName: "Сидорова",
    level: 3,
    status: "active",
    statusChangedAt: "2023-02-10",
    registeredAt: "2022-05-20",
    managedCommunities: [],
    managedProjects: [],
    honoraryStatuses: ["Лучший новичок"],
    ratings: [
      { id: 6, value: 4, date: "2023-09-01", raterName: "Иван Иванов" },
      { id: 7, value: 3, date: "2023-07-15", raterName: "Мария Петрова" },
    ],
  },
  {
    id: 4,
    firstName: "Алексей",
    lastName: "Смирнов",
    level: 2,
    status: "blocked",
    statusChangedAt: "2023-08-05",
    registeredAt: "2022-07-10",
    managedCommunities: [],
    managedProjects: [],
    honoraryStatuses: [],
    ratings: [],
  },
  {
    id: 5,
    firstName: "Ольга",
    lastName: "Козлова",
    level: 5,
    status: "deleted",
    statusChangedAt: "2023-09-20",
    registeredAt: "2022-09-15",
    managedCommunities: [],
    managedProjects: [],
    honoraryStatuses: [],
    ratings: [],
  },
]

const AccountsTable = () => {
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedAccount, setEditedAccount] = useState(null)
  const [newStatus, setNewStatus] = useState("")
  const [newHonoraryStatus, setNewHonoraryStatus] = useState("")
  const [newCommunity, setNewCommunity] = useState("")
  const [newProject, setNewProject] = useState("")

  useEffect(() => {
    const sortedAccounts = [...mockAccounts].sort((a, b) => b.level - a.level)
    setAccounts(sortedAccounts)
  }, [])

  const handleRowClick = (account) => {
    setSelectedAccount(account)
    setEditedAccount({ ...account })
    setEditMode(false)
  }

  const DeleteIcon = () => (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="delete-icon"
    >
      <circle cx="9.5" cy="9.5" r="8.5" fill="#E4E6FF" stroke="#484058" strokeWidth="2" />
      <path d="M4.58594 5.42847L14.4135 13.5713" stroke="#484058" strokeWidth="2" />
      <path d="M13.6875 4.75L5.24114 14.4134" stroke="#484058" strokeWidth="2" />
    </svg>
  )

  const closeModal = () => {
    setSelectedAccount(null)
    setEditedAccount(null)
    setEditMode(false)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "level") {
      setEditedAccount({
        ...editedAccount,
        [name]: Number.parseInt(value, 10),
      })
    } else {
      setEditedAccount({
        ...editedAccount,
        [name]: value,
      })
    }
  }

  const saveChanges = () => {
    const updatedAccounts = accounts.map((acc) => (acc.id === editedAccount.id ? { ...editedAccount } : acc))
    setAccounts(updatedAccounts)
    setSelectedAccount(editedAccount)
    setEditMode(false)
  }

  const changeAccountStatus = (status) => {
    const now = new Date().toISOString().split("T")[0]
    const updatedAccount = {
      ...editedAccount,
      status,
      statusChangedAt: now,
    }

    const updatedAccounts = accounts.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc))

    setAccounts(updatedAccounts)
    setEditedAccount(updatedAccount)
    setSelectedAccount(updatedAccount)
  }

  const loginAsAccount = () => {
    alert(`Вы вошли как ${selectedAccount.firstName} ${selectedAccount.lastName}`)
  }

  const addHonoraryStatus = () => {
    if (!newHonoraryStatus.trim()) return

    const updatedAccount = {
      ...editedAccount,
      honoraryStatuses: [...editedAccount.honoraryStatuses, newHonoraryStatus],
    }

    setEditedAccount(updatedAccount)
    setNewHonoraryStatus("")
  }

  const removeHonoraryStatus = (index) => {
    const updatedStatuses = [...editedAccount.honoraryStatuses]
    updatedStatuses.splice(index, 1)

    setEditedAccount({
      ...editedAccount,
      honoraryStatuses: updatedStatuses,
    })
  }

  const addCommunity = () => {
    if (!newCommunity.trim()) return

    const updatedAccount = {
      ...editedAccount,
      managedCommunities: [...editedAccount.managedCommunities, newCommunity],
    }

    setEditedAccount(updatedAccount)
    setNewCommunity("")
  }

  const removeCommunity = (index) => {
    const updatedCommunities = [...editedAccount.managedCommunities]
    updatedCommunities.splice(index, 1)

    setEditedAccount({
      ...editedAccount,
      managedCommunities: updatedCommunities,
    })
  }

  const addProject = () => {
    if (!newProject.trim()) return

    const updatedAccount = {
      ...editedAccount,
      managedProjects: [...editedAccount.managedProjects, newProject],
    }

    setEditedAccount(updatedAccount)
    setNewProject("")
  }

  const removeProject = (index) => {
    const updatedProjects = [...editedAccount.managedProjects]
    updatedProjects.splice(index, 1)

    setEditedAccount({
      ...editedAccount,
      managedProjects: updatedProjects,
    })
  }

  const removeRating = (ratingId) => {
    const updatedRatings = editedAccount.ratings.filter((rating) => rating.id !== ratingId)

    setEditedAccount({
      ...editedAccount,
      ratings: updatedRatings,
    })
  }

  return (
    <div className="accounts-table-container">
      <h1>Список аккаунтов</h1>

      <table className="accounts-table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Уровень</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Дата регистрации</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id} onClick={() => handleRowClick(account)}>
              <td className="account-name">{`${account.firstName} ${account.lastName}`}</td>
              <td>
                <span className={`level-badge level-${account.level}`}>{account.level}</span>
              </td>
              <td>{getRoleName(account.level)}</td>
              <td>
                <span className={`status-badge status-${account.status}`}>
                  {account.status === "active" ? "Активный" : account.status === "deleted" ? "Удалён" : "Заблокирован"}
                </span>
              </td>
              <td>{formatDate(account.registeredAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAccount && (
        <div className="account-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editMode ? "Редактирование аккаунта" : "Информация об аккаунте"}</h2>
              <button className="close-button" onClick={closeModal}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="13" fill="white" stroke="#9DA1CD" stroke-width="2"/>
                <path d="M6.75854 8L21.2413 20" stroke="#9DA1CD" stroke-width="2"/>
                <path d="M20.1714 7L7.72412 21.2408" stroke="#9DA1CD" stroke-width="2"/>
              </svg>
              </button>
            </div>

            <div className="account-details">
              <div className={`detail-section ${editMode ? "edit-mode" : ""}`}>
                <h3 style={{marginBottom:"10px"}}>Основная информация</h3>

                {editMode ? (
                  <>
                    <div className="input-group">
                      <label>Имя</label>
                      <input
                        type="text"
                        name="firstName"
                        value={editedAccount.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="input-group">
                      <label>Фамилия</label>
                      <input type="text" name="lastName" value={editedAccount.lastName} onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                      <label>Уровень</label>
                      <select name="level" value={editedAccount.level} onChange={handleInputChange}>
                        <option value={1}>1 - Гость</option>
                        <option value={2}>2 - Активист</option>
                        <option value={3}>3 - Тренер</option>
                        <option value={4}>4 - Куратор</option>
                        <option value={5}>5 - Лидер</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Дата регистрации</label>
                      <input
                        type="date"
                        name="registeredAt"
                        value={editedAccount.registeredAt}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="detail-row">
                      <div className="detail-label">ФИО:</div>
                      <div className="detail-value">{`${selectedAccount.firstName} ${selectedAccount.lastName}`}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Уровень:</div>
                      <div className="detail-value">
                        <span className={`level-badge level-${selectedAccount.level}`}>{selectedAccount.level}</span>
                        {` ${getRoleName(selectedAccount.level)}`}
                      </div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Статус:</div>
                      <div className="detail-value">
                        <span className={`status-badge status-${selectedAccount.status}`}>
                          {selectedAccount.status === "active"
                            ? "Активный"
                            : selectedAccount.status === "deleted"
                              ? "Удалён"
                              : "Заблокирован"}
                        </span>
                      </div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Дата смены статуса:</div>
                      <div className="detail-value">{formatDate(selectedAccount.statusChangedAt)}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Дата регистрации:</div>
                      <div className="detail-value">{formatDate(selectedAccount.registeredAt)}</div>
                    </div>
                  </>
                )}
              </div>

              <div className={`detail-section ${editMode ? "edit-mode" : ""}`}>
                <h3>Управление статусом</h3>
                {editMode ? (
                  <div className="status-actions">
                    <button className="status-badge status-active" onClick={() => changeAccountStatus("active")}>
                      Активировать
                    </button>
                    <button className="status-badge status-deleted" onClick={() => changeAccountStatus("deleted")}>
                      Удалить
                    </button>
                    <button className="status-badge status-blocked" onClick={() => changeAccountStatus("blocked")}>
                      Заблокировать
                    </button>
                  </div>
                ) : (
                  <div className="status-actions">
                    <button className="btn btn-primary" onClick={loginAsAccount}>
                      Войти как этот пользователь
                    </button>
                  </div>
                )}
              </div>

              {(selectedAccount.level >= 4 || editMode) && (
                <div className="detail-section">
                  <h3>Управляемые сообщества</h3>
                  {editMode ? (
                    <>
                      <div className="managed-list">
                        {editedAccount.managedCommunities.map((community, index) => (
                          <div key={index} className="list-item">
                            <div>{community}</div>
                            <div className="list-item-actions">
                              <button onClick={() => removeCommunity(index)}>
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="add-form">
                        <input
                          type="text"
                          placeholder="Название сообщества"
                          value={newCommunity}
                          onChange={(e) => setNewCommunity(e.target.value)}
                        />
                        <button onClick={addCommunity}>Добавить</button>
                      </div>
                    </>
                  ) : (
                    <div className="managed-list">
                      {selectedAccount.managedCommunities.length > 0 ? (
                        selectedAccount.managedCommunities.map((community, index) => (
                          <div key={index} className="list-item">
                            {community}
                          </div>
                        ))
                      ) : (
                        <div className="list-item">Нет управляемых сообществ</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {(selectedAccount.level >= 4 || editMode) && (
                <div className="detail-section">
                  <h3>Управляемые проекты</h3>
                  {editMode ? (
                    <>
                      <div className="managed-list">
                        {editedAccount.managedProjects.map((project, index) => (
                          <div key={index} className="list-item">
                            <div>{project}</div>
                            <div className="list-item-actions">
                              <button onClick={() => removeProject(index)}>
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="add-form">
                        <input
                          type="text"
                          placeholder="Название проекта"
                          value={newProject}
                          onChange={(e) => setNewProject(e.target.value)}
                        />
                        <button onClick={addProject}>Добавить</button>
                      </div>
                    </>
                  ) : (
                    <div className="managed-list">
                      {selectedAccount.managedProjects.length > 0 ? (
                        selectedAccount.managedProjects.map((project, index) => (
                          <div key={index} className="list-item">
                            {project}
                          </div>
                        ))
                      ) : (
                        <div className="list-item">Нет управляемых проектов</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="detail-section">
                <h3>Почетные статусы</h3>
                {editMode ? (
                  <>
                    <div className="statuses-list">
                      {editedAccount.honoraryStatuses.map((status, index) => (
                        <div key={index} className="list-item">
                          <div>{status}</div>
                          <div className="list-item-actions">
                            <button onClick={() => removeHonoraryStatus(index)}>
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="add-form">
                      <input
                        type="text"
                        placeholder="Новый почетный статус"
                        value={newHonoraryStatus}
                        onChange={(e) => setNewHonoraryStatus(e.target.value)}
                      />
                      <button onClick={addHonoraryStatus}>Добавить</button>
                    </div>
                  </>
                ) : (
                  <div className="statuses-list">
                    {selectedAccount.honoraryStatuses.length > 0 ? (
                      selectedAccount.honoraryStatuses.map((status, index) => (
                        <div key={index} className="list-item">
                          {status}
                        </div>
                      ))
                    ) : (
                      <div className="list-item">Нет почетных статусов</div>
                    )}
                  </div>
                )}
              </div>

              {(selectedAccount.level >= 3 || editMode) && (
                <div className="detail-section">
                  <h3>Последние оценки</h3>
                  {editMode ? (
                    <div className="ratings-list">
                      {editedAccount.ratings.length > 0 ? (
                        editedAccount.ratings.map((rating) => (
                          <div key={rating.id} className="list-item">
                            <div>
                              <strong>{rating.value}/5</strong> от {rating.raterName} ({formatDate(rating.date)})
                            </div>
                            <div className="list-item-actions">
                              <button onClick={() => removeRating(rating.id)}>
                                <DeleteIcon />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="list-item">Нет оценок</div>
                      )}
                    </div>
                  ) : (
                    <div className="ratings-list">
                      {selectedAccount.ratings.length > 0 ? (
                        selectedAccount.ratings.map((rating) => (
                          <div key={rating.id} className="list-item">
                            <strong>{rating.value}/5</strong> от {rating.raterName} ({formatDate(rating.date)})
                          </div>
                        ))
                      ) : (
                        <div className="list-item">Нет оценок</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={`action-buttons ${editMode ? "edit-mode" : ""}`}>
              {editMode ? (
                <>
                  <button className="btn btn-primary" onClick={saveChanges}>
                    Сохранить
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                    Отмена
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={toggleEditMode}>
                  Редактировать
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountsTable
