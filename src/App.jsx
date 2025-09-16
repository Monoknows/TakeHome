import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Divider from "./Components/divider/divider";
import Skills from "./Components/Skills/Skills";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header darkMode={darkMode} />
      <Divider darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Divider darkMode={darkMode} />
      <Skills darkMode={darkMode} />
    </>
  );
}
