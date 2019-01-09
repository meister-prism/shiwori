import { ADD_NOW_BOOK } from '../actions/type';
import { DELETE_NOW_BOOK } from '../actions/type';

INITIAL_STATE = {
    id : '',
    title : '',
    author : '',
    previous_page : '',
    current_page : '',
    previous_time : '',
    current_time : ''
}

const now_reading_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NOW_BOOK:
            return { ...state, id: action.id }
        case DELETE_NOW_BOOK:
            return { ...state, name: action.name }
        default:
            return state;
    }
}
export default now_reading_reducer;