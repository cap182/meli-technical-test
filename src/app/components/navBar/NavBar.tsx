import React from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./styles.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons"
import logo from "./../../assets/rick-logo.svg"
import { faBook } from "@fortawesome/free-solid-svg-icons"

const NavBar = () => {
  const location = useLocation()

  return (
    <nav className={styles.navbar}>
       <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.links}>
        <Link
          to="/"
          className={`${styles.link} ${location.pathname === "/" ? styles.disabled : ""}`}
        >
          <FontAwesomeIcon icon={faUser} />
          <span className={styles.linkText}>Search</span>
        </Link>
        <Link
          to="/favorites"
          className={`${styles.link} ${location.pathname === "/favorites" ? styles.disabled : ""}`}
        >
          <FontAwesomeIcon icon={faHeart} />
          <span className={styles.linkText}>Favorites</span>
        </Link>
        <Link
          to="/history"
          className={`${styles.link} ${location.pathname === "/history" ? styles.disabled : ""}`}
        >
          <FontAwesomeIcon icon={faBook} />
          <span className={styles.linkText}>History</span>
        </Link>
      </div>
    </nav>
  )
}
export default NavBar
