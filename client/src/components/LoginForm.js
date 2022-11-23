import { TextField, Button } from "@mui/material/";
import { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../_actions/user_actions";
import "../styles/LoginForm.css";

class LoginForm extends Component {
  //State of the class (Attributs):
  state = {
    email: "",
    password: "",
    check: false,
    errors: [],
  };
  //Methods:
  //Filling the state attributs and checking if they are all filled:
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.handleButton();
    this.handleButtonoff();
  };
  //Button turn on once you filled both email and password:
  handleButton = (event) => {
    if (this.state.password !== "" && this.state.email !== "")
      this.setState({ check: true });
  };
  //Button turn off if email and password are not filled:
  handleButtonoff = (event) => {
    if (this.state.password === "" || this.state.email === "")
      this.setState({ check: false });
  };
  //Submitting the form to the data base and checking if information are correct to sign in:
  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };
    //if form is valid redux dispatch the data to start the login action type:
    if (this.isFormvalid(this.state)) {
      this.setState({ errors: [] });
      this.props
        .dispatch(loginUser(dataToSubmit))
        .then((response) => {
          if (response.payload.loginSuccess) {
            window.localStorage.setItem("token", response.payload.token);
            window.localStorage.setItem("userid", response.payload.userId);
            window.localStorage.setItem("username", response.payload.username);
            window.localStorage.setItem("image", response.payload.image);
            window.location.reload();
          } else {
            this.setState(this.state.errors.push(response.payload.message));
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.setState(this.state.errors.push(""));
          }, 3000);
        });
    }
  };
  //Checking if the form is valid:
  isFormvalid = ({ email, password }) => email && password;
  //Displays the errors send from the backend:
  displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);

  render() {
    return (
      <form
        onSubmit={(event) => this.submitForm(EventSource)}
        className="LoginForm"
      >
        <h2>Log in</h2>
        <TextField
          required
          className="txtfield"
          type="email"
          label="email"
          variant="outlined"
          name="email"
          value={this.state.email}
          onChange={(e) => this.handleChange(e)}
        />
        <TextField
          required
          className="txtfield"
          type="password"
          label="password"
          variant="outlined"
          name="password"
          value={this.state.password}
          onChange={(e) => this.handleChange(e)}
        />
        {this.state.errors.length > 0 && (
          <div>{this.displayErrors(this.state.errors)}</div>
        )}
        {this.state.check ? (
          <Button
            variant="outlined"
            type="submit"
            name="action"
            className="btn"
            onClick={this.submitForm}
          >
            Login
          </Button>
        ) : (
          <Button
            disabled
            variant="outlined"
            type="submit"
            name="action"
            className="btn"
            onClick={this.submitForm}
          >
            Login
          </Button>
        )}
      </form>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(LoginForm);
