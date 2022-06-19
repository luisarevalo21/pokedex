import React from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./PokemonDetails.module.css";
import "../../index.css";
import POkemonEvolution from "../PokemonEvolution/PokemonEvolution";

import Spinner from "../Spinner/Spinner";

const PokemonDetails = props => {
  // const location = useLocation();

  // console.log("state", state);

  const history = useHistory();

  // console.log("location:", state);
  // console.log(props);
  const { pokemonId } = useParams();

  const [displayPokemon, setDisplayPokemon] = useState({});
  const [evolution, setEvolution] = useState([]);
  const [previousMon, setPreviousMon] = useState({});
  const [nextMon, setNextMon] = useState({});
  const [isLoadingEvo, setIsLoadingEvo] = useState(false);

  const fetchEvolutionData = async chain => {
    setIsLoadingEvo(true);
    const response = await fetch(chain.url);

    if (response.ok) {
      const responseJson = await response.json();
      let type2 = null;
      if (responseJson.types.length === 2) {
        type2 = responseJson.types[1].type;
      }

      // console.log("TYPE2", type2);

      setIsLoadingEvo(false);
      return {
        name: responseJson.name,
        dexNumber: responseJson.id,
        type1: responseJson.types[0].type,
        id: responseJson.id,
        type2: type2,
        image: responseJson.sprites.other["official-artwork"]["front_default"],
      };
    }
  };

  const fetchHeaderDetails = async id => {
    if (id >= 1) {
      const nextResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id + 1}`
      );

      let prevResposne;
      if (id !== 1) {
        prevResposne = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id - 1}`
        );
      }

      if (nextResponse.ok) {
        const nextResult = await nextResponse.json();
        setNextMon({
          name: nextResult.name,
          id: nextResult.id,
        });
      }

      if (prevResposne) {
        const prevResult = await prevResposne.json();
        setPreviousMon({
          name: prevResult.name,
          id: prevResult.id,
        });
      } else {
        setPreviousMon("");
      }
    }
  };

  const fetchPokemonSpecies = async endpoint => {
    const evolutionChain = [];
    const response = await fetch(endpoint);
    // console.log(response);
    if (response.ok) {
      const responseJson = await response.json();

      const { name } = responseJson.chain.species;

      evolutionChain.push({
        name: responseJson.chain.species.name,
        url: `https://pokeapi.co/api/v2/pokemon/${name}`,
      });
      // console.log("responseJson", responseJson);

      if (responseJson.chain.evolves_to.length !== 0) {
        const { name } = responseJson.chain.evolves_to[0].species;
        evolutionChain.push({
          name: name,
          url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        });
        if (responseJson.chain.evolves_to[0].evolves_to.length !== 0) {
          const { name } =
            responseJson.chain.evolves_to[0].evolves_to[0].species;
          evolutionChain.push({
            name: name,
            url: `https://pokeapi.co/api/v2/pokemon/${name}`,
          });
        }
      }

      return [...evolutionChain];
    }
  };

  useEffect(() => {
    // setDisplayPokemon({ ...state });

    const fetchCurrentPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );

      if (response.ok) {
        const responseJson = await response.json();

        let type2 = null;
        if (responseJson.types.length === 2) {
          type2 = responseJson.types[1].type;
        }

        fetchHeaderDetails(responseJson.id);
        setDisplayPokemon({
          name: responseJson.name,
          dexNumber: responseJson.id,
          id: responseJson.id,
          type1: responseJson.types[0].type,
          type2: type2,
          image:
            responseJson.sprites.other["official-artwork"]["front_default"],
        });
      }
    };

    const fetchData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );

      if (response.ok) {
        const responseJson = await response.json();

        // console.log(responseJson);

        const chain = await fetchPokemonSpecies(
          responseJson.evolution_chain.url
        );

        // console.log("CHAIN", chain);
        const result = await Promise.all(
          chain.map(el => fetchEvolutionData(el))
        );
        // console.log(result);
        setEvolution(result);
      }
    };
    fetchCurrentPokemon();

    // console.log("displau pokemon", displayPokemon);
    fetchData();
  }, [pokemonId]);

  const handleClick = (trigger, id) => {
    // console.log("click triggered", id);
    if (id >= 1 && trigger === "next") {
      history.push(`/${id + 1}`);
    } else if (trigger === "prev" && id > 1) {
      history.push(`/${id - 1}`);
    } else if (trigger === "") {
      history.push(`/${id}`);
    }
  };

  let chain = <Spinner isLoading={isLoadingEvo} />;

  // console.log("previpis mon", previousMon);
  // console.log("next mon", nextMon);

  //make its own compoent
  //evoltuin component
  if (evolution.length > 0) {
    chain = evolution.map((el, index, array) => (
      <POkemonEvolution
        key={el.id}
        name={el.name}
        handleClick={() => handleClick("", el.id)}
        image={el.image}
        type2={el.type2}
        type1={el.type1}
        dexNumber={el.dexNumber}
        index={index}
        length={array.length - 1}
      />
    ));
  }
  // console.log("el", el);

  // <div
  //   key={el.name}
  //   onClick={() => handleClick("", el.id)}
  //   className={styles.card}
  // >
  //   <div>
  //     <img src={el.image} alt="pokemon" />
  //   </div>
  //   <div className={styles.details}>
  //     <span>
  //       {el.name} #{el.dexNumber}
  //     </span>
  //     {/* </div> */}
  //     <div className={styles.typeContainer}>
  //       <div className={styles.types}>
  //         <p className={`${el.type1.name}`}>{el.type1.name}</p>
  //         {el.type2 !== null ? (
  //           <p className={`${el.type2.name}`}>{el.type2.name}</p>
  //         ) : null}
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // );
  // });

  // console.log("EVOLUTION", evolution);

  // <i class="fa-solid fa-circle-chevron-right"></i>;
  if (JSON.stringify(displayPokemon) !== "{}") {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {previousMon ? (
            <div
              onClick={() => handleClick("prev", displayPokemon.id)}
              className={styles.prevHeader}
            >
              <span className={styles.prevIcon}>
                <i className="fa-solid fa-circle-chevron-left"></i>
              </span>
              <span className={styles.span}>{previousMon.id}</span>
              <span className={styles.span}>{previousMon.name}</span>
            </div>
          ) : null}

          <div
            onClick={() => handleClick("next", displayPokemon.id)}
            className={styles.nextHeader}
          >
            <span className={styles.span}>{nextMon.id}</span>
            <span className={styles.span}>{nextMon.name}</span>
            <span className={styles.nextIcon}>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
        </div>
        <div className={styles.headerDetails}>
          <span>
            {displayPokemon.name} | #{displayPokemon.dexNumber}
          </span>
        </div>

        <div className={styles["pokemon-info"]}>
          <div>
            <div className={styles.image}>
              <img src={displayPokemon.image} alt="pokemon " />
            </div>
          </div>

          <div className={styles.typeContainer}>
            <h3>Type</h3>
            <div className={styles.types}>
              <p className={`${displayPokemon.type1.name}`}>
                {displayPokemon.type1.name}
              </p>
              {displayPokemon.type2 !== null ? (
                <p className={`${displayPokemon.type2.name}`}>
                  {displayPokemon.type2.name}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <section className={styles.evoSection}>
          <h2>Evolution</h2>
          <div className={styles.evolutionContainer}>{chain}</div>
        </section>
      </div>
    );
  }
};

export default PokemonDetails;
