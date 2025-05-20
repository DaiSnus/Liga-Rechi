import React,{ useState, useEffect } from "react"
import "./ShowcaseEditor.css"

const ToggleSwitch = ({ isChecked, onChange, label }) => {
  return (
    <div className="toggle-switch-container">
      <label>{label}</label>
      <label className="toggle-switch">
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        <span className="toggle-slider"></span>
      </label>
    </div>
  )
}

const ShowcaseEditor = () => {
  const [activeTab, setActiveTab] = useState("header")
  const [formData, setFormData] = useState({
    header: {
      logo: "",
    },
    aboutPage: {
      enabled: true,
      sections: [
        {
          title: "Наша миссия",
          content:
            "Мы помогаем людям развивать навыки публичных выступлений, ораторского мастерства и эффективной коммуникации. Наша цель - создать сообщество, где каждый может раскрыть свой потенциал и научиться выражать свои мысли ясно и убедительно.",
        },
      ],
    },
    banner: {
      image: "",
      contactInfo: {
        phone: "+7 (123) 456-78-90",
        ownerName: "Иван Иванов",
        messengers: [
          { name: "Telegram", url: "https://t.me/ligarechi" },
          { name: "WhatsApp", url: "https://wa.me/71234567890" },
        ],
        socials: [{ name: "ВКонтакте", url: "https://vk.com/ligarechi" }],
      },
    },
    calendar: {
      instruction:
        'Нажмите на название мероприятия, чтобы узнать подробности. Мероприятия с пометкой "БЕСПЛАТНО" доступны всем желающим.',
    },
    aboutUs: {
      enabled: true,
      sections: [
        {
          title: "Наша миссия",
          content:
            "Мы помогаем людям развивать навыки публичных выступлений, ораторского мастерства и эффективной коммуникации. Наша цель - создать сообщество, где каждый может раскрыть свой потенциал и научиться выражать свои мысли ясно и убедительно.",
        },
        {
          title: "Наши ценности",
          content:
            "Мы верим в силу слова, важность диалога и ценность каждого голоса. Мы поддерживаем разнообразие мнений, уважение к собеседнику и стремление к постоянному развитию. Наше сообщество открыто для всех, кто разделяет эти ценности.",
        },
      ],
    },
    residentClubs: {
      enabled: true,
      subtitle: "Сообщества, которые развивают ораторское мастерство и смежные навыки",
    },
    donations: {
      enabled: true,
      title: "Поддержите нас",
      description:
        "Ваши пожертвования помогают нам организовывать бесплатные мероприятия, развивать сообщество и делать ораторское искусство доступным для всех. Мы благодарны за любую поддержку!",
      paymentDetails: {
        accountNumber: "40817810099910004312",
        bankName: "Сбербанк",
        recipientName: 'Фонд развития ораторского искусства "Лига Речи"',
      },
      predefinedAmounts: [100, 500, 1000, 2000],
    },
    partnership: {
      title: "Будем партнёрами",
      sections: [
        {
          title: "Для бизнеса",
          content:
            "Мы предлагаем корпоративные тренинги по ораторскому мастерству, эффективной коммуникации и презентационным навыкам. Наши программы помогут вашим сотрудникам стать увереннее в публичных выступлениях, эффективнее взаимодействовать с клиентами и коллегами.",
          image: "",
        },
      ],
    },
    partners: {
      enabled: true,
    },
    footer: {
      contactPerson: "Иван Иванов",
      phone: "+7 (123) 456-78-90",
      city: "Екатеринбург",
      socials: [
        { name: "ВКонтакте", url: "https://vk.com/ligarechi" },
        { name: "Instagram", url: "https://instagram.com/ligarechi" },
      ],
    },
  })

  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [showSaveMessage, setShowSaveMessage] = useState(false)

  useEffect(() => {
    console.log("Loading showcase data...")
  }, [])

  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }))
    setUnsavedChanges(true)
  }

  const handleNestedInputChange = (section, nestedSection, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [nestedSection]: {
          ...prevData[section][nestedSection],
          [field]: value,
        },
      },
    }))
    setUnsavedChanges(true)
  }

  const handleArrayItemChange = (section, arrayName, index, field, value) => {
    setFormData((prevData) => {
      const newArray = [...prevData[section][arrayName]]
      newArray[index] = {
        ...newArray[index],
        [field]: value,
      }
      return {
        ...prevData,
        [section]: {
          ...prevData[section],
          [arrayName]: newArray,
        },
      }
    })
    setUnsavedChanges(true)
  }

  const handleAddArrayItem = (section, arrayName, template) => {
    setFormData((prevData) => {
      if (arrayName.includes(".")) {
        const [nestedSection, nestedArray] = arrayName.split(".")
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [nestedSection]: {
              ...prevData[section][nestedSection],
              [nestedArray]: [...prevData[section][nestedSection][nestedArray], template],
            },
          },
        }
      }

      return {
        ...prevData,
        [section]: {
          ...prevData[section],
          [arrayName]: [...prevData[section][arrayName], template],
        },
      }
    })
    setUnsavedChanges(true)
  }

  const handleRemoveArrayItem = (section, arrayName, index) => {
    setFormData((prevData) => {
      if (arrayName.includes(".")) {
        const [nestedSection, nestedArray] = arrayName.split(".")
        const newArray = [...prevData[section][nestedSection][nestedArray]]
        newArray.splice(index, 1)
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [nestedSection]: {
              ...prevData[section][nestedSection],
              [nestedArray]: newArray,
            },
          },
        }
      }

      const newArray = [...prevData[section][arrayName]]
      newArray.splice(index, 1)
      return {
        ...prevData,
        [section]: {
          ...prevData[section],
          [arrayName]: newArray,
        },
      }
    })
    setUnsavedChanges(true)
  }

  const handleFileChange = (section, field, event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: URL.createObjectURL(file),
        },
      }))
      setUnsavedChanges(true)
    }
  }

  const handleNestedFileChange = (section, nestedSection, field, event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [nestedSection]: {
            ...prevData[section][nestedSection],
            [field]: URL.createObjectURL(file),
          },
        },
      }))
      setUnsavedChanges(true)
    }
  }

  const handleArrayItemFileChange = (section, arrayName, index, field, event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData((prevData) => {
        const newArray = [...prevData[section][arrayName]]
        newArray[index] = {
          ...newArray[index],
          [field]: URL.createObjectURL(file),
        }
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [arrayName]: newArray,
          },
        }
      })
      setUnsavedChanges(true)
    }
  }

  const handleSave = () => {
    console.log("Saving showcase data:", formData)
    setUnsavedChanges(false)
    setShowSaveMessage(true)
    setTimeout(() => {
      setShowSaveMessage(false)
    }, 3000)
  }

  const renderHeaderTab = () => {
    return (
      <div className="tab-content">
        <h3>Настройки хедера</h3>
        <div className="form-group">
          <label>Логотип сайта</label>
          <div className="file-input-container">
            {formData.header.logo && (
              <div className="image-preview">
                <img src={formData.header.logo || "/placeholder.svg"} alt="Логотип" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange("header", "logo", e)} />
          </div>
          <small>Рекомендуемый размер: 100x100 пикселей</small>
        </div>
      </div>
    )
  }

  const renderAboutPageTab = () => {
    return (
      <div className="tab-content">
        <h3>Страница "Кто мы"</h3>
        <h4>Разделы страницы</h4>
        {formData.aboutPage.sections.map((section, index) => (
          <div key={index} className="section-editor">
            <div className="section-header">
              <h5>Раздел {index + 1}</h5>
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveArrayItem("aboutPage", "sections", index)}
              >
                Удалить
              </button>
            </div>
            <div className="form-group">
              <label>Заголовок</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleArrayItemChange("aboutPage", "sections", index, "title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Содержание</label>
              <textarea
                rows="4"
                value={section.content}
                onChange={(e) => handleArrayItemChange("aboutPage", "sections", index, "content", e.target.value)}
              ></textarea>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-button"
          onClick={() =>
            handleAddArrayItem("aboutPage", "sections", {
              title: "Новый раздел",
              content: "Содержание нового раздела",
            })
          }
        >
          Добавить раздел
        </button>
      </div>
    )
  }

  const renderBannerTab = () => {
    return (
      <div className="tab-content">
        <h3>Настройки баннера</h3>
        <div className="form-group">
          <label>Изображение баннера</label>
          <div className="file-input-container">
            {formData.banner.image && (
              <div className="image-preview">
                <img src={formData.banner.image || "/placeholder.svg"} alt="Баннер" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange("banner", "image", e)} />
          </div>
          <small>Рекомендуемый размер: 1200x400 пикселей</small>
        </div>

        <h4>Контактная информация</h4>
        <div className="form-group">
          <label>Телефон</label>
          <input
            type="text"
            value={formData.banner.contactInfo.phone}
            onChange={(e) => handleNestedInputChange("banner", "contactInfo", "phone", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Имя владельца</label>
          <input
            type="text"
            value={formData.banner.contactInfo.ownerName}
            onChange={(e) => handleNestedInputChange("banner", "contactInfo", "ownerName", e.target.value)}
          />
        </div>

        <h4>Мессенджеры</h4>
        {formData.banner.contactInfo.messengers.map((messenger, index) => (
          <div key={index} className="section-editor">
            <div className="section-header">
              <h5>Мессенджер {index + 1}</h5>
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveArrayItem("banner", "contactInfo.messengers", index)}
              >
                Удалить
              </button>
            </div>
            <div className="form-group">
              <label>Название</label>
              <input
                type="text"
                value={messenger.name}
                onChange={(e) =>
                  handleArrayItemChange("banner", "contactInfo.messengers", index, "name", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input
                type="text"
                value={messenger.url}
                onChange={(e) =>
                  handleArrayItemChange("banner", "contactInfo.messengers", index, "url", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-button"
          onClick={() =>
            handleAddArrayItem("banner", "contactInfo.messengers", {
              name: "Новый мессенджер",
              url: "https://",
            })
          }
        >
          Добавить мессенджер
        </button>

        <h4>Социальные сети</h4>
        {formData.banner.contactInfo.socials.map((social, index) => (
          <div key={index} className="section-editor">
            <div className="section-header">
              <h5>Соцсеть {index + 1}</h5>
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveArrayItem("banner", "contactInfo.socials", index)}
              >
                Удалить
              </button>
            </div>
            <div className="form-group">
              <label>Название</label>
              <input
                type="text"
                value={social.name}
                onChange={(e) => handleArrayItemChange("banner", "contactInfo.socials", index, "name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input
                type="text"
                value={social.url}
                onChange={(e) => handleArrayItemChange("banner", "contactInfo.socials", index, "url", e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-button"
          onClick={() =>
            handleAddArrayItem("banner", "contactInfo.socials", {
              name: "Новая соцсеть",
              url: "https://",
            })
          }
        >
          Добавить соцсеть
        </button>
      </div>
    )
  }

  const renderCalendarTab = () => {
    return (
      <div className="tab-content">
        <h3>Настройки календаря</h3>
        <div className="form-group">
          <label>Инструкция под заголовком "Календарь"</label>
          <textarea
            rows="4"
            value={formData.calendar.instruction}
            onChange={(e) => handleInputChange("calendar", "instruction", e.target.value)}
          ></textarea>
        </div>
      </div>
    )
  }

  const renderAboutUsTab = () => {
    return (
      <div className="tab-content">
        <h3>Блок "О нас"</h3>

        <ToggleSwitch
          isChecked={formData.aboutUs.enabled}
          onChange={(e) => handleInputChange("aboutUs", "enabled", e.target.checked)}
          label="Отображать блок на сайте"
        />

        <h4>Разделы блока</h4>
        {formData.aboutUs.sections.map((section, index) => (
          <div key={index} className="section-editor">
            <div className="section-header">
              <h5>Раздел {index + 1}</h5>
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveArrayItem("aboutUs", "sections", index)}
              >
                Удалить
              </button>
            </div>
            <div className="form-group">
              <label>Заголовок</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleArrayItemChange("aboutUs", "sections", index, "title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Содержание</label>
              <textarea
                rows="4"
                value={section.content}
                onChange={(e) => handleArrayItemChange("aboutUs", "sections", index, "content", e.target.value)}
              ></textarea>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-button"
          onClick={() =>
            handleAddArrayItem("aboutUs", "sections", {
              title: "Новый раздел",
              content: "Содержание нового раздела",
            })
          }
        >
          Добавить раздел
        </button>
      </div>
    )
  }

  const renderResidentClubsTab = () => {
    return (
      <div className="tab-content">
        <h3>Блок "Сообщества-резиденты"</h3>

        <ToggleSwitch
          isChecked={formData.residentClubs.enabled}
          onChange={(e) => handleInputChange("residentClubs", "enabled", e.target.checked)}
          label="Отображать блок на сайте"
        />

        <div className="form-group">
          <label>Подзаголовок</label>
          <input
            type="text"
            value={formData.residentClubs.subtitle}
            onChange={(e) => handleInputChange("residentClubs", "subtitle", e.target.value)}
          />
        </div>
      </div>
    )
  }

  const renderDonationsTab = () => {
    return (
      <div className="tab-content">
        <h3>Блок "Донаты"</h3>

        <ToggleSwitch
          isChecked={formData.donations.enabled}
          onChange={(e) => handleInputChange("donations", "enabled", e.target.checked)}
          label="Отображать блок на сайте"
        />

        <div className="form-group">
          <label>Заголовок</label>
          <input
            type="text"
            value={formData.donations.title}
            onChange={(e) => handleInputChange("donations", "title", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Описание</label>
          <textarea
            rows="4"
            value={formData.donations.description}
            onChange={(e) => handleInputChange("donations", "description", e.target.value)}
          ></textarea>
        </div>

        <h4>Реквизиты для оплаты</h4>
        <div className="form-group">
          <label>Номер счета</label>
          <input
            type="text"
            value={formData.donations.paymentDetails.accountNumber}
            onChange={(e) => handleNestedInputChange("donations", "paymentDetails", "accountNumber", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Название банка</label>
          <input
            type="text"
            value={formData.donations.paymentDetails.bankName}
            onChange={(e) => handleNestedInputChange("donations", "paymentDetails", "bankName", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Получатель</label>
          <input
            type="text"
            value={formData.donations.paymentDetails.recipientName}
            onChange={(e) => handleNestedInputChange("donations", "paymentDetails", "recipientName", e.target.value)}
          />
        </div>

        <h4>Предустановленные суммы</h4>
        <div className="form-group">
          <label>Суммы (через запятую)</label>
          <input
            type="text"
            value={formData.donations.predefinedAmounts.join(", ")}
            onChange={(e) => {
              const values = e.target.value.split(",").map((val) => Number.parseInt(val.trim(), 10) || 0)
              handleInputChange("donations", "predefinedAmounts", values)
            }}
          />
          <small>Например: 100, 500, 1000, 2000</small>
        </div>
      </div>
    )
  }

  const renderPartnershipTab = () => {
    return (
      <div className="tab-content">
        <h3>Блок "Будем партнёрами"</h3>
        <div className="form-group">
          <label>Заголовок</label>
          <input
            type="text"
            value={formData.partnership.title}
            onChange={(e) => handleInputChange("partnership", "title", e.target.value)}
          />
        </div>

        <h4>Разделы блока</h4>
        {formData.partnership.sections.map((section, index) => (
          <div key={index} className="section-editor">
            <div className="section-header">
              <h5>Раздел {index + 1}</h5>
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveArrayItem("partnership", "sections", index)}
              >
                Удалить
              </button>
            </div>
            <div className="form-group">
              <label>Заголовок</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleArrayItemChange("partnership", "sections", index, "title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Содержание</label>
              <textarea
                rows="4"
                value={section.content}
                onChange={(e) => handleArrayItemChange("partnership", "sections", index, "content", e.target.value)}
              ></textarea>
            </div>
            {section.image !== undefined && (
              <div className="form-group">
                <label>Изображение</label>
                <div className="file-input-container">
                  {section.image && (
                    <div className="image-preview">
                      <img src={section.image || "/placeholder.svg"} alt={section.title} />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleArrayItemFileChange("partnership", "sections", index, "image", e)}
                  />
                </div>
              </div>
            )}
            {section.contactName !== undefined && (
              <>
                <div className="form-group">
                  <label>Имя контактного лица</label>
                  <input
                    type="text"
                    value={section.contactName}
                    onChange={(e) =>
                      handleArrayItemChange("partnership", "sections", index, "contactName", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Телефон контактного лица</label>
                  <input
                    type="text"
                    value={section.contactPhone}
                    onChange={(e) =>
                      handleArrayItemChange("partnership", "sections", index, "contactPhone", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Email контактного лица</label>
                  <input
                    type="text"
                    value={section.contactEmail}
                    onChange={(e) =>
                      handleArrayItemChange("partnership", "sections", index, "contactEmail", e.target.value)
                    }
                  />
                </div>
              </>
            )}
          </div>
        ))}
        <button
          type="button"
          className="add-button"
          onClick={() =>
            handleAddArrayItem("partnership", "sections", {
              title: "Новый раздел",
              content: "Содержание нового раздела",
              image: "",
            })
          }
        >
          Добавить раздел
        </button>
      </div>
    )
  }

  const renderPartnersTab = () => {
    return (
      <div className="tab-content">
        <h3>Блок "Партнёры"</h3>

        <ToggleSwitch
          isChecked={formData.partners.enabled}
          onChange={(e) => handleInputChange("partners", "enabled", e.target.checked)}
          label="Отображать блок на сайте"
        />
      </div>
    )
  }

  const renderFooterTab = () => {
    return (
      <div className="tab-content">
        <h3>Настройки футера</h3>
        <div className="form-group">
          <label>Контактное лицо</label>
          <input
            type="text"
            value={formData.footer.contactPerson}
            onChange={(e) => handleInputChange("footer", "contactPerson", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Телефон</label>
          <input
            type="text"
            value={formData.footer.phone}
            onChange={(e) => handleInputChange("footer", "phone", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Город</label>
          <input
            type="text"
            value={formData.footer.city}
            onChange={(e) => handleInputChange("footer", "city", e.target.value)}
          />
        </div>

        <h4>Социальные сети</h4>
        {formData.footer.socials.map((social, index) => (
          <div key={index} className="section-editor">
            <div className="section-header">
              <h5>Соцсеть {index + 1}</h5>
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveArrayItem("footer", "socials", index)}
              >
                Удалить
              </button>
            </div>
            <div className="form-group">
              <label>Название</label>
              <input
                type="text"
                value={social.name}
                onChange={(e) => handleArrayItemChange("footer", "socials", index, "name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input
                type="text"
                value={social.url}
                onChange={(e) => handleArrayItemChange("footer", "socials", index, "url", e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-button"
          onClick={() =>
            handleAddArrayItem("footer", "socials", {
              name: "Новая соцсеть",
              url: "https://",
            })
          }
        >
          Добавить соцсеть
        </button>
      </div>
    )
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "header":
        return renderHeaderTab()
      case "aboutPage":
        return renderAboutPageTab()
      case "banner":
        return renderBannerTab()
      case "calendar":
        return renderCalendarTab()
      case "aboutUs":
        return renderAboutUsTab()
      case "residentClubs":
        return renderResidentClubsTab()
      case "donations":
        return renderDonationsTab()
      case "partnership":
        return renderPartnershipTab()
      case "partners":
        return renderPartnersTab()
      case "footer":
        return renderFooterTab()
      default:
        return <div>Выберите раздел для редактирования</div>
    }
  }

  return (
    <div className="showcase-editor">
      <h2 className="editor-title">Редактор витрины</h2>
      <p className="editor-description">
        Здесь вы можете редактировать содержимое витрины сайта. Выберите раздел для редактирования из меню слева.
      </p>

      <div className="editor-container">
        <div className="editor-sidebar">
          <ul className="editor-tabs">
            <li className={activeTab === "header" ? "active" : ""} onClick={() => setActiveTab("header")}>
              Хедер
            </li>
            <li className={activeTab === "aboutPage" ? "active" : ""} onClick={() => setActiveTab("aboutPage")}>
              Страница "Кто мы"
            </li>
            <li className={activeTab === "banner" ? "active" : ""} onClick={() => setActiveTab("banner")}>
              Баннер
            </li>
            <li className={activeTab === "calendar" ? "active" : ""} onClick={() => setActiveTab("calendar")}>
              Календарь
            </li>
            <li className={activeTab === "aboutUs" ? "active" : ""} onClick={() => setActiveTab("aboutUs")}>
              О нас
            </li>
            <li className={activeTab === "residentClubs" ? "active" : ""} onClick={() => setActiveTab("residentClubs")}>
              Сообщества-резиденты
            </li>
            <li className={activeTab === "donations" ? "active" : ""} onClick={() => setActiveTab("donations")}>
              Донаты
            </li>
            <li className={activeTab === "partnership" ? "active" : ""} onClick={() => setActiveTab("partnership")}>
              Будем партнёрами
            </li>
            <li className={activeTab === "partners" ? "active" : ""} onClick={() => setActiveTab("partners")}>
              Партнёры
            </li>
            <li className={activeTab === "footer" ? "active" : ""} onClick={() => setActiveTab("footer")}>
              Футер
            </li>
          </ul>
        </div>

        <div className="editor-content">
          {renderActiveTab()}

          <div className="editor-actions">
            <button
              type="button"
              className={`save-button ${unsavedChanges ? "active" : ""}`}
              onClick={handleSave}
              disabled={!unsavedChanges}
            >
              Сохранить изменения
            </button>
            {showSaveMessage && <span className="save-message">Изменения успешно сохранены!</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowcaseEditor
