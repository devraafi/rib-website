import { InputNumberProps } from 'antd/lib/input-number';

export interface StepperProps extends InputNumberProps {
  type?: 'basic' | 'cart';
  disabled?: boolean;
}
