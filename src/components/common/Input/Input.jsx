import {Fragment} from 'react';
import './Input.scss';

const Input = ({
  type = 'text',
  placeholder,
  className,
  value,
  onChange,
  onBlur,
  onFocus,
  ...otherProps
}) => {
  return (
    <Fragment>
      <input
        className={`input-main ${className || ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...otherProps}
      />
    </Fragment>
  );
};
export default Input;
