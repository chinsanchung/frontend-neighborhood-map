import { testList } from '../assets/testList';

const SAVE_PLACE = 'SAVE_PLACE';
const DELETE_PLACE = 'DELETE_PLACE';

export const save_place = data => ({
    type: SAVE_PLACE,
    payload: data
});
export const delete_place = id => ({
    type: DELETE_PLACE,
    payload: id
})

const initialState = testList.results;

export const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PLACE:
            return state.concat(action.payload);
        case DELETE_PLACE:
            return state.filter(item => item.id !== action.payload.id);
        default:
            return state;
    }
}
