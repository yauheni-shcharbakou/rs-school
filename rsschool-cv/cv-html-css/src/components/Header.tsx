import React from 'react'
import '../styles/Header.scss'
import photo from '../img/photo.png'
import {name} from '../content.json'
import {Contacts} from './Contacts'
import {HeaderType} from '../interfaces/types'

export const Header: React.FC<HeaderType> = ({toggle}) =>
    <header className='Header'>
        <button className='Header__btn' onClick={toggle} />
        <img src={photo} alt='my face' className='Header__img' />
        <h1>{name}</h1>
        <Contacts prefix='header' />
    </header>
