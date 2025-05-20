import React, { useState, useEffect } from "react"

const mockCities = [
  {
    id: 1,
    name: "Екатеринбург",
    subdomain: "#"
  },
  {
    id: 2,
    name: "Астана",
    subdomain: "#"
  }
]

const Cities = () => {
  const [cities, setCities] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentCity, setCurrentCity] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    subdomain: ""
  })

  useEffect(() => {
    setCities(mockCities)
  }, [])

  const handleAddNew = () => {
    setCurrentCity(null)
    setFormData({
      name: "",
      subdomain: ""
    })
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setCurrentCity(item)
    setFormData({
      name: item.name,
      subdomain: item.subdomain
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот город?")) {
      setCities(cities.filter((item) => item.id !== id))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentCity) {
      const updatedCities = cities.map((item) => (item.id === currentCity.id ? { ...item, ...formData } : item))
      setCities(updatedCities)
    } else {
      const newCity = {
        id: cities.length > 0 ? Math.max(...cities.map((item) => item.id)) + 1 : 1,
        ...formData
      }
      setCities([...cities, newCity])
    }

    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  return (
    <div>
      <div className="catalog-header">
        <h2>Города</h2>
        <p>Управление городами и их поддоменами.</p>
      </div>

      {!showForm ? (
        <>
          <button className="add-button" onClick={handleAddNew}>
            Добавить новый город
          </button>

          <table className="catalog-list">
            <thead>
              <tr>
                <th>Название города</th>
                <th>Поддомен</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <a href={`https://${item.subdomain}`} target="_blank" rel="noopener noreferrer">
                      {item.subdomain}
                    </a>
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
          <h3 className="form-title">{currentCity ? "Редактировать город" : "Добавить новый город"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Название города</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="subdomain">Поддомен</label>
              <input
                type="text"
                id="subdomain"
                name="subdomain"
                value={formData.subdomain}
                onChange={handleInputChange}
                required
              />
              <small>Например: ligarechi.ru</small>
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

export default Cities
