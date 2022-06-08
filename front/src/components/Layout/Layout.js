import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

import css from './Layout.module.css';

const Layout = () => {
    return (
        <>
            <div className={css.navigate_container}>
                <NavLink to={'/registration'}>Registration</NavLink>
                <NavLink to={'/movies'}>Movies</NavLink>
                <NavLink to={'/login'}>Login</NavLink>
            </div>

            <div>
                <Outlet/>
            </div>
        </>
    );
};

export {Layout};
