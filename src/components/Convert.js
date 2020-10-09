import React, { useState, useEffect } from 'react';
import axios from 'axios';

const key = "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms - IwDlM";
const baseUrl = 'https://translation.googleapis.com/language/translate/v2'

const Convert = ({ language, text }) => {

    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);


    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [text])


    useEffect(() => {

        const doTranslation = async () => {
            const { data } = await axios.post(baseUrl, {}, {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: key
                }
            });
            setTranslated(data.data.translations[0].translatedText)
        };

        doTranslation();
    }, [language, debouncedText]);

    return (
        <div>
            <h1 className="ui header">{translated}</h1>

        </div>
    )
}

export default Convert;
