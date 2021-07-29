import { InputNumber } from 'antd';
import { isUndefined } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StepperProps } from './stepper';

const Stepper = (props: StepperProps) => {
  const [val, setval] = useState(props.value || '');
  function handleClick(type: 'plus' | 'minus') {
    let value = 0;
    const numb = +val;
    switch (type) {
      case 'plus':
        if (!isUndefined(props.max)) {
          value = props.max > numb ? 1 : 0;
        } else {
          value = 1;
        }
        break;
      case 'minus':
        if (!isUndefined(props.min)) {
          value = props.min < numb ? -1 : 0;
        } else {
          value = -1;
        }
        break;
    }

    onSetVal(numb + value);
  }

  function onSetVal(value: any) {
    setval(value);
    props.onChange ? props.onChange(value) : null;
  }

  // useEffect(() => {
  //   props.onChange ? props.onChange(val) : null;
  // }, [val])

  useEffect(() => {
    if (val !== props.value) {
      setval(props.value || '');
    }
  }, [props.value])

  return <div className={"stepper-wrapper " + (props.type || 'basic ') + ' ' + (props.className || '')}>
    <button
      type="button"
      disabled={props.disabled}
      className="btn step"
      onClick={() => (handleClick('minus'))}
    >
      <img src="/images/icons/Minus.svg" alt="" className="img-fluid" srcSet="" />
    </button>
    <InputNumber
      disabled={props.disabled}
      {...props}
      value={+val}
      onChange={(val) => onSetVal(val)}
    />
    <button
      type="button"
      disabled={props.disabled}
      className="btn step"
      onClick={() => (handleClick('plus'))}>
      <img src="/images/icons/Plus.svg" alt="" className="img-fluid" srcSet="" />
    </button>
  </div>
}

export { Stepper }
