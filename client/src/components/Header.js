import { IconButton } from "@mui/material";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { USER_SERVER } from "../routes/Config";

function Header(props) {
  //Methods:
  //Logout method:
  const handleLogout = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userid");
        window.localStorage.removeItem("image");
        window.localStorage.removeItem("username");
        window.location.reload();
      } else {
        alert("Log Out Failed");
      }
    });
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
          <div className="navbar-user">
            <Link to={`/v/${props.userId}`}>
              <img src={props.image} width={40} height={40} alt="" />
            </Link>
            <div className="navbar-menu">
              <LogoutIcon onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
