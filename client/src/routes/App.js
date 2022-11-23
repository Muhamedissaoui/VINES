import React, { useState, useEffect } from "react";
import Feed from "../pages/Feed";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import Vine from "../pages/Vine";
import Header from "../components/Header";
import HeaderLogout from "../components/HeaderLogout";

function App() {
  //Attributs
  const image = window.localStorage.getItem("image");
  const id = window.localStorage.getItem("userid");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  //useEffects:
  //Check athentication status:
  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <>
      {isLoggedIn ? <Header image={image} userId={id} /> : <HeaderLogout />}
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/v/:userId" element={<Profile />} />
        <Route path="/vine/:videoId" element={<Vine />} />
      </Routes>
    </>
  );
}

export default App;
