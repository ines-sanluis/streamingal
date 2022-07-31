import { Genre, Movie, Show } from "./asset";

interface Company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface Country {
  iso_3166_1: string;
  name: string;
}
export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}
interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
interface Creators {
  id: string;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}
export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Details {
  adult: boolean;
  backdrop_path: string;
  genres: Array<Genre>;
  homepage: string;
  id: string;
  name: string;
  origin_country: Array<string>;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: Array<Country>;
  production_companies: Array<Company>;
  spoken_languages: Array<Language>;
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}
export interface ShowDetails extends Details{
  created_by: Array<Creators>;
  episode_run_time: Array<number>;
  first_air_date: string;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: string;
  last_episode_to_air: Episode;
  next_episode_to_air: Episode;
  networks: Array<Company>;
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  seasons: Array<Season>;
  type: string;
}
export interface MovieDetails extends Details{
  belongs_to_collection: boolean;
  budget: number;
  imdb_id: string;
  original_title: string;
  revenue: number;
  runtime: number;
  video: boolean;
  release_date: string;
}

export function getShowFromDetails(details: ShowDetails) : Show {
    return {
        backdrop_path: details.backdrop_path,
        genres: details.genres,
        id: parseInt(details.id, 10),
        original_language: details.original_language,
        overview: details.overview,
        popularity: undefined,
        poster_path: details.poster_path,
        vote_average: details.vote_average,
        vote_count: details.vote_count,
        origin_country: details.origin_country,
        first_air_date: details.first_air_date,
        original_name: details.original_name,
        name: details.name,
        year: details.first_air_date ? new Date(details.first_air_date).getFullYear() : undefined,
        runtime: details.episode_run_time.length > 0 ? details.episode_run_time.reduce((a, b) => a + b, 0) / details.episode_run_time.length : undefined,
        homepage: details.homepage,
        seasons: details.number_of_seasons,
        episodes: details.number_of_episodes
    }
}

export function getMovieFromDetails(details: MovieDetails) : Movie {
    return {
        backdrop_path: details.backdrop_path,
        genres: details.genres,
        id: parseInt(details.id, 10),
        original_language: details.original_language,
        overview: details.overview,
        popularity: undefined,
        poster_path: details.poster_path,
        vote_average: details.vote_average,
        vote_count: details.vote_count,
        adult: details.adult,
        original_title: details.original_title,
        release_date: "",
        video: details.video,
        title: details.original_title,
        imdb_id: details.imdb_id,
        year: new Date(details.release_date).getFullYear(),
        runtime: details.runtime,
        homepage: details.homepage
    }
}
