import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import surahList from '../modules/SurahsList/reducer';

export default combineReducers({
    router: routerReducer,
    surah: surahList,
});
