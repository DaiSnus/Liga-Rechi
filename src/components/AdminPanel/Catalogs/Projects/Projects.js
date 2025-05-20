import React, { useState, useEffect } from "react"

const mockProjects = [
  {
    id: 1,
    name: "Поэтический чемпионат",
    logo: "#",
    url: "#",
    shortDescription: "Ежегодное соревнование поэтов.",
    fullDescription:
      "<p>Поэтический чемпионат - это ежегодное соревнование, где поэты соревнуются в мастерстве стихосложения.</p><p>Участники проходят несколько этапов, демонстрируя свои навыки в различных поэтических жанрах.</p>",
    leaderId: 1,
    isActive: true
  },
  {
    id: 4,
    name: "Голос города",
    logo: "#",
    url: "#",
    shortDescription: "Проект по развитию городской культуры речи.",
    fullDescription:
      "<p>Голос города - это проект, направленный на развитие культуры речи в городской среде.</p><p>В рамках проекта проводятся открытые лекции, мастер-классы и дискуссионные клубы.</p>",
    leaderId: 3,
    isActive: false
  }
]

const mockLeaders = [
  { id: 1, name: "Павел Пинженин" },
  { id: 2, name: "Мария Петрова" },
  { id: 3, name: "Алексей Смирнов" }
]

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [leaders, setLeaders] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    url: "",
    shortDescription: "",
    fullDescription: "",
    leaderId: "",
    isActive: true
  })

  useEffect(() => {
    setProjects(mockProjects)
    setLeaders(mockLeaders)
  }, [])

  const handleAddNew = () => {
    setCurrentProject(null)
    setFormData({
      name: "",
      logo: "",
      url: "",
      shortDescription: "",
      fullDescription: "",
      leaderId: leaders.length > 0 ? leaders[0].id : "",
      isActive: true,
    })
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setCurrentProject(item)
    setFormData({
      name: item.name,
      logo: item.logo,
      url: item.url,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
      leaderId: item.leaderId,
      isActive: item.isActive
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот проект?")) {
      setProjects(projects.filter((item) => item.id !== id))
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked
      })
    } else if (name === "leaderId") {
      setFormData({
        ...formData,
        [name]: Number(value)
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentProject) {
      const updatedProjects = projects.map((item) => (item.id === currentProject.id ? { ...item, ...formData } : item))
      setProjects(updatedProjects)
    } else {
      const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map((item) => item.id)) + 1 : 1,
        ...formData
      }
      setProjects([...projects, newProject])
    }

    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  const handleLogoChange = (e) => {
    setFormData({
      ...formData,
      logo: "",
    })
  }

  const getLeaderName = (leaderId) => {
    const leader = leaders.find((leader) => leader.id === leaderId)
    return leader ? leader.name : "Не назначен"
  }

  return (
    <div>
      <div className="catalog-header">
        <h2>Проекты</h2>
        <p>Управление проектами организации.</p>
      </div>

      {!showForm ? (
        <>
          <button className="add-button" onClick={handleAddNew}>
            Добавить новый проект
          </button>

          <table className="catalog-list">
            <thead>
              <tr>
                <th>Логотип</th>
                <th>Название</th>
                <th>URL</th>
                <th>Краткое описание</th>
                <th>Лидер</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.logo || "/placeholder.svg"} alt={item.name} className="logo-preview" />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.url}
                    </a>
                  </td>
                  <td>{item.shortDescription}</td>
                  <td>{getLeaderName(item.leaderId)}</td>
                  <td>
                    <span className={`badge ${item.isActive ? "importance-badge" : "type-badge"}`}>
                      {item.isActive ? "Активный" : "Неактивный"}
                    </span>
                  </td>
                  <td>
                    <div className="catalog-actions">
                      <button className="edit-button" onClick={() => handleEdit(item)}>
                        Редактировать
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(item.id)}>
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
          <h3 className="form-title">{currentProject ? "Редактировать проект" : "Добавить новый проект"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Название</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input type="url" id="url" name="url" value={formData.url} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="shortDescription">Краткое описание</label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullDescription">Полное описание</label>
              <div className="rich-text-editor">
                <div className="toolbar">
                  <button type="button">B</button>
                  <button type="button">I</button>
                  <button type="button">U</button>
                  <button type="button">Изображение</button>
                </div>
                <textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  className="editor-content"
                  required
                />
              </div>
              <small>Поддерживается HTML-форматирование.</small>
            </div>

            <div className="form-group">
              <label htmlFor="leaderId">Лидер проекта</label>
              <select id="leaderId" name="leaderId" value={formData.leaderId} onChange={handleInputChange} required>
                {leaders.map((leader) => (
                  <option key={leader.id} value={leader.id}>
                    {leader.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                Активный проект
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} />
              </label>
              <small>Активные проекты отображаются в меню в хедере витрины.</small>
            </div>

            <div className="form-group">
              <label>Логотип</label>
              <div className="logo-upload">
                <input type="file" accept="image/*" onChange={handleLogoChange} />
              </div>
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

export default Projects
