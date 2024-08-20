import {RouterProvider} from 'react-router-dom';
import router, {queryClient} from './routes';
import {Fragment, Suspense} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const App = () => {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Suspense fallback={<h1>Loading...</h1>}>
            <RouterProvider router={router} />
          </Suspense>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Fragment>
  );
};
export default App;
