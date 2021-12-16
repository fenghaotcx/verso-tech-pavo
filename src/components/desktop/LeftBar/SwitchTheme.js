import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/base/SwitchUnstyled';

const BasicSwitchRoot = styled('span')`
  font-size: 0;
  position: relative;
  display: inline-block;
  height: 40px;
  width: 156px;
  border-radius: 20px;
  background: linear-gradient(91.11deg, rgba(124, 141, 236, 0.15) 14.08%, rgba(255, 203, 186, 0.15) 98.54%);
  margin: 10px;
  cursor: pointer;
  &:before{
    content: "Day",
    position: absolute;
    display: block;
    top: 50%;
    transform: translateY(-50%);
    width: 50%;
    height: 100%;
    line-height: 100%;
    text-align: center;
    border: 1px solid red;
    color: #000;
    font-size: 12px;
  };
  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    background: linear-gradient(91.11deg, #EEF1FF 14.08%, #FFF3EF 98.54%);
    &>.Switch-checked {
      background: linear-gradient(180deg, rgba(13, 21, 66, 0.86) 0%, rgba(40, 19, 74, 0.84) 100%);
    }
  }
`;

const BasicSwitchInput = styled('input')`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const BasicSwitchThumb = styled('span')`
  display: block;
  height: 32px;
  width: 74px;
  top: 4px;
  left: 3px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition: all 200ms ease;
  &.Switch-focusVisible {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }
  &.Switch-checked {
    left: 79px;
    top: 4px;
    background-color: #fff;
  }
`;

function BasicSwitch(props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    'Switch-checked': checked,
    'Switch-disabled': disabled,
    'Switch-focusVisible': focusVisible,
  };

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </BasicSwitchRoot>
  );
}

export default function UseSwitchesBasic() {
  return (
    <div>
      <BasicSwitch />
    </div>
  );
}