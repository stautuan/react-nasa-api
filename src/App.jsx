import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Apod from './pages/Apod/Apod';
import Curiosity from './pages/Curiosity/Curiosity';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/apod',
        element: <Apod />,
      },
      {
        path: '/curiosity',
        element: <Curiosity />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
