import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { RootLayout } from "./Pages/RootLayout";
import { Insert } from "./Pages/Insert";
import { Detail } from "./Pages/Detail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/insert",
          element: <Insert />,
        },
        {
          path: "/detail",
          element: <Detail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;