import React from 'react'
import {sections, skills, education, projects} from '../content.json'
import '../styles/Main.scss'
import '../styles/Section.scss'
import {Card} from './Card'
import {examples} from '../examples'
import {SectionList} from './SectionList'

export const Main: React.FC = () => {
    return (
        <main className='Main'>
            <article className='Main__article'>
                <section id={sections[0]} className='Section'>
                    <h3>{sections[0]}</h3>
                    <p>
                        I am going to become a javascript frontend developer. I have a high learning ability,
                        perseverance and desire to develop in this area.
                    </p>
                    <p>
                        I enjoy creating mobile apps, playing sports and learning new things. Since childhood,
                        I had a predisposition to work with electronics and computers. I love to disassemble,
                        assemble and configure something...
                    </p>
                    <p>
                        I haven’t had a chance to work in IT yet, all projects were completed as a freelancer.
                    </p>
                </section>
                <section id={sections[1]} className='Section'>
                    <h3>{sections[1]}</h3>
                    <p>Example of JS function, which subtracts one list from another and returns the result (codewars):</p>
                    <pre><code className="language-javascript">{examples[0]}</code></pre>
                    <p>JS function to convert RGB to HEX (codewars):</p>
                    <pre><code className="language-javascript">{examples[1]}</code></pre>
                    <p>Kotlin function to check online state in app:</p>
                    <pre><code className="language-kotlin">{examples[2]}</code></pre>
                </section>
                <section id={sections[2]} className='Section'>
                    <h3>{sections[2]}</h3>
                    {projects.map(p =>
                        <Card
                            title={p.title}
                            href={p.href}
                            desc={p.desc}
                            technologies={p.technologies}
                            date={p.date}
                            key={p.href}
                        />
                    )}
                </section>
            </article>
            <aside className='Main__aside'>
                <SectionList id={sections[3]} items={skills} />
                <SectionList id={sections[4]} items={education} />
                <section id={sections[5]} className='Section'>
                    <h3>{sections[5]}</h3>
                    <p>My english knowledge level is A2 (Pre-Intermediate).</p>
                </section>
            </aside>
        </main>
    )
}