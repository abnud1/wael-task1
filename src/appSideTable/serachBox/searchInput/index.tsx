import { useState } from "react";
import "./index.css";
import searchIcon from "./searchIcon.png";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  return (
    <div id="search-input">
      <img src={searchIcon} alt="search" id="search-icon" />
      <input
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        type="text"
        className="form-control bg-dark border-secondary"
      />
    </div>
  );
}
