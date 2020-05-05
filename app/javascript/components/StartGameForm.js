import React from "react";
import PropTypes from "prop-types";

const StartGameForm = (props) => {
  return (
    <form onSubmit={props.formSubmit}>
      <h3>Enter Name</h3>
      <input type="text" onChange={props.handleTextChange} />
      <input type="submit" value="Start" />
      {props.formErrors.userName && (
        <div className="text-danger">{props.formErrors.userName}</div>
      )}
    </form>
  );
};

StartGameForm.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  formSubmit: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
};
export default StartGameForm;
