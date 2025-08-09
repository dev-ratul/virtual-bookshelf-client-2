import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "../Pages/Layout/Root";
import Home from "../Pages/Shared/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AddBook from "../Pages/Shared/AddBook";
import BookShelf from "../Pages/Shared/BookShelf";
import BookDetails from "../Pages/Shared/BookDetails";
import MyBook from "../Pages/Shared/MyBook";
import EditBook from "../Pages/Shared/EditBook";
import Profile from "../Pages/Shared/Profile";
import PrivateRoute from "../Provider/PrivateRoute";
import Error404 from "../Pages/Shared/Error404";
import PopulerBookDetails from "../Pages/Shared/PopulerBookDetails";
import AddSpecialOffer from "../Pages/Shared/SalesOffer/AddSpecialOffer/AddSpecialOffer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error404></Error404>,
    children: [
      {
        index: true,
        Component: Home,
        loader: ()=> fetch(`http://localhost:3000/popularBook`)
      },
      {
        path: "/register",
        element: <Register></Register>,
      },

      {
        path: "/signIn",
        Component: Login,
      },
      {
        path: "/add-book",
        element:<PrivateRoute><AddBook></AddBook></PrivateRoute>
      },
      {
        path: "book-shelf",
        element: <BookShelf></BookShelf>,
        loader: () => {
          return fetch("http://localhost:3000/addBook");
        },
      },
      {
        path: "/book-shelf/:id",
        element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/addBook/${params.id}`)

      },
      {
        path: '/my-book',
        element:<PrivateRoute><MyBook></MyBook></PrivateRoute>
      },
      {
        path: '/my-book/:id',
        element: <PrivateRoute><EditBook></EditBook></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:3000/editBook/${params.id}`)
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: '/popularBook/:id',
        element: <PopulerBookDetails></PopulerBookDetails>
      },
      {
        path: '/add-special-offer',
        element: <AddSpecialOffer></AddSpecialOffer>
      }
    ],
  },
  {
    path: '*',
    element: <Error404></Error404>
  }
]);
