import React from 'react'
import {contacts} from'../content.json'
import '../styles/Contacts.scss'
import {ContactProps} from '../interfaces/props'

export const Contacts: React.FC<ContactProps> = ({prefix}) =>
    <ul className='Contacts'>
        {contacts.map(contact =>
            <li key={contact}>
                <a href={contact} key={prefix + contact}>
                    <i className='hidden' aria-hidden='true'>Contacts link</i>
                </a>
            </li>
        )}
    </ul>
