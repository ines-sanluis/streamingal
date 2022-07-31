/* eslint-disable @typescript-eslint/no-var-requires */
import styled, { createGlobalStyle } from "styled-components";
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import {
    init
} from "@noriginmedia/norigin-spatial-navigation";
import Home from "./views/Home";
import Details from "./views/Details";
import Nav from "./components/Nav";
import FullList from "./views/FullList";
import FAQ from "./views/FAQ";
import { PATHS } from "./constants";
import Footer from "./components/Footer";
import SearchResults from "./views/SearchResults";

const shows = require("./mock/shows.json");
const movies = require("./mock/movies.json");

init({
    debug: false,
    visualDebug: false
});

const AppContainer = styled.div`
  background-color: #141414;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  font-family: sans-serif;
  color: white;
  padding-bottom: 30px;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  },
  body {
    font: Helvetica, Arial, sans-serif;
    font-size: 17px;
  },
  background-color: #141414;
`;

function AppFrame() {
    return (
        <>
            <AppContainer>
                <GlobalStyle />
                <Nav />
                <Outlet />
            </AppContainer>
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppFrame />}>
                    <Route path="/" element={<Home shows={shows} movies={movies} />} />
                    <Route path={PATHS.FAQ} element={<FAQ />} />
                    <Route path="/list/:type" element={<FullList />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path={PATHS.SEARCH_RESULTS} element={<SearchResults />} />
                </Route>
            </Routes>
        </BrowserRouter>);
}

export default App;