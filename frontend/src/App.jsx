import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import SignInPage from "./pages/SignInPage"
import DashBoard from "./pages/DashBoard"
import IncidentDetail from "./pages/IncidentDetail"
import CreateMeet from "./pages/CreateMeet"
import ChatComponent from "./pages/Inference.jsx"

function App() {
    return (
        <Router>
            <div className="main">
                <div className="gradient" />
            </div>

            <main className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signIn" element={<SignInPage />} />
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route path="/incident" element={<IncidentDetail />} />
                    <Route path="/create-Meet" element={<CreateMeet />} />
                    <Route path="/llama" element={<ChatComponent />} />
                </Routes>
            </main>
        </Router>
    )
}

export default App
