import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FocusableComponentLayout, FocusContext, FocusDetails, KeyPressDetails, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import {Show, Movie} from "../utils/models/asset";
import Asset from "./Asset";
import FeedTitle from "./FeedTitle";
import { ASSET_TYPES } from "../constants";

const FeedWrapper = styled.div`
  padding-bottom: 10px;
`;

const FeedScrollingWrapper = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
`;

const FeedScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
`;

interface FeedProps {
  title: string;
  assets: Array<Show | Movie>;
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onAssetClick: (props: object) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function Feed({
    title: feedTitle,
    assets,
    onAssetPress,
    onAssetClick,
    onFocus
}: FeedProps) {
    const navigate = useNavigate();
    const { ref, focusKey, hasFocusedChild } = useFocusable({
        onFocus,
        trackChildren: true
    });

    const scrollingRef = useRef(null);

    const onAssetFocus = useCallback(
        ({ x }) => {
            scrollingRef.current.scrollTo({
                left: x,
                behavior: "smooth"
            });
        },
        [scrollingRef]
    );

    const onFeedPress = useCallback(
        (event) => {
            const {title} = event;
            if (title === "Series") {
                navigate(`/list/${ASSET_TYPES.SHOW}?page=1`);
            } else {
                navigate(`/list/${ASSET_TYPES.MOVIE}?page=1`);
            }
        },
        [navigate]
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <FeedWrapper ref={ref}>
                <FeedTitle
                    title={feedTitle}
                    focusedFeed={hasFocusedChild}
                    onEnterPress={onFeedPress}
                    onClickHandler={onFeedPress}
                />
                <FeedScrollingWrapper ref={scrollingRef}>
                    <FeedScrollingContent>
                        {assets.map((asset) => (
                            <Asset
                                key={asset.id}
                                asset={asset}
                                onEnterPress={onAssetPress}
                                onClickHandler={onAssetClick}
                                onFocus={onAssetFocus}
                            />
                        ))}
                    </FeedScrollingContent>
                </FeedScrollingWrapper>
            </FeedWrapper>
        </FocusContext.Provider>
    );
}

export default Feed;
