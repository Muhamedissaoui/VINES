import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function Follow(props) {
  //Attributs:
  const userTo = props.userTo;
  const userFrom = props.userFrom;
  const subscribeNumberVariables = {
    userTo: userTo,
    userFrom: userFrom,
  };
  const [Followed, setFollowed] = useState();

  //useEffects:
  //Requestion if user followed already or not:
  useEffect(() => {
    axios
      .post("/api/subscribe/subscribed", subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.subscribed);
          setFollowed(response.data.subscribed);
        } else {
          alert("Failed to get Subscribed information");
        }
      });
  });

  //Methods:
  //Following and unfollowing based on the result of the useEffect axios:
  const onFollow = () => {
    let subscribeVariable = {
      userTo: userTo,
      userFrom: userFrom,
    };
    if (Followed) {
      axios
        .post("/api/subscribe/unsubscribe", subscribeVariable)
        .then((response) => {
          if (response.data.success) {
            setFollowed(!Followed);
          } else {
            alert("Failed to unsubscribe");
          }
        });
    } else {
      axios
        .post("/api/subscribe/subscribe", subscribeVariable)
        .then((response) => {
          if (response.data.success) {
            setFollowed(!Followed);
          } else {
            alert("failed to subscribe");
          }
        });
    }
  };

  return (
    <div>
      {!Followed ? (
        <Button onClick={onFollow} variant="outlined">
          Follow
        </Button>
      ) : (
        <Button
          onClick={onFollow}
          variant="outlined"
          sx={{
            borderColor: "gray",
            color: "gray",
            "&:hover": { borderColor: "gray" },
          }}
        >
          unFollow
        </Button>
      )}
    </div>
  );
}

export default Follow;
