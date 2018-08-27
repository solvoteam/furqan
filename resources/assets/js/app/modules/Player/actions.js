export const setAyat = ayat => ({
    type: 'PLAYER:SET_AYAT',
    payload: ayat,
});

export const nextAyat = () => ({
    type: 'AYATS:NEXT_AYAT',
});

export const prevAyat = () => ({
    type: 'AYATS:PREV_AYAT',
});

export const setCurAyatNumber = () => ({
    type: 'AYATS:SET_CUR_AYAT',
});
