import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignInPage from "./pages/SignInPage";
import DashBoard from "./pages/DashBoard";
import IncidentDetail from "./pages/IncidentDetail";

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
        </Routes>
      </main>
    </Router>
  );
}

export default App;
