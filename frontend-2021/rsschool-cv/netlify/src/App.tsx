import React from 'react'
import 'src/App.scss'
import {Nav} from 'src/components/Nav'
import {Header} from 'src/components/Header'
import {Main} from 'src/components/Main'
import {Footer} from 'src/components/Footer'

const App: React.FC = () => {
    return (
        <div className='App'>
            <Nav />
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default App
