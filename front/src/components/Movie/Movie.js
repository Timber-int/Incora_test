import React from 'react';
import {NavLink} from "react-router-dom";

import css from './Movie.module.css';
import {img_300, unavailable} from "../../constants";

const Movie = ({movie}) => {

    const {
        id,
        poster_path,
        title,
        release_date,
        vote_average,
    } = movie;

    const getClassByRate = (vote_average) => {
        if (vote_average >= 7.5) {
            return css.good_average;
        } else if (vote_average >= 5) {
            return css.medium_average;
        } else if (vote_average <= 5) {
            return css.bed_average;
        } else {
            return css.none_average
        }
    }

    return (
        <div className={css.movie_card}>
            <NavLink to={`/` + id} state={movie}>
                <img className={css.poster}
                     src={poster_path ? `${img_300}/${poster_path}` : unavailable}
                     alt={title}
                />
                <div className={css.title}>{title}</div>
                <div className={css.release_date_container}>
                    <span>Release date:</span>
                    <span className={css.release_date}>{release_date}</span>
                </div>
            </NavLink>
            <div className={getClassByRate(vote_average)}>{vote_average}</div>
        </div>
    );
};

export {Movie};
