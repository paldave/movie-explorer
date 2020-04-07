import React from 'react';
import './Button.scss';

const Button = (props) => {
  return (
    <button type="button" 
      className={`button ${props.disabled ? 'disabled' : ''}`} 
      id={props.id} 
      onClick={props.onClick} 
      disabled={props.disabled}
    >
      <span className="label" >{props.label}</span>
      <div className="border"/>
    </button>
  )
}

export default Button;
