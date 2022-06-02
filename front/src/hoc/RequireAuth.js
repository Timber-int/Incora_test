import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import {ACCESS} from "../constants";

const RequireAuth = ({children}) => {
    const location = useLocation();

    const user = localStorage.getItem(ACCESS);

    if (!user) {
        return <Navigate to={'/login'} state={location}/>
    }

    return children;
};

export {RequireAuth};
