import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { Movie, Show } from "../utils/models/asset";
import Asset from "./Asset";

const AssetsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface ListProps {
  assets: Array<Movie | Show>;
  type: string;
}

function List({
    assets,
    type
}: ListProps) {
    const { ref, focusKey } = useFocusable();
    const navigate = useNavigate();

    const redirectToDetails = useCallback(({asset}) => {
        navigate(`/details/${asset.id}?type=${type}`);
    }, [navigate, type]);

    const onAssetFocus = useCallback(
        ({ y }) => {
            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        },
        []
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <AssetsWrapper ref={ref}>
                {assets.map((asset) => (
                    <Asset
                        key={asset.id}
                        asset={asset}
                        onEnterPress={redirectToDetails}
                        onClickHandler={redirectToDetails}
                        onFocus={onAssetFocus}
                        marginBottom
                    />
                ))}
            </AssetsWrapper>
        </FocusContext.Provider>
    )
}

export default List;
