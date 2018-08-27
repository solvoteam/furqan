import React from 'react';

const Input = ({ onChange }) => {
    return (
        <div className="input-block">
            <input
                onChange={onChange}
                className="input"
                placeholder="Введите название суры"
                type="text"
            />
        </div>
    );
};

export default Input;
