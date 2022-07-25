import { useState } from "react";
import "./App.scss";

import Header from "./components/Header";
import Search from "./components/Search";
import Button from "./components/Button";
import Card from "./components/Card";
import NewCardModal from "./components/NewCardModal";

import useFirebaseFetchData from "./hooks/useFirebaseFetchData";

function App() {
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Get CardData from firebase
  const dataCards = useFirebaseFetchData(searchText);

  return (
    <div>
      <Header />
      <Search setSearchText={setSearchText} />

      <section>
        <div>
          <span>Resultado da busca</span>
          <Button onClick={() => setIsNewCardModalOpen(true)}>Novo Card</Button>
        </div>
      </section>

      <div className="cards-container">
        {/* @ts-ignore */}
        {dataCards?.map((result) => {
          return (
            <Card
              title={result.titulo}
              image={result.image}
              key={result.id}
              id={result.id}
            />
          );
        })}
      </div>
      {isNewCardModalOpen && (
        <NewCardModal setIsNewCardModalOpen={setIsNewCardModalOpen} />
      )}
    </div>
  );
}

export default App;
