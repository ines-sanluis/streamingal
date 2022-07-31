import { FocusableComponentLayout, FocusDetails, KeyPressDetails, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { noop } from "lodash";
import React from "react";
import styled from "styled-components";

const Icon = styled.span`
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  display: block;
`;

interface MyButtonProps {
  focused: boolean;
  isIcon: boolean;
}

interface ButtonProps {
  text: string;
  icon?: string;
  focusKeyParam?: string;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onClickHandler: (props: object) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
  onBlur?: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

const MyButton = styled.button<MyButtonProps>`
  cursor: pointer;
  outline: none;
  border: none;
  font-weight: 700;
  font-size: 15px;
  border-radius: 0.2vw;
  padding-left: ${({isIcon}) => isIcon ? "1.5rem": "3rem"};
  padding-right: ${({isIcon}) => isIcon ? "1.5rem": "3rem"};
  padding-top: ${({isIcon}) => isIcon ? "0.5rem": "1rem"};
  background-color: ${({focused}) => focused ? "#e6e6e6" : "rgba(51, 51, 51, 0.5)"};
  padding-bottom: ${({isIcon}) => isIcon ? "0.5rem": "1rem"};
  color: ${({focused}) => focused ? "#000" : "white"};
  margin-right: 20px;
  &:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;

function Button({
    text,
    icon,
    focusKeyParam,
    onEnterPress,
    onClickHandler,
    onFocus,
    onBlur
}: ButtonProps) {
    const { ref, focused } = useFocusable({
        onEnterPress,
        onFocus,
        ...(focusKeyParam && {"focusKey": focusKeyParam}),
        ...(onBlur && onBlur)
    });

    return <MyButton isIcon={icon !== undefined} ref={ref} focused={focused} onClick={onClickHandler}>
        {text && text}
        {icon && <Icon>{icon}</Icon>}
    </MyButton>;
}

Button.defaultProps = {
    focusKeyParam: undefined,
    icon: undefined,
    onBlur: noop
}

export default Button;
