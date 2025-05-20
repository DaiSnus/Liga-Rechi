import React, { useState, useEffect } from "react"

const mockRoles = [
  {
    id: 1,
    name: "Хотел пойти",
    importance: 0,
    description: "Роль по-умолчанию. Назначается автоматически при регистрации на мероприятие.",
  },
  {
    id: 2,
    name: "Зритель",
    importance: 1,
    description: "Участник, который присутствовал на мероприятии в качестве зрителя.",
  },
  {
    id: 3,
    name: "Участник",
    importance: 2,
    description: "Активный участник мероприятия.",
  },
  {
    id: 4,
    name: "Актёр",
    importance: 2,
    description: "Участник, выступающий в роли актёра на мероприятии.",
  },
  {
    id: 5,
    name: "Волонтёр",
    importance: 2,
    description: "Участник, помогающий в организации мероприятия.",
  },
  {
    id: 6,
    name: "Организатор",
    importance: 3,
    description: "Участник, отвечающий за организацию мероприятия.",
  },
  {
    id: 7,
    name: "Капитан команды",
    importance: 3,
    description: "Лидер команды на мероприятии.",
  },
  {
    id: 8,
    name: "Член жюри",
    importance: 3,
    description: "Участник, оценивающий выступления других участников.",
  },
  {
    id: 9,
    name: "Тренер",
    importance: 4,
    description: "Участник, проводящий обучение на мероприятии.",
  },
  {
    id: 10,
    name: "Эксперт",
    importance: 4,
    description: "Участник, выступающий в качестве эксперта на мероприятии.",
  },
  {
    id: 11,
    name: "Спикер",
    importance: 4,
    description: "Участник, выступающий с докладом на мероприятии.",
  },
]

const getImportanceLabel = (importance) => {
  switch (importance) {
    case 0:
      return "Хотел пойти"
    case 1:
      return "Зритель"
    case 2:
      return "Участник"
    case 3:
      return "Организатор"
    case 4:
      return "Тренер"
    default:
      return "Неизвестно"
  }
}

const Roles = () => {
  const [roles, setRoles] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentRole, setCurrentRole] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    importance: 1,
    description: "",
  })

  useEffect(() => {
    setRoles(mockRoles)
  }, [])

  const handleAddNew = () => {
    setCurrentRole(null)
    setFormData({
      name: "",
      importance: 1,
      description: "",
    })
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setCurrentRole(item)
    setFormData({
      name: item.name,
      importance: item.importance,
      description: item.description,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    const roleToDelete = roles.find((role) => role.id === id)

    if (roleToDelete.importance === 0) {
      alert("Нельзя удалить роль по-умолчанию.")
      return
    }

    if (window.confirm("Вы уверены, что хотите удалить эту роль?")) {
      setRoles(roles.filter((item) => item.id !== id))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "importance") {
      setFormData({
        ...formData,
        [name]: Number(value),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentRole && currentRole.importance === 0 && formData.importance !== 0) {
      alert("Нельзя изменить важность роли по-умолчанию.")
      return
    }

    if (currentRole) {
      const updatedRoles = roles.map((item) => (item.id === currentRole.id ? { ...item, ...formData } : item))
      setRoles(updatedRoles)
    } else {
      const newRole = {
        id: roles.length > 0 ? Math.max(...roles.map((item) => item.id)) + 1 : 1,
        ...formData,
      }
      setRoles([...roles, newRole])
    }

    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  return (
    <div>
      <div className="catalog-header">
        <h2>Роли</h2>
        <p>Управление ролями участников мероприятий.</p>
      </div>

      {!showForm ? (
        <>
          <button className="add-button" onClick={handleAddNew}>
            Добавить новую роль
          </button>

          <table className="catalog-list">
            <thead>
              <tr>
                <th>Название</th>
                <th>Важность</th>
                <th>Тип</th>
                <th>Описание</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.importance}</td>
                  <td>
                    <span className="badge importance-badge">{getImportanceLabel(item.importance)}</span>
                  </td>
                  <td>{item.description}</td>
                  <td>
                    <div className="catalog-actions">
                      <button className="edit-button" onClick={() => handleEdit(item)}>
                        Редактировать
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(item.id)}
                        disabled={item.importance === 0}
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="catalog-form">
          <h3 className="form-title">{currentRole ? "Редактировать роль" : "Добавить новую роль"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Название</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="importance">Важность</label>
              <select
                id="importance"
                name="importance"
                value={formData.importance}
                onChange={handleInputChange}
                disabled={currentRole && currentRole.importance === 0}
                required
              >
                {currentRole && currentRole.importance === 0 ? (
                  <option value="0">0 - Хотел пойти</option>
                ) : (
                  <>
                    <option value="1">1 - Зритель</option>
                    <option value="2">2 - Участник</option>
                    <option value="3">3 - Организатор</option>
                    <option value="4">4 - Тренер</option>
                  </>
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Описание</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-button">
                Сохранить
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Roles
