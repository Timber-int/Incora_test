import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store";

const LoginForm = () => {


    const {reset, register, handleSubmit} = useForm();

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {accessToken, refreshToken} = useSelector(state => state['authReducer']);

    const submit = (data) => {
        dispatch(login({loginPayload: data}));
    }

    useEffect(() => {

        if (accessToken && refreshToken) {
            navigate('/movies')
        }

    }, [accessToken, navigate, refreshToken]);

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div><label> <input type="text" {...register('email')} placeholder={'email'}/></label></div>
                <div><label> <input type="password" {...register('password')} placeholder={'password'}/></label>
                </div>
                <div><label> <input type="submit" value={'Login'}/></label></div>
            </form>
        </div>
    );
};

export {LoginForm};
