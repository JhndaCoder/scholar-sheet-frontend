import styles from './SearchBar.module.scss';

const SearchBar = ({ width, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.searchBar}
      style={{ width: width }}
    />
  );
};

export default SearchBar;
