import React, { useRef, useState } from 'react'
import RegistrationForm from '../components/RegistrationForm'
import LoginForm from '../components/LoginForm'

function Home() {
    const [isRegistered, setIsRegistered] = useState(false)

    return (
        <main>
            {!isRegistered ?
                <RegistrationForm setIsRegistered={setIsRegistered} />
                :
                <LoginForm setIsRegistered={setIsRegistered} />
            }
        </main>
    )
}

export default Home