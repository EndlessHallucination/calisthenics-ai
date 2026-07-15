import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Setup from './pages/Setup'
import Dashboard from './pages/Dashboard'
import Workout from './pages/Workout'
import History from './pages/History'
import SkillPicker from './pages/SkillPicker'
import Nav from './components/Nav'
import Landing from "./pages/Landing";
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<><Nav /><Setup /></>} />
        <Route path="/dashboard" element={<><Nav /><Dashboard /></>} />
        <Route path="/skills" element={<><Nav /><SkillPicker /></>} />
        <Route path="/workout" element={<><Nav /><Workout /></>} />
        <Route path="/history" element={<><Nav /><History /></>} />
        <Route path="/profile" element={<><Nav /><Profile /></>} />

      </Routes>

    </BrowserRouter>
  )
}

export default App