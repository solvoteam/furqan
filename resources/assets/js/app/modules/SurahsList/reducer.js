const initialState = () => ({
    ayats: [],
    surah: [],
    curAyat: 0,
});

export default (state = initialState(), action) => {
    const { type, payload } = action;
    switch (type) {
        case 'AYATS:SET_ITEMS':
            return {
                ...state,
                ayats: payload,
            };
        case 'AYATS:SET_SURAH':
            return {
                ...state,
                surah: payload,
            };
        case 'AYATS:NEXT_AYAT':
            return {
                ...state,
                curAyat:
                    state.curAyat + 1 < state.ayats.length
                        ? state.curAyat + 1
                        : state.ayats.length - 1,
            };
        case 'AYATS:PREV_AYAT':
            return {
                ...state,
                curAyat: state.curAyat - 1 >= 0 ? state.curAyat - 1 : 0,
            };
        case 'AYATS:SET_CUR_AYAT':
            return {
                ...state,
                curAyat: payload,
            };
        default:
            return state;
    }
};
