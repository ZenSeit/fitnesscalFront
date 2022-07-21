import "./App.css";
import Signin from "./Components/Signin";
import { HomeUser } from "./Components/HomeUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./Services/ProtectedRoute";
import { useState } from "react";
import { SessionContext } from "./Services/SessionContext";
import Header from "./Components/Header";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Signin />} exact />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  <HomeUser />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>

    </div>
  );
}

export default App;
