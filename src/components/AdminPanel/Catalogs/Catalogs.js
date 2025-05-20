import React, { useState } from "react"
import SponsorRegalia from "./SponsorRegalia/SponsorRegalia"
import Roles from "./Roles/Roles"
import Awards from "./Awards/Awards"
import Skills from "./Skills/Skills"
import Projects from "./Projects/Projects"
import Communities from "./Communities/Communities"
import Cities from "./Cities/Cities"
import "./Catalogs.css"

const Catalogs = () => {
  const [activeTab, setActiveTab] = useState("sponsorRegalia")

  const renderContent = () => {
    switch (activeTab) {
      case "sponsorRegalia":
        return <SponsorRegalia />
      case "roles":
        return <Roles />
      case "awards":
        return <Awards />
      case "skills":
        return <Skills />
      case "projects":
        return <Projects />
      case "communities":
        return <Communities />
      case "cities":
        return <Cities />
      default:
        return <div>Выберите каталог из меню.</div>
    }
  }

  return (
    <div className="catalogs-container">
      <h1 className="catalogs-title">Управление каталогами</h1>

      <div className="catalogs-tabs">
        <button
          className={`tab-button ${activeTab === "sponsorRegalia" ? "active" : ""}`}
          onClick={() => setActiveTab("sponsorRegalia")}
        >
          Спонсорские регалии
        </button>
        <button className={`tab-button ${activeTab === "roles" ? "active" : ""}`} onClick={() => setActiveTab("roles")}>
          Роли
        </button>
        <button
          className={`tab-button ${activeTab === "awards" ? "active" : ""}`}
          onClick={() => setActiveTab("awards")}
        >
          Награды
        </button>
        <button
          className={`tab-button ${activeTab === "skills" ? "active" : ""}`}
          onClick={() => setActiveTab("skills")}
        >
          Гибкие навыки
        </button>
        <button
          className={`tab-button ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          Проекты
        </button>
        <button
          className={`tab-button ${activeTab === "communities" ? "active" : ""}`}
          onClick={() => setActiveTab("communities")}
        >
          Сообщества
        </button>
        <button
          className={`tab-button ${activeTab === "cities" ? "active" : ""}`}
          onClick={() => setActiveTab("cities")}
        >
          Города
        </button>
      </div>

      <div className="catalogs-content">{renderContent()}</div>
    </div>
  )
}

export default Catalogs
