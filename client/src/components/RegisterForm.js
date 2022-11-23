import { TextField, Button } from "@mui/material";
import "../styles/RegisterForm.css";
import { registerUser } from "../_actions/user_actions";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function RegisterForm() {
  //Attributs:
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [Formvalid, setFormvalid] = useState(false);
  const [Confirm, setConfirm] = useState(true);
  const [ConfirmEmail, setConfirmEmail] = useState(true);
  const dispatch = useDispatch();

  //useEffects:
  //Checking if the form is valid:
  useEffect(() => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      setFormvalid(false);
    } else {
      if (password === confirmpassword) {
        if (email.includes("@")) setFormvalid(true);
      } else {
        setFormvalid(false);
      }
    }
  }, [username, email, password, confirmpassword]);
  //Check if the password and confirmpassword match:
  useEffect(() => {
    if (password === confirmpassword) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  }, [password, confirmpassword]);
  //Check if email is correct:
  useEffect(() => {
    if (email.includes("@") || email === "") {
      setConfirmEmail(true);
    } else {
      setConfirmEmail(false);
    }
  }, [email]);

  //Methods:
  const handleChangeU = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeE = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeP = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeCP = (e) => {
    setConfirmpassword(e.target.value);
  };
  //Redux dispatches data to action type to start register:
  const handleSubmit = (e) => {
    e.preventDefault();
    let dataToSubmit = {
      username: username,
      email: email,
      password: password,
      image: `https://res.cloudinary.com/tylerdurden/image/upload/v1602657481/random/pngfind.com-default-image-png-6764065_krremh.png`,
    };
    dispatch(registerUser(dataToSubmit)).then((response) => {
      if (response.payload.success) {
        window.location.reload();
      } else {
        alert(response.payload.err.errmsg);
      }
    });
  };

  return (
    <form
      className="RegisterForm"
      onSubmit={(event) => handleSubmit(EventSource)}
    >
      <h2>Register</h2>
      <TextField
        variant="outlined"
        label="username"
        className="txtfield"
        name="username"
        value={username}
        onChange={handleChangeU}
      />
      {ConfirmEmail ? (
        <TextField
          variant="outlined"
          label="email"
          className="txtfield"
          name="email"
          type="Email"
          value={email}
          onChange={handleChangeE}
        />
      ) : (
        <TextField
          error
          variant="outlined"
          label="email"
          className="txtfield"
          name="email"
          type="Email"
          value={email}
          onChange={handleChangeE}
        />
      )}
      <TextField
        variant="outlined"
        label="password"
        className="txtfield"
        name="password"
        type="Password"
        value={password}
        onChange={handleChangeP}
      />
      {Confirm ? (
        <TextField
          variant="outlined"
          label="confirm password"
          className="txtfield"
          name="confirmpassword"
          type="Password"
          value={confirmpassword}
          onChange={handleChangeCP}
        />
      ) : (
        <TextField
          error
          variant="outlined"
          label="confirm password"
          className="txtfield"
          name="confirmpassword"
          type="Password"
          value={confirmpassword}
          onChange={handleChangeCP}
        />
      )}
      {Formvalid ? (
        <Button
          variant="outlined"
          type="submit"
          name="action"
          className="btn"
          onClick={handleSubmit}
        >
          submit
        </Button>
      ) : (
        <Button
          disabled
          variant="outlined"
          type="submit"
          name="action"
          className="btn"
          onClick={handleSubmit}
        >
          submit
        </Button>
      )}
    </form>
  );
}

export default RegisterForm;
