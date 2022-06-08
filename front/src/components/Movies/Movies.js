import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllMovies, getFilteredMovies} from "../../store";
import {Movie} from "../Movie/Movie";

import css from './Movies.module.css';
import {CustomPagination} from "../CustomPagiantion/CustomPagination";
import {SearchForm} from "../SearchForm/SearchForm";
import {Genres} from "../Genres/Genres";

const Movies = () => {

    const {movies, searchData, filteredMovies} = useSelector(state => state['movieReducer']);
    const {chosenGenresId} = useSelector(state => state['genreReducer']);
    const {countOfPages, page} = useSelector(state => state['pageReducer']);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchData.length === 0 ? getAllMovies({page, genreForURL: chosenGenresId}) : getFilteredMovies({
            page,
            searchData
        }));
    }, [page, searchData, chosenGenresId]);


    const chooseUrlPath = (filteredMovies, searchData) => {
        if (filteredMovies && filteredMovies.length > 0 && searchData.length > 0) {
            return filteredMovies;
        } else {
            return movies;
        }
    }
    return (
        <div>
            <div className={css.search_container}>
                <SearchForm/>
            </div>

            <div className={css.genres_container}>
                <Genres/>
            </div>

            <div className={css.movies_container}>
                {chooseUrlPath(filteredMovies, searchData).map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
            <div className={css.movies_container_custom_pagination}>
                <CustomPagination countOfPages={countOfPages}/>
            </div>
        </div>
    );
};

export {Movies};
