import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

import Sidebar from "./components/Navigasi/Sidebar";
import Dashboard from "./components/Main/Dashboard";
import Users from "./components/Main/Users";
import Laporan from "./components/Main/Laporan";
import Sampah from "./components/Main/Sampah";
import Login from "./components/login";

// import your icons
import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Mqtt from "./services/mqtt";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/mqtt" element={<Mqtt />} />
        <Route path="/login" element={<Login />} />
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

//Icons
library.add(fab, fas, far);
