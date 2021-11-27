import * as tabActionTypes from './tabActions';

const initialState = {
    selectedTab: ""
}

const tabReducer = (state=initialState, { type, payload}) => {
    switch (type) {
        case tabActionTypes.SET_SELECTED_TAB:
            return {
                ...state,
                selectedTab: payload.selectedTab
            }

        default:
            return state;
    }
}

export default tabReducer;