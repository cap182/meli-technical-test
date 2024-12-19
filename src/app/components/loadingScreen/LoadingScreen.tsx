import React from "react";
import styles from "./styles.module.css";

const LoadingScreen = () => {
    
  return (
    <div className={styles.container}>
      <img
        src="/src/app/assets/loading.gif"
        alt="Loading..."
        className={styles.loadingImage}
      />
    </div>
  );
};

export default LoadingScreen;
