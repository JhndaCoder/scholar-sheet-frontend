import { useRouteError } from 'react-router-dom';
import './ErrorElement.scss'; // The CSS below should be added in this file.

const ErrorElement = () => {
  const error = useRouteError();

  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-title">Oops! Something went wrong</h1>
        <p className="error-message">
          {error?.statusText ||
            error?.message ||
            'An unexpected error occurred.'}
        </p>
        {error?.status && (
          <p className="error-code">Error Code: {error.status}</p>
        )}
        <a href="/" className="error-button">
          Go Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default ErrorElement;
