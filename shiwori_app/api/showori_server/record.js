import { SHIWORI_ROUTE } from '../address';
import { SHIWORI_SIG } from '../signatures';

// 本の登録

/**
 * 本の登録
 * @param {str} user_id 
 * @param {str} book_id 
 * @param {str} uname 
 * @param {str} star             評価
 * @param {str} impression       感想？
 * @param {moment} readtime 
 * @param {moment*?*} readspeed 
 */
export async function insert(user_id,book_id,user_name,star,impression,readtime,readspeed) {
    return fetch(SHIWORI_ROUTE + '/recode/insert', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SHIWORI-Signature': SHIWORI_SIG
        },
        body: JSON.stringify({
            "user_id":user_id,
            "book_id" : book_id,
            "user_name":user_name,
            "star" : star,
            "impression":impression,
            "readtime": readtime,
            "readspeed":readspeed,
        }),
    })
        .then((response) => {
            const status = response.status;
            const responseJson = response.json();
            const ret = { "status": status, "json": responseJson };
            return ret;
        }).then((ret) => ret);
}

/**
 * 本の情報の更新
 * @param {str} user_id 
 * @param {str} book_id 
 * @param {str} uname 
 * @param {str} star             評価
 * @param {str} impression       感想？
 * @param {moment} readtime 
 * @param {moment*?*} readspeed 
 * @param key??
 */
export async function update(user_id,book_id,user_name,star,impression,readtime,readspeed) {
    return fetch(SHIWORI_ROUTE + '/recode/update', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SHIWORI-Signature': SHIWORI_SIG
        },
        body: JSON.stringify({
            "user_id":user_id,
            "book_id" : book_id,
            "user_name":user_name,
            "star" : star,
            "impression":impression,
            "readtime": readtime,
            "readspeed":readspeed,
        }),
    })
        .then((response) => {
            const status = response.status;
            const responseJson = response.json();
            const ret = { "status": status, "json": responseJson };
            return ret;
        }).then((ret) => ret);
}
