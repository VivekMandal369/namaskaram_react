import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
// import About from "./components/About";
// import Restaurant from "./components/Restaurant";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Shimmer from "../src/components/Shimmer";
import Dish from "./components/Dish";
import UserContext from "./utils/UserContext";
// import UserContext from "./utils/UserContext";

const About = lazy(() => import("./components/About"));
const Restaurant = lazy(() => import("./components/Restaurant"));

const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: 'Vivek'
    };

    setUserName(data.name);
  }, []);

  return (
    <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  )
};

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <AppLayout />,
    children: [
      {
        path:'/',
        element: <Body />
      },
      {
        path:'/contact',
        element: <Contact />
      },
      {
        path:'/about',
        element: <Suspense><About/></Suspense>
        // element: <Suspense fallback={<Shimmer/>}><About/></Suspense>
      },
      {
        path:'/restaurant/:id',
        element: <Suspense><Restaurant/></Suspense>
      },
      {
        path: '/dish/:id',
        element: <Dish/>
      }
    ],
    errorElement: <Error />
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);

