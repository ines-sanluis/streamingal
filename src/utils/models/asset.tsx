export interface Genre {
  id: string;
  name: string;
}
export interface AssetItemProps {
  backdrop_path: string;
  genres: Array<Genre>;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  year?: number;
  runtime?: number;
  homepage?: string;
}

export interface Show extends AssetItemProps {
  origin_country: Array<string>;
  first_air_date: string;
  original_name: string;
  name: string;
  seasons?: number;
  episodes?: number;
}
export interface Movie extends AssetItemProps {
  adult: boolean;
  original_title: string;
  release_date: string;
  video: boolean;
  title: string;
  imdb_id: string;
}

export function isTypeShow(value: Show | Movie): value is Show {
    return (value as Show).original_name !== undefined;
}

export interface AssetDetails extends AssetItemProps {
  title: string;
  year: number;
  runtime: number;
  homepage: string;
  seasons?: number;
  episodes?: number;
}

export function getAssetDetails(asset: Show | Movie) : AssetDetails {
    const details = {
        backdrop_path: asset.backdrop_path,
        genres: asset.genres,
        id: asset.id,
        original_language: asset.original_language,
        overview: asset.overview,
        popularity: asset.popularity,
        poster_path: asset.poster_path,
        vote_average: asset.vote_average,
        vote_count: asset.vote_count,
        title: "",
        year: asset.year,
        runtime: asset.runtime,
        homepage: asset.homepage,
        seasons: 0,
        episodes: 0
    }
    if (isTypeShow(asset)) {
        details.title = asset.original_name || asset.name;
        details.seasons = asset.seasons;
        details.episodes = asset.episodes;

    } else {
        details.title = asset.original_title || asset.title;
    }

    return details;
}
