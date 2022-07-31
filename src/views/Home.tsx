
import { shuffle } from "lodash";
import React, { useCallback } from "react";
import {
    useFocusable,
    FocusContext
} from "@noriginmedia/norigin-spatial-navigation";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Feed from "../components/Feed";
import { Show, Movie, isTypeShow } from "../utils/models/asset";
import { ASSET_TYPES, BANNER_TYPES } from "../constants";

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  margin-top: 40px;
`;

interface HomeProps {
  shows: Array<Show>;
  movies: Array<Movie>;
}

function Home({
    shows,
    movies
}: HomeProps) {

    const navigate = useNavigate();
    const feeds = [{
        title: "Series",
        assets: shuffle(shows.filter((asset) => asset.backdrop_path))
    },
    {
        title: "Películas",
        assets: shuffle(movies.filter((asset) => asset.backdrop_path))
    }];

    const { ref, focusKey: generatedFocusKey } = useFocusable();

    const randomMovie = shuffle(movies.filter((asset) => asset.backdrop_path && asset.overview))[0];

    const onFeedFocus = useCallback(
        ({ y }) => {
            window.scrollTo({
                top: y + 220,
                behavior: "smooth"
            });
        },
        []
    );

    const onBannerFocus = useCallback(
        ({y}) => {
            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        },
        []
    );

    const onAssetPress = useCallback(
        (event) => {
            const {asset} = event;
            const type = isTypeShow(asset) ? ASSET_TYPES.SHOW : ASSET_TYPES.MOVIE;
            navigate(`/details/${asset.id}?type=${type}`);
        },
        [navigate]
    );

    return (
        <FocusContext.Provider value={generatedFocusKey}>
            <ContentWrapper ref={ref}>
                <Banner
                    asset={randomMovie}
                    type={BANNER_TYPES.HERO}
                    onFocus={onBannerFocus}
                />
                <ScrollingRows>
                    {feeds.map(({ title, assets }) => (
                        <Feed
                            key={title}
                            title={title}
                            assets={assets}
                            onAssetPress={onAssetPress}
                            onAssetClick={onAssetPress}
                            onFocus={onFeedFocus}
                        />
                    ))}
                </ScrollingRows>
            </ContentWrapper>
        </FocusContext.Provider>
    );
}

export default Home;
