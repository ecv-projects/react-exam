import React, { Component } from "react";
import PropTypes from 'prop-types';

const Button = ({ handleClick, text, type }) => (
  <button type={type} onClick={() => handleClick(text)}>{text}</button>
)

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired
}

Button.defaultProps = {
  handleClick: () => {},
  type: 'button',
}

export default Button;
