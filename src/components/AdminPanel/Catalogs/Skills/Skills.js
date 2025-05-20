import React, { useState, useEffect } from "react"

const mockSkills = [
  {
    id: 1,
    name: "Благотворительность",
    description:
      "Навык, связанный с благотворительной деятельностью. Автоматически развивается при участии в бесплатных мероприятиях в качестве организатора или тренера, а также при пожертвованиях.",
    isSpecialized: true
  },
  {
    id: 4,
    name: "Ораторское мастерство",
    description: "Навык публичных выступлений, умение говорить ясно, убедительно и выразительно перед аудиторией.",
    isSpecialized: false
  }
]

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentSkill, setCurrentSkill] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isSpecialized: false
  })

  useEffect(() => {
    setSkills(mockSkills)
  }, [])

  const handleAddNew = () => {
    setCurrentSkill(null)
    setFormData({
      name: "",
      description: "",
      isSpecialized: false
    })
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setCurrentSkill(item)
    setFormData({
      name: item.name,
      description: item.description,
      isSpecialized: item.isSpecialized
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    const skillToDelete = skills.find((skill) => skill.id === id)

    if (skillToDelete.isSpecialized) {
      alert("Нельзя удалить специализированный навык.")
      return
    }

    if (window.confirm("Вы уверены, что хотите удалить этот навык?")) {
      setSkills(skills.filter((item) => item.id !== id))
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked
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

    if (currentSkill) {
      const updatedSkills = skills.map((item) => (item.id === currentSkill.id ? { ...item, ...formData } : item))
      setSkills(updatedSkills)
    } else {
      const newSkill = {
        id: skills.length > 0 ? Math.max(...skills.map((item) => item.id)) + 1 : 1,
        ...formData
      }
      setSkills([...skills, newSkill])
    }

    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  return (
    <div>
      <div className="catalog-header">
        <h2>Гибкие навыки</h2>
        <p>Управление гибкими навыками, которые могут развивать участники.</p>
      </div>

      {!showForm ? (
        <>
          <button className="add-button" onClick={handleAddNew}>
            Добавить новый навык
          </button>

          <table className="catalog-list">
            <thead>
              <tr>
                <th>Название</th>
                <th>Тип</th>
                <th>Описание</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <span className={`badge ${item.isSpecialized ? "weight-badge" : "importance-badge"}`}>
                      {item.isSpecialized ? "Специализированный" : "Обычный"}
                    </span>
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
                        disabled={item.isSpecialized}
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
          <h3 className="form-title">{currentSkill ? "Редактировать навык" : "Добавить новый навык"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Название</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Полное описание</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isSpecialized"
                  checked={formData.isSpecialized}
                  onChange={handleInputChange}
                />
                Специализированный навык
              </label>
              <small>Специализированные навыки имеют особые правила начисления опыта и наград.</small>
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

export default Skills
