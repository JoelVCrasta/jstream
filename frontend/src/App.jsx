import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Watch from "./pages/Watch"

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch" element={<Watch />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
