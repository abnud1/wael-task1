import { useState } from "react";
import "./index.css";
import searchIcon from "./searchIcon.png";

interface SearchInputProps {
  dark?: boolean;
}
function SearchInput(props: SearchInputProps) {
  const { dark } = props;
  const [search, setSearch] = useState("");
  const divClassName = dark ? "search-input bg-dark" : "search-input";
  return (
    <div className={divClassName}>
      <img src={searchIcon} alt="search" className="search-icon" />
      <input
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        type="text"
        className="form-control bg-dark border-secondary"
      />
    </div>
  );
}
SearchInput.defaultProps = {
  dark: false,
};
export default SearchInput;
