import { useEffect, useState } from "react";
import Logo from "./images/harry-potter-logo.png";
import "./App.scss";

function App() {

/*Sección de Variables de estado*/
const [characters, setCharacters] = useState([]);


/*Sección de useEffect*/
useEffect(() => {
  fetch('https://hp-api.onrender.com/api/characters/house/gryffindor')
  .then((res) => res.json())
  .then((data) => {
    console.log('Datos originales de la API:', data);

    const cleanData = data.map((character) => {
      return {
        id: character.id,
        name: character.name,
        species: character.species,
        image: character.image || 'https://placehold.co/210x295/ffffff/666666/?format=svg&text=Harry+Potter',
      };
    });

    console.log('Datos limpios:', cleanData);

    setCharacters(cleanData);
  });
}, []);

useEffect(() => {
  console.log('Estado de characters actualizado:', characters);
}, [characters]);

/*Sección de funciones de eventos*/

/*Sección de funciones helper para pintar el HTML*/
  const renderCharacters = characters.map((character) => {
    return (
      <li className="card" key={character.id}>
        <img
          className="card__img"
          src={character.image}
          alt={`Foto de ${character.name}`}
          title={`Foto de ${character.name}`}
        />

        <div className="card__info">
          <h3 className="card__name">{character.name}</h3>
          <p className="card__species">{character.species}</p>
        </div>
      </li>
    );
  });

  return (
    <>
      <header className="header">
        <h1 className="header__title">Personajes de Harry Potter</h1>
        <img 
        className="header__logo"
        src={Logo}
        alt="Harry Potter Logo"
        />
      </header>

      <main className="main">
        <section className="characters">
          <h2 className="characters__title">Listado de personajes</h2>

          <ul className="characters__list">{renderCharacters}</ul>
        </section>
      </main>
    </>
  );
}

export default App;


