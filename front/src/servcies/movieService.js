import {API_KEY} from '../constants';
import {axiosMovieService} from "./axiosService";

export const movieService = {
    getAllDiscoverMovie: (page, genreForURL) => axiosMovieService.get(`/discover/movie/?api_key=${API_KEY}&\nlanguage=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`).then(value => value.data),
    getFilteredMovie: (page,searchText ) => axiosMovieService.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`).then(value => value.data),
    getAllDiscoverGenre: () => axiosMovieService.get('/genre/movie/list').then(value => value.data),
    getById: (id) => axiosMovieService.get(`/movie/${id}`).then(value => value.data),
    getVideo: (id) => axiosMovieService.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(value => value.data),
}
