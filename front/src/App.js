import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Layout} from "./components";
import {LoginPage, MovieDetailsPage, RegistrationPage} from "./pages";
import {RequireAuth} from "./hoc";
import {MoviesPage} from "./pages/MoviesPage/MoviesPage";
import {useSelector} from "react-redux";

const App = () => {

    const navigate = useNavigate();

    const {accessToken} = useSelector(state => state['authReducer']);

    useEffect(() => {
        if (accessToken) {
            navigate('/movies')
        }
    }, [accessToken]);

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'movies'} element={<RequireAuth><MoviesPage/></RequireAuth>}/>
                <Route path={':id'} element={<RequireAuth><MovieDetailsPage/></RequireAuth>}/>
                <Route index path={'login'} element={<LoginPage/>}/>
            </Route>
        </Routes>
    );
};

export {App};
