import { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Divider from "./Components/divider/divider";
import Skills from "./Components/Skills/Skills";
import { Info } from "./Components/Info/Info";
import Contacts from "./Components/Contacts/Contacts";
import Api from "./Components/Api/Api";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header darkMode={darkMode} />
      <Divider darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Info darkMode={darkMode} />
      <Api darkMode={darkMode} />
      <Contacts darkMode={darkMode} />
    </>
  );
}
