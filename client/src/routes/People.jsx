import React, { useEffect, useState } from 'react'
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import AvatarDisplay from '../components/AvatarDisplay';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function People() {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        console.log(123)
        fetch(`${SERVER_URL}/profile/everybody`, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error === true) {
                    return alert(data.message)
                }

                console.log(data)
                setUsers(data)
            })
            .catch(error => {
                console.log('Error:', error)
            })

    }, [])

    const usersExist = users.length !== 0
    
    function handleGoBack() {
        navigate('/account')
    }

    return (
        <div className='people'>
            <Link to='/account' className='xbutton profile-button'>В Профиль</Link>
            <div className='people-list'>
                {usersExist &&
                users.map(user => {
                    return (
                        <div key={user.birthday} className='user-card'>
                            <AvatarDisplay filename={user.photo} />
                            <h1>{user.username}</h1>
                            <p>{user.birthday.split('T')[0]}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default People