import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddNewRecipe from "./pages/AddNewRecipe";
import Favourites from "./pages/Favourites";
import MyFridge from "./pages/MyFridge";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="main-container">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<Recipes />} />
        <Route exact path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<AddNewRecipe />} />
        {/* <Route path="/my_favourites" element={<Favourites />} /> */}
        <Route path="/myfridge" element={<MyFridge />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
