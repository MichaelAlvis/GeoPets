import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Mapa from "./Mapa";

function Inicio() {
  return (
    <div className="contenido">
      <h1>Bienvenido a GeoPets 🐾</h1>
      <p>
        GeoPets nació con la idea de ayudar a las comunidades a encontrar y proteger
        a sus mascotas utilizando mapas inteligentes. 🚀
      </p>
      <p>
        Nuestra historia comenzó cuando nos dimos cuenta de que muchos perros y gatos
        se pierden cada día, y las personas no tienen herramientas efectivas para ubicarlos.
        Por eso, decidimos combinar la tecnología geoespacial con el amor por los animales. ❤️
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      {/* Header con degradado */}
      <header className="header">
        <div className="logo">GeoPets</div>
        <nav className="nav">
          <Link to="/">Mapa</Link>
          <Link to="/inicio">Inicio</Link>
        </nav>
      </header>

      {/* Contenido dinámico */}
      <Routes>
        <Route path="/" element={<Mapa />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </Router>
  );
}
