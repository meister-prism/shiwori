// 今読んでいる本に対する処理を行うメソッド群

import { DELETE_NOW_BOOK } from './type';
import { ADD_NOW_BOOK } from './type';
import { START_NOW_BOOK }from './type';
import { STOP_NOW_BOOK }from './type';
import { SET_NOW_BOOK } from './type';
import { CLEAR_NOW_BOOK} from './type';
/**
 * 今読んでいる本を追加する(初回起動、計測開始)
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
 * 読み始め（再開）
 * @param {str} id 
 */
export const start_nowBook = () =>({
    type : START_NOW_BOOK,
})

/**
 * 読書終了 ここで、100%読了の場合、complete = true をセット
 * @param {str} id 
 * @param {int} page_num 
 * @param {boolean} complete
 */
export const stop_nowBook = (page_num) =>({
    type : STOP_NOW_BOOK,
    page_num : page_num
})

export const set_nowBook=(id)=>({
    type : SET_NOW_BOOK,
    id : id
})

export const clear_nowBook=()=>({
    type : CLEAR_NOW_BOOK,
})