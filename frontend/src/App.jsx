import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignInPage from "./pages/SignInPage";

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
        </Routes>
      </main>

    </Router>
  );
}

export default App;
