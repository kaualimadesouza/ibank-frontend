import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Register } from "./pages/login/register";
import { Dashboard } from "./pages/dashboard";
import { Cards } from "./pages/dashboard/cards";
import { About } from "./pages/dashboard/about";

export function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard/:user" element={<Dashboard />}></Route>
        <Route path="/dashboard/:user/home" element={<Dashboard />}></Route>
        <Route path="/dashboard/:user/cards" element={<Cards />}></Route>
        <Route path="/dashboard/:user/about" element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
