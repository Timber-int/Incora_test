import React from 'react';
import {Pagination} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";
import {setPageNumber} from "../../store/pageSlice";
import css from './Pagination.module.css';

const CustomPagination = ({countOfPages}) => {

    const dispatch = useDispatch();

    const {page} = useSelector(state => state['pageReducer']);

    const handlePageChange = (page) => {
        dispatch(setPageNumber({page}));
        window.scroll(0, 0);
    }

    return (
        <div className={css.pagination_container}>
            <Pagination
                count={countOfPages}
                onChange={(e) => handlePageChange(e.target.textContent)}
                hideNextButton
                hidePrevButton
                page={JSON.parse(page)}
                className={css.pagination_button}
            />
        </div>
    );
};

export {CustomPagination};
