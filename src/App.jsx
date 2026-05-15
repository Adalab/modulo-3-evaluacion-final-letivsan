import { useEffect, useState } from 'react';
import Logo from './images/harry-potter-logo.png';
import './App.scss';

function App() {
  /*Sección de Variables de estado*/
  const [characters, setCharacters] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('gryffindor');

  /*Sección de useEffect*/
  useEffect(() => {
    console.log('Ejecutando el useEffect con la casa:', selectedHouse);
    fetch(`https://hp-api.onrender.com/api/characters/house/${selectedHouse}`)
      .then((res) => res.json())
      .then((data) => {
        const cleanData = data.map((character) => {
          return {
            id: character.id,
            name: character.name,
            species: character.species,
            image:
              character.image ||
              'https://placehold.co/210x295/ffffff/666666/?format=svg&text=Harry+Potter',
          };
        });
        setCharacters(cleanData);
      });
  }, [selectedHouse]);

  /*Sección de funciones de eventos*/
  const handleSearchName = (ev) => {
    setSearchName(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleSelectedHouse = (ev) => {
    setSelectedHouse(ev.target.value);
  };

  /*Sección de funciones helper para pintar el HTML*/
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchName.toLowerCase()),
  );

  console.log('Personajes filtrados por nombre:', filteredCharacters);

  return (
    <div className="page">
      <header className="header">
        <img className="header__logo" src={Logo} alt="Harry Potter Logo" />
      </header>

      <main className="main">
        <form className="filters" onSubmit={handleSubmit}>
          <label className="filters__label" htmlFor="searchName">
            Buscar por personaje:
          </label>

          <input
            className="filters__input"
            type="text"
            name="searchName"
            id="searchName"
            value={searchName}
            onInput={handleSearchName}
            placeholder="Ej: Hagrid"
          />

          <label className="filters__label" htmlFor="selectedHouse">
            Selecciona la casa:
          </label>

          <select
            className="filters__select"
            name="selectedHouse"
            id="selectedHouse"
            value={selectedHouse}
            onInput={handleSelectedHouse}
          >
            <option value="gryffindor">Gryffindor</option>
            <option value="slytherin">Slytherin</option>
            <option value="ravenclaw">Ravenclaw</option>
            <option value="hufflepuff">Hufflepuff</option>
          </select>
        </form>

        <section className="characters">
          <h2 className="characters__title">Personajes de {selectedHouse}</h2>

          {filteredCharacters.length === 0 ? (
            <p className="characters__message">
              No hay ningún personaje que coincida con la palabra {searchName}.
            </p>
          ) : (
            <ul className="characters__list">
              {filteredCharacters.map((character) => (
                <li className="card" key={character.id}>
                  <img
                    className="card__img"
                    src={character.image}
                    alt={`Foto de ${character.name}`}
                  />

                  <div className="card__info">
                    <h2 className="card__name">{character.name}</h2>
                    <p className="card__species">{character.species}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
