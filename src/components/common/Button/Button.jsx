import { Fragment } from 'react';
import './Button.scss';

const Button = ({
  children,
  className,
  variant,
  onClick = () => {},
  type,
  form,
  ...extraProps
}) => {
  const getClassName = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  const classNameDefault = `button-main ${getClassName()}`;

  return (
    <Fragment>
      <button
        className={`${classNameDefault} ${className}`}
        onClick={onClick}
        type={type}
        form={form}
        {...extraProps}
      >
        {children}
      </button>
    </Fragment>
  );
};
export default Button;
