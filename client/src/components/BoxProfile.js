import "../styles/BoxProfile.css";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import ShareIcon from "@mui/icons-material/Share";
import { Button, IconButton } from "@mui/material/";
import LikeDislike from "./LikeDislike";
import Comments from "./Comments";
import axios from "axios";
import { useState, useEffect } from "react";
import PopUp from "./PopUp";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import ReportForm from "./ReportForm";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function BoxProfile(props) {
  //Attribus:
  const [openMore, SetopenMore] = useState(false);
  const [openReport, SetopenReport] = useState(false);
  const [Open, setOpen] = useState(false);
  const [CommentList, setCommentList] = useState([]);
  const videoVariable = {
    videoId: props.videoId,
  };

  //useEffects:
  //Requesting comments from data base:
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
  //Share method:
  function copyToClipboard(text) {
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value =
      window.location.href.replace(
        window.location.href.substring(window.location.href.lastIndexOf("v")),
        ""
      ) + `vine/${props.videoId}`;
    inputc.style.top = "0";
    inputc.style.left = "0";
    inputc.style.position = "fixed";
    inputc.focus();
    inputc.select();
    document.execCommand("copy");
    inputc.parentNode.removeChild(inputc);
  }
  //Opening comments method:
  const toggleComments = (e) => {
    if (!Open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  //Updating comments method:
  const updateComment = (newComment) => {
    setCommentList(CommentList.concat(newComment));
  };

  return (
    <div className="boxprofile">
      <div className="boxprofile-border">
        <div className="boxprofile-header">
          <img
            src={props.image}
            className="boxprofile-img"
            width={40}
            height={40}
            alt=""
          />
          <div className="div-p">
            <p className="p-header">
              <span className="p-header-user">v/{props.user}</span> <br />{" "}
              <span className="p-header-post">Posted {props.date}</span>
            </p>
          </div>
          <div className="box-header-button">
            <IconButton
              onClick={() => {
                SetopenMore(true);
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          </div>
        </div>
        <div className="boxprofile-video">
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
        <div className="boxprofile-footer">
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
          <FlagIcon />
          Report
        </Button>
      </PopUp>
      <PopUp openPopup={openReport} setOpenpopup={SetopenReport}>
        <IconButton onClick={() => SetopenReport(false)}>
          <CloseIcon />
        </IconButton>
        <ReportForm videoid={props.videoId} userid={props.userId} />
      </PopUp>
    </div>
  );
}

export default BoxProfile;
