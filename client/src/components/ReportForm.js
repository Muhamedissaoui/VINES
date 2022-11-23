import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

function ReportForm(props) {
  const [Reason, setReason] = useState("");
  const userId = window.localStorage.getItem("userid");
  const handlereasonChange = (e) => {
    console.log(e.target.value);
    setReason(e.target.value);
  };
  const onSubmit = (event) => {
    if (Reason === "") {
      alert("Please give a valid reason!");
    }
    event.preventDefault();
    const variables = {
      reporter: userId,
      reported: props.userid,
      videoId: props.videoid,
      reason: Reason,
    };
    axios.post("/api/report/post", variables).then((response) => {
      if (response.data.success) {
        window.location.reload();
      } else {
        alert("Failed to submit report.");
      }
    });
  };
  return (
    <form className="upload-container" onSubmit={onSubmit}>
      <h2>Give the reason of the report :</h2>
      <TextField
        className="txtfield"
        label="Reason"
        variant="outlined"
        value={Reason}
        onChange={handlereasonChange}
        multiline
        rows={10}
        maxRows={20}
      />
      <Button
        variant="outlined"
        type="submit"
        name="action"
        className="btn"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </form>
  );
}

export default ReportForm;
