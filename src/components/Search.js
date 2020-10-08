import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Search = () => {
    const [term, setTerm] = useState('hello');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    // activated when a user press a key
    useEffect(() => {
        if (term) {
            const timerId = setTimeout(() => {
                setDebouncedTerm(term);
            }, 1000);
            /** useEffect can return a function that will be called before the next 
             * time useEffect is called.
            */
            return () => {
                clearTimeout(timerId);
            };
        }
    }, [term]);

    // activated when the first useEffect updated debouncedTerm
    useEffect(() => {
        /** useEffect is invoked firttime and when term changes
           every time term is changed.
           useEffect cannot use async functions directly
        */
        const search = async () => {
            // extract data from result
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                },
            });
            setResults(data.query.search);
        };
        if (debouncedTerm) {
            search();
        }
    }, [debouncedTerm]);


    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a
                        className="ui button"
                        href={`http://en.wikipedia.org?curid=${result.pageid}`}
                    >

                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {/* XSS secutiry issue */}
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }} />

                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input" />


                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    )
}

export default Search
