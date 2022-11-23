import "../styles/Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import BoxProfile from "../components/BoxProfile";
import moment from "moment";
import BoxSkeleton from "../skeletons/BoxSkeleton";
function Profile() {
  //Atributs:
  const userId = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const [Videos, setVideos] = useState([]);
  const [loading, setloading] = useState(true);
  const [User, setUser] = useState([]);
  const userid = localStorage.getItem("userid");
  const userVariable = {
    userId: userId,
  };
  const subscribeNumberVariables = {
    userTo: userId,
    userFrom: userId,
  };

  //useEffects:
  //Requesting the profile owner:
  useEffect(() => {
    axios.post("/api/users/getUser", userVariable).then((response) => {
      if (response.data.success) {
        setUser(response.data.user);
        console.log(response.data.user);
      } else {
        alert("Failed to get the vine !");
      }
    });
    //Requesting the profile owner videos:
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideos(
          response.data.videos.filter((video) => video.writer._id === userId)
        );
        setloading(false);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, [userId]);

  return (
    <div className="Profile">
      <div className="Profile-content">
        <UserCard
          user={User.username}
          image={User.image}
          sn={subscribeNumberVariables}
          userTo={User._id}
          userFrom={userid}
        />
        <div className="profile-videos">
          {loading ? (
            <BoxSkeleton />
          ) : (
            <>
              {Videos.map((video, index) => (
                <BoxProfile
                  key={index}
                  userTo={video.writer._id}
                  userFrom={userid}
                  user={video.writer.username}
                  date={moment(video.createdAt).format("MMM Do YY, h:mm a")}
                  title={video.title}
                  description={video.description}
                  image={video.writer.image}
                  video={`http://localhost:5000/${video.filePath}`}
                  videoId={video._id}
                />
              )).sort((a, b) => (a.index > b.index ? 1 : -1))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
