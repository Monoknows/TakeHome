import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Divider from "./Components/divider/divider";
import Skills from "./Components/Skills/Skills";
import { Info } from "./Components/Info/Info";
import Contacts from "./Components/Contacts/Contacts";
import ApiChatbot from "./Components/Api/apiChatbot";
import Seminars from "./Components/Seminars/Seminars";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
              <Header darkMode={darkMode} />
              <Divider darkMode={darkMode} />
              <About darkMode={darkMode} />
              <Skills darkMode={darkMode} />
              <Info darkMode={darkMode} />
              <Seminars darkMode={darkMode} />
              <ApiChatbot darkMode={darkMode} />
              <Contacts darkMode={darkMode} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
