import React, { useState, useRef } from 'react'
import { validateEmail, validatePassword } from '../utils/validation'
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../redux/actionTypes';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setIsRegistered }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const gotoReg = () => {
        setIsRegistered(false)
    }

    const user = useSelector(state => state.user)
    console.log(user)


    const mailRef = useRef()
    const passRef = useRef()

    async function handleLogin(e) {
        e.preventDefault()

        const _pass = passRef.current.value
        const _mail = mailRef.current.value

        const emailValid = validateEmail(_mail)
        if (emailValid.error === true) {
            return alert(emailValid.message)
        }

        const pwdValid = validatePassword(_pass, _pass)
        if (pwdValid.error === true) {
            return alert(pwdValid.message)
        }

        const _body = {
            email: _mail,
            password: _pass,
        }


        fetch(`${SERVER_URL}/profile/auth`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(_body),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error === true) {
                    return alert(data.message)
                }
                dispatch({ type: USER.SET, payload: data })
                navigate('/account')
            })
            .catch(error => {
                console.log('Error:', error)
            })


    }

    return (
        <div className='form-holder'>
            <h1>Авторизация</h1>
            <span>
                <label htmlFor='mail'>Ваш e-mail</label>
                <input ref={mailRef} name='mail' type='mail'></input>
            </span>
            <span>
                <label htmlFor='password'>Ваш пароль</label>
                <input ref={passRef} name='password' type='password'></input>
            </span>
            <br />
            <span>
                <button className='xbutton' onClick={handleLogin}>Войти</button>
                <br />
                <button className='linkbutton' onClick={gotoReg}>Я хочу зарегистрироваться</button>
            </span>
        </div>
    )
}

export default LoginForm