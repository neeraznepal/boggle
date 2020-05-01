import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { SetUser } from "../redux/action/homeAction";

const Home = (props) => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const handleChange = (event) => {
    setUserName(event.target.value);
  };
  const startGame = (event) => {
    event.preventDefault();
    props.SetUser(userName);

    history.push("/game");
  };
  return (
    <div className="jumbotron">
      <h1>Boggle</h1>
      <p>Welcome. Enter your name and click start to enjoy this game</p>
      <form onSubmit={startGame}>
        <h3>Enter Name</h3>
        <input type="text" onChange={handleChange} />
        <input type="submit" value="Start" />
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
