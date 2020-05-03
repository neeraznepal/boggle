import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { SetUser, GetHighestScorers } from "../redux/action/homeAction";

const Home = (props) => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    props.GetHighestScorers();
  }, []);

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
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={startGame}>
            <h3>Enter Name</h3>
            <input type="text" onChange={handleChange} />
            <input type="submit" value="Start" />
            {errors.userName && (
              <div className="text-danger">{errors.userName}</div>
            )}
          </form>
        </div>
        <div className="col-md-6">
          <h3>Highest Scorer</h3>
          <div className="card">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {props.highestScorers.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.user}</td>
                      <td>{item.point}</td>
                    </tr>
                  );
                })}
              </tbody>
              {props.highestScorers.length == 0 && (
                <tfoot>
                  <tr>
                    <th colSpan="2">No one has played the game yet</th>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    userName: state.home.userName,
    highestScorers: state.home.highestScorers,
  };
}
const mapDispatchToProps = {
  SetUser,
  GetHighestScorers,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
