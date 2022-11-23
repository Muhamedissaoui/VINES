import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import "../styles/vine.css";
import moment from "moment";
import Follow from "../components/Follow";
import { Link } from "react-router-dom";
import LikeDislike from "../components/LikeDislike";
import Comments from "../components/Comments";

function Vine() {
  //Attributs:
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Video, setVideo] = useState([]);
  const [Isme, setIsme] = useState(false);
  const [CommentList, setCommentList] = useState([]);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  const videoId = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const videoVariable = {
    videoId: videoId,
  };

  //useEffects:
  //Check authentication status:
  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);
  //Requesting videos from data base:
  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        setVideo(response.data.video);
      } else {
        alert("Failed to get the vine !");
      }
    });
    //Requesting the video comments:
    axios.post("/api/comment/getComments", videoVariable).then((response) => {
      if (response.data.success) {
        setCommentList(response.data.comments);
      } else {
        alert("Failed to get the vine !");
      }
    }, []);
  }, [videoId]);
  //Check if the user is the video owner:
  useEffect(() => {
    if ((Video.writer && Video.writer.username) === username) {
      setIsme(true);
    }
  }, [username, Video.writer]);

  //Methods:
  //Updating comments:
  const updateComment = (newComment) => {
    setCommentList(CommentList.concat(newComment));
  };

  if (Video.writer) {
    return (
      <div className="vine-Container">
        <div className="vine-border">
          <div className="vine-header">
            <img
              src={Video.writer && Video.writer.image}
              className="vine-img"
              width={80}
              height={80}
              alt=""
            />
            <div className="vine-user">
              <h2 className="vine-username">
                <Link to={`/v/${Video.writer && Video.writer._id}`}>
                  {" "}
                  v/{Video.writer && Video.writer.username}{" "}
                </Link>
              </h2>
              <p>
                Posted at {moment(Video.createdAt).format("MMM Do YY, h:mm a")}
              </p>
            </div>
            {isLoggedIn && (
              <>
                {!Isme && (
                  <div className="vine-header-btn">
                    <Follow userTo={Video.writer._id} userFrom={userId} />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="vine-video">
            <video
              src={`http://localhost:5000/${Video.filePath}`}
              width="950"
              height="480"
              controls
              className="video"
            >
              <source src="" type="video/mp4" />
            </video>
            <div className="vine-btn">
              <LikeDislike videoId={videoId} />
            </div>
          </div>
          <div className="vine-details">
            <h2 className="vine-title">{Video.title}</h2>
            {Video.description && (
              <>
                <h3 className="vine-desc">Descriptions :</h3>
                <p className="vine-p-desc">{Video.description}</p>
              </>
            )}
          </div>
          <div className="vine-comment">
            <Comments
              CommentList={CommentList}
              videoId={videoId}
              refreshfn={updateComment}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    <div>loading...</div>;
  }
}

export default Vine;
