import { IconButton, Button } from "@mui/material";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import { useState } from "react";
import PopUp from "./PopUp";
import CloseIcon from "@mui/icons-material/Close";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function HeaderLogout() {
  //Attributs:
  const [openLogin, SetopenLogin] = useState(false);
  const [openRegister, SetopenRegister] = useState(false);

  //Methods:
  //Openning log in form:
  const handleChangeRegister = () => {
    SetopenLogin(true);
    SetopenRegister(false);
  };
  //Openning log out form:
  const handleChangeLogin = () => {
    SetopenLogin(false);
    SetopenRegister(true);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">Vines</Link>
        </div>
        <div className="navbar-search">
          <div className="nav-search-form">
            <form>
              <input
                type="text"
                name=""
                placeholder="Search accounts and videos"
              ></input>
              <IconButton type="submit">
                <YoutubeSearchedForIcon />
              </IconButton>
            </form>
          </div>
        </div>
        <div className="navbar-action">
          <Button
            variant="contained"
            onClick={() => {
              SetopenLogin(true);
              SetopenRegister(false);
            }}
          >
            Log in
          </Button>
          <span
            onClick={() => {
              SetopenRegister(true);
              SetopenLogin(false);
            }}
          >
            Sign up
          </span>
        </div>
      </div>
      <PopUp openPopup={openLogin} setOpenpopup={SetopenLogin}>
        <IconButton onClick={() => SetopenLogin(false)}>
          <CloseIcon />
        </IconButton>
        <LoginForm />
        <div className="navbar-popup-span">
          <span>
            Don't have an account?{" "}
            <span className="clickspan" onClick={handleChangeLogin}>
              Sign up!
            </span>
          </span>
        </div>
      </PopUp>
      <PopUp openPopup={openRegister} setOpenpopup={SetopenRegister}>
        <IconButton onClick={() => SetopenRegister(false)}>
          <CloseIcon />
        </IconButton>
        <RegisterForm />
        <div className="navbar-popup-span">
          <span>
            Already got an account?{" "}
            <span className="clickspan" onClick={handleChangeRegister}>
              Sign in!
            </span>
          </span>
        </div>
      </PopUp>
    </div>
  );
}

export default HeaderLogout;
