import { SHIWORI_ROUTE } from '../address';
import { SHIWORI_SIG } from '../signatures';
// bookmarkに関するrequest
/**
 * register bookmark (register) *async*
 * @param {str} user_id 
 * @param {str(12)} book_id 
 * @param {int} page_num 
 * @param {str} memo
 * @return {json} response bm_id (bookmark_id)
 */
export async function register(user_id, book_id, page_num, memo) {
    return fetch(SHIWORI_ROUTE + '/bookmark/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SHIWORI-Signature': SHIWORI_SIG
        },
        body: JSON.stringify({
            "user_id": user_id,
            "book_id": book_id,
            "page_num": page_num,
            "memo": memo,
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
 * delete bookmart (delete) *async*
 * @param {str} user_id 
 * @param {str} bookmark_id 
 * @return {json} status , bookmark_id
 */
export async function del(user_id, bookmark_id) {
    return fetch(SHIWORI_ROUTE + '/bookmark/delete', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-SHIWORI-Signature': SHIWORI_SIG
            },
            body: JSON.stringify({
                "bm_id" : bookmark_id,
                "user_id": user_id,
            }), 
        })
            .then((res) => res.status);
}

/**
 * get bookmark list (get list) *async*
 * @param {str} user_id 
 * @return {json} status 
 */
export async function get(user_id) {
    let response = {"status": "", "body": ""};
    return new Promise(function(resolve, reject) {
        fetch(SHIWORI_ROUTE + '/bookmark/list?user_id='+user_id,{
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-SHIWORI-Signature': SHIWORI_SIG 
            }
        })
          .then((res) => {
            response.status = res.status
            if(res.status != 200) reject(res.status);
            return res.json();
          })
          .then((resJson) => {
            response.body = resJson;
            resolve(response);
          });
      });
}


/**
 * change bookmart (change) *async*
 * @param {str} user_id 
 * @param {str} bookmark_id
 * @param {str} memo 
 * @return {json} status , 
 */
export async function change(user_id, bookmark_id, memo) {
    return fetch(SHIWORI_ROUTE + '/bookmark/change', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SHIWORI-Signature': SHIWORI_SIG
        },
        body: JSON.stringify({
            "user_id": user_id,
            "bm_id" : bookmark_id,
            "memo" : memo
        }),
    })
        .then((response) => {
            const status = response.status;
            // const responseJson = response.json();
            const ret = { "status": status, "json": '' };
            return ret;
        }).then((ret) => ret.status);
}
