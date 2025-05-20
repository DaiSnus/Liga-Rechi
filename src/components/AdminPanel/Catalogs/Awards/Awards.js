import React, { useState, useEffect } from "react"

const mockProjects = [
  { id: 1, name: "Поэтический чемпионат" },
  { id: 2, name: "Речевой марафон" },
  { id: 3, name: "Мастер слова" },
  { id: 4, name: "Голос города" },
  { id: 5, name: "Клуб ораторов" }
]

const mockAwards = [
  {
    id: 1,
    weight: 1,
    name: "Финалист",
    description: "Участник, дошедший до финала соревнования.",
    image: "",
    projectIds: [1, 3]
  },
  {
    id: 2,
    weight: 1,
    name: "Лучший дебют",
    description: "Награда за выдающееся первое выступление.",
    image: "",
    projectIds: [1, 2, 3]
  }
]

const getWeightLabel = (weight) => {
  switch (weight) {
    case 1:
      return "Мастер высокого класса"
    case 2:
      return "Тренер"
    case 3:
      return "Победитель высочайшего полёта"
    case 4:
      return "Организатор"
    case 5:
      return "Благотворитель"
    default:
      return "Неизвестно"
  }
}

const Awards = () => {
  const [awards, setAwards] = useState([])
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentAward, setCurrentAward] = useState(null)
  const [formData, setFormData] = useState({
    weight: 1,
    name: "",
    description: "",
    image: "",
    projectIds: []
  })

  useEffect(() => {
    setAwards(mockAwards)
    setProjects(mockProjects)
  }, [])

  const handleAddNew = () => {
    setCurrentAward(null)
    setFormData({
      weight: 1,
      name: "",
      description: "",
      image: "",
      projectIds: [],
    })
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setCurrentAward(item)
    setFormData({
      weight: item.weight,
      name: item.name,
      description: item.description,
      image: item.image,
      projectIds: [...item.projectIds],
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить эту награду?")) {
      setAwards(awards.filter((item) => item.id !== id))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "weight") {
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

  const handleProjectChange = (e) => {
    const projectId = Number(e.target.value)
    const isChecked = e.target.checked

    if (isChecked) {
      setFormData({
        ...formData,
        projectIds: [...formData.projectIds, projectId]
      })
    } else {
      setFormData({
        ...formData,
        projectIds: formData.projectIds.filter((id) => id !== projectId)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.projectIds.length === 0) {
      alert("Выберите хотя бы один проект.")
      return
    }

    if (formData.weight !== 1 && formData.weight !== 3) {
      alert("Вес награды должен быть 1 или 3 для ручных наград.")
      return
    }

    if (currentAward) {
      const updatedAwards = awards.map((item) => (item.id === currentAward.id ? { ...item, ...formData } : item))
      setAwards(updatedAwards)
    } else {
      const newAward = {
        id: awards.length > 0 ? Math.max(...awards.map((item) => item.id)) + 1 : 1,
        ...formData
      }
      setAwards([...awards, newAward])
    }

    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  const handleImageChange = (e) => {

    setFormData({
      ...formData,
      image: ""
    })
  }

  const getProjectNames = (projectIds) => {
    return projectIds
      .map((id) => {
        const project = projects.find((p) => p.id === id)
        return project ? project.name : "Неизвестный проект"
      })
      .join(", ")
  }

  return (
    <div>
      <div className="catalog-header">
        <h2>Награды</h2>
        <p>Управление наградами, которые могут быть выданы участникам.</p>
      </div>

      {!showForm ? (
        <>
          <button className="add-button" onClick={handleAddNew}>
            Добавить новую награду
          </button>

          <table className="catalog-list">
            <thead>
              <tr>
                <th>Изображение</th>
                <th>Название</th>
                <th>Вес</th>
                <th>Тип</th>
                <th>Описание</th>
                <th>Связанные проекты</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {awards.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="logo-preview" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.weight}</td>
                  <td>
                    <span className="badge weight-badge">{getWeightLabel(item.weight)}</span>
                  </td>
                  <td>{item.description}</td>
                  <td>{getProjectNames(item.projectIds)}</td>
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
          <h3 className="form-title">{currentAward ? "Редактировать награду" : "Добавить новую награду"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Название</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Вес</label>
              <select id="weight" name="weight" value={formData.weight} onChange={handleInputChange} required>
                <option value="1">1 - Мастер высокого класса</option>
                <option value="3">3 - Победитель высочайшего полёта</option>
              </select>
              <small>Награды с весом 2, 4 и 5 выдаются автоматически и не могут быть созданы вручную.</small>
            </div>

            <div className="form-group">
              <label htmlFor="description">Краткое описание</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Изображение</label>
              <div className="logo-upload">
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Связанные проекты</label>
              <small>Выберите проекты, к которым относится эта награда.</small>
              <div className="projects-list">
                {projects.map((project) => (
                  <div key={project.id} className="project-checkbox">
                    <input
                      type="checkbox"
                      id={`project-${project.id}`}
                      value={project.id}
                      checked={formData.projectIds.includes(project.id)}
                      onChange={handleProjectChange}
                    />
                    <label htmlFor={`project-${project.id}`}>{project.name}</label>
                  </div>
                ))}
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

export default Awards