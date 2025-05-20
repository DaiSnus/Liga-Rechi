import Header from "./Header/Header"
import Banner from "./Banner/Banner"
import Calendar from "./Calendar/Calendar"
import ResidentClubs from "./ResidentClubs/ResidentClubs"
import Donations from "./Donations/Donations"
import Partnership from "./Partnership/Partnership"
import Partners from "./Partners/Partners"
import Team from "./Team/Team"
import Footer from "./Footer/Footer"
import "./Showcase.css"

const Showcase = () => {
  return (
    <div className="showcase">
      <Header />
      <Banner />
      <Calendar />
      <ResidentClubs />
      <Donations />
      <Partnership />
      <Partners />
      <Team />
      <Footer />
    </div>
  )
}

export default Showcase
