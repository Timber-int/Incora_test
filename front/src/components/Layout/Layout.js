import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <div>
                <NavLink to={'/registration'}>Registration</NavLink>
                <NavLink to={'/movies'}>Movies</NavLink>
                <NavLink to={'/login'}>Login</NavLink>
            </div>

            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export {Layout};
