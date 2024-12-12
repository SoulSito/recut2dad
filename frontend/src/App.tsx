import Login from './pages/Login';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ErrorPage from './pages/Error'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Ayuda from './pages/Ayuda';
import Prestamos from './pages/Prestamos';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'home',
        element: <Home/>
      },
      {
        path: 'reports',
        element: <Reports />
      },
      {
        path: 'Ayuda',
        element: <Ayuda />
      },
      {
        path: 'Prestamos',
        element: <Prestamos />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

