import React from 'react'
import '../styles/Header.scss'
import photo from '../img/photo.png'
import {name} from '../content.json'
import {Contacts} from "./Contacts";

export const Header: React.FC = () => {
    return (
        <header className='Header'>
            <img src={photo} alt="my face" className='Header__img'/>
            <h1>{name}</h1>
            <Contacts prefix='header' />
        </header>
    )
}