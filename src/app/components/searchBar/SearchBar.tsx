import React, { useState } from "react";
import styles from "./styles.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { changeFilters } from "../../slices/filtersSlice";


interface SearchBarProps {
  onSearch: (filters: { name: string; species: string; status: string }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {

  const actualFilters = useSelector((state: RootState) => state.filters)
  const dispatch = useDispatch<AppDispatch>()

  const [name, setName] = useState(actualFilters.name);
  const [species, setSpecies] = useState(actualFilters.species);
  const [status, setStatus] = useState(actualFilters.status);

  const handleSearch = () => {
    // onSearch({ actualFilters.name, actualFilters.species, actualFilters.status });
    dispatch(changeFilters({ name, species, status, page:1 }));
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
