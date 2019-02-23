import { SHIWORI_ROUTE } from '../address';
import { SHIWORI_SIG } from '../signatures';

// device情報の取得

/**
 *  デバイスからの情報を書き込む
 * @param {str} user_id 
 * @param {int} page_num 
 * @param {moment} readtime 
 * @return statusCode
 */
export async function device_insert(user_id,page_num,readtime) {
    return fetch(SHIWORI_ROUTE + '/device/insert', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SHIWORI-Signature': SHIWORI_SIG
        },
        body: JSON.stringify({
            "user_id":user_id,
            "page_num" : page_num,
            "readtime" : readtime,
        }),
    })
        .then((response) =>response.status);
}

/**
 * 情報の更新
 * @param {id} id
 * @param {str} user_id 
 * @param {str} book_id
 * @param {str} page_num 
 * @param {str} readtime[ms]
 */
export async function device_update(id,user_id,book_id,page_num,readtime) {
    return fetch(SHIWORI_ROUTE + '/device/update', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SHIWORI-Signature': SHIWORI_SIG
        },
        body: JSON.stringify({
            "id":id,
            "user_id":user_id,
            "book_id":book_id,
            "page_num" : page_num,
            "readtime" : readtime,
        }),
    })
        .then((response) =>response.status);
}

/**
 * デバイスからの情報取得
 * @param {str} user_id
 * @return {json} res
 */
export async function device_get(user_id) {
    let response = {"status": "", "body": ""};
    return new Promise(function(resolve, reject) {
        fetch(SHIWORI_ROUTE + '/device/get?user_id='+user_id,{
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
