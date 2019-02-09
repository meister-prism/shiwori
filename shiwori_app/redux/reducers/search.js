import { ADD_RECENTLY_VIEWED, DELETE_RECENTLY_VIEWED } from '../actions/type';
import { ADD_SEARCH_HISTORY, DELETE_SEARCH_HISTORY } from '../actions/type';

const MAX_RV = 10; // 最近チェックした本に入れる最大数
const MAX_ST = 10; // 検索履歴に入れる最大数

// どちらも、先頭が古い、新しい情報は末尾に追加されていく。
const INITIAL_STATE = {
    recentlyViewed : [],
    searchHistory : [],
}

// 最近読んだ本にidを追加
const _add_recentlyViewed = (state,action) => {
    let ret=state.recentlyViewed;
    // 同じ本を検索したときは、いまのidの場所を削除=末尾に再び追加
    for(let i=0;i<ret.length;i++){
        if(action.volumeid==ret[i]){
            ret.splice(i,1);
        }
    }
    ret.push(action.volumeid);
    if(ret.length==MAX_RV+1){
        ret.shift();
    }
    return {...state,recentlyViewed:ret}
}

// 検索履歴の追加
const _add_searchHistory = (state,action) => {
    let ret= state.searchHistory;
    for(let i=0;i<ret.length;i++){
        if(action.text==ret[i]){
            ret.splice(i,1);
        }
    }
    ret.push(action.text);
    if(ret.length==MAX_ST+1){
        ret.shift();
    }
    return {...state,searchHistory:ret}
}
// main
const search_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_RECENTLY_VIEWED:
            return _add_recentlyViewed(state,action);
        case DELETE_RECENTLY_VIEWED:
            return {...state,recentlyViewed:[]}
        case ADD_SEARCH_HISTORY:
            return _add_searchHistory(state,action);
        case DELETE_SEARCH_HISTORY:
            return {...state,searchHistory:[]}
        default:
            return state;
    }
}
export default search_reducer;