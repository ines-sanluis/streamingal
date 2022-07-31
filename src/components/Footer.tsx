import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import React, { useCallback } from "react";
import styled from "styled-components";
import logo from "../assets/tmdb_logo_short.svg";

const Wrapper = styled.div`
  background-color: #141414;
  color: #b3b3b3;
  text-align: right;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 17px;
  padding: 40px;
  padding-right: 20px;
  padding-bottom: 0px;
`;

const TmdbWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`

interface NameProps {
  focused: boolean
}

const Name = styled.a<NameProps>`
  color: ${({focused}) => focused ? "#0099CC" : "white"};
  text-decoration: none;
  cursor: pointer;
  &:hover{
    color: #0099CC
  }
`;

const TmdbIcon = styled.img`
  margin-right: 10px;
`

function Footer() {
    const link = "https://www.linkedin.com/in/ines-sanluis/";

    const onPress = useCallback(
        () => {
            window.open(`${link}`, "_blank").focus();
        },
        []
    );

    const { ref, focused } = useFocusable({
        onEnterPress: onPress
    });

    return <Wrapper>
        <p
            ref={ref}
        >
      Creado por
            <Name
                href={link}
                target="_blank"
                focused={focused}
            > Inés San Luís</Name>.
        </p>
        <TmdbWrapper>
            <TmdbIcon src={logo} alt="The Movie Database" height="60px" width="60px" />
            <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
        </TmdbWrapper>
    </Wrapper>
}

export default Footer;
