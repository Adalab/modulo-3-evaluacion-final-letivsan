import "./App.scss";

function App() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Personajes de Harry Potter(usar FOTO)</h1>
      </header>
      <main className="main">
        <section className="characters">
          <h2 className="characters__title">Listado de personajes</h2>

          <ul className="characters__list">
            <li className="card">
              <img 
              className="card__img"
              src="https://placehold.co/210x295/ffffff/666666/?format=svg&text=Harry+Potter"
              alt="Personaje de Harry Potter"
              />

              <div className="card__info">
                <h3 className="card__name">
                  Harry Potter
                </h3>
                <p className="card__species">Humano</p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;


