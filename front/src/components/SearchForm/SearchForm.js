import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {movieAction} from "../../store";
import css from './SearchForm.module.css';

const SearchForm = () => {

    const {handleSubmit, register, reset} = useForm();

    const dispatch = useDispatch();

    const submit = (data) => {
        dispatch(movieAction.filterMovies({searchData: data}))
    }

    return (
            <form onSubmit={handleSubmit(submit)} className={css.searchForm}>
                <input type="text" {...register('title')} placeholder={'Search movie...'}/>
                <button className={css.searchButton}>Search</button>
            </form>
    );
};

export {SearchForm};
