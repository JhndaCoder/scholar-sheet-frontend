import './SearchBar.scss';

const SearchBar = () => {
  return (
    <div className="search-box-wrapper">
      <span className="material-symbols-outlined">search</span>
      <input type="search" placeholder="search..." />
    </div>
  );
};
export default SearchBar;
