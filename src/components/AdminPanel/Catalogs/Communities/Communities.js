import React, { useState, useEffect } from "react"

const mockCommunities = [
  {
    id: 1,
    name: "Клуб ораторов",
    logo: "",
    url: "#",
    shortDescription: "Сообщество для развития ораторских навыков.",
    fullDescription:
      "<p>Клуб ораторов - это сообщество людей, стремящихся развивать свои навыки публичных выступлений.</p><p>Мы проводим регулярные встречи, мастер-классы и соревнования.</p>",
    curatorId: 1,
    type: 2
  },
  {
    id: 3,
    name: "Городской дискуссионный клуб",
    logo: "",
    url: "#",
    shortDescription: "Площадка для обсуждения городских проблем.",
    fullDescription:
      "<p>Городской дискуссионный клуб - это площадка для обсуждения актуальных проблем города.</p><p>Мы приглашаем экспертов, проводим дебаты и разрабатываем предложения по улучшению городской среды.</p>",
    curatorId: 3,
    type: 1
  }
]

const mockCurators = [
  { id: 1, name: "Павел Пинжанин" },
  { id: 2, name: "Мария Петрова" },
  { id: 3, name: "Алексей Смирнов" }
]

const getCommunityTypeLabel = (type) => {
  switch (type) {
    case 0:
      return "Скрыть"
    case 1:
      return "Партнёр"
    case 2:
      return "Резидент"
    default:
      return "Неизвестно"
  }
}

const Communities = () => {
  const [communities, setCommunities] = useState([])
  const [curators, setCurators] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentCommunity, setCurrentCommunity] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    url: "",
    shortDescription: "",
    fullDescription: "",
    curatorId: "",
    type: 0
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    setCommunities(mockCommunities)
    setCurators(mockCurators)
  }, [])

  const handleAddNew = () => {
    setCurrentCommunity(null)
    setFormData({
      name: "",
      logo: "",
      url: "",
      shortDescription: "",
      fullDescription: "",
      curatorId: curators.length > 0 ? curators[0].id : "",
      type: 0
    })
    setFormErrors({})
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setCurrentCommunity(item)
    setFormData({
      name: item.name,
      logo: item.logo,
      url: item.url,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
      curatorId: item.curatorId,
      type: item.type
    })
    setFormErrors({})
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить это сообщество?")) {
      setCommunities(communities.filter((item) => item.id !== id))
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target

    if (name === "type" || name === "curatorId") {
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

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (formData.type === 1) {
      if (!formData.name.trim()) {
        errors.name = "Название обязательно для типа 'Партнёр'"
      }
      if (formData.logo === "") {
        errors.logo = "Логотип обязателен для типа 'Партнёр'"
      }
    }

    if (formData.type === 2) {
      if (!formData.name.trim()) {
        errors.name = "Название обязательно для типа 'Резидент'"
      }
      if (formData.logo === "") {
        errors.logo = "Логотип обязателен для типа 'Резидент'"
      }
      if (!formData.url.trim()) {
        errors.url = "URL обязателен для типа 'Резидент'"
      }
      if (!formData.shortDescription.trim()) {
        errors.shortDescription = "Краткое описание обязательно для типа 'Резидент'"
      }
      if (!formData.fullDescription.trim()) {
        errors.fullDescription = "Полное описание обязательно для типа 'Резидент'"
      }
      if (!formData.curatorId) {
        errors.curatorId = "Куратор обязателен для типа 'Резидент'"
      }
    }

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    if (currentCommunity) {
      const updatedCommunities = communities.map((item) =>
        item.id === currentCommunity.id ? { ...item, ...formData } : item
      )
      setCommunities(updatedCommunities)
    } else {
      const newCommunity = {
        id: communities.length > 0 ? Math.max(...communities.map((item) => item.id)) + 1 : 1,
        ...formData
      }
      setCommunities([...communities, newCommunity])
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

    if (formErrors.logo) {
      setFormErrors({
        ...formErrors,
        logo: null
      })
    }
  }

  const getCuratorName = (curatorId) => {
    const curator = curators.find((curator) => curator.id === curatorId)
    return curator ? curator.name : "Не назначен"
  }

  return (
    <div>
      <div className="catalog-header">
        <h2>Сообщества</h2>
        <p>Управление сообществами организации.</p>
      </div>

      {!showForm ? (
        <>
          <button className="add-button" onClick={handleAddNew}>
            Добавить новое сообщество
          </button>

          <table className="catalog-list">
            <thead>
              <tr>
                <th>Логотип</th>
                <th>Название</th>
                <th>Тип</th>
                <th>URL</th>
                <th>Краткое описание</th>
                <th>Куратор</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {communities.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.logo && (
                      <img src={item.logo || "/placeholder.svg"} alt={item.name} className="logo-preview" />
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.type === 2 ? "importance-badge" : item.type === 1 ? "weight-badge" : "type-badge"
                      }`}
                    >
                      {getCommunityTypeLabel(item.type)}
                    </span>
                  </td>
                  <td>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.url}
                      </a>
                    )}
                  </td>
                  <td>{item.shortDescription}</td>
                  <td>{getCuratorName(item.curatorId)}</td>
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
          <h3 className="form-title">{currentCommunity ? "Редактировать сообщество" : "Добавить новое сообщество"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Название</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={formErrors.name ? "error" : ""}
              />
              {formErrors.name && <div className="error-message">{formErrors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="type">Тип</label>
              <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                <option value={0}>0 - Скрыть</option>
                <option value={1}>1 - Партнёр</option>
                <option value={2}>2 - Резидент</option>
              </select>
              <small>
                {formData.type === 0 && "Сообщества этого типа видны только в админке и портфолио участников."}
                {formData.type === 1 && "Сообщества этого типа отображаются на Витрине в разделе 'Партнёры'."}
                {formData.type === 2 && "Сообщества этого типа отображаются на Витрине в разделе 'Резиденты'."}
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className={formErrors.url ? "error" : ""}
              />
              {formErrors.url && <div className="error-message">{formErrors.url}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="shortDescription">Краткое описание</label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                className={formErrors.shortDescription ? "error" : ""}
              />
              {formErrors.shortDescription && <div className="error-message">{formErrors.shortDescription}</div>}
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
                  className={`editor-content ${formErrors.fullDescription ? "error" : ""}`}
                />
              </div>
              {formErrors.fullDescription && <div className="error-message">{formErrors.fullDescription}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="curatorId">Куратор</label>
              <select
                id="curatorId"
                name="curatorId"
                value={formData.curatorId}
                onChange={handleInputChange}
                className={formErrors.curatorId ? "error" : ""}
              >
                <option value="">Выберите куратора</option>
                {curators.map((curator) => (
                  <option key={curator.id} value={curator.id}>
                    {curator.name}
                  </option>
                ))}
              </select>
              {formErrors.curatorId && <div className="error-message">{formErrors.curatorId}</div>}
            </div>

            <div className="form-group">
              <label>Логотип</label>
              <div className="logo-upload">
                {formData.logo && <img src={formData.logo || "/placeholder.svg"} alt="Предпросмотр логотипа" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className={formErrors.logo ? "error" : ""}
                />
              </div>
              {formErrors.logo && <div className="error-message">{formErrors.logo}</div>}
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

export default Communities
