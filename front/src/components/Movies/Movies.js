import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllMovies} from "../../store";
import {Movie} from "../Movie/Movie";

import css from './Movies.module.css';
import {CustomPagination} from "../CustomPagiantion/CustomPagination";

const Movies = () => {

    const {movies} = useSelector(state => state['movieReducer']);
    const {countOfPages,page} = useSelector(state => state['pageReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMovies({page}));
    }, [page]);

    return (
        <div>
            <div className={css.movies_container}>
                {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
            <div className={css.movies_container_custom_pagination}>
                <CustomPagination countOfPages={countOfPages}/>
            </div>
        </div>
    );
};

export {Movies};
