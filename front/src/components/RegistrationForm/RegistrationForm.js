import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../../store";
import {useLocation, useNavigate} from "react-router-dom";

const RegistrationForm = () => {

    const {reset, register, handleSubmit} = useForm();

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {accessToken, refreshToken} = useSelector(state => state['authReducer']);

    const submit = (data) => {
        dispatch(registration({registrationPayload: data}));
    }

    useEffect(() => {

        if (accessToken && refreshToken) {
            navigate('/movies')
        }

    }, [accessToken, navigate, refreshToken]);

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div><label> <input type="text" {...register('firstName')} placeholder={'firstName'}/></label></div>
                <div><label> <input type="text" {...register('lastName')} placeholder={'lastName'}/></label></div>
                <div><label> <input type="number" {...register('age')} placeholder={'age'}/></label></div>
                <div><label> <input type="text" {...register('phone')} placeholder={'phone'}/></label></div>
                <div><label> <input type="text" {...register('email')} placeholder={'email'}/></label></div>
                <div><label> <input type="password" {...register('password')} placeholder={'password'}/></label></div>
                <div><label> <input type="submit" value={'Registration'}/></label></div>
            </form>
        </div>
    );
};

export {RegistrationForm};
