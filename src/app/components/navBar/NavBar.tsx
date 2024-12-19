import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <h2>Rick and Morty, tech test</h2>
      </div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Characters
        </Link>
        <Link to="/favorites" className={styles.link}>
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
