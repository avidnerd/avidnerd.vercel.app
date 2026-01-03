import { BrowserRouter } from "react-router-dom"
import { About, Contact, Experience, Feedbacks, 
Hero, Navbar, Blog, Works, Hobbies, StarsCanvas } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-[#050a30]">
        <div className="bg-hero-pattern bg-cover bg-no-repeat
        bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        {/* <Tech /> */}
        <Works />
        <Blog />
        <Hobbies />
        <div className="relative z-0">
          <Feedbacks />
          <StarsCanvas />
        </div>
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App