import UploadIcon from "@mui/icons-material/Upload";
import "../styles/InputBox.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material/";
import { useState } from "react";
import PopUp from "./PopUp";
import Upload from "./Upload";
function InputBox(props) {
  //Attributs:
  const [openPopup, SetopenPopup] = useState(false);

  return (
    <div className="inputbox">
      <div className="inputbox-border">
        <div className="inputbox-header">
          <div className="inputbox-user">
            <img
              src={props.image}
              className="inputbox-img"
              width={40}
              height={40}
              alt=""
            />
            <div className="inputbox-input">
              <input
                placeholder="DO IT FOR THE VINES !"
                onClick={() => SetopenPopup(true)}
              />
            </div>
          </div>
          <div className="inputbox-button">
            <IconButton onClick={() => SetopenPopup(true)}>
              <UploadIcon />
            </IconButton>
          </div>
        </div>
        <PopUp openPopup={openPopup} setOpenpopup={SetopenPopup}>
          <IconButton onClick={() => SetopenPopup(false)}>
            <CloseIcon />
          </IconButton>
          <Upload />
        </PopUp>
      </div>
    </div>
  );
}

export default InputBox;
