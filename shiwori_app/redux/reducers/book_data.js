import { ADD_NOW_BOOK, DELETE_NOW_BOOK } from '../actions/type';
import { START_NOW_BOOK,STOP_NOW_BOOK } from '../actions/type';
import { SET_NOW_BOOK, CLEAR_NOW_BOOK } from '../actions/type';

var moment = require("moment");

const INITIAL_STATE = {
    "now_reading_id":null,
    "now_reading_data":[],
}

INITIAL_BOOKDATA = {
    id : '',
    title : '',
    author : '',
    imgLink : '',
    current_page : 0,
    current_time : undefined,
    page_stack : [],
    time_stack : [],
    inprogress : false,
}


// 指定したインデックスの要素を削除する
// filterでitemと完全一致のものを排除して返す
const removeItem=(array,item)=>(
    array.filter((v) => v !== item)
)

/*********************************** reducer群 ************************************/
const _add = (state,action) =>{
    for(i=0;i<state.now_reading_data.length;i++){
        if(action.id == state.now_reading_data[i].id){
            // 全く同じidの本の情報が既に含まれている場合、return state （変更しない）
            return state;
        }
    }
    let add_data = {
        id : action.id,
        title : action.title,
        author : action.author,
        imgLink : action.imgLink,
        current_page : 0,
        current_time : undefined,
        page_stack : [0],
        time_stack : [],
        inprogress : false
    }
    return {...state,now_reading_id:null,now_reading_data: [...state.now_reading_data,add_data]}
};

const _set = (state,action) => {
    // 指定したidの本がsetされていない場合、何もしない
    for(i=0;i<state.now_reading_data.length;i++){
        if(action.id == state.now_reading_data[i].id){
            return {...state,now_reading_id:action.id}    
        }
    }
    return state;
}

const _clear = (state,action) => {
    return {...state,now_reading_id:null}    
}

const _start = (state,action) =>{
    // 今読んでいる本に設定していない場合にstartした場合
    if(state.now_reading_id == null)return state;
    // 本のデータの検索（見つからない場合終了）
    if(!state.now_reading_data.length)return state;
    let start_index;
    for(i=0;i<state.now_reading_data.length;i++){
        if(state.now_reading_id == state.now_reading_data[i].id){
            start_index = i;
            break;
        }
        if(i == state.now_reading_data.length-1)return state;
    }
    // update_data
    let update_data = state.now_reading_data[start_index];
    // 既にstartしている本に対してstartをさせない処理
    if(update_data.inprogress) return state;
    if(update_data.page_stack.length!=1){
        update_data.current_page = update_data.page_stack.slice(-1)[0];
        update_data.page_stack.push(update_data.current_page);
    }
    update_data.current_time = moment().format("YYYY-MM-DD HH:mm:ss");
    update_data.time_stack.push(moment().format("YYYY-MM-DD HH:mm:ss"));
    update_data.inprogress=true;
    return {...state,
            now_reading_data : [ ...state.now_reading_data.slice(0,start_index),
                                update_data,
                                ...state.now_reading_data.slice(start_index+1)
    ]}
};

const _stop = (state,action) =>{
    // 今読んでいる本に設定していない場合にstartした場合
    if(state.now_reading_id == null)return state;
    // idに対する本の情報が存在しない場合 return state
    if(!state.now_reading_data.length)return state;
    let stop_index;
    for(i=0;i<state.now_reading_data.length;i++){
        if(state.now_reading_id == state.now_reading_data[i].id){
            stop_index = i;
            break;
        }
        if(i == state.now_reading_data.length-1)return state;
    }
    // update_data
    let update_data = state.now_reading_data[stop_index];
    // 既にstopしている本に対してstopをかけない処理
    if(!update_data.inprogress)return state;
    update_data.current_page = action.page_num;
    update_data.page_stack.push(action.page_num);
    update_data.current_time = moment().format("YYYY-MM-DD HH:mm:ss");
    update_data.time_stack.push(moment().format("YYYY-MM-DD HH:mm:ss"));
    update_data.inprogress = false;
    return {...state,
            now_reading_data : [ ...state.now_reading_data.slice(0,stop_index),
                                    update_data,
                                ...state.now_reading_data.slice(stop_index+1)
    ]}
};

const _delete = (state,action) => {
    let delete_index;
    for(i=0;i<state.now_reading_data.length;i++){
        if(action.id == state.now_reading_data[i].id){
            delete_index = i;
            break;
        }
        if(i == state.now_reading_data.length-1)return state;
    }
    let delete_data = state.now_reading_data[delete_index];
    if(delete_data==undefined)return state;
    return {...state,now_reading_id:null,now_reading_data: removeItem(state.now_reading_data,delete_data)}
};


/*********************************** ここまでreducer群 ************************************/

// main
const now_reading_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NOW_BOOK:
            return _add(state,action);
        case SET_NOW_BOOK:
            return _set(state,action);
        case CLEAR_NOW_BOOK:
            return _clear(state,action);
        case START_NOW_BOOK:
            return _start(state,action);
        case STOP_NOW_BOOK:
            return _stop(state,action);
        case DELETE_NOW_BOOK:
            return _delete(state,action);
        default:
            return state;
    }
}
export default now_reading_reducer;