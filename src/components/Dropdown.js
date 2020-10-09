import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({ options, selected, onSelectedChange }) => {

    const [open, setOpen] = useState(false);
    const ref = useRef();

    // close select when user clicked on the body
    useEffect(() => {


        const onBodyClick = (event) => {
            // send an event to close dropdown only if clicked outside component
            // ref is pointing to the div containing the dropwdown
            if (ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        document.body.addEventListener('click', onBodyClick);

        // some clean up , when the dropdown is removed from the dom
        return () => {
            document.body.removeEventListener('click', onBodyClick);
        }

    }, []);


    const renderedOptions = options.map((option) => {

        // Show item in the list only if it is not selectede
        if (option.value === selected.value) {
            return null;
        }

        return (
            <div
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </div>
        );
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">Select a Color</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className="dropdown icon"></i>
                    <div classame="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>

                </div>
            </div>
            <div>
                <h1 style={{ color: selected.value }}>This is a heading with color {selected.value}</h1>
            </div>
        </div>
    );
};

export default Dropdown;
