import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ProductsList from "../AddNewProduct/ProductsList";
import Cart from "../Cart/Cart";
import Checkout from "../CheckOut/Checkout";
import Home from "../Home/Home";
import SignInSide from "../SignIn/SignIn";
import SignUp from "../Signup/SignUp";

const MainRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signin",
      element: <SignInSide />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/product/list",
      element: <ProductsList />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/product",
      element: <AddNewProduct />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRoutes;
