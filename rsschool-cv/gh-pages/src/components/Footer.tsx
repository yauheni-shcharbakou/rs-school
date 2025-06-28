import React from 'react'
import '../styles/Footer.scss'
import {Contacts} from './Contacts'
import rsLogo from '../svg/rs_school_js.svg'

export const Footer: React.FC = () =>
    <footer className='Footer'>
        <span>&copy; 2021, all rights reserved.</span>
        <Contacts prefix='footer' />
        <a href='https://rs.school/js/'>
            <img src={rsLogo} alt='RS School logo' />
        </a>
    </footer>
