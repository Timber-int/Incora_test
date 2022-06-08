import React from 'react';

import css from './Genre.module.css';
import {useDispatch} from "react-redux";
import {genreAction} from "../../store";

const Genre = ({genre}) => {

    const {id, name} = genre;

    const dispatch = useDispatch();

    return (
        <button className={css.genre_box} onClick={() => dispatch(genreAction.setChosenGenre({chosenGenre: genre}))}>
            {name}
        </button>
    );
};

export {Genre};
