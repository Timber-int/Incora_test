import React from 'react';
import css from './ChosenGenre.module.css';
import {genreAction} from "../../store";
import {useDispatch} from "react-redux";

const ChosenGenre = ({chosenGenre}) => {

    const {id, name} = chosenGenre;

    const dispatch = useDispatch();

    return (
        <button className={css.chosen_genre_box} onClick={() => dispatch(genreAction.putChosenGenre({genre: chosenGenre}))}>
            {name}
        </button>
    );
};

export {ChosenGenre};
