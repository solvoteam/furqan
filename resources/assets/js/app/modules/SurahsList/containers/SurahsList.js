import React from 'react';
import { compose, withHandlers, withState, mapProps } from 'recompose';
import allSurahs from './surahs.json';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

window.surahs = allSurahs;

import * as actions from '../actions';
import * as surahsListActions from '../../SurahsList/actions';
import SurahsList from '../components/SurahsList';

export default compose(
    connect(
        null,
        { ...actions, ...surahsListActions, push },
    ),
    withState('searchValue', 'setSearchValue', ''),
    withHandlers({
        onChangeInput: ({ setSearchValue }) => e => {
            setSearchValue(e.target.value);
        },
        onOpenSurah: ({ push, setAyats, setSurah }) => number => {
            window.axios.get(`/surah/${number}`).then(({ data }) => {
                setAyats(data);
                setSurah(allSurahs[number - 1]);
                push(`/surah/${number}/ayat/1`);
            });
        },
    }),
    mapProps(props => ({
        ...props,
        surahs: allSurahs.filter(
            surah =>
                surah.name.toLowerCase().indexOf(props.searchValue.toLowerCase()) >= 0 ||
                surah.name_transcription.toLowerCase().indexOf(props.searchValue.toLowerCase()) >=
                    0,
        ),
    })),
)(SurahsList);
