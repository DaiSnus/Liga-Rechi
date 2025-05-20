import react, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "./Header.css"

const Header = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Поэтический чемпионат", url: "https://poetry-championship.com" },
    { id: 2, name: "Речевой марафон", url: "https://speech-marathon.com" }
  ])

  const [communities, setCommunities] = useState([
    { id: 1, name: "Клуб ораторов", url: "https://speakers-club.com" },
    { id: 2, name: "Литературный клуб", url: "https://literature-club.com" }
  ])

  const [cities, setCities] = useState([
    { id: 1, name: "Екатеринбург", domain: "oratoriada.ru" },
    { id: 2, name: "Астана", domain: "oratoriada.kz" }
  ])

  const [currentCity, setCurrentCity] = useState("Екатеринбург")
  const [isProjectsDropdownVisible, setProjectsDropdownVisible] = useState(false)
  const [isCommunitiesDropdownVisible, setCommunitiesDropdownVisible] = useState(false)

  const projectsRef = useRef(null)
  const communitiesRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (projectsRef.current && !projectsRef.current.contains(event.target)) {
        setProjectsDropdownVisible(false)
      }
      if (communitiesRef.current && !communitiesRef.current.contains(event.target)) {
        setCommunitiesDropdownVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCityChange = (e) => {
    setCurrentCity(e.target.value)
  }

  return (
    <div className="header">
      <div className="header-logo">
        <img src="/img/logo.png" alt="Логотип Лиги Речи" />
      </div>

      <nav className="header-nav">
        <Link to="/about" className="nav-link">
          Кто мы
        </Link>

        <div
          className="nav-link projects"
          ref={projectsRef}
          onMouseEnter={() => setProjectsDropdownVisible(true)}
          onMouseLeave={() => setProjectsDropdownVisible(false)}
        >
          Проекты
          {isProjectsDropdownVisible && (
            <div className="dropdown">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-item"
                >
                  {project.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <div
          className="nav-link communities"
          ref={communitiesRef}
          onMouseEnter={() => setCommunitiesDropdownVisible(true)}
          onMouseLeave={() => setCommunitiesDropdownVisible(false)}
        >
          Сообщества
          {isCommunitiesDropdownVisible && (
            <div className="dropdown">
              {communities.map((community) => (
                <a
                  key={community.id}
                  href={community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-item"
                >
                  {community.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="header-city-selector">
      <label htmlFor="city">Выбрать город</label>
        <select id="city" value={currentCity} onChange={handleCityChange}>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Header
