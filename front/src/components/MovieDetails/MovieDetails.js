import React, {useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {getMovie, getVideo} from "../../store";
import {img_500, unavailable} from "../../constants";
import css from './MovieDeteils.module.css'

const MovieDetails = () => {

    const {state: movie} = useLocation();

    const {
        id,
        poster_path,
        title,
        overview,
        original_language,
        release_date,
        vote_count,
        original_title,
    } = movie;

    const dispatch = useDispatch();

    const {movie: movieDetails, video, actors} = useSelector(state => state['movieReducer']);

    useEffect(() => {
        dispatch(getMovie({id}));
        dispatch(getVideo({id}));
    }, [id]);

    const {budget, runtime, production_countries, genres, imdb_id, production_companies} = movieDetails;

    return (
        <div className={css.movie_card_container}>
            <div className={css.exit_box}><NavLink className={css.movie_card_exit} to={'/movies'}>❌</NavLink></div>
            <div className={css.movie_video_container}>
                <iframe title={'video'}
                        className={css.movie_video}
                        src={'https://www.youtube.com/embed/' + video}
                />
            </div>
                    <img className={css.movie_poster_img}
                         src={
                             poster_path
                                 ? `${img_500}/${poster_path}`
                                 : unavailable
                         }
                         alt={title}
                    />
            <div className={css.company_logo_box}>
                {production_companies?.map(element =>
                    <div key={element.id} className={css.company_logo}>
                        <img src={element.logo_path
                            ?
                            `${img_500}/${element.logo_path}`
                            :
                            <></>
                        }
                             alt={element.logo_path ? element.name : ''}
                        />
                    </div>
                )}
            </div>
            <div className={css.movie_description}>
                <div className={css.movie_card_original_title}>{original_title}</div>
                <div className={css.movie_card_overview}>
                    {overview}
                </div>
                <div className={css.movie_information}>
                    <div>Language: {original_language}</div>
                    <div>Release date: {release_date}</div>
                    <div>Vote count: {vote_count}</div>
                    <div>Budget: {budget} $</div>
                    <div>Runtime: {runtime} min</div>
                    <div>Country: {
                        production_countries
                            ?
                            production_countries.map(country => country.name)
                            :
                            ''
                    }
                    </div>
                    <div>
                        Genres: {
                        genres
                            ?
                            genres.map(genre => `${genre.name}; `)
                            :
                            ''
                    }
                    </div>
                    <div>IMDB: {
                        imdb_id
                            ?
                            imdb_id
                            :
                            ''
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export {MovieDetails};
