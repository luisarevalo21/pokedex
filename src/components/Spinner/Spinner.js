import React from "react";

import styles from "./Spinner.module.css";
const Spinner = props => {
  if (props.isLoading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.loader}>
          {/* <i className="fa fa-cog fa-spin" /> */}
        </div>
      </div>
    );
  }
  return null;
};

export default Spinner;
