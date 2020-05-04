import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { SetUser, GetHighestScorers } from "../redux/action/homeAction";

const Home = (props) => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState({});
  const [highestScorers, setHighestScorers] = useState([]);
  const [highestScorerLoaded, setHighestScorerLoaded] = useState(false);

  useEffect(() => {
    let unmounted = false;
    GetHighestScorers()
      .then((response) => response.json())
      .then((data) => {
        if (!unmounted) {
          setHighestScorers(data);
          setHighestScorerLoaded(true);
        }
      })
      .catch((error) => {
        if (!unmounted) throw error;
      });

    return () => {
      unmounted = true;
      setHighestScorerLoaded(false);
    };
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
        <div className="col-md-4">
          <form onSubmit={startGame}>
            <h3>Enter Name</h3>
            <input type="text" onChange={handleChange} />
            <input type="submit" value="Start" />
            {errors.userName && (
              <div className="text-danger">{errors.userName}</div>
            )}
          </form>
        </div>
        <div className="col-md-4">
          <h3>Game Description</h3>
          <ul>
            <li>When game starts you will be provided 4X4 board.</li>
            <li>You have 2 minutes to find words from board.</li>
            <li>
              Word must be contructed from letters adjacent(vertically,
              horizontally or diagonally) to each other.
            </li>
            <li>Word must be valid english letter.</li>
            <li>Word must be at least three letters long.</li>
            <li>Each found word carry points equal to its length.</li>
          </ul>
        </div>
        <div className="col-md-4">
          <h3>Highest Scorers</h3>
          <div className="card">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {highestScorers.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.user}</td>
                      <td>{item.point}</td>
                    </tr>
                  );
                })}
              </tbody>
              {highestScorers.length == 0 && highestScorerLoaded && (
                <tfoot>
                  <tr>
                    <th colSpan="2">No one has played the game yet</th>
                  </tr>
                </tfoot>
              )}
              {!highestScorerLoaded && (
                <tfoot>
                  <tr>
                    <th colSpan="2">Loading...</th>
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

Board.propTypes = {
  userName: PropTypes.string.isRequired,
  SetUser: PropTypes.func.isRequired,
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
