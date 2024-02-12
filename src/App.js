import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
// import About from "./components/About";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Shimmer from "../src/components/Shimmer";

const About = lazy(() => import("./components/About"));

const AppLayout = () => (
   <div className="app">
    <Header />
    <Outlet />
  </div>
);

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
        element: <RestaurantMenu />
      }
    ],
    errorElement: <Error />
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);

