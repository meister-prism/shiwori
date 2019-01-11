// 今読んでいる本に対する処理を行うメソッド群

import { DELETE_NOW_BOOK } from './type';
import { UPDATE_NOW_BOOK } from './type';
import { ADD_NOW_BOOK } from './type';

/**
 * 今読んでいる本を追加する
 * @param {str} id 
 * @param {str} title 
 * @param {str} author 
 * @param {int} now_page 
 */
export const add_nowBook = (id,title,author) =>({
    type : ADD_NOW_BOOK,
    id : id,
    title : title,
    author: author
});

// @param : str
/**
 * idに対する本の情報を削除する（DB送信後の処理）
 * @param {str} id 
 */
export const delete_nowBook = (id) =>({
    type : DELETE_NOW_BOOK,
    id : id
});

/**
 * idに対する本に対して、page_numページまで読んだことを保存する。
 * @param {str} id 
 * @param {int} page_num 
 */
export const update_nowBook = (id,page_num) => ({
    type : UPDATE_NOW_BOOK,
    id : id,
    page_num : page_num
})