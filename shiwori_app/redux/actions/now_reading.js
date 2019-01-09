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
export const add_nowBook = (id,title,author,now_page) =>({
    type : ADD_NOW_BOOK,
    id : id,
    title : title,
    author: author,
    now_page : now_page
});

// @param : str
export const delete_nowBook = (id) =>({
    type : DELETE_NOW_BOOK,
    id : id
});

//UPDATEは後で実装
