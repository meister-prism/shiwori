// 最近見た本について(詳細をチェックした本について)
import {ADD_RECENTLY_VIEWED,DELETE_RECENTRY_VIEWED }from './type';

// 検索履歴を保存する
import { ADD_SEARCH_HISTORY,DELETE_SEARCH_HISTORY }from './type';

/**
 * 最近見た本に追加する（最大50件）、それを超えると古い順に破棄される
 * @param {str} volumeid
 */
export const add_recentlyViewed = (volumeid)=>({
    type:ADD_RECENTLY_VIEWED,
    volumeid:volumeid
});

/**
 * 最近見た本をすべて削除する
 * 起動前にAlertで確認メッセージを出しましょう
 */
export const delete_recentlyViewed = ()=>({
    type:DELETE_RECENTRY_VIEWED,
});


/**
 * 検索履歴を追加（最大50件）、それを超えると古い順に破棄される
 * @param {str} text(検索した文章)
 */
export const add_searchHistory = (text)=>({
    type:ADD_SEARCH_HISTORY,
    text:text
});

/**
 * 検索履歴をすべて削除する
 * 起動前にAlertで確認メッセージを出しましょう
 */
export const delete_searchHistory = ()=>({
    type:DELETE_SEARCH_HISTORY,
});