/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ICustomInput {
  type?: string;
  value?: string;
  style?: any;
  inputType?: "primary";
  placeholder?: string;
  arialabel?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  name: string;
}

const CustomInput: React.FC<ICustomInput> = (props) => {
    let boxStyle;

    return (
      <div className={boxStyle} style={{ width: "-webkit-fill-available" }}>
        <input
          className="form-input px-4 py-3 rounded mb-3 mt-3"
          type={props.type || "text"}
          placeholder={props.placeholder}
          aria-label={props.arialabel}
          style={{
            ...props.style,
            width: "-webkit-fill-available",
            borderColor: "#CED4DA",
            borderWidth: "thin",
          }}
          onChange={props.onChange}
          onBlur={props.onBlur}
          name={props.name}
          value={props.value && props.value}
        />
      </div>
    );
}



export default CustomInput;