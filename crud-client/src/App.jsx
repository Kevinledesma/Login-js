import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>index</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-task" element={<h1>new task</h1>} />
          <Route path="/tasks/:id" element={<h1>update task</h1>} />
          <Route path="/profile" element={<h1>profile</h1>} />
          <Route path="/tasks" element={<h1>tasks</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
