import { TextField, Button, IconButton } from "@mui/material";
import "../styles/Upload.css";
import Dropzone from "react-dropzone";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];
function Upload() {
  //Attributs:
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  const [Privacy, setPrivacy] = useState(0);
  const [Buttonconfirm, setButtonconfirm] = useState(false);
  const userId = window.localStorage.getItem("userid");

  //Methods:
  const handleButton = (e) => {
    setButtonconfirm(true);
  };
  const handleChangeP = (e) => {
    setPrivacy(e.target.value);
  };
  const handletitleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  const handledescChange = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };
  //On submit method with axios to save video in database:
  const onSubmit = (event) => {
    //Check if all inputs are filled:
    if (
      Title === "" ||
      FilePath === "" ||
      Duration === "" ||
      Thumbnail === "" ||
      Privacy === ""
    ) {
      alert("Please fill the whole form!");
    }
    event.preventDefault();
    handleButton();
    const variables = {
      writer: userId,
      title: Title,
      description: Description,
      privacy: Privacy,
      filePath: FilePath,
      duration: Duration,
      thumbnail: Thumbnail,
    };
    //Uploading video to data base:
    axios.post("/api/video/uploadVideo", variables).then((response) => {
      if (response.data.success) {
        window.location.reload();
      } else {
        alert("Failed to upload video.");
      }
    });
  };
  //External library for file management made by react called dropzone:
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", files[0]);
    //Uploading file locally in my pc and gives it its filepath in the data base:
    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };
        setFilePath(response.data.filePath);
        //Making thumbnail and posting it for the user to see:
        axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnail(response.data.thumbsFilePath);
          } else {
            alert("failed to create thumbnail");
          }
        });
      } else {
        alert("failed to upload the video");
      }
    });
  };

  return (
    <form className="upload-container" onSubmit={onSubmit}>
      <h2>Make a vine :</h2>
      <TextField
        className="txtfield"
        label="Title"
        variant="outlined"
        value={Title}
        onChange={handletitleChange}
      />
      <TextField
        className="txtfield"
        label="Description"
        variant="outlined"
        value={Description}
        onChange={handledescChange}
      />
      <div className="select">
        <select onChange={handleChangeP}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <p>Choose a video by clicking on the add icon :</p>
      <div className="drpzone">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <IconButton>
                  <AddIcon />
                </IconButton>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      {Thumbnail !== "" && (
        <div className="thumbnail">
          <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
        </div>
      )}
      {Buttonconfirm ? (
        <LoadingButton className="btn" loading variant="outlined">
          Submit
        </LoadingButton>
      ) : (
        <Button
          variant="outlined"
          type="submit"
          name="action"
          className="btn"
          onClick={onSubmit}
        >
          Upload
        </Button>
      )}
    </form>
  );
}

export default Upload;
