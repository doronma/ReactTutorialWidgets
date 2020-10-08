import React, { useState, useEffect } from 'react'
import axios from 'axios';


const Search = () => {
    const [term, setTerm] = useState('Hello');
    const [results, setResults] = useState([]);


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
                    srsearch: term,
                },
            });
            setResults(data.query.search);
        };

        // If first time
        if (term && !results.length) {
            search();
        } else {
            const timeoutId = setTimeout(() => {
                if (term) {
                    search();
                }
            }, 500);
            /** useEffect can return a function that will be called before the next 
             * time useEffect is called.
            */
            return () => {
                clearTimeout(timeoutId)
            };
        }









    }, [term]);

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
