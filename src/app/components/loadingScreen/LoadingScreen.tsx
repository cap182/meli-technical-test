import React from "react";
import styles from "./styles.module.css";
import loadGif from "./../../assets/loading.gif"

const LoadingScreen = () => {
    
  return (
    <div className={styles.container}>
      <img
        src={loadGif}
        alt="Loading..."
        className={styles.loadingImage}
      />
    </div>
  );
};

export default LoadingScreen;
