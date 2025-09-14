import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header darkMode={darkMode} />
      <About darkMode={darkMode} />
    </>
  );
}
