
import {useState, useEffect, useCallback} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import axios from "../api/axios";
import requests from "../api/requests";
import { ASSET_TYPES } from "../constants";
import List from "../components/List";
import { Movie, Show } from "../utils/models/asset";
import Pagination from "../components/Pagination";
import useBackHandler from "../hooks/useBackHandler";

const ContentWrapper = styled.div`
  margin-top: 110px;
  padding-left: 40px;
`;

const Title = styled.h1`
  font-weight: 700;
  padding-bottom: 15px;
  margin-bottom: 50px;
`;

function FullList() {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const {type} = params;
    const title = type === ASSET_TYPES.MOVIE ? "Películas" : "Series";
    const [assets, setAssets] = useState<Array<Movie | Show>>([]);
    const [page, setPage] = useState(parseInt(searchParams.get("page"), 10));
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { ref, focusKey } = useFocusable();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    useBackHandler(goBack);

    useEffect(() => {
        setPage(parseInt(searchParams.get("page"), 10));
    }, [searchParams])


    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchPagedDiscover(type, page.toString()));
            const result = request.data;
            setAssets(result.results);
            setPage(parseInt(result.page, 10));
            setTotalPages(parseInt(result.total_pages, 10));
            setTotalResults(parseInt(result.total_results, 10));
            return request;
        }
        fetchData();

    }, [type, page]);

    const changePage = useCallback(
        (newPage) => {
            setSearchParams({page: newPage});
        },
        [setSearchParams]
    )

    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper ref={ref}>
                <Title>{title} ({totalResults})</Title>
                <List
                    type={type}
                    assets={assets}
                />
                {totalPages > 1 && <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    goToPage={changePage}
                />}
            </ContentWrapper>
        </FocusContext.Provider>
    );
}

export default FullList;
