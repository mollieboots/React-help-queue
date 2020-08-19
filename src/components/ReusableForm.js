import React from "react";
import PropTypes from "prop-types";

function ReuseableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
      <input 
        type='text'
        name='names'
        placeholder='Pair Names' />
      <input
      type='text'
      name='location'
      placeholder='location' />
      <textarea
      name='issue'
      placeholder="Describe your issue." />
      <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReuseableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReuseableForm;