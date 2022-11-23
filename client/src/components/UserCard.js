import "../styles/UserCard.css";
import { Button, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useState, useEffect } from "react";
import Follow from "./Follow";
import axios from "axios";
function UserCard(props) {
  //Attributs:
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Following, setFollowing] = useState("");
  const [Followers, setFollowers] = useState("");
  const token = localStorage.getItem("token");
  const [Isme, setIsme] = useState(false);
  const username = localStorage.getItem("username");

  //Methods:
  //Share method:
  function copyToClipboard(text) {
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value = window.location.href;
    inputc.style.top = "0";
    inputc.style.left = "0";
    inputc.style.position = "fixed";
    inputc.focus();
    inputc.select();
    document.execCommand("copy");
    inputc.parentNode.removeChild(inputc);
  }

  //useEffects:
  //If the user is the same as the profile owner:
  useEffect(() => {
    if (props.user === username) {
      setIsme(true);
    }
  }, [username, props.user]);
  //Get number of followers:
  useEffect(() => {
    axios.post("/api/subscribe/subscribeNumber", props.sn).then((response) => {
      if (response.data.success) {
        console.log(response.data.subscribeNumber);
        setFollowers(response.data.subscribeNumber);
      } else {
        alert("failed to get follow numbers");
      }
    });
  });
  //Get number of following:
  useEffect(() => {
    axios
      .post("/api/subscribe/subscribingNumber", props.sn)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.subscribeNumber);
          setFollowing(response.data.subscribeNumber);
        } else {
          alert("failed to get follow numbers");
        }
      });
  });
  //Check authentication status:
  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <div className="UserCard">
      <div className="UserCard-border">
        <div className="UserCard-content">
          <div className="UserCard-first-row">
            <img
              src={props.image}
              className="box-img"
              width={40}
              height={40}
              alt=""
            />
            <h2>{props.user}</h2>
          </div>
          {isLoggedIn && (
            <>
              {!Isme ? (
                <Follow userTo={props.userTo} userFrom={props.userFrom} />
              ) : (
                <Button variant="outlined">Edit Profile</Button>
              )}
            </>
          )}
          <div className="UserCard-Button">
            <IconButton onClick={copyToClipboard}>
              <ShareIcon />
            </IconButton>
          </div>
          <hr width="250px" />
          <div className="UserCard-second-row">
            <h1>
              {Followers}
              <span>followers</span>
            </h1>
            <h1>
              {Following}
              <span>following</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
