import axios from 'axios'
import {baseMovieURL, baseURL} from "../config";
import {AUTHORIZATION} from "../constants";

export const axiosService = axios.create({
    baseURL,
});
export const axiosMovieService = axios.create({
    baseURL: baseMovieURL,
    headers:{
        Authorization:AUTHORIZATION,
    }
});

