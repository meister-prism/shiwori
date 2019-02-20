import { SHIWORI_ROUTE } from '../address';
import { SHIWORI_SIG } from '../signatures';
// google book id に関するrequest

/**
 * bookidに対するshiwori利用者の情報を返す
 * @param {str} book_id 
 */
export async function get(book_id) {
    let response = { "status": "", "body": "" };
    return new Promise(function (resolve, reject) {
        fetch(SHIWORI_ROUTE + '/book?book_id=' + book_id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-SHIWORI-Signature': SHIWORI_SIG
            }
        })
            .then((res) => {
                response.status = res.status
                if (res.status != 200) reject(res.status);
                return res.json();
            })
            .then((resJson) => {
                response.body = resJson;
                resolve(response);
            });
    });
}
