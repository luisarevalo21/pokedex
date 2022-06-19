import React from "react";
import styles from "./PokemonCard.module.css";

const PokemonCard = props => {
  // console.log(props.type1.name);

  // if (props) {
  //   const [type1, type2] = props.types;

  //   const Type1 = type1.type.name;
  //   const Type2 = type2.type.name;
  // }
  // console.log(type1.type.name);

  const handleClick = () => {
    props.handleClick({
      // dexNumber: props.dexNumber,
      // name: props.name,
      // image: props.image,
      // type1: props.type1.name,
      // type2: props.type2 !== null ? props.type2.name : null,
      id: props.dexNumber,
    });
  };

  return (
    <div className={styles.Card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img alt="text" placeholder="image" src={props.image} />
      </div>
      {/* <img alt="text">image</img> */}

      <div className={styles.badge}>
        <span className={styles.info}>
          #{props.dexNumber} | {props.name}
        </span>
        {/* <p className={styles.pokemonNum}>1</p>
        <span>|</span>
        <p>Pokemon</p> */}
      </div>

      <div className={styles.typeContainer}>
        <div className={styles.details}>
          <p className={`${props.type1.name}`}>{props.type1.name}</p>
        </div>

        {props.type2 !== null ? (
          <div className={styles.details}>
            <p className={`${props.type2.name}`}>{props.type2.name}</p>
          </div>
        ) : null}
        {/* <div className={styles.details}></div> */}
      </div>
      {/* <div>
        <div>
          <p>name</p>
          <p>pokemon number</p>
        </div>
      </div>
      <div>
        <p>type box</p>
      </div> */}
    </div>
  );
};

export default PokemonCard;
