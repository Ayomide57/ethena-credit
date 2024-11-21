import React from 'react';

interface ICustomSelect{
    value?: string;
    style?: any;
    placeholder?: string;
    onChange?: (e: any) => void;
    name: string;
    options: string[]
}

const CustomSelect: React.FC<ICustomSelect> = (props) => {

    return(
        <div className={""} style={{width: '-webkit-fill-available'}}>
            <select 
                className={"form-input px-4 py-3 rounded"}
                style={{ ...props.style, width: '-webkit-fill-available', borderColor: '#CED4DA', borderWidth: 'thin' }}
                onChange={props.onChange}
                name={props.name}
            >
                <option>{props.placeholder}</option>
                {props.options.map((option, index) => <option key={index} value={option}>{option}</option>)}
            </select>

        </div>
    );
}


export default CustomSelect;