import React from 'react'
import {SectionListProps} from 'src/interfaces/props'
import 'src/styles/Section.scss'

export const SectionList: React.FC<SectionListProps> = ({id, items}) =>
    <section id={id.toString()} className='Section'>
        <h3>{id}</h3>
        <ul className='ul'>
            {items.map(item => <li key={item.toString()}>{item}</li> )}
        </ul>
    </section>
