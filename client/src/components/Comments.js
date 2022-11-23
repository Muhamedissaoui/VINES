import { TextField, IconButton } from "@mui/material/";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState, useEffect } from "react";
import axios from "axios";
import SingleComment from "./SingleComment";
import "../styles/Comment.css";

function Comments(props) {
  //Attributs:
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const userid = window.localStorage.getItem("userid");
  const [Comment, setComment] = useState("");
  const HandleChange = (e) => {
    setComment(e.target.value);
  };
  //Methods:
  //Commenting and saving comment on data base:
  const onSubmit = (e) => {
    e.preventDefault();
    const variable = {
      content: Comment,
      writer: userid,
      videoId: props.videoId,
    };
    axios.post("/api/comment/post", variable).then((response) => {
      if (response.data.success) {
        setComment("");
        props.refreshfn(response.data.result);
      } else {
        alert("Failed to submit Comment!!");
      }
    });
  };

  //useEffects:
  //Check authentication status:
  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <div
      style={{
        width: "710px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <br />
      <p style={{ textAlign: "center" }}>Comments :</p>
      <hr width={600} />
      {isLoggedIn && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Comment Form: */}
          <form
            style={{ display: "flex", marginLeft: "220px", width: "550px" }}
            onSubmit={onSubmit}
            autoComplete="off"
          >
            <TextField
              variant="standard"
              sx={{ width: "60%" }}
              value={Comment}
              onChange={HandleChange}
              placeholder="Write a comment!"
            />
            <IconButton onClick={onSubmit}>
              <ReplyIcon />
            </IconButton>
          </form>
        </div>
      )}
      <div className="scroll-comment">
        {/* Comment List: */}
        {props.CommentList &&
          props.CommentList.map((comment, index) => (
            <SingleComment
              key={index}
              comment={comment}
              videoId={props.videoId}
              refreshfn={props.refreshfn}
            />
          )).sort((a, b) => (a.index > b.index ? 1 : -1))}
      </div>
    </div>
  );
}

export default Comments;
