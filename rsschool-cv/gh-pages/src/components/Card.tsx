import React from 'react'
import {CardProps} from '../interfaces/props'
import '../styles/Card.scss'

export const Card: React.FC<CardProps> = (props) =>
    <figure className='Card'>
        <a href={props.href.toString()} target='_blank' rel='noreferrer'>
            <h4>{props.title}</h4>
            <div className='Card__container'>
                <div>
                    <p className='Card__primary'>Technologies: {props.technologies}</p>
                    <p>Description: {props.desc}</p>
                </div>
                <span className='Card__date'>{props.date}</span>
            </div>
        </a>
    </figure>
