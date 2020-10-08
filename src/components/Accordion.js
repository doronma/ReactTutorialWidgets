import React, { useState, Fragment } from 'react'

const Accordion = ({ items }) => {

    // unpack useState array to activeIndex and setActiveIndex
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index);
    };

    const renderedItems = items.map((item, index) => {

        const active = index === activeIndex ? 'active' : '';

        return (
            <Fragment key={item.title}>
                <div
                    className={`title ${active}`}
                    onClick={() => onTitleClick(index)}
                >
                    <i className="dropdown icon" />
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </Fragment>
        )

    });

    return (
        <div className="ui styled accordion">
            {renderedItems}

        </div>
    )
};
export default Accordion
