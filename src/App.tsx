import Navbar from "./components/Navbar";
import SidebarComponent from "./components/Sidebar";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <>
      <Navbar />

      <SidebarComponent />
    </>
  );
}

export default App;
