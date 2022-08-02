import { FocusContext, KeyPressDetails, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import React from "react";
import styled from "styled-components";

const Title = styled.p`
  padding-bottom: 22px;
  font-weight: 700;
  padding-left: 40px;
  cursor: pointer;
  &:hover span {
    opacity: 1
  }
`;

const Description = styled.span`
  margin-left: 10px;
  color: ${({theme}) => theme.colors.accent};
`;

const DescriptionText = styled.span<FocusedProps>`
  z-index: 1;
  position: absolute;
  transition: all 0.5s ease-in-out;
  transition-delay: 0.2s;
  margin-left: 0px;
  opacity: ${({focused}) => focused ? 1 : 0};
  ${Description}:hover & {
    opacity: 1
  }
`;

const DescriptionArrow = styled.span<OuterFocusProps>`
  z-index: 2;
  position: absolute;
  margin-right: 15px;
  margin-top: 5px;
  border: solid ${({theme}) => theme.colors.accent};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  opacity: ${({focusedFeed}) => focusedFeed ? 1 : 0};
  margin-left: ${({focusedText}) => focusedText ? "112px" : "0px"};
  transition: all 0.8s ease-in-out;
  ${Description}:hover & {
    margin-left: 112px;
  }
`;
interface FocusedProps {
  focused: boolean
}
interface OuterFocusProps {
  focusedFeed: boolean;
  focusedText: boolean;
}
interface FeedTitleProps {
  title: string;
  focusedFeed: boolean;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onClickHandler: (props: object) => void;
}

function FeedTitle({
    title,
    focusedFeed,
    onEnterPress,
    onClickHandler
}: FeedTitleProps) {
    const { ref, focusKey, focused, focusSelf } = useFocusable({
        onEnterPress,
        extraProps: {
            title
        }
    });
    return (
        <FocusContext.Provider value={focusKey}>
            <Title
                onClick={() => onClickHandler({title})}
                onMouseOver={focusSelf}
                ref={ref}
            >
                {title}
                <Description>
                    <DescriptionArrow focusedFeed={focusedFeed} focusedText={focused}/>
                    <DescriptionText focused={focused}>Explorar todo</DescriptionText>
                </Description>
            </Title>
        </FocusContext.Provider>
    )
}

export default FeedTitle;
