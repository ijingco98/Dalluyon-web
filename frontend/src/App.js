import StudentHome from "./pages/StudentHome"
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IncomeAdmin from "./pages/IncomeAdmin" 
import { useAuthContext } from './hooks/useAuthContext'


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <StudentHome /> : <Navigate to="/login" />} 
            />
           <Route 
              path="/admin" 
              element={user ? <IncomeAdmin /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
