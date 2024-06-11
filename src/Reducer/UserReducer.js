// User reducer
const initialState = {
    user: null,
    loading: false,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            };
       
        default:
            return state;
    }
};

export default userReducer;