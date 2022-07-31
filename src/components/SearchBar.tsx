import React, { useCallback, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants";

interface WrapperProps {
  focused: boolean
}
const Wrapper = styled.div<WrapperProps>`
  margin-left: auto;
  border: ${({focused}) => focused ? "1px solid white" : "none"};
`;

const SearchInputs = styled.div`
  display: flex;
`;

const Input = styled.input`
  background-color: rgba(51, 51, 51, 0.5);
  color: white;
  border: none;
  border-radius: 2px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  font-size: 18px;
  padding: 15px;
  height: 10px;
  width: 200px;
  &:focus{
    outline: none;
  }
`;

const Icon = styled.div`
  height: 40px;
  width: 50px;
  background-color: rgba(51, 51, 51, 0.5);
  color: white;
  display: grid;
  place-items: center;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
`;

function SearchBar() {
    const [wordEntered, setWordEntered] = useState("");
    const navigate = useNavigate();
    const makeSearch = useCallback(
        () => {
            navigate(`${PATHS.SEARCH_RESULTS}?query=${wordEntered}`);
        },
        [navigate, wordEntered]
    );
    const { ref, focused, focusSelf } = useFocusable(
        {onEnterPress: makeSearch}
    );

    const handleFilter = (event: { target: { value: any; }; }) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    };

    const clearInput = () => {
        setWordEntered("");
    };

    return (
        <Wrapper
            ref={ref}
            focused={focused}
            onMouseEnter={focusSelf}
        >
            <SearchInputs>
                <Input
                    type="text"
                    placeholder="Buscar..."
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <Icon>
                    {wordEntered === "" ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon style={{cursor: "pointer"}} onClick={clearInput} />
                    )}
                </Icon>
            </SearchInputs>
        </Wrapper>
    );
}

export default SearchBar;
