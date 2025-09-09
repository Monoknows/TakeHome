import "./App.css";
import { About } from "./Components/About/About";
import { Header } from "./Components/Header/Header";
import { Contacts } from "./Components/Contacts/Contacts";
import { Skills } from "./Components/Skills/Skills";
import { Info } from "./Components/Info/Info";
import NavBar from "./Components/NavBar/NavBar";
function App() {
  return (
    <div>
      <NavBar />
      <Header />
      <Skills />
      <Info />
      <About />
      <Contacts />
    </div>
  );
}

export default App;
