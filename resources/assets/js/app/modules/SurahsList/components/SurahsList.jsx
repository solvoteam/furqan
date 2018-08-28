import React from 'react';

import SurahItem from '../../../components/SurahItem';
import Input from '../../../components/Input';

const SurahsList = ({surahs, onChangeInput, onOpenSurah}) => {

    const third1 = function () {
        return surahs.slice(0, Math.ceil(surahs.length / 3));
    };

    const third2 = function () {
        let first_third_length = third1().length;
        let left_surats_length = surahs.length - first_third_length;
        return surahs.slice(first_third_length, first_third_length + Math.ceil(left_surats_length / 2));
    };

    const third3 = function () {
        let first_n_second_length = third1().length + third2().length;
        return surahs.slice(first_n_second_length);
    };

    const funcArray = [third1, third2, third3];

    return (
        <div className="surahs-list">
            <Input onChange={onChangeInput}/>
            <div className="row">
                {Array.from({length: 3}).map((_, i) => (
                    <div className="col-md-4" key={i}>
                        {funcArray[i]().map(surah => (
                            <SurahItem
                                key={surah.number}
                                number={surah.number}
                                name={surah.name}
                                translate={surah.name_transcription}
                                onClick={onOpenSurah}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurahsList;
