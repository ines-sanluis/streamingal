import { ASSET_TYPES } from "../../constants"
import { Genre } from "../models/asset"

const MOVIE_GENRES : { [key: string]: string } = {
    "28": "Acción",
    "12": "Aventura",
    "16": "Animación",
    "35": "Comedia",
    "80": "Crime",
    "99": "Documental",
    "18": "Drama",
    "10751": "Familia",
    "14": "Fantasía",
    "36": "Historia",
    "27": "Horror",
    "10402": "Música",
    "9648": "Misterio",
    "10749": "Romance",
    "878": "Ciencia ficción",
    "10770": "Película",
    "53": "Thriller",
    "10752": "Guerra",
    "37": "Western"
}
const TV_GENRES : { [key: string]: string } = {
    "10759": "Acción e Aventura",
    "16": "Animación",
    "35": "Comedia",
    "80": "Crime",
    "99": "Documental",
    "18": "Drama",
    "10751": "Familia",
    "10762": "Nenos",
    "9648": "Misterio",
    "10763": "Noticias",
    "10764": "Reality",
    "10765": "Ciencia ficción e fantasía",
    "10766": "Telenovela",
    "10767": "Talk Show",
    "10768": "Guerra e Política",
    "37": "Western"
}

function getGenreName(genre: Genre, type: string) : string {
    const {id, name} = genre;
    let genreName = name;
    if (type === ASSET_TYPES.SHOW && Object.keys(TV_GENRES).includes(id.toString())) {
        genreName = TV_GENRES[id];
    } else if (Object.keys(MOVIE_GENRES).includes(id.toString())){
        genreName = MOVIE_GENRES[id];
    } else {
        console.log(type, name, id.toString());
    }
    return genreName;
}

export default getGenreName;
