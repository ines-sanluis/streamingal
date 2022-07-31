import React, { useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../api/axios";
import requests from "../api/requests";
import List from "../components/List";

const ContentWrapper = styled.div`
  margin-top: 110px;
  padding-left: 40px;
`;

const Title = styled.h1`
  font-weight: 700;
  padding-bottom: 22px;
`;


function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [movies, setMovies] = useState(undefined);
    const [shows, setShows] = useState(undefined);

    const fetchGalicianResults = (result: { results: any[]; total_pages: number; total_results: number}) => {
        const galician = {...result};
        galician.results = result.results.filter((r) => r.original_language === "gl");
        galician.total_pages = galician.results.length / 20;
        galician.total_results = galician.results.length;
        return galician;
    }

    useEffect(() => {
        async function fetchMovieResults(){
            const request = await axios.get(requests.searchMovie(query));
            const result = request.data;
            setMovies(fetchGalicianResults(result));
            return request;
        }
        async function fetchShowResults(){
            const request = await axios.get(requests.searchShow(query));
            const result = request.data;
            setShows(fetchGalicianResults(result));
            return request;
        }
        fetchMovieResults();
        fetchShowResults();
    }, [query]);


    return <ContentWrapper>
        <Title>{`Resultados para "${query}":`}</Title>
        {shows && movies && (shows.total_results > 0 || movies.total_results > 0) && <>
            <Title>Películas ({movies.total_results})</Title>
            <List
                type="movie"
                assets={movies.results}
            />
        </>}
        {shows && movies && (shows.total_results > 0 || movies.total_results > 0) && <>
            <Title>Series ({shows.total_results})</Title>
            <List
                type="tv"
                assets={shows.results}
            />
        </>}
        {shows && movies && shows.total_results === 0 && movies.total_results === 0 && <p>Vaites! Non atopamos resultados.</p>}
    </ContentWrapper>
}

export default SearchResults;
