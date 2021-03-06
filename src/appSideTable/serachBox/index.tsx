import "./index.css";
import SearchInput from "@util/searchInput";

export default function SearchBox() {
  return (
    <div id="search-box">
      <span className="title-span btn-primary">Filters:</span>
      <SearchInput />
    </div>
  );
}
