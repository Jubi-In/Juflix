import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "92de913c9e9a0de95f98a3fd8ed672c8",
        language: "en-US"
    }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: id => api.get(`movie/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: term =>
        api.get("search/movie", {
            params: {
                query: term
            }
        }),
    cast: id => api.get(`/movie/${id}/credits`)
}

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: id => api.get(`tv/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: term =>
        api.get("search/tv", {
            params: {
                query: term
            }
        }),
    cast: id => api.get(`/tv/${id}/credits`)
}