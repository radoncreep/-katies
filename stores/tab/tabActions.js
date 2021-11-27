// types
export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';

// action 
const setSelectedTabSuccess = (selectedTab) => ({
    type: SET_SELECTED_TAB,
    payload: { selectedTab }
})

// dispatch function
export default function setSelectedTab(selectedTab) {
    return dispatch => {
        dispatch(setSelectedTabSuccess(selectedTab));
    }
}