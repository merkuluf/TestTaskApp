import React, { useEffect, useRef, useState } from 'react'
import PhotoSelect from '../components/PhotoSelect'
import handlePhotoUpload from '../utils/photoUpload'
import { useNavigate } from 'react-router-dom'
import profile_png from '../static/profile.png'
import { useSelector, useDispatch } from 'react-redux'
import { validateEmail, validatePassword, validateUsername } from '../utils/validation'
import { USER } from '../redux/actionTypes'
const SERVER_URL = import.meta.env.VITE_SERVER_URL;



function RegistrationForm({ setIsRegistered }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        let localstorage_user = localStorage.getItem('user')
        let userJson = JSON.parse(localstorage_user)
        if (userJson !== null) {
            navigate('/account')
        }
    })


    const nameRef = useRef()
    const mailRef = useRef()
    const passRef = useRef()
    const passConfRef = useRef()
    const birthdayRef = useRef()
    const sexRef = useRef()


    const [photo, setPhoto] = useState({
        show: profile_png,
        data: null,
    })

    const gotoLogin = () => {
        setIsRegistered(true)
    }

    async function handleRegister(e) {
        e.preventDefault()
        const _name = nameRef.current.value
        const _pass = passRef.current.value
        const _mail = mailRef.current.value
        const _passConfirm = passConfRef.current.value
        const _birthday = birthdayRef.current.value
        const _sex = sexRef.current.value


        const nameValid = validateUsername(_name)
        if (nameValid.error === true) {
            return alert(nameValid.message)
        }

        const emailValid = validateEmail(_mail)
        if (emailValid.error === true) {
            return alert(emailValid.message)
        }

        if (_birthday === '') {
            return alert('Введите дату рождения!')
        }

        const pwdValid = validatePassword(_pass, _passConfirm)
        if (pwdValid.error === true) {
            return alert(pwdValid.message)
        }

        let imageUrl = 'profile.png'
        if (photo.data !== null) {
            imageUrl = await handlePhotoUpload(_name, photo.data);
        }

        const _body = {
            username: _name,
            password: _pass,
            photo: imageUrl,
            birthday: _birthday,
            sex: _sex,
            email: _mail,
        }

        fetch(`${SERVER_URL}/profile/register`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(_body),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error === true) {
                    return alert(data.message)
                }
                setIsRegistered(true)
                alert('Вы успешно зарегистрированы!')
                // dispatch({type: USER.SET, payload: data})
                console.log(data, '<<')
            })
            .catch(error => {
                console.log('Error:', error)
            })


    }



    return (
        <div className='form-holder'>

            <p className='form-title'>Регистрация</p>

            <PhotoSelect setPhoto={setPhoto} photo={photo} />

            <span>
                <label htmlFor='name'>Ваше имя</label>
                <input ref={nameRef} name='name' type='name'></input>
            </span>
            <span>
                <label htmlFor='mail'>Ваш e-mail</label>
                <input ref={mailRef} name='mail' type='mail'></input>
            </span>
            <span>
                <label htmlFor='birthdate'>Дата рождения</label>
                <input ref={birthdayRef} name='birthdate' type='date'></input>
            </span>
            <span>
                <label htmlFor='sex'>Ваш пол</label>
                <select ref={sexRef} name='sex'>
                    <option>Мужчина</option>
                    <option>Женщина</option>
                    <option>Предпочитаю не говорить</option>
                </select>
            </span>
            
            <span>
                <label htmlFor='password'>Ваш пароль</label>
                <input ref={passRef} name='password' type='password'></input>
            </span>
            <span>
                <label htmlFor='password-confirm'>Подтвердите пароль</label>
                <input ref={passConfRef} name='password-confirm' type='password'></input>
            </span>
            <br />
            <span>
                <button className='xbutton' onClick={handleRegister}>Зарегистрироваться</button>
                <br />
                <button className='linkbutton' onClick={gotoLogin}>У меня есть аккаунт</button>
            </span>


        </div>
    )
}

export default RegistrationForm