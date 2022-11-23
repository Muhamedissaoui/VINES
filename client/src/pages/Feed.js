import Box from "../components/Box";
import "../styles/Feed.css";
import InputBox from "../components/InputBox";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import BoxSkeleton from "../skeletons/BoxSkeleton";
import InputSkeleton from "../skeletons/InputSkeleton";
import InputBoxLogout from "../components/InputBoxLogout";

function Feed() {
  //Attributs:
  const [Videos, setVideos] = useState([]);
  const [loading, setloading] = useState(true);
  const token = localStorage.getItem("token");
  const image = window.localStorage.getItem("image");
  const user = window.localStorage.getItem("userid");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //useEffects:
  //Requesting videos from database:
  useEffect(() => {
    axios.get("api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideos(response.data.videos);
        setloading(false);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);
  //Checking authentication status:
  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <div className="app">
      {isLoggedIn ? (
        <>{loading ? <InputSkeleton /> : <InputBox image={image} />}</>
      ) : (
        <InputBoxLogout />
      )}
      <div className="app-content">
        {loading ? (
          <BoxSkeleton />
        ) : (
          <div>
            {Videos.map((video, index) => (
              <Box
                key={index}
                userId={video.writer._id}
                userTo={video.writer._id}
                userFrom={user}
                user={video.writer.username}
                date={moment(video.createdAt).format("MMM Do YY, h:mm a")}
                title={video.title}
                description={video.description}
                image={video.writer.image}
                video={`http://localhost:5000/${video.filePath}`}
                videoId={video._id}
              />
            )).sort((a, b) => (a.index > b.index ? 1 : -1))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Feed;
