import { ADD_RECENTLY_VIEWED, DELETE_RECENTLY_VIEWED } from '../actions/type';
import { ADD_SEARCH_HISTORY, DELETE_SEARCH_HISTORY } from '../actions/type';

const MAX_RV = 10; // 最近チェックした本に入れる最大数
const MAX_ST = 10; // 検索履歴に入れる最大数

// どちらも、先頭が古い、新しい情報は末尾に追加されていく。
const INITIAL_STATE = {
    recentlyViewed : [],
    searchHistory : [],
}

const _add_recentlyViewed = (state,action) => {
    let ret=state.recentlyViewed;
    if(ret.length==MAX_RV){
        ret.push(action.recentlyViewed);
        ret.shift();
    }
    return {...state,recentlyViewed:ret}
}

const _add_searchHistory = (state,action) => {
    let ret= state.searchHistory;
    if(ret.length==MAX_ST){
        ret.push(action.text);
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