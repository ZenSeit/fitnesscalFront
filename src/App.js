import "./App.css";
import Signin from "./Components/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./Services/ProtectedRoute";
import { useState } from "react";
import { SessionContext } from "./Services/SessionContext";
import Header from "./Components/Header";
import { VerifyToken } from "./Services/Login";
import Home from "./Pages/Home";
import Food from "./Pages/Food";

function App() {
  const [user, setUser] = useState(VerifyToken().myDecodedToken);

  return (
    <div className="App">
      <SessionContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Signin />} />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Food"
              element={
                <ProtectedRoute>
                  <Food />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </SessionContext.Provider>
    </div>
  );
}

export default App;
