import { RouterProvider } from 'react-router-dom';
import router, { queryClient } from './routes';
import { Fragment, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DepartmentProvider } from './context/DepartmentContext.jsx';
import { useDepartment } from './context/DepartmentContext.jsx';

const App = () => {
  const department = useDepartment();
  {
    console.log(department);
  }
  return (
    <Fragment>
      <DepartmentProvider>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <Suspense fallback={<h1>Loading...</h1>}>
              <RouterProvider router={router} />
            </Suspense>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </DepartmentProvider>
    </Fragment>
  );
};
export default App;
