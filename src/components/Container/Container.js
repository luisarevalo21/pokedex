import React, { useEffect, useState, useCallback } from "react";
import styles from "./Container.module.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import Tab from "../Tab/Tab";
import Spinner from "../Spinner/Spinner";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

import { useHistory, Redirect } from "react-router-dom";

const generationStrings = [
  { 0: null },
  {
    1: "https://pokeapi.co/api/v2/pokemon?limit=151",
    next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=151",
  },

  {
    2: "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100",
    next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=251",
  },
  {
    3: "https://pokeapi.co/api/v2/pokemon?offset=251&limit=134",
    next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=386",
  },
  {
    4: "https://pokeapi.co/api/v2/pokemon?offset=386&limit=106",
    next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=493",
  },
  {
    5: "https://pokeapi.co/api/v2/pokemon?offset=493&limit=156",
    next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=649",
  },
  {
    6: "https://pokeapi.co/api/v2/pokemon?offset=649&limit=71",
    next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=721",
  },
  {
    7: "https://pokeapi.co/api/v2/pokemon?offset=721&limit=87",
    next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=809",
  },
  {
    8: "https://pokeapi.co/api/v2/pokemon?offset=809&limit=89",
    next: "",
  },
];

// 6: "https://pokeapi.co/api/v2/pokemon?limit=20",
// 7: "https://pokeapi.co/api/v2/pokemon?limit=20",

const Container = props => {
  const history = useHistory();
  const [pokemon, setPokemon] = useState([]);
  const [nextPokemon, setNextPokemon] = useState("");
  const [currentGen, setCurrentGen] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState("");

  const fetchPokemonData = async pokemon => {
    const response = await fetch(pokemon.url);

    if (response.ok) {
      const responseJson = await response.json();

      let type2 = null;
      if (responseJson.types.length === 2) {
        type2 = responseJson.types[1].type;
      }

      return {
        name: responseJson.name,
        dexNumber: responseJson.id,
        type1: responseJson.types[0].type,
        type2: type2,
        image: responseJson.sprites.other["official-artwork"]["front_default"],
      };
    }
  };

  const fetchGenPokemon = async generation => {
    const endpoint = generationStrings[generation][generation];
    setIsLoading(true);
    console.log("endpoint ", endpoint);
    // console.log("generation", generation);
    try {
      const results = await fetch(endpoint);

      console.log("resu;ts", results);
      const responseJson = await results.json();
      console.log(responseJson);

      const data = await Promise.all(
        responseJson.results.map(pokemon => fetchPokemonData(pokemon))
      );

      console.log("data", data);
      setPokemon(data);
      setIsLoading(false);
      // if (generationStrings[generation].next === "") {
      //   console.log("inside if");

      if (generationStrings[generation].next === "") {
        console.log("sindie if of fetch gen pokemon");
        setNextPokemon("");
      } else setNextPokemon(generationStrings[generation].next);
      // }

      // console.log(responseJson.pokemon_species);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchData = async (endPoint = null) => {
    setIsLoading(true);
    try {
      if (!endPoint) {
        return;
      }
      console.log("edn point", endPoint);
      const result = await fetch(endPoint);

      const responseJson = await result.json();
      // console.log(responseJson.next);

      const data = await Promise.all(
        responseJson.results.map(async pokemon => fetchPokemonData(pokemon))
      );

      console.log("data", responseJson);
      setPokemon(prevState => prevState.concat(data));
      setNextPokemon(responseJson.next);
      setIsLoading(false);
    } catch (error) {
      console.log("error occured", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );

        setIsLoading(true);
        const responseJson = await result.json();

        const data = await Promise.all(
          responseJson.results.map(async pokemon => fetchPokemonData(pokemon))
        );

        setPokemon(data);
        setNextPokemon(responseJson.next);
        setIsLoading(false);
      } catch (error) {
        console.log("error occured", error);
        setIsLoading(false);
      }
    };

    fetchData("https://pokeapi.co/api/v2/pokemon?limit=20");
  }, []);

  const handleClick = () => {
    console.log("button clicked");
    fetchData(nextPokemon);
  };
  const handleTabClick = gen => {
    console.log("tab clicked");
    setCurrentGen(gen);

    fetchGenPokemon(gen);
  };

  const handleCardClick = pokemonDetails => {
    console.log("card clicked", pokemonDetails);
    props.handleNewMon(true);

    // return <Redirect to={`/${selected}`} />;
    history.push(`/${pokemonDetails.id}`);
    // <Link to={`/${selected}`} />;
    // setSelectedPokemon(selected);
  };
  // console.log("POKEMON", pokemon);

  let data = null;
  let filteredList = null;
  if (pokemon) {
    if (props.searchVal) {
      filteredList = pokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(props.searchVal.toLowerCase())
      );
      data = filteredList.map(el => (
        <PokemonCard
          name={el.name}
          image={el.image}
          type1={el.type1}
          type2={el.type2}
          dexNumber={el.dexNumber}
          key={el.dexNumber}
          handleClick={handleCardClick}
        />
      ));
    }
    // console.log("isnnde if");
    else
      data = pokemon.map(el => (
        <PokemonCard
          name={el.name}
          image={el.image}
          type1={el.type1}
          type2={el.type2}
          dexNumber={el.dexNumber}
          key={el.dexNumber}
          handleClick={handleCardClick}
        />
      ));
  }

  // if (props.searchVal) {
  //   console.log("isnide if");
  //   data = data.filter(pokemon => {
  //     console.log(pokemon);
  //     console.log(props.searchVal);
  //     pokemon.name.includes(props.searchVal);
  //   });
  // }

  // console.log(nextPokemon);

  return (
    <div className={styles.container}>
      <Tab className={styles.tab} handleClick={e => handleTabClick(e)}></Tab>
      {data}
      <Spinner isLoading={isLoading} />
      <br />
      {nextPokemon === "" ? <button> no more pokemon</button> : null}
      {/* make this buton hidden?  */}
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={isLoading}
      >
        More
      </button>

      {/* <Spinner /> */}

      {/* <PokemonCard image={pokemon.image} />
      <PokemonCard /> <PokemonCard /> <PokemonCard /> <PokemonCard />{" "}
      <PokemonCard /> <PokemonCard /> <PokemonCard /> <PokemonCard />{" "}
      <PokemonCard /> <PokemonCard /> <PokemonCard /> */}
    </div>
  );
};

export default Container;
