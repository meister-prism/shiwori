import { ADD_NOW_BOOK, UPDATE_NOW_BOOK } from '../actions/type';
import { DELETE_NOW_BOOK } from '../actions/type';
var moment = require("moment");
INITIAL_STATE = {
    "now_reading":[]
}

INITIAL_BOOKDATA = {
    id : '',
    title : '',
    author : '',
    previous_page : 0,
    current_page : 0,
    previous_time : '',
    current_time : ''
}


// 指定したインデックスの要素を削除する
// filterでitemと完全一致のものを排除して返す
const removeItem=(array,item)=>(
    array.filter((v) => v !== item)
)

const now_reading_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NOW_BOOK:
            for(i=0;i<state.now_reading.length;i++){
                if(action.id == state.now_reading[i].id){
                    // 全く同じ本の情報が既に含まれている
                    return state;
                }
            }
            let add_data = {
                id : action.id,
                title : action.title,
                author : action.author,
                previous_page : 0,
                current_page : 0,
                previous_time : undefined,
                current_time :  moment().format("YYYY-MM-DD HH:mm:ss")
            }
            return {...state,now_reading: [...state.now_reading,add_data]}
        case DELETE_NOW_BOOK:
            let delete_index;
            for(i=0;i<state.now_reading.length;i++){
                if(action.id == state.now_reading[i].id){
                    delete_index = i;
                    break;
                }
                if(i == state.now_reading.length-1)return state;
            }
            let delete_data = state.now_reading[delete_index];
            return {...state,now_reading: removeItem(state.now_reading,delete_data)}
        case UPDATE_NOW_BOOK:
            let update_index;
            if(!state.now_reading.length)return state;
            for(i=0;i<state.now_reading.length;i++){
                if(action.id == state.now_reading[i].id){
                    update_index = i;
                    break;
                }
                if(i == state.now_reading.length-1)return state;
            }
            let update_data = state.now_reading[update_index];
            // data update
            update_data.previous_page = update_data.current_page;
            update_data.current_page  = action.page_num;
            update_data.previous_time = update_data.current_time;
            update_data.current_time  = moment().format("YYYY-MM-DD HH:mm:ss");
            return {...state,
                    now_reading : [ ...state.now_reading.slice(0,update_index),
                                    update_data,
                                    ...state.now_reading.slice(update_index+1)
            ]}
        default:
            return state;
    }
}
export default now_reading_reducer;