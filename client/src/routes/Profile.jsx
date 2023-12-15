import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import PhotoSelect from '../components/PhotoSelect'
import fetchPhoto from '../utils/fetchPhoto'
import { USER } from '../redux/actionTypes'
import edit_svg from '../static/edit.svg'
import close_svg from '../static/close.svg'
import logout_svg from '../static/logout.svg'
import handlePhotoUpload from '../utils/photoUpload'
import { validatePassword, validateEmail } from '../utils/validation'
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


function Profile() {

	const dispatch = useDispatch()
	const navigate = useNavigate()

	let user = useSelector(state => state.user)

	useEffect(() => {
		console.log(user)
		if (user.username === null) {
			let localstorage_user = localStorage.getItem('user')
			let user_json = JSON.parse(localstorage_user)
			if (user_json === null) {
				return navigate('/')
			}
			dispatch({type: USER.SET, payload: user_json})
			user = user_json
		}
		if (user === null) {
			return navigate('/')
		}
		if (user.username === null) {
			return navigate('/')
		}
	}, [user])


	const [photo, setPhoto] = useState({
		show: null,
		data: null,
	})

	
	useEffect(() => {
		const handleFetchPhoto = async () => {
			if (user.photo !== null) {
				try {
					const _photo = await fetchPhoto(user.photo)
					if (_photo !== '') {
						setPhoto(prevPhoto => ({ ...prevPhoto, show: _photo }))
					}
				} catch (error) {
					console.log(error)
				}
			}
		}
		handleFetchPhoto()
	}, [])


	function handleLogOut() {
		console.log('logging out')
		dispatch({ type: USER.DELETE })
	}

	const [editField, setEditField] = useState({
		email: false,
		password: false,
	})

	const passRef = useRef()
	const passConfirmRef = useRef()
	const emailRef = useRef()

	function handleEdit(e) {
		setEditField((prevState) => ({
			...prevState,
			[e.target.name]: !prevState[e.target.name],
		}));
	}



	async function handleSaveChanges(e) {

		let updatePass = null
		let updateEmail = null;

		let imageUrl = user.photo
		if (photo.data !== null) {
			imageUrl = await handlePhotoUpload(user.username, photo.data)
		}


		if (editField.password === true) {
			const _pass = passRef.current.value
			const _passConfirm = passConfirmRef.current.value
			const pwdValid = validatePassword(_pass, _passConfirm)
			if (pwdValid.error === true) {
				return alert(pwdValid.message)
			}
			updatePass = _pass
		}

		if (editField.email === true) {
			const _email = emailRef.current.value
			const emailValid = validateEmail(_email)
			if (emailValid.error === true) {
				return alert(emailValid.message)
			}
			updateEmail = _email
		}

		let _body = {
			newPassword: updatePass,
			newEmail: updateEmail,
			newPhoto: imageUrl,
			email: user.email,
		}


        fetch(`${SERVER_URL}/profile/update`, {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(_body),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error === true) {
                    return alert(data.message)
                }
				dispatch({type: USER.SET, payload: data})
				window.location.reload()
            })
            .catch(error => {
                console.log('Error:', error)
            })
		
	}

	const changesExist = photo.data !== null || editField.email === true || editField.password === true


	return (
		<main>
			<div className='profile'>
				<h1>Мой профиль</h1>
				<button onClick={handleLogOut} 
					className='transparent-button logout-button'>
					<img className='icon' src={logout_svg}></img>
				</button>
				<PhotoSelect photo={photo} setPhoto={setPhoto} />
				<br />
				<span>{user.username}</span>
				<span>
					{editField.email === true ?
						<>
							<input ref={emailRef} placeholder={user.email} className='editing-field'></input>
							<button name='email' onClick={handleEdit} className='transparent-button'>
								<img className='icon' src={close_svg}></img>
							</button>
						</>
						:
						<>
							{user.email}
							<button name='email' onClick={handleEdit} className='transparent-button'>
								<img className='icon' src={edit_svg}></img>
							</button>
						</>}
				</span>
				<span>{user.sex}</span>
				<span>{user.birthday}</span>
				
				{editField.password === true ?
					<span>
						<input type='password' ref={passRef} placeholder='Пароль' className='editing-field pass-first'></input>
						<input type='password' ref={passConfirmRef} placeholder='Подтверждение' className='editing-field pass-first'></input>
						<button name='password' onClick={handleEdit} className='transparent-button'>
							<img className='icon' src={close_svg}></img>
						</button>
					</span>
					:
					<div className='button-holder'>
						<button
							onClick={handleEdit}
							name='password'
							className='xbutton'
						>
							Сменить пароль
						</button>
					</div>
				}

				<div className='button-holder'>
					{changesExist && <button onClick={handleSaveChanges} className='xbutton save-button'>Сохранить изменения</button>}
				</div>
			<Link to='/people' className='xbutton people-button'>Смотреть профили</Link>
			</div>
		</main>
	)
}

export default Profile
