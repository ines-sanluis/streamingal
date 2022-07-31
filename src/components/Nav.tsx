import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PATHS } from "../constants";
import TextButton from "./TextButton";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";

interface BarProps {
  black: boolean;
}

const Bar = styled.div<BarProps>`
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100%;
  font-size: 10pt;
  background-color: ${({black}) => black && "#141414"}
`

const Contents = styled.div`
  display: flex;
  padding: 13px;
  padding-left: 20px;
`;

const Logo = styled.img`
  margin: 0;
  margin-right: 40px;
  margin-top: 8px;
  width: 150px;
  height: 30px;
`;

function Nav(){
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();
    const path = window.location.pathname;
    const transitionNavBar = () => {
        if (window.scrollY > 100){
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    const onNavClick = (pathParam: string) => {
        navigate(pathParam);
    };

    return (
        <Bar black={show}>
            <Contents>
                <Logo
                    alt="logo"
                    src={logo}
                />
                <TextButton
                    isSelected={path === PATHS.HOMEPAGE}
                    onClick={() => onNavClick(PATHS.HOMEPAGE)}
                    title="Inicio"
                />
                <TextButton
                    isSelected={path === PATHS.SHOWS}
                    onClick={() => onNavClick(`${PATHS.SHOWS}?page=1`)}
                    title="Series TV"
                />
                <TextButton
                    isSelected={path === PATHS.MOVIES}
                    onClick={() => onNavClick(`${PATHS.MOVIES}?page=1`)}
                    title="Películas"
                />
                <TextButton
                    isSelected={path === PATHS.FAQ}
                    onClick={() => onNavClick(PATHS.FAQ)}
                    title="FAQ"
                />
                <SearchBar />
            </Contents>
        </Bar>
    )
}

export default Nav;
