import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
    useFocusable,
    FocusContext
} from "@noriginmedia/norigin-spatial-navigation";
import styled from "styled-components";
import Banner from "../components/Banner";
import axios from "../api/axios";
import requests from "../api/requests";
import useBackHandler from "../hooks/useBackHandler"
import { Movie, Show } from "../utils/models/asset";
import { ASSET_TYPES, BANNER_TYPES, EMPTY_SHOW_DETAILS } from "../constants";
import { getMovieFromDetails, getShowFromDetails, MovieDetails, ShowDetails } from "../utils/models/details";
import WatchOptions from "../components/WatchOptions";
import Credits from "../components/Credits";

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding-left: 40px;
`;

function Details() {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const [asset, setAsset] = useState<Show | Movie>(undefined);
    const assetDetails = useRef<ShowDetails | MovieDetails>(EMPTY_SHOW_DETAILS);
    const [watchProviders, setWatchProviders] = useState(undefined);
    const {id} = params;
    const type = searchParams.get("type");
    const isShowType = type === ASSET_TYPES.SHOW;

    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    useBackHandler(goBack);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchDetails(type, id));
            const result = request.data;
            assetDetails.current = result;
            if (isShowType) {
                setAsset(getShowFromDetails(assetDetails.current as ShowDetails));
            } else {
                setAsset(getMovieFromDetails(assetDetails.current as MovieDetails));
            }
            return request;
        }
        async function fetchProviders(){
            const request = await axios.get(requests.fetchWatchProviders(type, id));
            const result = request.data;
            setWatchProviders(result.results.ES);
            return request;
        }
        fetchData();
        fetchProviders();
    }, [type, id, isShowType]);

    const { ref, focusKey } = useFocusable();

    const onBannerFocus = useCallback(
        ({y}) => {
            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        },
        []
    );

    return <FocusContext.Provider value={focusKey}>
        <ContentWrapper ref={ref}>
            {asset && <Banner
                asset={asset}
                type={BANNER_TYPES.DETAILS}
                onFocus={onBannerFocus}
                watchLink={watchProviders?.link}
            />}
            <Container>
                <WatchOptions
                    options={watchProviders}
                    title={assetDetails.current.name}
                />
                <Credits
                    asset={isShowType ? assetDetails.current as ShowDetails : assetDetails.current as MovieDetails}
                />
            </Container>
        </ContentWrapper>
    </FocusContext.Provider>;
}

export default Details;
