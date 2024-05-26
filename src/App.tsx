import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

import Sidebar from "./components/Navigasi/Sidebar";
import Dashboard from "./components/Main/Dashboard";
import Users from "./components/Main/Users";
import Laporan from "./components/Main/Laporan";
import Sampah from "./components/Main/Sampah";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sampah" element={<Sampah />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
