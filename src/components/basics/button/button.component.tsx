import React from "react";
import { ButtonProps } from "./button";

const Button = (props: ButtonProps) => (
    <React.Fragment>
        <button className={'btn btn-' + props.type} >
            {props.label}
        </button>
    </React.Fragment>
);

export default Button;
