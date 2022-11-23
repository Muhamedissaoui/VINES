import { Button } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState, useEffect } from "react";
import axios from "axios";

function LikeDislike(props) {
  //Attributs:
  const token = localStorage.getItem("token");
  const userId = window.localStorage.getItem("userid");
  const [Dislikes, setDislikes] = useState(0);
  const [Likes, setLikes] = useState(0);
  const [Liked, setLiked] = useState(false);
  const [Disliked, setDisliked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const videoId = props.videoId;
  const variable = {
    videoId: videoId,
    userId: userId,
  };

  //useEffects:
  //Requesting likes and dislikes informations:
  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        //How many likes this video has:
        setLikes(response.data.likes.length);

        //If I already liked this video:
        // eslint-disable-next-line
        response.data.likes.map((like) => {
          if (like.userId === userId) {
            setLiked(true);
          }
        });
      } else {
        alert("Failed to get Likes informations");
      }
    });

    axios.post("/api/like/getDislikes", variable).then((response) => {
      if (response.data.success) {
        //How many dislikes this video has;
        setDislikes(response.data.dislikes.length);

        //If I already disliked this video;
        // eslint-disable-next-line
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === userId) {
            setDisliked(true);
          }
        });
      } else {
        alert("Failed to get Likes informations");
      }
    });
  }, [Likes, Dislikes]);
  //Check authentication:
  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  //Methods:
  //Liking and unliking method:
  const onLike = () => {
    if (isLoggedIn) {
      if (!Liked) {
        axios.post("/api/like/Like", variable).then((response) => {
          if (response.data.success) {
            setLikes(Likes + 1);
            setLiked(true);

            //If dislike button is already clicked :
            if (Disliked) {
              setDislikes(Dislikes - 1);
              setDisliked(false);
            }
          } else {
            alert("Failed to increment Like !!");
          }
        });
      } else {
        axios.post("/api/like/unLike", variable).then((response) => {
          if (response.data.success) {
            setLikes(Likes - 1);
            setLiked(false);
          } else {
            alert("Failed to decrement Like !!");
          }
        });
      }
    }
  };
  //Disliking and undisliking method:
  const onDislike = () => {
    if (isLoggedIn) {
      if (Disliked) {
        axios.post("/api/like/unDislike", variable).then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes - 1);
            setDisliked(false);
          } else {
            alert("Failed to decrement Dislike !!");
          }
        });
      } else {
        axios.post("/api/like/Dislike", variable).then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes + 1);
            setDisliked(true);

            //If dislike button is already clicked :
            if (Liked) {
              setLikes(Likes - 1);
              setLiked(false);
            }
          } else {
            alert("Failed to increment Dislike !!");
          }
        });
      }
    }
  };

  return (
    <>
      <div className="like">
        {!Liked ? (
          <Button
            sx={{ color: "gray ", "&:hover": { backgroundColor: "lightgray" } }}
            onClick={onLike}
          >
            <ThumbUpAltIcon />
            <span>{Likes}</span>
          </Button>
        ) : (
          <Button onClick={onLike}>
            <ThumbUpAltIcon />
            <span>{Likes}</span>
          </Button>
        )}
      </div>
      <div className="like">
        {!Disliked ? (
          <Button
            sx={{ color: "gray ", "&:hover": { backgroundColor: "lightgray" } }}
            onClick={onDislike}
          >
            <ThumbDownIcon />
            <span>{Dislikes}</span>
          </Button>
        ) : (
          <Button onClick={onDislike}>
            <ThumbDownIcon />
            <span>{Dislikes}</span>
          </Button>
        )}
      </div>
    </>
  );
}

export default LikeDislike;
