import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Create from "./pages/create";
import Profile from "./pages/profile";
import "./App.css";

import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
