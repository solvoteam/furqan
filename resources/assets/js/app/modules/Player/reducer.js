const initialState = () => ({
    currentNum: 0,
});

export default (state = initialState(), action) => {
    const { type, payload } = action;
    switch (type) {
        case 'PLAYER:INC_NUM':
            return {
                ...state,
                currentNum: state.currentNum + 1,
            };
        default:
            return state;
    }
};
