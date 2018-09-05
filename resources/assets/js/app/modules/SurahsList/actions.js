export const setAyats = items => ({
    type: 'AYATS:SET_ITEMS',
    payload: items,
});

export const setCurAyatNumber = num => ({
    type: 'AYATS:SET_CUR_AYAT',
    payload: num,
});

export const setSurah = surah => ({
    type: 'AYATS:SET_SURAH',
    payload: surah,
});
