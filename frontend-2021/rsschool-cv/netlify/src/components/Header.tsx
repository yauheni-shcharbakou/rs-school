import React from 'react'
import 'src/styles/Header.scss'
import photo from 'src/img/photo.png'
import {name} from 'src/content.json'
import {Contacts} from "src/components/Contacts";

export const Header: React.FC = () => {
    return (
        <header className='Header'>
            <img src={photo} alt="my face" className='Header__img'/>
            <h1>{name}</h1>
            <Contacts prefix='header' />
        </header>
    )
}