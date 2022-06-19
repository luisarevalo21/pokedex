import React from "react";
import styles from "./header.module.css";
import { useHistory } from "react-router-dom";

const Header = props => {
  const history = useHistory();

  const handleChange = e => {
    props.handleChange(e.target.value);
  };

  const handleClick = () => {
    props.handleNewMon(false);
    history.push("/");
  };
  return (
    <div className={styles.header}>
      <h1 onClick={handleClick}>Pokemon Pokedex</h1>

      {props.currentMon === false ? (
        <div className={styles.inputContainer}>
          <input placeholder="search mons" onChange={handleChange}></input>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
