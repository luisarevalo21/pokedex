import React from "react";
import styles from "./Tab.module.css";
const Tab = props => {
  const handleClick = gen => {
    props.handleClick(gen);
  };

  return (
    <div className={styles.Tab}>
      <ul>
        <li onClick={() => handleClick(1)}>
          <p>Gen 1</p>
        </li>
        <li onClick={() => handleClick(2)}>
          <p>Gen 2</p>
        </li>
        <li onClick={() => handleClick(3)}>
          <p>Gen 3</p>
        </li>
        <li onClick={() => handleClick(4)}>
          <p>Gen 4</p>
        </li>
        <li onClick={() => handleClick(5)}>
          <p>Gen 5</p>
        </li>
        <li onClick={() => handleClick(6)}>
          <p>Gen 6</p>
        </li>
        <li onClick={() => handleClick(7)}>
          <p>Gen 7</p>
        </li>
        <li onClick={() => handleClick(8)}>
          <p>Gen 8</p>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
