import React from 'react';
import { Link } from 'react-router-dom';

const SurahItem = ({ number, name, translate, onClick }) => {
    return (
        <div onClick={onClick.bind(this, number)} className="surahs-list__item">
            <b>{number}</b>
            <a to={`/surah/${number}/1`}>{translate}</a>
        </div>
    );
};

export default SurahItem;
