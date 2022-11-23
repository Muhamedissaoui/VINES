import React from "react";
import "../styles/SingleComment.css";

function SingleComment(props) {
  return (
    <div className="Comment-Container">
      <div className="Comment-border">
        <div className="Commenter">
          <img
            src={props.comment.writer && props.comment.writer.image}
            style={{ borderRadius: "40px" }}
            className="Comment-img"
            width={40}
            height={40}
            alt=""
          />
          <p className="Comment-username">
            v/{props.comment.writer && props.comment.writer.username}
          </p>
        </div>
        <p className="Comment-content">{props.comment.content}</p>
        <hr width={350} />
      </div>
    </div>
  );
}

export default SingleComment;
