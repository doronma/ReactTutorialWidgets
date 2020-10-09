import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';

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

];

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'A Shade of Blue',
        value: 'blue'
    }
];

const showAccordion = () => {
    if (window.location.pathname === '/') {
        return <Accordion items={items} />;
    }
}

const showList = () => {
    if (window.location.pathname === '/list') {
        return <Search />;
    }
}

const ShowDropDown = () => {
    if (window.location.pathname === '/dropdown') {
        return <Dropdown />;
    }
}

const showTranslate = () => {
    if (window.location.pathname === '/translate') {
        return <Translate />;
    }
}

export default () => {
    return (<div>
        <div>{showAccordion()} </div>
        <div>{showList()} </div>
        <div>{ShowDropDown()} </div>
        <div>{showTranslate()} </div>
    </div>
    )
}
