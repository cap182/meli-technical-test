import React, { useState } from "react";
import styles from "./styles.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface SearchBarProps {
  onSearch: (filters: { name: string; species: string; status: string }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    onSearch({ name, species, status });
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        
      />
      <input
        type="text"
        placeholder="Species"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        
      >
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button onClick={handleSearch} className={styles.searchButton}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
