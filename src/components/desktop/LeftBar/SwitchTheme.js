import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/base/SwitchUnstyled';

const Left = styled('div')`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  left: 0;
  text-align: center;
  color: #153055;
  font-size: 14px;
`

const Right = styled('div')`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  right: 0;
  text-align: center;
  color: #153055;
  font-size: 14px;
  opacity: 1;
`

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
  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    background: linear-gradient(91.11deg, #EEF1FF 14.08%, #FFF3EF 98.54%);
    &>.Switch-checked {
      background: linear-gradient(180deg, rgba(13, 21, 66, 0.86) 0%, rgba(40, 19, 74, 0.84) 100%);
      &>.thumb_content {
        &.thumb_content_lfet {
          display: none;
        }
        &.thumb_content_right {
          display: inline-block;
          transform: translate(40%,30%);
        }
      }
    }
    &>.right {
      opacity: 0;
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
  &>.thumb_content {
    position: absolute;
    transform: translate(60%,25%);
    color: #153055;
    font-weight: 700;
    font-size: 14px;
    &.thumb_content_right {
      display: none;
    }
    &>span {
      display: inline-block;
      width: 5px;
      height: 5px;
      margin-left: 5px;
      background: #304FFD;
      border-radius: 100%;
    }
  };
  &>.thumb_content_right {
    color: #FFFFFF;
    &>span {
      background: #FFFFFF;
    }
  }
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
      <Left className="left">Day</Left>
      <Right className="right">Night</Right>
      <BasicSwitchThumb className={clsx(stateClasses)} >
        <div className="thumb_content thumb_content_lfet">Day<span></span></div>
        <div className="thumb_content thumb_content_right">Night<span></span></div>
      </BasicSwitchThumb>
      <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </BasicSwitchRoot>
  );
}

export default function SwitchTheme({changeTheme}) {
  return (
    <div>
      <BasicSwitch onChange={()=>{changeTheme()}}/>
    </div>
  );
}