import {RouterProvider} from 'react-router-dom';
import router from './routes';
import {Suspense} from 'react';

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};
export default App;
