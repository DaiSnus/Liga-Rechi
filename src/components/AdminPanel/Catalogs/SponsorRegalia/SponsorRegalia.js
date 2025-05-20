import React, { useState, useEffect } from "react"

const mockSponsorRegalia = [
  {
    id: 1,
    name: "Донор 1",
    description: "За общую помощь проекту в размере от 50 рублей.",
    logo: "",
    donationAmount: 50
  },
  {
    id: 2,
    name: "Донор 2",
    description: "За общую помощь проекту в размере от 500 рублей.",
    logo: "",
    donationAmount: 500
  }
]

const SponsorRegalia = () => {
  const [regalia, setRegalia] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentRegalia, setCurrentRegalia] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    donationAmount: 0
  })

  useEffect(() => {
    setRegalia(mockSponsorRegalia)
  }, [])

  const handleAddNew = () => {
    setCurrentRegalia(null)
    setFormData({
      name: "",
      description: "",
      logo: "",
      donationAmount: 0
    })
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setCurrentRegalia(item)
    setFormData({
      name: item.name,
      description: item.description,
      logo: item.logo,
      donationAmount: item.donationAmount
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить эту регалию?")) {
      setRegalia(regalia.filter((item) => item.id !== id))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "donationAmount") {
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

    if (currentRegalia) {
      const updatedRegalia = regalia.map((item) => (item.id === currentRegalia.id ? { ...item, ...formData } : item))
      setRegalia(updatedRegalia)
    } else {
      const newRegalia = {
        id: regalia.length > 0 ? Math.max(...regalia.map((item) => item.id)) + 1 : 1,
        ...formData
      }
      setRegalia([...regalia, newRegalia])
    }

    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  const handleLogoChange = (e) => {
    setFormData({
      ...formData,
      logo: ""
    })
  }

  return (
    <div>
      <div className="catalog-header">
        <h2>Спонсорские регалии</h2>
        <p>Управление регалиями, которые выдаются за пожертвования.</p>
      </div>

      {!showForm ? (
        <>
          <button className="add-button" onClick={handleAddNew}>
            Добавить новую регалию
          </button>

          <table className="catalog-list">
            <thead>
              <tr>
                <th>Логотип</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Сумма (₽)</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {regalia.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.logo || "/placeholder.svg"} alt={item.name} className="logo-preview" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.donationAmount.toLocaleString("ru-RU")}</td>
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
          <h3 className="form-title">{currentRegalia ? "Редактировать регалию" : "Добавить новую регалию"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Название</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
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
              <label htmlFor="donationAmount">Сумма пожертвования (₽)</label>
              <input
                type="number"
                id="donationAmount"
                name="donationAmount"
                value={formData.donationAmount}
                onChange={handleInputChange}
                min="0"
                required
              />
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

export default SponsorRegalia;