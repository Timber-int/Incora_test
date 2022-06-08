import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllGenres} from "../../store";
import {Genre} from "../Genre/Genre";

import css from './Genres.module.css';
import {ChosenGenre} from "../ChosenGenre/ChosenGenre";

const Genres = () => {

    const {genres, chosenGenres} = useSelector(state => state['genreReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGenres());
    }, [])

    return (
        <div className={css.genres_container}>
            {chosenGenres && chosenGenres.length
                ?
                <div className={css.genre_new_box}>{chosenGenres.map(chosenGenre =>
                    <ChosenGenre
                        key={chosenGenre.id}
                        chosenGenre={chosenGenre}
                    />
                )}
                </div>
                :
                <>

                </>
            }
            <div className={css.genre_new_box}>{genres.map(genre => <Genre key={genre.id} genre={genre}/>)}</div>
        </div>
    );
};

export {Genres};
