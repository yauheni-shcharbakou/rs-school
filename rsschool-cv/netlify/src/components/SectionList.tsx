import React from 'react'
import {SectionListProps} from '../interfaces/props'
import '../styles/Section.scss'

export const SectionList: React.FC<SectionListProps> = (props) => {
    return (
        <section id={props.id.toString()} className='Section'>
            <h3>{props.id}</h3>
            <ul className='ul'>
                {props.items.map(item => <li key={item.toString()}>{item}</li> )}
            </ul>
        </section>
    )
}