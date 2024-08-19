import React, { useState } from 'react';
import styles from './UpDownButton.module.scss';

const UpDownButton = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(label);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedLabel(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className={styles.updownButtonContainer}>
      <button onClick={toggleDropdown} className={styles.updownButton}>
        {selectedLabel} <span className={styles.arrowUpDown}>&#9650;&#9660;</span>
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)} className={styles.dropdownItem}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpDownButton;
