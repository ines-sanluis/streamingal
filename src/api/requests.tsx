const requests = {
    fetchDetails: (type: string, id: string) => `/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=gl`,
    fetchWatchProviders: (type: string, id: string) => `/${type}/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&watch_region=ES`,
    fetchDiscover: (type: string) => `/discover/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=gl&with_original_language=gl`,
    fetchPagedDiscover: (type: string, page: string) => `/discover/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=gl&with_original_language=gl&page=${page}`,
    searchMovie: (query: string) => `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&language=gl`,
    searchShow: (query: string) => `/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&language=gl`
};

export default requests;
