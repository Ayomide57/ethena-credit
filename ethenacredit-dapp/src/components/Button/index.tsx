/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import "./button.css"


interface ICustomButton {
  type?: any;
  value: string;
  icon?: React.ReactNode;
  style?: any;
  btnStyle?: string;
  onClick: () => void;
  disabled?: boolean
}



const CustomButton: React.FC<ICustomButton> = (props) => {

  return (
    <button
      className={props.btnStyle ? props.btnStyle : 'button primaryBtn'}
      style={props.style}
      type={props.type ? props.type : 'submit'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.value && props.value}
      {props.icon && <span>{props.icon}</span>}
    </button>
  );
};


export default CustomButton;