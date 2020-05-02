import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { SetUser } from "../redux/action/homeAction";

const Home = (props) => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    setUserName(event.target.value);
  };
  const startGame = (event) => {
    event.preventDefault();
    if (formIsValid()) {
      props.SetUser(userName);
      history.push("/game");
    }
  };
  const formIsValid = () => {
    const errors = {};

    if (!userName || userName.trim() == "")
      errors.userName = "Please enter name";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };
  return (
    <div className="jumbotron">
      <h1>Boggle</h1>
      <p>Welcome. Please enter your name to start the game</p>
      <form onSubmit={startGame}>
        <h3>Enter Name</h3>
        <input type="text" onChange={handleChange} />
        <input type="submit" value="Start" />
        {errors.userName && (
          <div className="text-danger">{errors.userName}</div>
        )}
      </form>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    userName: state.home.userName,
  };
}
const mapDispatchToProps = {
  SetUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
