import { ProviderType } from "./models/streams";

const SEARCH : { [key: number]: Function } = {
    "541" : (title: string) => `https://www.rtve.es/play/buscador/?query=${title}`,
    "8": (title: string) => `https://www.netflix.com/search?q=${title}`,
    "149": (title: string) => `https://ver.movistarplus.es/busqueda/?term=${title}`,
    "10": (title: string) => `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${title}&ie=UTF8`,
    "119": (title: string) => `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${title}&ie=UTF8`,
    "35": (title: string) => `https://rakuten.tv/es/search?q=${title}`,
    "3": (title: string) => `https://play.google.com/store/search?q=${title}&c=movies&gl=ES`
}
const PROVIDERS : { [key: number]: string } = {
    "63": "https://www.filmin.es/",
    "2": "https://tv.apple.com/es/",
    "384": "https://www.hbomax.com/es/es",
    "538": "https://www.plex.tv/",
    "521": "https://spamflix.com/"
}

function getProviderLink(provider: ProviderType, title: string) : string {
    const {provider_id: providerId} = provider;
    let link;
    if (Object.keys(SEARCH).includes(providerId.toString())) {
        const getSearchLink = SEARCH[providerId];
        link = getSearchLink(title);
    } else if (Object.keys(PROVIDERS).includes(providerId.toString())) {
        link = PROVIDERS[providerId];
    }

    return link;
}

export default getProviderLink;
