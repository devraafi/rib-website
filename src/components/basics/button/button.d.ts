export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    type?: string;
    icon?: boolean;
    iconPosition?: string;
    svgIcon?: string;
}