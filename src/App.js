import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import Spinner from "./components/Spinner/Spinner";
import { useState } from "react";
function App() {
  const [searchVal, setSearchVal] = useState("");
  const [currentMon, setCurrentMon] = useState(false);
  const handleChange = val => {
    setSearchVal(val);
  };

  const handleNewMon = entry => {
    setCurrentMon(entry);
  };

  return (
    <>
      <Header
        handleChange={handleChange}
        currentMon={currentMon}
        handleNewMon={handleNewMon}
      />

      <Switch>
        {/* <Route path="/home">
          <Home />
        </Route> */}
        <Route path="/:pokemonId">
          <PokemonDetails />
        </Route>
        <Route path="/">
          <Container searchVal={searchVal} handleNewMon={handleNewMon} />
        </Route>

        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
