import React from 'react'
import '../styles/Nav.scss'
import {sections} from '../content.json'

export const Nav: React.FC = () =>
    <nav className='Nav'>
        <div className='Nav__burger'>
            <span>Menu</span>
            <svg className='Nav__burger__icon' viewBox='0 0 100 100'>
                <g>
                    <rect x='10' y='10' width='80' height='15'/>
                    <rect x='10' y='42.5' width='80' height='15'/>
                    <rect x='10' y='75' width='80' height='15'/>
                </g>
            </svg>
        </div>
        <ul>
            {sections.map(section =>
                <li key={section}>
                    <a href={`#${section}`}>{section}</a>
                </li>
            )}
        </ul>
    </nav>
