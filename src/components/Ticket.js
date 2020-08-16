import React from "react";
import PropTypes from "prop-types";

function Ticket(props) {
  return (
    <React.Fragment>
      <div id={props.id}>
        <h3>
          {props.location} - {props.names}
        </h3>
        <p>
          <em>{props.issue}</em>
        </p>
      </div>
    </React.Fragment>
    //add a button and add handler and give it props.id
  );
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
};

export default Ticket;
