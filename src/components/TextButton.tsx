import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { noop } from "lodash";
import React, { MouseEventHandler } from "react";
import styled, {css} from "styled-components";

interface ButtonWrapperProps {
  isSelected: boolean;
  focused: boolean;
  highlighted: boolean;
}

const ButtonWrapper = styled.button<ButtonWrapperProps>`
  padding: 0px;
  margin-right: 20px;
  margin-top: 5px;
  cursor: default;
  background-color: transparent;
  border: none;
  color: ${({theme}) => theme.colors.text};
  ${({isSelected}) => isSelected && css`
    font-weight: 700;
  }`}
  ${({isSelected}) => !isSelected && css`
    cursor: pointer;
    &: hover {
      color: ${({theme}) => theme.colors.accent};
    }
  }`}
  ${({focused}) => focused && css`
    color: ${({theme}) => theme.colors.accent};
  }`}
  ${({highlighted, isSelected, theme}) => highlighted && isSelected && css`
    border-bottom: 2px solid ${theme.colors.accent};
  `}
  ${({highlighted}) => highlighted && css`
    font-size: 18px;
  `}
`;

interface TextButtonProps {
  isSelected: boolean;
  onClick: MouseEventHandler;
  title: string;
  highlighted?: boolean;
}

function TextButton({ isSelected, onClick, title, highlighted }: TextButtonProps) {
    const { ref, focused } = useFocusable({
        focusable: true,
        onEnterPress: !isSelected ? onClick : noop
    });

    return <ButtonWrapper
        ref={ref}
        isSelected={isSelected}
        onClick={onClick}
        focused={focused}
        highlighted={highlighted}
    >{title}</ButtonWrapper>
}

TextButton.defaultProps = {
    highlighted: false
}

export default TextButton;
