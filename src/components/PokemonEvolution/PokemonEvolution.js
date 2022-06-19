import React from "react";
import styles from "./PokemonEvolution.module.css";

const POkemonEvolution = props => {
  let arrow = null;

  if (props.index <= 1 && props.index !== props.length) {
    arrow = (
      <div className={styles.icon}>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </div>
    );
  }

  return (
    <>
      <div
        // key={props.key}
        onClick={() => props.handleClick("", props.id)}
        className={styles.card}
      >
        <div>
          <img src={props.image} alt="pokemon" />
        </div>
        <div className={styles.details}>
          <span>
            {props.name} #{props.dexNumber}
          </span>
          {/* </div> */}
          <div className={styles.typeContainer}>
            <div className={styles.types}>
              <p className={`${props.type1.name}`}>{props.type1.name}</p>
              {props.type2 !== null ? (
                <p className={`${props.type2.name}`}>{props.type2.name}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {arrow}
    </>
  );
};

export default POkemonEvolution;
