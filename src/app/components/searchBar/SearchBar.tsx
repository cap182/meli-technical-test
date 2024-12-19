import React, { useState } from "react";

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
    <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "5px", borderRadius: "4px", border: "1px solid gray" }}
      />
      <input
        type="text"
        placeholder="Species"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        style={{ padding: "5px", borderRadius: "4px", border: "1px solid gray" }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ padding: "5px", borderRadius: "4px", border: "1px solid gray" }}
      >
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button
        onClick={handleSearch}
        style={{
          padding: "5px 10px",
          borderRadius: "4px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
