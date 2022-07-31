import { AssetItemProps, Movie, Show } from "./utils/models/asset";
import { ShowDetails, Details, MovieDetails, Episode } from "./utils/models/details";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
export const ASSET_TYPES = {
    SHOW: "tv",
    MOVIE: "movie"
}
export const BANNER_TYPES = {
    HERO: "HERO",
    DETAILS: "DETAILS"
}
export const KEY_CODES = {
    BACK: 8,
    ESC: 27
};
export const PATHS = {
    HOMEPAGE: "/",
    SHOWS: `/list/${ASSET_TYPES.SHOW}`,
    MOVIES: `/list/${ASSET_TYPES.MOVIE}`,
    FAQ: "/faq",
    SEARCH_RESULTS: "/search"
}
export const EMPTY_ASSET : AssetItemProps = {
    backdrop_path: undefined,
    genres: [],
    id: undefined,
    original_language: undefined,
    overview: undefined,
    popularity: undefined,
    poster_path: undefined,
    vote_average: undefined,
    vote_count: undefined
}

export const EMPTY_SHOW : Show = {
    ...EMPTY_ASSET,
    origin_country: [],
    first_air_date: undefined,
    original_name: undefined,
    name: undefined
}

export const EMPTY_MOVIE : Movie = {
    ...EMPTY_ASSET,
    adult: false,
    original_title: undefined,
    release_date: undefined,
    video: false,
    title: undefined,
    imdb_id: undefined
}

export const EMPTY_DETAILS : Details = {
    adult: false,
    backdrop_path: undefined,
    genres: [],
    homepage: undefined,
    id: undefined,
    name: undefined,
    origin_country: [],
    original_language: undefined,
    overview: undefined,
    popularity: undefined,
    poster_path: undefined,
    production_countries: [],
    production_companies: [],
    spoken_languages: [],
    status: undefined,
    tagline: undefined,
    vote_average: undefined,
    vote_count: undefined
}

const EMPTY_EPISODE : Episode = {
    air_date: undefined,
    episode_number: undefined,
    id: undefined,
    name: undefined,
    overview: undefined,
    production_code: undefined,
    runtime: undefined,
    season_number: undefined,
    still_path: undefined,
    vote_average: undefined,
    vote_count: undefined
}

export const EMPTY_SHOW_DETAILS : ShowDetails = {
    ...EMPTY_DETAILS,
    created_by: [],
    episode_run_time: [],
    first_air_date: undefined,
    in_production: false,
    languages: [],
    last_air_date: undefined,
    last_episode_to_air: EMPTY_EPISODE,
    next_episode_to_air: EMPTY_EPISODE,
    networks: [],
    number_of_episodes: undefined,
    number_of_seasons: undefined,
    original_name: undefined,
    seasons: [],
    type: undefined
}

export const EMPTY_MOVIE_DETAILS : MovieDetails = {
    ...EMPTY_DETAILS,
    belongs_to_collection: false,
    budget: undefined,
    imdb_id: undefined,
    original_title: undefined,
    revenue: undefined,
    runtime: undefined,
    video: false,
    release_date: undefined
}

export const STREAM_OPTIONS = {
    FLATRATE: "flatrate",
    FREE: "free",
    RENT: "rent",
    BUY: "buy"
}

export const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";
