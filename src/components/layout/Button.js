import React from 'react';
import './Button.scss';

const Button = (props) => {
  return (
    <button type="button" className="button" id={props.id} onClick={props.onClick}>
      <span className="label" >{props.label}</span>
      <div className="border"/>
    </button>
  )
}

export default Button;
