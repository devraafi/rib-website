import React from "react";
import { ButtonProps } from "./button";

const Button = (props: ButtonProps) => (
    <button className={'btn btn-' + props.type} >
        {props.label}
    </button>
);

export default Button;
