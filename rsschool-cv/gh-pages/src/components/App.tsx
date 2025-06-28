import React, {useState, useEffect} from 'react'
import '../styles/App.scss'
import {Nav} from './Nav'
import {Header} from './Header'
import {Main} from './Main'
import {Footer} from './Footer'

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState(true)
    const toggleDarkMode = () => setDarkMode(prev => !prev)

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('darkMode') || 'true') as boolean
        setDarkMode(saved)
    }, [])
    useEffect(() => localStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode])

    return (
        <div className={(darkMode) ? 'App__wrapper' : 'App__wrapper light'}>
            <div className='App'>
                <Nav />
                <Header toggle={toggleDarkMode} />
                <Main />
                <Footer />
            </div>
        </div>
    )
}

export default App
