import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { removeFavorite, addFavorite } from "../../slices/favoritesSlice"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import placeholder from "./../../assets/placeholder.png"
import styles from "./styles.module.css";


interface CharacterCardProps {
  id: number
  name: string
  status: string
  species: string
  image: string
}

const CharacterCard = ({
  id,
  name,
  status,
  species,
  image,
}: CharacterCardProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds,
  )

  const isFavorite = favoriteIds.includes(id)

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id))
    } else {
      dispatch(addFavorite(id))
    }
  }

  return (
    <div className={styles.card}>
      <Link to={`/character/${id}`} className={styles.cardLink}>
        <LazyLoadImage
          src={image}
          alt={name}
          placeholderSrc={placeholder}
          className={styles.characterImage}
        />
        <h3>{name}</h3>
      </Link>
      <p>
        {status} - {species}
      </p>
      <button
        onClick={toggleFavorite}
        className={`${styles.favoriteButton} ${
          isFavorite ? styles.isFavorite : ""
        }`}
      >
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>
    </div>
  );
};

export default CharacterCard
