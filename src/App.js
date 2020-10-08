import React from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';

const items = [

    {
        title: 'What is React?',
        content: 'React is a front end javascript framework'
    },
    {
        title: 'Why use React?',
        content: 'React is a favorites JS library'
    },
    {
        title: 'How to use React?',
        content: 'Use React by creating components'
    }

]

export default () => {
    return (
        <div>
            <Search />

        </div>
    )
}
