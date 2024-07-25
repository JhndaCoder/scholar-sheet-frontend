import {Fragment, useId} from 'react';
import './Form.scss';
import Button from '../../../common/Button/Button';
import Logo from '../../atoms/Logo/Logo';

const Form = ({
  title,
  subTitle,
  onSubmit = () => {},
  children,
  subtext,
  logo,
  buttonText = 'Continue',
  button = true,
  ...otherProps
}) => {

  const ID = useId();

  return (
    <Fragment>
      <div className="form-container-main">
        {logo && <Logo />}
        {title && <h2 className='title'>{title}</h2>}
        {subTitle && <h3 className='subtitle'>{subTitle}</h3>}
        <form id={ID} onSubmit={onSubmit} {...otherProps}>
          {children}
        </form>
        {button && <Button form={ID} className="button" type="submit" >{buttonText}</Button>}
        {subtext && <p className='subtext'>{subtext}</p>}
      </div>
    </Fragment>
  );
};
export default Form;
