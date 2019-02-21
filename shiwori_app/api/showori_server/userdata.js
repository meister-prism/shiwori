import { SHIWORI_ROUTE } from '../address';
import { SHIWORI_SIG } from '../signatures';

// user情報に関するrequest

/**
 * user sign_up (register) *async*
 * @param {str} name
 * @param {str} email
 * @param {str} password
 * @return {json} response
 */
export async function signup(name, email, password) {
    return fetch(SHIWORI_ROUTE + '/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SHIWORI-Signature': SHIWORI_SIG
        },
        body: JSON.stringify({
            "user_name": name,
            "email": email,
            "password": password,
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
 * user sign_in (login) *async*
 * @param {str} email
 * @param {str} password
 * @return {json} response
 */
export async function signin(email, password) {
    return fetch(SHIWORI_ROUTE + '/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SHIWORI-Signature': SHIWORI_SIG
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
        .then((response) => {
            const status = response.status;
            const responseJson = response.json();
            const ret = { "status": status, "json": responseJson };
            return ret;
        }).then((ret) => ret);
}

/**
 * get user data *async*
 * @param {str} user_id
 * @return {json} response{status: , json}
 */
export async function user_get(user_id) {
    let response = { "status": "", "body": "" };
    return new Promise(function(resolve, reject) {
        fetch(SHIWORI_ROUTE + '/user?user_id='+user_id,{
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
