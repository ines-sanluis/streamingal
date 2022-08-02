/* eslint-disable @typescript-eslint/no-var-requires */
import styled, { ThemeProvider } from "styled-components";
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
import { GlobalStyles } from "./theme/GlobalStyles";
import { useTheme } from "./hooks/useTheme";
import { useEffect, useState } from "react";


const shows = require("./mock/shows.json");
const movies = require("./mock/movies.json");

init({
    debug: false,
    visualDebug: false
});

const AppContainer = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    padding-bottom: 30px;
`;

function AppFrame() {
    return (
        <>
            <AppContainer>
                <GlobalStyles />
                <Nav />
                <Outlet />
            </AppContainer>
            <Footer />
        </>
    );
}

function App() {
    const {theme, themeLoaded} = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useEffect(() => {
        setSelectedTheme(theme);
    }, [themeLoaded]);

    return (
        <>
            {themeLoaded && <ThemeProvider theme={selectedTheme}>
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
                </BrowserRouter>
            </ThemeProvider>}
        </>);
}

export default App;