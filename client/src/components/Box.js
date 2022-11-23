import "../styles/Box.css";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import ShareIcon from "@mui/icons-material/Share";
import { Button, IconButton } from "@mui/material/";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Follow from "../components/Follow";
import LikeDislike from "./LikeDislike";
import Comments from "./Comments";
import axios from "axios";
import PopUp from "./PopUp";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from '@mui/icons-material/Flag';
import ReportForm from "./ReportForm";

function Box(props) {
  //Attributs:
  const [openMore, SetopenMore] = useState(false);
  const [openReport, SetopenReport] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const [Isme, setIsme] = useState(false);
  const username = localStorage.getItem("username");
  const [Open, setOpen] = useState(false);
  const [CommentList, setCommentList] = useState([]);
  const videoVariable = {
    videoId: props.videoId,
  };

  //useEffects:
  //Checking authentication status:
  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);
  //Checking if the user is the same as the video owner:
  useEffect(() => {
    if (props.user === username) {
      setIsme(true);
    }
  }, [props.user, username]);
  //Requesting comments from the database:
  useEffect(() => {
    axios.post("/api/comment/getComments", videoVariable).then((response) => {
      if (response.data.success) {
        setCommentList(response.data.comments);
      } else {
        alert("Failed to get the vine !");
      }
    });
  }, []);

  //Methods:
  //Share methode:
  function copyToClipboard(text) {
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value = window.location.href + `vine/${props.videoId}`;
    inputc.style.top = "0";
    inputc.style.left = "0";
    inputc.style.position = "fixed";
    inputc.focus();
    inputc.select();
    document.execCommand("copy");
    inputc.parentNode.removeChild(inputc);
  }
  //Opening comments methode:
  const toggleComments = (e) => {
    if (!Open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  //Updating comment methods:
  const updateComment = (newComment) => {
    setCommentList(CommentList.concat(newComment));
  };

  return (
    <div className="box">
      <div className="box-border">
        <div className="box-header">
          <img
            src={props.image}
            className="box-img"
            width={40}
            height={40}
            alt=""
          />
          <div className="div-p">
            <p className="p-header">
              <span className="p-header-user">
                <Link to={`v/${props.userId}`}>v/{props.user}</Link>
              </span>{" "}
              <br />{" "}
              <span className="p-header-post">Posted at {props.date}</span>
            </p>
          </div>
          <div className="box-header-button">
            {isLoggedIn && (
              <div className="box-header-buttons">
                {!Isme && (
                  <Follow userTo={props.userTo} userFrom={props.userFrom} />
                )}
                <IconButton
                  onClick={() => {
                    SetopenMore(true);
                  }}
                >
                  <MoreHorizIcon/>
                </IconButton>
              </div>
            )}
          </div>
        </div>
        <div className="box-video">
          <video width="720" height="480" controls className="video">
            <source src={props.video} type="video/mp4" />
          </video>
        </div>
        <div className="video-details">
          <h2 className="h2-border">{props.title}</h2>
          {props.description && (
            <>
              <hr width="650px" />
              <h3 className="desc">Descriptions :</h3>
              <p className="p-border">{props.description}</p>
            </>
          )}
        </div>
        <hr width="650px" />
        <div className="box-footer">
          <LikeDislike videoId={props.videoId} />
          <div className="like">
            <Button
              sx={{
                color: "gray ",
                "&:hover": { backgroundColor: "lightgray" },
              }}
              onClick={toggleComments}
            >
              <InsertCommentIcon />
              <span>Comments</span>
            </Button>
          </div>
          <div className="like">
            <Button
              sx={{
                color: "gray ",
                "&:hover": { backgroundColor: "lightgray" },
              }}
              onClick={copyToClipboard}
            >
              <ShareIcon />
              <span>Share</span>
            </Button>
          </div>
        </div>
        {Open && (
          <Comments
            CommentList={CommentList}
            videoId={props.videoId}
            refreshfn={updateComment}
          />
        )}
      </div>
      <PopUp openPopup={openMore} setOpenpopup={SetopenMore}>
        <IconButton onClick={() => SetopenMore(false)}>
          <CloseIcon />
        </IconButton>
        <Button
          variant="outlined"
          sx={{
            borderColor: "gray",
            color: "gray",
            "&:hover": { borderColor: "gray" },
          }}
          onClick={() => {
            SetopenReport(true);
          }}
        >
          <FlagIcon/>
          Report
        </Button>
      </PopUp>
      <PopUp openPopup={openReport} setOpenpopup={SetopenReport}>
        <IconButton onClick={() => SetopenReport(false)}>
          <CloseIcon />
        </IconButton>
        <ReportForm videoid={props.videoId} userid={props.userId}/>
      </PopUp>
    </div>
  );
}

export default Box;
