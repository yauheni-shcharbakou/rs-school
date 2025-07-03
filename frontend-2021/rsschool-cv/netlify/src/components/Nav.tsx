import React from 'react'
import 'src/styles/Nav.scss'
import {sections} from 'src/content.json'

export const Nav: React.FC = () => {
    return (
        <nav className="Nav">
            <ul>
                {sections.map(section =>
                    <li key={section}>
                        <a href={`#${section}`}>{section}</a>
                    </li>
                )}
            </ul>
        </nav>
    )
}