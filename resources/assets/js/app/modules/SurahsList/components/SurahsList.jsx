import React from 'react';

import SurahItem from '../../../components/SurahItem';
import Input from '../../../components/Input';

const SurahsList = ({ surahs, onChangeInput, onOpenSurah }) => {
    const surahsCount = Math.round(surahs.length / 3);
    return (
        <div className="surahs-list">
            <Input onChange={onChangeInput} />
            <div className="row">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div className="col-md-4" key={i}>
                        {surahs.slice(surahsCount * i, surahsCount * (i + 1)).map(surah => (
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
