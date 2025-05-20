import React, { useState } from "react"
import AccountsEditor from "./AccountsEditor/AccountsEditor"
import AccountsTable from "./AccountsTable/AccountsTable"
import Catalogs from "./Catalogs/Catalogs"
import DonationDashboard from "./DonationDashboard/DonationDashboard"
import Settings from "./Settings/Settings"
import ShowcaseEditor from "./ShowcaseEditor/ShowcaseEditor"
import "./AdminPanel.css"

const AdminPanel = () => {
  const [currentSection, setCurrentSection] = useState("accountsTable")
  const [menuOpen, setMenuOpen] = useState(false)

  const renderContent = () => {
    switch (currentSection) {
      case "accountsTable":
        return <AccountsTable />
      case "accountsEditor":
        return <AccountsEditor />
      case "catalogs":
        return <Catalogs />
      case "donations":
        return <DonationDashboard />
      case "settings":
        return <Settings />
      case "showcaseEditor":
        return <ShowcaseEditor />
      default:
        return <div>Выберите раздел из меню.</div>
    }
  }

  const handleNavClick = (section) => {
    setCurrentSection(section)
    setMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="adminka">
      <h1 className="admin-title">Админ панель</h1>
      
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        {menuOpen ? "Закрыть" : "Меню"}
      </button>
      
      <div className="admin-panel">
        <nav className={`admin-nav ${menuOpen ? "open" : ""}`}>
          <ul className="admin-nav-list">
            <li 
              className={currentSection === "accountsTable" ? "active" : ""}
              onClick={() => handleNavClick("accountsTable")}
            >
              Список аккаунтов
            </li>
            <li 
              className={currentSection === "catalogs" ? "active" : ""}
              onClick={() => handleNavClick("catalogs")}
            >
              Каталоги
            </li>
            <li 
              className={currentSection === "accountsEditor" ? "active" : ""}
              onClick={() => handleNavClick("accountsEditor")}
            >
              Редактор аккаунтов
            </li>
            <li 
              className={currentSection === "showcaseEditor" ? "active" : ""}
              onClick={() => handleNavClick("showcaseEditor")}
            >
              Редактор витрины
            </li>
            <li 
              className={currentSection === "donations" ? "active" : ""}
              onClick={() => handleNavClick("donations")}
            >
              Донаты
            </li>
            <li 
              className={currentSection === "settings" ? "active" : ""}
              onClick={() => handleNavClick("settings")}
            >
              Настройки
            </li>
          </ul>
        </nav>
        <main className="content">{renderContent()}</main>
      </div>
    </div>
  )
}

export default AdminPanel
