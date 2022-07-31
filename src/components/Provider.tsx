import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import React from "react";
import styled, { css } from "styled-components";
import { IMAGE_PATH } from "../constants";
import { ProviderType } from "../utils/models/streams";
import getProviderLink from "../utils/providers";

interface ImageProps {
  focused: boolean;
}

const Image = styled.img<ImageProps>`
  border-radius: 15px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    box-shadow: 0px 0px 15px rgba(0,194,203,0.79);
    transform: scale(1.08);
  }
  ${({focused}) => focused && css`
    box-shadow: 0px 0px 15px rgba(0,194,203,0.79);
    transform: scale(1.08);
  }`}
`;

interface ProviderProps {
  provider: ProviderType;
  title: string;
}

function Provider({
    provider,
    title
}: ProviderProps) {

    const onProviderClick = (p: ProviderType) => {
        const link = getProviderLink(p, title);
        if (link){
            window.open(encodeURI(link), "_blank").focus();
        }
    }

    const {
        ref,
        focused
    } = useFocusable({
        onEnterPress: onProviderClick
    });

    return <Image
        focused={focused}
        ref={ref}
        src={`${IMAGE_PATH}${provider.logo_path}`}
        alt={provider.provider_name}
        onClick={() => onProviderClick(provider)}
        key={provider.provider_name}
    />
}

export default Provider;
